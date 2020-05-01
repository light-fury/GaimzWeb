import React from 'react';
import PropTypes from 'prop-types';

import styles from './SocialButton.module.css';

const SocialButton = ({ onClick, style, icon, iconName }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className={styles.container}
      style={style}
      type="button"
      onClick={handleClick}
    >
      <img className={styles.content} src={icon} alt={iconName} />
    </button>
  );
};

SocialButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.string,
  iconName: PropTypes.string,
};

export default SocialButton;
