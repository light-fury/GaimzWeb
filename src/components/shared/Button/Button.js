import React from 'react';

import styles from './Button.module.css';

const Button = ({ className, children, ...props }) => (
  <button {...props} type="button" className={[styles.container, className].join(' ')}>
    {children}
  </button>
);

export default Button;
