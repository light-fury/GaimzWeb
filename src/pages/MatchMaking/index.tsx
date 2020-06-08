import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RightModal } from 'src/components';
import RecentMatches from 'src/components/RecentMatches';
import { RootState } from 'src/app/rootReducer';
import { loadRecentMatches } from 'src/features/matches';

import dota2Bg from 'src/images/matchmaking/dota2Bg.svg';
import styles from './MatchMaking.module.css';
import MatchmakingSettings from '../../components/MatchmakingSettings';

const MatchMaking = () => {
  const dispatch = useDispatch();

  const [isSettingsClicked, setIsSettingsClicked] = useState(false);

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

  const onFindMatchClick = () => {

  };

  const onSettingsClick = () => {
    setIsSettingsClicked(!isSettingsClicked);
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
        {isSettingsClicked
          ? (
            <>
              <MatchmakingSettings />
              <div className={styles.centerContainer}>
                <div
                  className={styles.matchButton}
                  onClick={onFindMatchClick}
                >
                  Find Match
                </div>
              </div>
            </>
          )
          : (
            <>
              <div className={styles.centerContainer}>
                <img
                  className={styles.dota2Bg}
                  src={dota2Bg}
                  alt="Dota 2 Background"
                />
              </div>
              <div className={styles.centerContainer}>
                <div
                  className={styles.matchButton}
                  onClick={onFindMatchClick}
                >
                  Find Match
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
            </>
          )}
      </RightModal>
    </div>
  );
};
export default MatchMaking;
