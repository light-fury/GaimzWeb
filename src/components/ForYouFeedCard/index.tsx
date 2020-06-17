import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../shared/Avatar';

import styles from './ForYouFeedCard.module.css';

interface ForYouFeedCardProps {
  id: string;
  userName: string;
  userAvatar: string;
  sourceImg: string;
  isLive: boolean;
}


const ForYouFeedCard = ({
  userName,
  userAvatar,
  sourceImg,
  isLive,
}: ForYouFeedCardProps) => (
  <div className={styles.attraction} style={{ backgroundImage: `url(${sourceImg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
    <div className={styles.avatarContainer}>
      <Avatar name={userName} icon={userAvatar} online size="28px" />
      <Link to={`/stream/${userName}`}>
        <span className={styles.username}>{userName}</span>
      </Link>
    </div>
    {isLive && (
      <div className={styles.livePill}>
        <p>Live</p>
      </div>
    )}
  </div>
);

export default ForYouFeedCard;
