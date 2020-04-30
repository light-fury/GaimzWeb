import React from 'react';

import styles from './Button.module.css';

const Button = ({ className, children, type, ...props }) => (
  <button
    {...props}
    type={type}
    className={[styles.container, className].join(' ')}
  >
    {children}
  </button>
);

export default Button;
