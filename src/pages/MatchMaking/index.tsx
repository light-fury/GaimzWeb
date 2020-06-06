import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RightModal } from 'src/components';
import RecentMatches from 'src/components/RecentMatches';
import { RootState } from 'src/app/rootReducer';
import { loadRecentMatches } from 'src/features/matches';

import styles from './MatchMaking.module.css';

const MatchMaking = () => {
  const dispatch = useDispatch();
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
        <h1 style={{ color: 'white' }}>Hello there!</h1>
      </RightModal>
    </div>
  );
};
export default MatchMaking;
