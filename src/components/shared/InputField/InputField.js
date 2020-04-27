import React from 'react';
import { isEmail } from 'validator';

import styles from './InputField.module.css';
import validCheck from '../../../images/validCheck.svg';

const InputFeild = (props) => {
  const handleChange = (event) => {
    props.onChange(event);
  }

  return (
    <div className={styles.container} style={props.style}>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.inputContainer}>
        <input className={styles.input} type={props.type === 'password' ? 'password' : 'text'} name={props.name} value={props.value} onChange={handleChange} />
        <div className={styles.validContainer}>
          {props.type === 'email' && isEmail(props.value) && <img className={styles.validCheck} src={validCheck} alt='Validation Check' /> }
          {props.type === 'password' && props.value.length >= 8 && <img className={styles.validCheck} src={validCheck} alt='Validation Check' /> }
        </div>
      </div>
    </div>
  );
};

export default InputFeild;