import React, { useState, SyntheticEvent, CSSProperties } from 'react';

//@ts-ignore
import {isEmail} from 'validator';

import styles from './InputField.module.css';
import valid from 'src/images/icons/validCheck.svg';
import invalid from 'src/images/icons/x.svg';
import showPassword from 'src/images/icons/eye.svg';

export enum InputType {
  Name = 'name',
  Password = 'password',
  Email = 'email',
}

interface InputFieldProps{
  onChange: (event: SyntheticEvent) => void;
  type: InputType,
  style?: CSSProperties,
  label: string,
  name: string,
  value: string
}

const InputField = ({ onChange, type, style, label, name, value }: InputFieldProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (event: SyntheticEvent) => {
    onChange(event);
  };

  const handlePasswordVisible = () => {
    setPasswordVisible((currentPasswordVisible) => !currentPasswordVisible);
  };

  return (
    <div className={styles.container} style={style}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type={
            type === InputType.Password && passwordVisible === false
              ? 'password'
              : 'text'
          }
          name={name}
          value={value}
          onChange={handleChange}
        />
        <div className={styles.validationContainer}>
          {type === InputType.Name && value.length > 0 && value.length < 3 && (
            <img
              className={styles.invalidCheck}
              src={invalid}
              alt="Invalid Check"
            />
          )}
          {type === InputType.Email && value.length > 0 && !isEmail(value) && (
            <img
              className={styles.invalidCheck}
              src={invalid}
              alt="Invalid Check"
            />
          )}
          {type === InputType.Name && value.length > 0 && value.length >= 3 && (
            <img className={styles.validCheck} src={valid} alt="Valid Check" />
          )}
          {type === InputType.Email && value.length > 0 && isEmail(value) && (
            <img className={styles.validCheck} src={valid} alt="Valid Check" />
          )}
          {type === InputType.Password && (
            <img
              className={styles.passwordButton}
              src={showPassword}
              alt="Show Password Button"
              onClick={handlePasswordVisible}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
