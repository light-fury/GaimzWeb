import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RightModal } from 'src/components';
import RecentMatches from 'src/components/RecentMatches';
import { RootState } from 'src/app/rootReducer';
import { loadRecentMatches } from 'src/features/matches';

import dota2Bg from 'src/images/matchmaking/dota2Bg.svg';
import styles from './MatchMaking.module.css';
import MatchmakingSettings, { IMatchmakingSettings } from '../../components/MatchmakingSettings';
import FindingMatchmaking from '../../components/FindingMatchmaking';
import MatchmakingPassword from '../../components/MatchmakingPassword';
import MatchmakingVersus from '../../components/MatchmakingVersus';

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

  // TODO: Properly set match name from api
  const [matchName, setMatchName] = useState<string>('#GAMELOBBYNAME1234');

  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [matchmakingSettings, setMatchmakingSettings] = useState<IMatchmakingSettings>({
    gameType: '1v1',
    gameMode: 'allPick',
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

  useEffect(() => {
    const userId = user?.user_id;
    if (userId !== undefined) {
      dispatch(loadRecentMatches(userId));
    }
  }, [dispatch, user]);

  const onMainButtonClicked = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.INITIAL_STATE:
        // TODO: connect with api to request a search game based on the matchmaking settings
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
          <div />
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
            title={matchName}
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
        return (
          <div>
            <MatchmakingVersus players={[
              {
                radiant: {
                  player_status: 'match_requested',
                  user_id: 'Swagger'
                },
                dire: {
                  player_status: 'match_requested',
                  user_id: 'Shroud'
                }
              }
            ]}
            />
          </div>
        );
      case MatchmakingFlow.MATCH_END:
        return (
          <div>
            <MatchmakingVersus players={[
              {
                radiant: {
                  player_status: 'match_requested',
                  user_id: 'Swagger',
                  won: true
                },
                dire: {
                  player_status: 'match_requested',
                  user_id: 'Shroud',
                  won: false
                }
              }
            ]}
            />
          </div>
        );
      default:
        return null;
    }
  };


  const renderButtonComponents = () => {
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
              {matchName}
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
    // TODO: delete below lines, and replace with a call to match/match_id api
    if (count == 3) {
      setMatchmakingFlow(MatchmakingFlow.LOBBY_PASSWORD_REQUIRED);
    }
    if (count == 6) {
      setMatchmakingFlow(MatchmakingFlow.MATCH_FOUND_READY);
    }
    if (count == 9) {
      setMatchmakingFlow(MatchmakingFlow.PREPARING_MATCH_LOBBY);
    }
    if (count == 12) {
      setMatchmakingFlow(MatchmakingFlow.SENDING_INVITES);
    }
    if (count == 15) {
      setMatchmakingFlow(MatchmakingFlow.MATCH_IN_PROGRESS);
    }
    if (count == 18) {
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
        {renderButtonComponents()}
      </RightModal>
    </div>
  );
};
export default MatchMaking;
