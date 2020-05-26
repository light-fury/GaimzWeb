import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

interface ButtonProps{
  className: string;
  children: JSX.Element[] | JSX.Element | string,
  type: "button" | "submit" | "reset" | undefined;
}

const Button = ({ className, children, type, ...props }: ButtonProps) => (
  <button
    {...props}
    type={type}
    className={[styles.container, className].join(' ')}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string
};

export default Button;
