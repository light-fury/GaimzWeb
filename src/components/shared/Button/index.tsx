import React from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  className: string;
  children: JSX.Element[] | JSX.Element | string;
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  className = '',
  children = 'Click Me',
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    {...props}
    type={type}
    className={[styles.container, className].join(' ')}
  >
    {children}
  </button>
);

export default Button;
