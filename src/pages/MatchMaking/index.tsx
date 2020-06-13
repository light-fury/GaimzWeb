import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RightModal, MatchmakingSettings, FindingMatchmaking, MatchmakingPassword, MatchmakingVersus, MatchmakingStats } from 'src/components';
import RecentMatches from 'src/components/RecentMatches';
import { RootState } from 'src/app/rootReducer';
import { findMatch, loadRecentMatches, loadGame, updateMatch, getMatchStatus } from 'src/features/matches';
import { MatchRequestDTO, MatchResponse, PlayerInterface, Stats, MatchStatus } from 'src/models/match-interfaces';

import { IMatchmakingSettings, Restriction } from 'src/components/MatchmakingSettings';

import { Direction } from 'src/components/FindingMatchmaking';
import styles from './MatchMaking.module.css';

declare const window: Window;

enum MatchmakingFlow {
  INITIAL_STATE = 'INITIAL_STATE',
  SEARCHING_FOR_MATCHES = 'SEARCHING_FOR_MATCHES',
  LOBBY_PASSWORD_REQUIRED = 'LOBBY_PASSWORD_REQUIRED',
  MATCH_FOUND_READY = 'MATCH_FOUND_READY',
  PREPARING_MATCH_LOBBY = 'PREPARING_MATCH_LOBBY',
  SENDING_INVITES = 'SENDING_INVITES',
  MATCH_IN_PROGRESS = 'MATCH_IN_PROGRESS',
  MATCH_END = 'MATCH_END'
}

