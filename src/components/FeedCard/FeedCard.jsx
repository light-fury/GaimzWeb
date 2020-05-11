import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MeatballMenu from '../shared/Icons/MeatballMenu';
import Viewer from '../shared/Icons/Viewer';

import styles from './FeedCard.module.css';

const FeedCard = ({
  sourceImg,
  isLive,
  title,
  subTitle,
  viewerCount,
  avatarUrl,
  userName,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.attraction}>
        <img className={styles.mainImage} src={sourceImg} alt="card" />
        {isLive && (
          <div className={styles.livePill}>
            <p>Live</p>
          </div>
        )}
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
          <p className={styles.subTitle}>{subTitle}</p>
          <div className={styles.viewerContainer}>
            <div className={styles.spacerDot} />
            <Viewer />
            <p className={viewerCount}>{viewerCount}</p>
          </div>
        </div>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatarSmall}
            src={avatarUrl}
            alt="user avatar"
          />
          <p>{userName}</p>
        </div>
      </div>
    </div>
  );
};

// TODO: Let's use a `user` type and get avatar and user from the store
FeedCard.propTypes = {
  sourceImg: PropTypes.string.isRequired,
  isLive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  viewerCount: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

// TODO: To be filled out when above changes
const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);
