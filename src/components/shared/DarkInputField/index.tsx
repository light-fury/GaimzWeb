import React from 'react';
import styles from './DarkInputField.module.css';
import { InputType } from '../InputField';

interface DarkInputFieldProps {
  label: string;
  type: InputType;
  value: string;
  onChange: (val: string) => void;
}

const DarkInputField = (props: DarkInputFieldProps) => (
  <div className={styles.container}>
    {
        props.label
        && (
          <div className={styles.label}>
            {props.label}
          </div>
        )
      }
    <input
      className={styles.input}
      type={props.type}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    />
  </div>
);

export default DarkInputField;