const MatchMaking = () => {
  const dispatch = useDispatch();

  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [matchmakingSettings, setMatchmakingSettings] = useState<IMatchmakingSettings>({
    gameType: '',
    gameMode: '',
    region: 'auto',
    restriction: Restriction.Everyone,
    password: '',
    complete: false
  });
  const [matchmakingFlow, setMatchmakingFlow] = useState<MatchmakingFlow>(
    MatchmakingFlow.INITIAL_STATE
  );

  const { recentMatchesData, user, game, match } = useSelector(
    (s: RootState) => ({
      recentMatchesData: s.matches.recentMatchesData,
      user: s.authentication.user,
      game: s.matches.gameData,
      match: s.matches.matchData
    })
  );
  const matchId = useMemo(() => match.match_id, [match.match_id]);

  useEffect(() => {
    const userId = user?.user_id;
    if (userId !== undefined) {
      dispatch(loadRecentMatches(userId));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(loadGame('1')); // 1 is hard coded DOTA 2
  }, [dispatch]);

  useEffect(() => {
    let timeout = 5000;
    if (matchmakingFlow === MatchmakingFlow.MATCH_END) {
      timeout = 60000;
    }
    if (matchmakingFlow !== MatchmakingFlow.INITIAL_STATE) {
      const timoutid = setInterval(() => {
        dispatch(getMatchStatus(matchId!));
      }, timeout);
      return () => clearInterval(timoutid);
    }
    return () => { };
  }, [dispatch, matchmakingFlow, matchId]);

  useEffect(() => {
    switch (match.match_status) {
      case MatchStatus.MatchCancelled:
        setMatchmakingFlow(MatchmakingFlow.INITIAL_STATE);
        break;
      case MatchStatus.MatchAccepted:
        setMatchmakingFlow(MatchmakingFlow.PREPARING_MATCH_LOBBY);
        break;
      case MatchStatus.PlayersFound:
        setMatchmakingFlow(MatchmakingFlow.MATCH_FOUND_READY);
        break;
      default:
        break;
    }
  }, [match]);

  const setAllToInitialState = () => {
    setMatchmakingFlow(MatchmakingFlow.INITIAL_STATE);
  };

  // TODO: Properly set match name from api. The mock data below should be coming from the reducer
  // DUMMY DATA START
  const player1Sample: PlayerInterface = {
    player_status: 'match_requested',
    user_id: 'Shroud',
    hero_name: 'Centaur',
    kills: 10,
    deaths: 4,
    assists: 4,
    lasthits: 60,
    denies: 5,
    gpm: 200
  };
  const player2Sample: PlayerInterface = {
    player_status: 'match_requested',
    user_id: 'Swagger',
    hero_name: 'Pudge',
    kills: 10,
    deaths: 4,
    assists: 4,
    lasthits: 60,
    denies: 5,
    gpm: 200
  };
  if (matchmakingFlow === MatchmakingFlow.MATCH_END) {
    player1Sample.won = true;
    player2Sample.won = false;
  }

  const matchStats: Stats = {
    dire: {
      players: [
        player1Sample,
        player1Sample,
        player1Sample
      ],
      name: 'dire',
      id: 123
    },
    radiant: {
      players: [
        player2Sample,
        player2Sample,
        player2Sample
      ],
      name: 'radiant',
      id: 123
    },
    teams: [
      {
        players: [],
        name: 'dire',
        id: 123
      },
      {
        players: [],
        name: 'radiant',
        id: 123
      }
    ],
    duration: 60
  };
  // DUMMY DATA END


  const onAcceptMatchmaking = () => {
    if (match && match.match_id) {
      dispatch(updateMatch(match.match_id, true));
    }
  };

  const onCancelMatchmakingClicked = () => {
    if (match && match.match_id) {
      dispatch(updateMatch(match.match_id, false));
    }

    setAllToInitialState();
  };

  const onReportIssueClicked = () => {
    // TODO: opens a reporting modal maybe?
  };

  const onResendInvitesClick = () => {
    // TODO: call resend invites api
  };

  const onSettingsClick = () => {
    setIsSettingsClicked(!isSettingsClicked);
  };

  const onMainButtonClicked = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.INITIAL_STATE:
        if (!game) {
          // oops - you first need to select a game!
          return;
        }
        dispatch(findMatch({
          bet: 0,
          game_id: game.game_id,
          game_mode: matchmakingSettings.gameMode || game.game_types[0].gameModes[0],
          game_type: matchmakingSettings.gameType || game.game_types[0].type,
          password: matchmakingSettings.password,
          restriction: matchmakingSettings.restriction || Restriction.Everyone
        }));
        setMatchmakingFlow(MatchmakingFlow.SEARCHING_FOR_MATCHES);
        break;
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
        onCancelMatchmakingClicked();
        break;
      default:
        break;
    }
  };


  const getButtonText = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
        return 'Cancel';
      case MatchmakingFlow.MATCH_FOUND_READY:
        return 'Accept';
      default:
        return 'Start Search';
    }
  };

  const renderLeftPanel = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        return (
          <MatchmakingStats
            matchStats={matchStats}
            matchResponse={match}
            game={game}
          />
        );
      default:
        return (
          <>
            <div className={styles.titleContainer}>
              <span className={styles.title}>Recent Matches</span>
            </div>
            <div className={styles.contentContainer}>
              {recentMatchesData !== null && (
                <RecentMatches userId={user!.user_id} recentMatchesData={recentMatchesData} />
              )}
            </div>
          </>
        );
    }
  };

  const renderRightPanel = () => {
    if (!user?.apps.steam) {
      return (
        <div className={styles.centerContainer}>
          <h3 className={styles.steamWarning}>
            Make sure you first connect your steam id before trying to continue!
          </h3>
        </div>
      );
    }

    switch (matchmakingFlow) {
      case MatchmakingFlow.INITIAL_STATE:
        return (
          <div className={styles.centerContainer}>
            <img
              className={styles.dota2Bg}
              src={game?.game_picture_url}
              alt={`${game?.game_name} Background`}
            />
          </div>
        );
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
        return (
          <FindingMatchmaking
            title="Finding Match..."
            description="A match has 10 minutes to find available players. It will cancel after that timeout."
            completedTimeInS={600}
            onFinished={() => onCancelMatchmakingClicked()}
          />
        );
      case MatchmakingFlow.MATCH_FOUND_READY:
        return (
          <FindingMatchmaking
            title="Your match is ready"
            completedTimeInS={30}
            direction={Direction.Down}
            description="Failing to accept may result in a temporary match ban."
          />
        );
      case MatchmakingFlow.PREPARING_MATCH_LOBBY:
        return (
          <FindingMatchmaking
            title={`#GMZLOBBY${match.match_id}`}
            completedTimeInS={0}
            centerText="Gaimz Bot Preparing Lobby"
          />
        );
      case MatchmakingFlow.SENDING_INVITES:
        return (
          <FindingMatchmaking
            title={`#GMZLOBBY${match.match_id}`}
            completedTimeInS={30}
            direction={Direction.Down}
            centerText="Gaimz Bot Sending Invites"
          />
        );
      case MatchmakingFlow.LOBBY_PASSWORD_REQUIRED:
        return (
          <MatchmakingPassword />
        );
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        const playersTemp: { radiant: PlayerInterface, dire: PlayerInterface }[] = [];
        matchStats?.radiant?.players?.forEach((player, index) => {
          const playerTemp: { radiant: PlayerInterface, dire: PlayerInterface } = {
            radiant: player,
            dire: matchStats?.dire?.players[index]
          };
          playersTemp.push(playerTemp);
        });
        return (
          <div>
            <MatchmakingVersus players={playersTemp} />
          </div>
        );
      default:
        return null;
    }
  };


  const renderRightButtonsComponent = () => {
    if (!user?.apps.steam) {
      return <></>;
    }
    switch (matchmakingFlow) {
      case MatchmakingFlow.MATCH_FOUND_READY:
        return (
          <>
            <div className={styles.centerContainer}>
              <button
                className={styles.matchButton}
                onClick={onAcceptMatchmaking}
              >
                Accept
              </button>
            </div>
            <div className={styles.centerContainer}>
              <button
                className={styles.settingsButton}
                onClick={onCancelMatchmakingClicked}
              >
                Cancel
              </button>
            </div>
          </>
        );
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
      case MatchmakingFlow.INITIAL_STATE:
      case MatchmakingFlow.LOBBY_PASSWORD_REQUIRED:
        return (
          <>
            <div className={styles.centerContainer}>
              <button
                disabled={matchmakingFlow === MatchmakingFlow.INITIAL_STATE
                  && isSettingsClicked && matchmakingSettings.complete}
                className={styles.matchButton}
                onClick={onMainButtonClicked}
              >
                {getButtonText()}
              </button>
            </div>
            <div className={styles.centerContainer}>
              <button
                className={styles.settingsButton}
                onClick={onSettingsClick}
              >
                {isSettingsClicked ? 'Close Settings' : 'Settings'}
              </button>
            </div>
          </>
        );
      case MatchmakingFlow.PREPARING_MATCH_LOBBY:
        return (
          <>
            <button className={styles.reportIssuesButton} onClick={onReportIssueClicked}>
              REPORT ISSUE
            </button>
          </>
        );
      case MatchmakingFlow.SENDING_INVITES:
        return (
          <>
            <div className={styles.centerContainer}>
              <button
                className={styles.resendInvitesButton}
                onClick={onResendInvitesClick}
              >
                SEND INVITES AGAIN
              </button>
            </div>
            <button className={styles.reportIssuesButton} onClick={onReportIssueClicked}>
              REPORT ISSUE
            </button>
          </>
        );
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        return (
          <div className={styles.bottomButtonContainer}>
            <div className={styles.bottomTextMatchName}>
              {`#GMZLOBBY${match.match_id}`}
            </div>
            <button className={styles.reportIssuesButton} onClick={onReportIssueClicked}>
              REPORT ISSUE
            </button>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.topNavBar}>
          <div className={[styles.topNavBarItem, styles.inactive].join(' ')}>
            <Link to="/feed">Discover</Link>
          </div>
          <div className={[styles.topNavBarItem, styles.active].join(' ')}>
            <span>Matchmaking</span>
            <div className={styles.dot} />
          </div>
        </div>
        {renderLeftPanel()}
      </div>
      <RightModal>
        {
          isSettingsClicked
            ? (
              <MatchmakingSettings
                game={game}
                matchmakingSettings={matchmakingSettings}
                onChangeMatchmakingSettings={setMatchmakingSettings}
              />
            )
            : (
              <>
                {renderRightPanel()}
              </>
            )
        }
        {renderRightButtonsComponent()}
      </RightModal>
    </div>
  );
};
export default MatchMaking;
