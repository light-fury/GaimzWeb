import React, { useState } from 'react';
import { isEmail } from 'validator';

import styles from './InputField.module.css';
import valid from '../../../images/icons/check.svg';
import invalid from '../../../images/icons/x.svg';
import showPassword from '../../../images/icons/eye.svg';

const InputFeild = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (event) => {
    props.onChange(event);
  }

  const handlePasswordVisible = () => {
    setPasswordVisible((currentPasswordVisible) => !currentPasswordVisible);
  }

  return (
    <div className={styles.container} style={props.style}>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.inputContainer}>
        <input className={styles.input} type={props.type === 'password' && passwordVisible === false ? 'password' : 'text'} name={props.name} value={props.value} onChange={handleChange} />
        <div className={styles.validationContainer}>
          {props.type === 'email' && props.value.length > 0 && !isEmail(props.value) && (
            <img className={styles.invalidCheck} src={invalid} alt='Invalid Check' />
          )}
          {props.type === 'email' && props.value.length > 0 && isEmail(props.value) && (
            <img className={styles.validCheck} src={valid} alt='Valid Check' />
          )}
          {props.type === 'password' && (
            <img className={styles.passwordButton} src={showPassword} alt='Show Password Button' onClick={handlePasswordVisible} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputFeild;
