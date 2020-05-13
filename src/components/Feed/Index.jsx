import React from 'react';

import FeedCard from '../FeedCard/Index';

import styles from './Feed.module.css';

import { feedData } from '../utils/dummyData';

const Feed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.feedNavBar}>
        <div className={[styles.feedNavBarItem, styles.active].join(' ')}>
          <span>Discover</span>
          <div className={styles.dot} />
        </div>
        <div className={[styles.feedNavBarItem, styles.inactive].join(' ')}>
          <span>Matchmaking</span>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Live Streams</span>
      </div>
      <div className={styles.feedContainer}>
        {feedData !== null &&
          feedData.map((feedItem, index) => (
            <FeedCard
              key={`${index}-${feedItem.id}`}
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
  );
};

export default Feed;
