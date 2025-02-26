import React from 'react';

import styles from './MeatballMenu.module.css';

const MeatballMenu = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    className={styles.meatballMenu}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 13C10.1046 13 11 13.8954 11 15C11 16.1046 10.1046 17 9 17C7.89543 17 7 16.1046 7 15C7 13.8954 7.89543 13 9 13ZM9 7C10.1046 7 11 7.89543 11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7ZM9 1C10.1046 1 11 1.89543 11 3C11 4.10457 10.1046 5 9 5C7.89543 5 7 4.10457 7 3C7 1.89543 7.89543 1 9 1Z"
    />
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="7"
      y="1"
      width="4"
      height="16"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 13C10.1046 13 11 13.8954 11 15C11 16.1046 10.1046 17 9 17C7.89543 17 7 16.1046 7 15C7 13.8954 7.89543 13 9 13ZM9 7C10.1046 7 11 7.89543 11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7ZM9 1C10.1046 1 11 1.89543 11 3C11 4.10457 10.1046 5 9 5C7.89543 5 7 4.10457 7 3C7 1.89543 7.89543 1 9 1Z"
        fill="white"
      />
    </mask>
  </svg>
);

export default MeatballMenu;
