import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../../shared/Button/Button';
import Avatar from '../../shared/Avatar/Avatar';

import styles from './StreamerTile.module.css';
import active from '../../../images/icons/active.svg';
import inactive from '../../../images/icons/inactive.svg';
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
}) => {
  return (
    <Fragment>
      {collapsed ? (
        <Avatar key={id} name={name} icon={icon} online={online} />
      ) : (
        <tr className={styles.tableRowExpanded}>
          <td className={styles.tableNameCellExpanded}>
            <Avatar key={id} name={name} icon={icon} online={online} />
            <span className={styles.tableNameCellTextExpanded}>{name}</span>
          </td>
          <td className={styles.tableFollowingCellExpanded}>
            <div className={following ? styles.checkButton : styles.xButton}>
              {following ? (
                <img className={styles.checkIcon} src={check} />
              ) : (
                <img className={styles.xIcon} src={x} />
              )}
            </div>
          </td>
          <td className={styles.tableSubscribedCellExpanded}>
            <div className={subscribed ? styles.checkButton : styles.xButton}>
              {subscribed ? (
                <img className={styles.checkIcon} src={check} />
              ) : (
                <img className={styles.xIcon} src={x} />
              )}
            </div>
          </td>
        </tr>
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
