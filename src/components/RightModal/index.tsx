import React from 'react';

import styles from './RightModal.module.css';

interface RightModalProps {
  children?: React.ReactNode;
}

const RightModal = ({ children }: RightModalProps) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.avatar}>
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="user" />
      </div>
      <div className={styles.purple}>
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.7 13.5H3.6V7.65C3.6 5.4 5.4 3.6 7.65 3.6C9.9 3.6 11.7 5.4 11.7 7.65V13.5ZM13.5 12.6V7.65C13.5 4.887 11.574 2.574 9 1.962V1.35C9 0.604416 8.39558 0 7.65 0C6.90442 0 6.3 0.604416 6.3 1.35V1.962C3.717 2.574 1.8 4.887 1.8 7.65V12.6L0 14.4V15.3H15.3V14.4L13.5 12.6ZM7.65 18C8.64411 18 9.45 17.1941 9.45 16.2H5.85C5.85 17.1941 6.65589 18 7.65 18Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
    <div className={styles.content}>{children}</div>
  </div>
);

export default RightModal;
