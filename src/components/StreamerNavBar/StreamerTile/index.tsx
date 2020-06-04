import React, { Fragment } from 'react';

import { Avatar } from 'src/components';

import check from 'src/images/icons/check.svg';
import x from 'src/images/icons/x.svg';
import styles from './StreamerTile.module.css';

interface StreamerTileProps {
  id: string;
  name: string;
  icon: string;
  following: boolean;
  subscribed: boolean;
  online: boolean;
  collapsed: boolean;
  handleFollow?: (id: string, name: string, currentFollowing: boolean) => void;
  handleSubscribe?: (
    id: string,
    name: string,
    currentSubscribed: boolean
  ) => void;
}

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
}: StreamerTileProps) => (
  <Fragment>
    {collapsed ? (
      <Avatar key={id} name={name} icon={icon} online={online} size="40px" />
    ) : (
      <div className={styles.rowExpanded}>
        <div
          className={[styles.cellExpanded, styles.cellNameExpanded].join(' ')}
        >
          <Avatar
            key={id}
            name={name}
            icon={icon}
            online={online}
            size="40px"
          />
          <span className={styles.nameExpanded}>{name}</span>
        </div>
        <div
          className={[styles.cellExpanded, styles.cellFollowingExpanded].join(
            ' '
          )}
        >
          <button
            className={following ? styles.checkButton : styles.xButton}
            onClick={() => handleFollow?.(id, name, following)}
          >
            {following ? (
              <img
                className={styles.checkIcon}
                src={check}
                alt="Following Icon"
              />
            ) : (
              <img className={styles.xIcon} src={x} alt="Not Following Icon" />
            )}
          </button>
        </div>
        <div
          className={[styles.cellExpanded, styles.cellSubscribedExpanded].join(
            ' '
          )}
        >
          <button
            className={subscribed ? styles.checkButton : styles.xButton}
            onClick={() => handleSubscribe?.(id, name, subscribed)}
          >
            {subscribed ? (
              <img
                className={styles.checkIcon}
                src={check}
                alt="Subscribed Icon"
              />
            ) : (
              <img className={styles.xIcon} src={x} alt="Not Subscribed Icon" />
            )}
          </button>
        </div>
      </div>
    )}
  </Fragment>
);

StreamerTile.propTypes = {};

export default StreamerTile;
