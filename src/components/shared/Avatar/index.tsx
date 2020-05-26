import React from 'react';
import { Link } from 'react-router-dom';

import active from 'src/images/icons/active.svg';
import inactive from 'src/images/icons/inactive.svg';
import styles from './Avatar.module.css';


interface AvatarProps{
  name: string;
  icon: string;
  online: boolean;
  size: string;
}

const Avatar = ({ name, icon, online, size }: AvatarProps) => (
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

export default Avatar;
