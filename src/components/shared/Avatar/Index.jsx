import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Avatar.module.css';
import active from '../../../images/icons/active.svg';
import inactive from '../../../images/icons/inactive.svg';

const Avatar = ({ name, icon, online, size }) => {
  return (
    <Link className={styles.container} to={`/users/${name}`}>
      <img
        className={styles.icon}
        src={icon}
        alt={`${name} Avatar`}
        style={{ width: size, height: size }}
      />
      <img
        className={styles.status}
        src={online === true ? active : inactive}
        alt="Status Icon"
      />
    </Link>
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  online: PropTypes.bool,
};

export default Avatar;
