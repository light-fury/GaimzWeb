import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmail } from 'validator';

import styles from './InputField.module.css';
import valid from '../../../images/icons/validCheck.svg';
import invalid from '../../../images/icons/x.svg';
import showPassword from '../../../images/icons/eye.svg';

const InputField = ({ onChange, type, style, label, name, value }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (event) => {
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
            type === 'password' && passwordVisible === false
              ? 'password'
              : 'text'
          }
          name={name}
          value={value}
          onChange={handleChange}
        />
        <div className={styles.validationContainer}>
          {type === 'name' && value.length > 0 && value.length < 3 && (
            <img
              className={styles.invalidCheck}
              src={invalid}
              alt="Invalid Check"
            />
          )}
          {type === 'email' && value.length > 0 && !isEmail(value) && (
            <img
              className={styles.invalidCheck}
              src={invalid}
              alt="Invalid Check"
            />
          )}
          {type === 'name' && value.length > 0 && value.length >= 3 && (
            <img className={styles.validCheck} src={valid} alt="Valid Check" />
          )}
          {type === 'email' && value.length > 0 && isEmail(value) && (
            <img className={styles.validCheck} src={valid} alt="Valid Check" />
          )}
          {type === 'password' && (
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

InputField.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

export default InputField;
