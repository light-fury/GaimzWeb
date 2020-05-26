import React from 'react';

import { FeedCard, RightModal } from 'src/components';
import { feedData } from 'src/utils/dummyData';

import styles from './Feed.module.css';



const Feed = () => (
  <div className={styles.pageContainer}>
    <div className={styles.feedContainer}>
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
      <div className={styles.streamContainer}>
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
    <RightModal />
  </div>
);

export default Feed;
