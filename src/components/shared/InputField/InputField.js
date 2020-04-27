import React from 'react';

import styles from './InputField.module.css';

const InputFeild = (props) => {
  const handleChange = (event) => {
    props.onChange(event);
  }

  return (
    <div className={styles.container} style={props.style}>
      <label className={styles.label}>{props.label}</label>
      <input className={styles.input} type={props.type === 'password' ? 'password' : 'text'} name={props.name} value={props.value} onChange={handleChange} />
    </div>
  );
};

export default InputFeild;