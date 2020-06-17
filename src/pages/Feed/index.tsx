import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FeedCard, RightModal, Connections } from 'src/components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import { loadFeed, loadForYouFeed } from 'src/features/feed';

import ForYouFeedCard from '../../components/ForYouFeedCard/index';

import styles from './Feed.module.css';

const Feed = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s: RootState) => s.authentication);
  useEffect(() => {
    dispatch(loadFeed());
    dispatch(loadForYouFeed(user));
  }, [dispatch, user]);
  const { feedData } = useSelector((s: RootState) => s.feed);
  const { forYouFeedData } = useSelector((s: RootState) => s.feed);
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
        <Connections />
      </div>
      <RightModal>
        <h1 style={{ color: 'white' }}>For you</h1>
        <div className={styles.row}>
          {forYouFeedData !== null
            && forYouFeedData.map((feedItem) => (
              <Link to={`/stream/${feedItem.user_name}`}>
                <ForYouFeedCard
                  key={`${feedItem.user_id}`}
                  id={feedItem.user_id}
                  userName={feedItem.user_name}
                  userAvatar={feedItem.user_avatar_url}
                  sourceImg={feedItem.twitch_thumbnail_url}
                  isLive={feedItem.twitch_account_name}
                />
              </Link>
            ))}
        </div>
        <span>
          <button className={styles.seeMoreBtn}>
            Show more
          </button>
        </span>
      </RightModal>

    </div>
  );
};

export default Feed;
