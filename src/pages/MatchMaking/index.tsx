import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RightModal, MatchmakingSettings, FindingMatchmaking, MatchmakingVersus, MatchmakingStats } from 'src/components';
import RecentMatches from 'src/components/RecentMatches';
import { RootState } from 'src/app/rootReducer';
import { findMatch, loadRecentMatches, loadGame, updateMatch, pollStart, pollStop, MatchmakingFlow } from 'src/features/matches';
import { PlayerInterface } from 'src/models/match-interfaces';

import { IMatchmakingSettings, Restriction } from 'src/components/MatchmakingSettings';

import { Direction } from 'src/components/FindingMatchmaking';
import styles from './MatchMaking.module.css';

declare const window: Window;


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

  const { recentMatchesData, user, game, match, matchMakingFlow } = useSelector(
    (s: RootState) => ({
      recentMatchesData: s.matches.recentMatchesData,
      user: s.authentication.user,
      game: s.matches.gameData,
      match: s.matches.matchData,
      matchMakingFlow: s.matches.matchMakingFlow,
    })
  );

  useEffect(() => {
    const userId = user?.user_id;
    if (userId !== undefined) {
      dispatch(loadRecentMatches(userId));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(loadGame('1')); // 1 is hard coded DOTA 2
  }, [dispatch]);


  const onAcceptMatchmaking = useCallback(() => {
    dispatch(updateMatch(match!.match_id!, true));
  }, [dispatch, match]);


  const onCancelMatchmakingClicked = useCallback(() => {
    dispatch(updateMatch(match!.match_id!, false));
    dispatch(pollStop());
  }, [dispatch, match]);

  const onReportIssueClicked = () => {
    // TODO: opens a reporting modal maybe?
  };

  const onResendInvitesClick = () => {
    // TODO: call resend invites api
  };

  const onSettingsClick = useCallback(() => {
    setIsSettingsClicked(!isSettingsClicked);
  }, [isSettingsClicked]);

  const onMainButtonClicked = useCallback(() => {
    switch (matchMakingFlow) {
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
        dispatch(pollStart());
        break;
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
        onCancelMatchmakingClicked();
        break;
      default:
        break;
    }
  }, [matchMakingFlow, dispatch, game, matchmakingSettings.gameMode,
    matchmakingSettings.gameType, matchmakingSettings.password,
    matchmakingSettings.restriction, onCancelMatchmakingClicked]);


  const getButtonText = useCallback(() => {
    switch (matchMakingFlow) {
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
        return 'Cancel';
      case MatchmakingFlow.MATCH_FOUND_READY:
        return 'Accept';
      default:
        return 'Start Search';
    }
  }, [matchMakingFlow]);

  const renderLeftPanel = useCallback(() => {
    switch (matchMakingFlow) {
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        return (
          <MatchmakingStats
            matchStats={match.stats!}
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
  }, [game, match, matchMakingFlow, recentMatchesData, user]);

  const renderRightPanel = useCallback(() => {
    if (!user?.apps.steam) {
      return (
        <div className={styles.centerContainer}>
          <h3 className={styles.steamWarning}>
            Make sure you first connect your steam id before trying to continue!
          </h3>
        </div>
      );
    }
    const playersRow: { radiant: PlayerInterface, dire: PlayerInterface }[] = [];
    if (match.stats) {
      match.stats.radiant.players.forEach((player, index) => {
        const playerTemp: { radiant: PlayerInterface, dire: PlayerInterface } = {
          radiant: player,
          dire: match.stats!.dire!.players[index]
        };
        playersRow.push(playerTemp);
      });
    }
    switch (matchMakingFlow) {
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
            onFinished={onCancelMatchmakingClicked}
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
      // case MatchmakingFlow.LOBBY_PASSWORD_REQUIRED:
      //   return (
      //     <MatchmakingPassword />
      //   );
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        return (
          <div>
            <MatchmakingVersus players={playersRow} />
          </div>
        );
      default:
        return null;
    }
  }, [game, match.match_id, matchMakingFlow, match.stats, onCancelMatchmakingClicked, user]);


  const renderRightButtonsComponent = useCallback(() => {
    if (!user?.apps.steam) {
      return <></>;
    }
    switch (matchMakingFlow) {
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
                disabled={matchMakingFlow === MatchmakingFlow.INITIAL_STATE
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
  }, [getButtonText, isSettingsClicked, match.match_id, matchMakingFlow,
    matchmakingSettings.complete, onAcceptMatchmaking, onCancelMatchmakingClicked,
    onMainButtonClicked, onSettingsClick, user]);


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
