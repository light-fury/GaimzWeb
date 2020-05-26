import React, { SyntheticEvent, CSSProperties } from 'react';

import styles from './SocialButton.module.css';

interface SocialButtonProps{
  onClick: (event?: SyntheticEvent) => void;
  style?: CSSProperties;
  icon: string;
  iconName: string;
}

const SocialButton = ({ onClick, style, icon, iconName }: SocialButtonProps) => {
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

export default SocialButton;
