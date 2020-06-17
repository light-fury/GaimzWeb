import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { RightModal } from 'src/components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import StreamPlayer from 'src/components/StreamPlayer';
import StreamChat from 'src/components/StreamChat';

import styles from './UserStream.module.css';

const UserStream = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s: RootState) => s.authentication);
  useEffect(() => {
    console.log('hello');
  }, [dispatch, user]);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.topNavBar}>
          <div className={[styles.topNavBarItem, styles.active].join(' ')}>
            <span>Discover</span>
            <div className={styles.dot} />
          </div>
          <div className={[styles.topNavBarItem, styles.inactive].join(' ')}>
            <Link to="/matches">Matchmaking</Link>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <span className={styles.title}>Live Streams</span>
        </div>
        <div className={styles.contentContainer}>
          <StreamPlayer />
        </div>
      </div>
      <RightModal>
        <h1 style={{ color: 'white' }}>Chat</h1>
        <StreamChat />
      </RightModal>
    </div>
  );
};

export default UserStream;
