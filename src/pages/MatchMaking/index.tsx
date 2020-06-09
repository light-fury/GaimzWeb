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

enum MatchmakingFlow {
  FIND_MATCH = 'FIND_MATCH',
  SEARCHING_GAME = 'SEARCHING_GAME',
  PASSWORD_REQUIRED = 'PASSWORD_REQUIRED',
  READY = 'READY',
  PREPARING_LOBBY = 'PREPARING_LOBBY',
  SENDING_INVITES = 'SENDING_INVITES',
  MATCH_IN_PROGRESS = 'MATCH_IN_PROGRESS',
  MATCH_END = 'MATCH_END'
}

const MatchMaking = () => {
  let timer: any;
  const dispatch = useDispatch();

  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [matchmakingSettings, setMatchmakingSettings] = useState<IMatchmakingSettings>({
    gameType: '1v1',
    gameMode: 'allPick',
    region: 'auto',
    streamer: 'streamer1',
    streamerOption: 'subscribers'
  });
  const [matchmakingFlow, setMatchmakingFlow] = useState<MatchmakingFlow>(MatchmakingFlow.FIND_MATCH);
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
    // TODO: connect with api to request a search game based on the matchmaking settings
    switch (matchmakingFlow) {
      case MatchmakingFlow.FIND_MATCH:
        startCounting();
        setMatchmakingFlow(MatchmakingFlow.SEARCHING_GAME);
        break;
      case MatchmakingFlow.SEARCHING_GAME:
        window.location.reload();
        break;
    }
  };

  const onAcceptMatchmaking = () => {
    // TODO: Call accept matchmaking api
  };

  const onCancelMatchmakingClicked = () => {
    // TODO: Call cancel matchmaking api, get banned probably
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
      case MatchmakingFlow.SEARCHING_GAME:
        return 'Cancel';
      case MatchmakingFlow.READY:
        return 'Accept';
      default:
        return 'Find Match';
    }
  };

  const renderMatchmakingFlowComponent = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.FIND_MATCH:
        return (
          <div className={styles.centerContainer}>
            <img
              className={styles.dota2Bg}
              src={dota2Bg}
              alt="Dota 2 Background"
            />
          </div>
        );
      case MatchmakingFlow.SEARCHING_GAME:
        return (
          <FindingMatchmaking
            title="Finding Match..."
            progress={20}
            circularButtonCenterText={`${elapsedTime} seconds`}
            description="Double click the timer to hide the search and explore Gaimz. We will notify you when the match is found."
          />
        );
      case MatchmakingFlow.READY:
        return (
          <FindingMatchmaking
            title="Your match is ready"
            progress={40}
            circularButtonCenterText={`${elapsedTime} seconds`}
            description="Failing to accept may result in a temporary match ban."
          />
        );
      case MatchmakingFlow.PREPARING_LOBBY:
        return (
          <FindingMatchmaking
            title="#GAMELOBBYNAME1234"
            progress={60}
            circularButtonCenterText="Gaimz Bot Preparing Lobby"
          />
        );
      case MatchmakingFlow.SENDING_INVITES:
        return (
          <FindingMatchmaking
            title="#GAMELOBBYNAME1234"
            progress={60}
            circularButtonCenterText="Gaimz Bot Sending Invites"
          />
        );
      case MatchmakingFlow.PASSWORD_REQUIRED:
        return (
          <MatchmakingPassword />
        );
      default:
        return null;
    }
  };


  const renderButtonComponents = () => {
    switch (matchmakingFlow) {
      case MatchmakingFlow.READY:
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
      case MatchmakingFlow.SEARCHING_GAME:
      case MatchmakingFlow.FIND_MATCH:
      case MatchmakingFlow.PASSWORD_REQUIRED:
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
      case MatchmakingFlow.PREPARING_LOBBY:
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
      default:
        return null;
    }
  };

  const startCounting = () => {
    setTimeout(() => runElapsedTimeCounter(elapsedTime), 1000);
  };

  const runElapsedTimeCounter = (count: number) => {
    count++;
    setElapsedTime(count);
    timer = setTimeout(() => runElapsedTimeCounter(count), 1000);
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
        <div className={styles.titleContainer}>
          <span className={styles.title}>Recent Matches</span>
        </div>
        <div className={styles.contentContainer}>
          {recentMatchesData !== null && (
            <RecentMatches recentMatchesData={recentMatchesData} />
          )}
        </div>
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
                {renderMatchmakingFlowComponent()}
              </>
            )
        }
        {renderButtonComponents()}
      </RightModal>
    </div>
  );
};
export default MatchMaking;
