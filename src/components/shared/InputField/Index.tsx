import React, { useState, SyntheticEvent, CSSProperties } from 'react';
import PropTypes from 'prop-types';
//@ts-ignore
import { isEmail } from 'validator';

import styles from './InputField.module.css';
import valid from '../../../images/icons/validCheck.svg';
import invalid from '../../../images/icons/x.svg';
import showPassword from '../../../images/icons/eye.svg';

// TODO: String values to allow for incremental migrations
enum Type {
  Name = 'name',
  Password = 'password',
  Email = 'email',
}

interface PropTypes {
  onChange: (...args: any[]) => void;
  type: Type;
  // TODO: Confirm object shape
  style?: CSSProperties;
  label: string;
  name: string;
  value: string;
}

const InputField = ({
  onChange,
  type,
  style,
  label,
  name,
  value,
}: PropTypes) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (event: SyntheticEvent): void => {
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
            type === Type.Password && passwordVisible === false
              ? 'password'
              : 'text'
          }
          name={name}
          value={value}
          onChange={handleChange}
        />
        <div className={styles.validationContainer}>
          {type === Type.Name && value.length > 0 && value.length < 3 && (
            <img
              className={styles.invalidCheck}
              src={invalid}
              alt="Invalid Check"
            />
          )}
          {type === Type.Email && value.length > 0 && !isEmail(value) && (
            <img
              className={styles.invalidCheck}
              src={invalid}
              alt="Invalid Check"
            />
          )}
          {type === Type.Name && value.length > 0 && value.length >= 3 && (
            <img className={styles.validCheck} src={valid} alt="Valid Check" />
          )}
          {type === Type.Email && value.length > 0 && isEmail(value) && (
            <img className={styles.validCheck} src={valid} alt="Valid Check" />
          )}
          {type === Type.Password && (
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
