import React from 'react';
import { Link } from 'react-router-dom';
import MeatballMenu from '../shared/Icons/MeatballMenu';
import Viewer from '../shared/Icons/Viewer';
import Avatar from '../shared/Avatar';

import styles from './FeedCard.module.css';

// TODO: Let's use a `user` type and get avatar and user from the store
interface FeedCardProps {
  id: string;
  userName: string;
  userAvatar: string;
  title: string;
  gameID: string;
  sourceImg: string;
  viewerCount: string;
  isLive: boolean;
}

const FeedCard = ({
  userName,
  userAvatar,
  title,
  gameID,
  sourceImg,
  viewerCount,
  isLive,
}: FeedCardProps) => (
  <div className={styles.container}>
    <div className={styles.attraction}>
      <Link to={`/stream/${userName}`}>
        <img className={styles.mainImage} src={sourceImg} alt="card" />
        {isLive && (
        <div className={styles.livePill}>
          <p>Live</p>
        </div>
        )}
      </Link>
    </div>
    <div className={styles.detailsContainer}>
      <div className={styles.titleContainer}>
        <div>
          <p className={styles.title}>{title}</p>
        </div>
        <div>
          <MeatballMenu />
        </div>
      </div>
      <div className={styles.metaContainer}>
        <p className={styles.subTitle}>{gameID}</p>
        <div className={styles.viewerContainer}>
          <div className={styles.spacerDot} />
          <Viewer />
          <p className={viewerCount}>{viewerCount}</p>
        </div>
      </div>
      <div className={styles.avatarContainer}>
        <Avatar name={userName} icon={userAvatar} online size="28px" />
        <span className={styles.username}>{userName}</span>
      </div>
    </div>
  </div>
);

export default FeedCard;
