import React from 'react';
import styles from './DarkInputField.module.css';
import { InputType } from '../InputField';

interface DarkInputFieldProps {
  label: string;
  type: InputType;
  value: string;
  onChange: (val: string) => void;
}

const DarkInputField = ({ label, type, value, onChange }: DarkInputFieldProps) => (
  <div className={styles.container}>
    {
        label
        && (
          <div className={styles.label}>
            {label}
          </div>
        )
      }
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

export default DarkInputField;
