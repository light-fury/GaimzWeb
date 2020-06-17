import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { RightModal } from 'src/components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import StreamPlayer from 'src/components/StreamPlayer';
import StreamChat from 'src/components/StreamChat';

import { getCurrentStreamer } from 'src/features/feed';

import styles from './UserStream.module.css';

declare let params: any;
const UserStream = () => {
  const dispatch = useDispatch();
  const streamerName = useLocation().pathname.slice(8);
  let StreamerData:any;
  StreamerData = null;
  const { forYouFeedData } = useSelector((s: RootState) => s.feed);
  console.log(forYouFeedData);
  for (let i = 0; i < forYouFeedData.length; i += 1) {
    if (forYouFeedData[i].user_name === streamerName) {
      StreamerData = forYouFeedData[i];
      break;
    }
  }
  // console.log(currentStreamer);
  useEffect(() => {
    dispatch(getCurrentStreamer(StreamerData));
  }, [dispatch, StreamerData]);
  const { currentStreamer } = useSelector((s: RootState) => s.feed);
  console.log('here', currentStreamer);
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
        <StreamChat />
      </RightModal>
    </div>
  );
};

export default UserStream;
