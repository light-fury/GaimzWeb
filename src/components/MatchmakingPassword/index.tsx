import React, { useState } from 'react';
import styles from './MatchmakingPassword.module.css';
import { InputType } from '../shared/InputField';
import DarkInputField from '../shared/DarkInputField';

const MatchmakingPassword = () => {
  const [password, setPassword] = useState<string>('');

  const onPasswordEnter = () => {

  };

  const onCancel = () => {

  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Enter Password
      </div>
      <DarkInputField
        type={InputType.Password}
        label="PASSWORD"
        value={password}
        onChange={setPassword}
      />
      <div className={styles.centerContainer}>
        <button
          className={styles.passwordButton}
          onClick={onPasswordEnter}
        >
          Enter
        </button>
      </div>
      <div className={styles.centerContainer}>
        <button
          className={styles.cancelButton}
          style={{ marginTop: 20 }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
      <div className={styles.description}>
        You are trying to enter a password protected lobby.
        Please enter the password to queue for the match
      </div>
    </div>
  );
};

export default MatchmakingPassword;
