import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {RightModal} from 'src/components';
import RecentMatches from 'src/components/RecentMatches';
import {RootState} from 'src/app/rootReducer';
import {loadRecentMatches} from 'src/features/matches';

import dota2Bg from 'src/images/matchmaking/dota2Bg.svg';
import styles from './MatchMaking.module.css';
import MatchmakingSettings, {IMatchmakingSettings} from "../../components/MatchmakingSettings";
import FindingMatchmaking from "../../components/FindingMatchmaking";

enum MatchmakingFlow {
  FIND_MATCH = "FIND_MATCH",
  SEARCHING_GAME = "SEARCHING_GAME",
  PASSWORD_REQUIRED = "PASSWORD_REQUIRED",
  READY = "READY",
  PREPARING_LOBBY = "PREPARING_LOBBY",
  SENDING_INVITES = "SENDING_INVITES",
  MATCH_IN_PROGRESS = "MATCH_IN_PROGRESS",
  MATCH_END = "MATCH_END"
}

const MatchMaking = () => {
  const dispatch = useDispatch();

  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [matchmakingSettings, setMatchmakingSettings] = useState<IMatchmakingSettings>({
    gameType: "1v1",
    gameMode: "allPick",
    region: "auto",
    streamer: "streamer1",
    streamerOption: "subscribers"
  });
  const [matchmakingFlow, setMatchmakingFlow] = useState<MatchmakingFlow>(MatchmakingFlow.FIND_MATCH);

  const {recentMatchesData, user} = useSelector(
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

  const onFindMatchClick = () => {
    // TODO: connect with api to request a search game based on the matchmaking settings
    setMatchmakingFlow(MatchmakingFlow.SEARCHING_GAME);
  };

  const onSettingsClick = () => {
    setIsSettingsClicked(!isSettingsClicked);
  };

  const getButtonText = () => {
    switch(matchmakingFlow) {
      case MatchmakingFlow.SEARCHING_GAME:
        return "Cancel";
      default:
        return "Find Match";
    }
  }

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
          <FindingMatchmaking/>
        );
      default:
        return null;
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.topNavBar}>
          <div className={[styles.topNavBarItem, styles.inactive].join(' ')}>
            <Link to="/feed">Discover</Link>
          </div>
          <div className={[styles.topNavBarItem, styles.active].join(' ')}>
            <span>Matchmaking</span>
            <div className={styles.dot}/>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <span className={styles.title}>Recent Matches</span>
        </div>
        <div className={styles.contentContainer}>
          {recentMatchesData !== null && (
            <RecentMatches recentMatchesData={recentMatchesData}/>
          )}
        </div>
      </div>
      <RightModal>
        {
          isSettingsClicked
            ? <MatchmakingSettings matchmakingSettings={matchmakingSettings}
                                   onChangeMatchmakingSettings={setMatchmakingSettings}/>
            :
            <>
              {renderMatchmakingFlowComponent()}
            </>
        }
        <div className={styles.centerContainer}>
          <div
            className={styles.matchButton}
            onClick={onFindMatchClick}
          >
            {getButtonText()}
          </div>
        </div>
        <div className={styles.centerContainer}>
          <div
            className={styles.settingsButton}
            onClick={onSettingsClick}
          >
            Settings
          </div>
        </div>
      </RightModal>
    </div>
  );
};
export default MatchMaking;
