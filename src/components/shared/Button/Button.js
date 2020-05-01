import React from 'react';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
};

export default Button;
