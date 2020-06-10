import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RightModal } from 'src/components';
import RecentMatches from 'src/components/RecentMatches';
import { RootState } from 'src/app/rootReducer';
import {findMatch, loadRecentMatches} from 'src/features/matches';

import dota2Bg from 'src/images/matchmaking/dota2Bg.svg';
import styles from './MatchMaking.module.css';
import MatchmakingSettings, { IMatchmakingSettings } from '../../components/MatchmakingSettings';
import FindingMatchmaking from '../../components/FindingMatchmaking';
import MatchmakingPassword from '../../components/MatchmakingPassword';
import MatchmakingVersus from '../../components/MatchmakingVersus';
import {MatchRequestDTO, MatchResponse, PlayerInterface, Stats} from '../../utils/MatchmakingModels';
import MatchMakingStats from '../../components/MatchmakingStats';
import {match} from "assert";

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
  const timeouts: NodeJS.Timeout[] = [];
  const dispatch = useDispatch();

  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [matchmakingSettings, setMatchmakingSettings] = useState<IMatchmakingSettings>({
    gameType: 'allPick',
    gameMode: '1v1',
    region: 'auto',
    streamer: 'streamer1',
    streamerOption: 'subscribers'
  });
  const [matchmakingFlow, setMatchmakingFlow] = useState<MatchmakingFlow>(MatchmakingFlow.INITIAL_STATE);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const { recentMatchesData, user } = useSelector(
    (s: RootState) => ({
      recentMatchesData: s.matches.recentMatchesData,
      user: s.authentication.user
    })
  );

  // TODO: Properly set match name from api
  let matchResponse: MatchResponse = {
    bet: 0,
    end_time: '2020-06-10',
    game_id: '213',
    game_mode: 'solo',
    match_id: '1234',
    match_status: 'MATCH IN PROGRESS',
    start_time: '2020-06-10',
    lobby_name: '#GAMELOBBYNAME1234',
    game: "Dota 2"
  };

  let player1Sample: PlayerInterface = {
    player_status: 'match_requested',
    user_id: 'Shroud',
    hero_name: "Centaur",
    kills: 10,
    deaths: 4,
    assists: 4,
    lasthits: 60,
    denies: 5,
    gpm: 200
  }
  let player2Sample: PlayerInterface = {
    player_status: 'match_requested',
    user_id: 'Swagger',
    hero_name: "Pudge",
    kills: 10,
    deaths: 4,
    assists: 4,
    lasthits: 60,
    denies: 5,
    gpm: 200
  };
  if(matchmakingFlow == MatchmakingFlow.MATCH_END) {
    player1Sample.won = true;
    player2Sample.won = false;
  }

  let matchStats: Stats = {
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
    ]
  };

  useEffect(() => {
    const userId = user?.user_id;
    if (userId !== undefined) {
      dispatch(loadRecentMatches(userId));
    }
  }, [dispatch, user]);

  const onMainButtonClicked = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.INITIAL_STATE:
        let matchDto: MatchRequestDTO = {
          bet: 0,
          game_id: "123",
          game_mode: matchmakingSettings.gameMode,
          game_type: matchmakingSettings.gameType,
          password: "",
          restriction: matchmakingSettings.region
        }
        findMatch(matchDto);
        startCounting(0);
        setMatchmakingFlow(MatchmakingFlow.SEARCHING_FOR_MATCHES);
        break;
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
        setAllToInitialState();
        break;
    }
  };

  const onAcceptMatchmaking = () => {
    // TODO: Call accept matchmaking api
  };

  const onCancelMatchmakingClicked = () => {
    // TODO: Call cancel matchmaking api, get banned probably
    setAllToInitialState();
  };

  const onReportIssueClicked = () => {
    // TODO: opens a reporting modal maybe?
  };

  const onResendInvitesClick = () => {
    // TODO: resend invites click maybe?
  };

  const onSettingsClick = () => {
    setIsSettingsClicked(!isSettingsClicked);
  };

  const getButtonText = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
        return 'Cancel';
      case MatchmakingFlow.MATCH_FOUND_READY:
        return 'Accept';
      default:
        return 'Find Match';
    }
  };

  const renderLeftPanel = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        return (
          <MatchMakingStats
            matchStats={matchStats}
            matchResponse={matchResponse}
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
                <RecentMatches recentMatchesData={recentMatchesData} />
              )}
            </div>
          </>
        );
    }
  };

  const renderRightPanel = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.INITIAL_STATE:
        return (
          <div className={styles.centerContainer}>
            <img
              className={styles.dota2Bg}
              src={dota2Bg}
              alt="Dota 2 Background"
            />
          </div>
        );
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
        return (
          <FindingMatchmaking
            title="Finding Match..."
            progress={20}
            circularButtonCenterText={`${elapsedTime} seconds`}
            description="Double click the timer to hide the search and explore Gaimz. We will notify you when the match is found."
          />
        );
      case MatchmakingFlow.MATCH_FOUND_READY:
        return (
          <FindingMatchmaking
            title="Your match is ready"
            progress={50}
            circularButtonCenterText={`${elapsedTime} seconds`}
            description="Failing to accept may result in a temporary match ban."
          />
        );
      case MatchmakingFlow.PREPARING_MATCH_LOBBY:
        return (
          <FindingMatchmaking
            title={matchResponse.lobby_name}
            progress={80}
            circularButtonCenterText="Gaimz Bot Preparing Lobby"
          />
        );
      case MatchmakingFlow.SENDING_INVITES:
        return (
          <FindingMatchmaking
            title="#GAMELOBBYNAME1234"
            progress={90}
            circularButtonCenterText="Gaimz Bot Sending Invites"
          />
        );
      case MatchmakingFlow.LOBBY_PASSWORD_REQUIRED:
        return (
          <MatchmakingPassword />
        );
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        // TODO: get players from api
        let playersTemp: { radiant: PlayerInterface, dire: PlayerInterface }[] = [];
        matchStats?.radiant?.players?.forEach((player, index) => {
          let playerTemp: { radiant: PlayerInterface, dire: PlayerInterface } = {
            radiant: player,
            dire: matchStats?.dire?.players[index]
          }
          playersTemp.push(playerTemp);
        })
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
    switch (matchmakingFlow) {
      case MatchmakingFlow.MATCH_FOUND_READY:
        return (
          <>
            <div className={styles.centerContainer}>
              <div
                className={styles.matchButton}
                onClick={onAcceptMatchmaking}
              >
                Accept
              </div>
            </div>
            <div className={styles.centerContainer}>
              <div
                className={styles.settingsButton}
                onClick={onCancelMatchmakingClicked}
              >
                Cancel
              </div>
            </div>
          </>
        );
      case MatchmakingFlow.SEARCHING_FOR_MATCHES:
      case MatchmakingFlow.INITIAL_STATE:
      case MatchmakingFlow.LOBBY_PASSWORD_REQUIRED:
        return (
          <>
            <div className={styles.centerContainer}>
              <div
                className={styles.matchButton}
                onClick={onMainButtonClicked}
              >
                {getButtonText()}
              </div>
            </div>
            <div className={styles.centerContainer}>
              <div
                className={styles.settingsButton}
                onClick={onSettingsClick}
              >
                {isSettingsClicked ? 'Close Settings' : 'Settings'}
              </div>
            </div>
          </>
        );
      case MatchmakingFlow.PREPARING_MATCH_LOBBY:
        return (
          <>
            <div className={styles.reportIssuesButton} onClick={onReportIssueClicked}>
              REPORT ISSUE
            </div>
          </>
        );
      case MatchmakingFlow.SENDING_INVITES:
        return (
          <>
            <div className={styles.centerContainer}>
              <div
                className={styles.resendInvitesButton}
                onClick={onResendInvitesClick}
              >
                SEND INVITES AGAIN
              </div>
            </div>
            <div className={styles.reportIssuesButton} onClick={onReportIssueClicked}>
              REPORT ISSUE
            </div>
          </>
        );
      case MatchmakingFlow.MATCH_IN_PROGRESS:
      case MatchmakingFlow.MATCH_END:
        return (
          <div className={styles.bottomButtonContainer}>
            <div className={styles.bottomTextMatchName}>
              {matchResponse.lobby_name}
            </div>
            <div className={styles.reportIssuesButton} onClick={onReportIssueClicked}>
              REPORT ISSUE
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const startCounting = (count: number) => {
    const id = setTimeout(() => runElapsedTimeCounter(count), 1000);
    timeouts.push(id);
  };

  const runElapsedTimeCounter = (count: number) => {
    count++;
    setElapsedTime(count);
    const id = setTimeout(() => runElapsedTimeCounter(count), 1000);
    timeouts.push(id);
    // // TODO: delete below lines, and replace with a call to match/match_id api
    if (count === 3) {
      setMatchmakingFlow(MatchmakingFlow.LOBBY_PASSWORD_REQUIRED);
    }
    if (count === 6) {
      setMatchmakingFlow(MatchmakingFlow.MATCH_FOUND_READY);
    }
    if (count === 9) {
      setMatchmakingFlow(MatchmakingFlow.PREPARING_MATCH_LOBBY);
    }
    if (count === 12) {
      setMatchmakingFlow(MatchmakingFlow.SENDING_INVITES);
    }
    if (count === 15) {
      setMatchmakingFlow(MatchmakingFlow.MATCH_IN_PROGRESS);
    }
    if (count === 18) {
      setMatchmakingFlow(MatchmakingFlow.MATCH_END);
    }
  };

  const setAllToInitialState = () => {
    if (timeouts?.length > 0) {
      timeouts.forEach((timeOut) => {
        clearTimeout(timeOut);
      });
    }
    setElapsedTime(0);
    setMatchmakingFlow(MatchmakingFlow.INITIAL_STATE);
    window.location.reload();
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
