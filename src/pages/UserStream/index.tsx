import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { RightModal } from 'src/components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import StreamPlayer from 'src/components/StreamPlayer';
import StreamChat from 'src/components/StreamChat';

import { getCurrentStreamer } from 'src/features/feed';

import styles from './UserStream.module.css';

const UserStream = () => {
  const dispatch = useDispatch();
  const { user } = useParams();
  let StreamerData: any;
  const { forYouFeedData } = useSelector((s: RootState) => s.feed);
  const { feedData } = useSelector((s: RootState) => s.feed);
  if (forYouFeedData.find((feed) => feed.user_name === user)) {
    StreamerData = forYouFeedData.find((feed) => feed.user_name === user);
  } else if (feedData.find((feed) => feed.user_name === user)) {
    StreamerData = feedData.find((feed) => feed.user_name === user);
  }

  useEffect(() => {
    dispatch(getCurrentStreamer(StreamerData));
  }, [dispatch, StreamerData]);
  const { currentStreamer } = useSelector((s: RootState) => s.feed);
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
          {currentStreamer
          && (
            <StreamPlayer
              key={`${currentStreamer!.user_id}`}
              id={currentStreamer!.user_id}
              userName={currentStreamer!.user_name}
              userAvatar={currentStreamer!.user_avatar_url}
              sourceImg={currentStreamer!.twitch_thumbnail_url}
              isLive={currentStreamer!.twitch_account_name}
            />
          )}
        </div>
      </div>
      <RightModal>
        <h1 style={{ color: 'white' }}>Chat</h1>
        {currentStreamer
          && (
            <StreamChat
              key={`${currentStreamer!.user_id}`}
              id={currentStreamer!.user_id}
              userName={currentStreamer!.user_name}
              userAvatar={currentStreamer!.user_avatar_url}
              sourceImg={currentStreamer!.twitch_thumbnail_url}
              isLive={currentStreamer!.twitch_account_name}
            />
          )}
      </RightModal>
    </div>
  );
};

export default UserStream;
