import React, { useState } from 'react';
import styles from './MatchmakingPassword.module.css';
import { InputType } from '../shared/InputField';
import DarkInputField from '../shared/DarkInputField';

interface MatchmakingPasswordProps {

}

const MatchmakingPassword = ({}: MatchmakingPasswordProps) => {
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
        <div
          className={styles.passwordButton}
          onClick={onPasswordEnter}
        >
          Enter
        </div>
      </div>
      <div className={styles.centerContainer}>
        <div
          className={styles.cancelButton}
          style={{ marginTop: 20 }}
          onClick={onCancel}
        >
          Cancel
        </div>
      </div>
      <div className={styles.description}>
        You are trying to enter a password protected lobby. Please enter the password to queue for the match
      </div>
    </div>
  );
};

export default MatchmakingPassword;
