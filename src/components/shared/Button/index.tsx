/* eslint-disable react/jsx-props-no-spreading */
import React, { SyntheticEvent } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  onClick?: (event?: SyntheticEvent) => void;
  className: string;
  children: JSX.Element[] | JSX.Element | string;
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  className = '',
  children = 'Click Me',
  type = 'button',
  onClick = () => {},
  ...props
}: ButtonProps) => (
  <button
    {...props}
    type={type}
    className={[styles.container, className].join(' ')}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
