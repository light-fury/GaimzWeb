import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Avatar from '../../shared/Avatar/Avatar';

import styles from './StreamerTile.module.css';
import check from '../../../images/icons/check.svg';
import x from '../../../images/icons/x.svg';

const StreamerTile = ({
  id,
  name,
  icon,
  following,
  subscribed,
  online,
  collapsed,
  handleFollow,
  handleSubscribe,
}) => {
  return (
    <Fragment>
      {collapsed ? (
        <Avatar key={id} name={name} icon={icon} online={online} />
      ) : (
        <div className={styles.rowExpanded}>
          <div
            className={[styles.cellExpanded, styles.cellNameExpanded].join(' ')}
          >
            <Avatar key={id} name={name} icon={icon} online={online} />
            <span className={styles.nameExpanded}>{name}</span>
          </div>
          <div
            className={[styles.cellExpanded, styles.cellFollowingExpanded].join(
              ' '
            )}
          >
            <div
              className={following ? styles.checkButton : styles.xButton}
              onClick={() => handleFollow(id, name, following)}
            >
              {following ? (
                <img
                  className={styles.checkIcon}
                  src={check}
                  alt="Following Icon"
                />
              ) : (
                <img
                  className={styles.xIcon}
                  src={x}
                  alt="Not Following Icon"
                />
              )}
            </div>
          </div>
          <div
            className={[
              styles.cellExpanded,
              styles.cellSubscribedExpanded,
            ].join(' ')}
          >
            <div
              className={subscribed ? styles.checkButton : styles.xButton}
              onClick={() => handleSubscribe(id, name, subscribed)}
            >
              {subscribed ? (
                <img
                  className={styles.checkIcon}
                  src={check}
                  alt="Subscribed Icon"
                />
              ) : (
                <img
                  className={styles.xIcon}
                  src={x}
                  alt="Not Subscribed Icon"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

StreamerTile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  following: PropTypes.bool,
  subscribed: PropTypes.bool,
  online: PropTypes.bool,
  collapsed: PropTypes.bool,
};

export default StreamerTile;
