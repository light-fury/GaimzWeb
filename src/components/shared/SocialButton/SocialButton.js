import React from 'react';

import styles from './SocialButton.module.css';

const SocialButton = (props) => {
  const handleClick = () => {
    props.onClick();
  }

  return (
    <button className={styles.container} style={props.style} onClick={handleClick}>
      <img className={styles.content} src={props.icon} alt={props.iconName} />
    </button>
  );
};

export default SocialButton;