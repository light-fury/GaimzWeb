import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FeedCard, RightModal } from 'src/components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import { loadFeed } from 'src/features/feed';

import styles from './Feed.module.css';

const Feed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFeed());
  }, [dispatch]);
  const { feedData } = useSelector((s: RootState) => s.feed);
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
          {feedData !== null
            && feedData.map((feedItem) => (
              <FeedCard
                key={`${feedItem.id}`}
                id={feedItem.id}
                userName={feedItem.user.name}
                userAvatar={feedItem.user.icon}
                title={feedItem.title}
                subTitle={feedItem.subTitle}
                sourceImg={feedItem.sourceImg}
                viewerCount={feedItem.viewerCount}
                isLive={feedItem.isLive}
              />
            ))}
        </div>
      </div>
      <RightModal>
        <h1 style={{ color: 'white' }}>Hello there!</h1>
      </RightModal>
    </div>
  );
};

export default Feed;
