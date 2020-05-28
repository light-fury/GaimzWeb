import React from 'react';

import styles from './RightModal.module.css';

interface RightModalProps {
  children?: React.ReactNode;
}

const RightModal = ({ children }: RightModalProps) => (
  <div className={styles.container}>{children}</div>
);

export default RightModal;
