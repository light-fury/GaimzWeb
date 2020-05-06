import React from 'react';

import styles from './Viewer.module.css';

const Viewer = () => {
  return (
    <svg
      className={styles.viewer}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00005 0.777779C8.71827 0.777779 10.1112 2.17067 10.1112 3.88889C10.1112 5.60711 8.71827 7 7.00005 7C5.28183 7 3.88894 5.60711 3.88894 3.88889C3.88894 2.17067 5.28183 0.777779 7.00005 0.777779ZM7.00005 2.33333C6.14094 2.33333 5.4445 3.02978 5.4445 3.88889C5.4445 4.748 6.14094 5.44445 7.00005 5.44445C7.85916 5.44445 8.55561 4.748 8.55561 3.88889C8.55561 3.02978 7.85916 2.33333 7.00005 2.33333ZM7.00005 7.77778C9.07672 7.77778 13.2223 8.81222 13.2223 10.8889V13.2222H0.777832V10.8889C0.777832 8.81222 4.92339 7.77778 7.00005 7.77778ZM7.00008 9.25556C4.69008 9.25556 2.25563 10.3911 2.25563 10.8889V11.7444H11.7445V10.8889C11.7445 10.3911 9.31007 9.25556 7.00008 9.25556Z"
        fill="#FA7267"
      />
    </svg>
  );
};

export default Viewer;
