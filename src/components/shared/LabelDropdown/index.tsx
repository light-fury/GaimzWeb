import React from 'react';
import styles from './Dropdown.module.css';
import 'react-dropdown/style.css';
import Dropdown, { Option } from 'react-dropdown';

interface LabelDropdownProps {
  label?: string;
  selectedItemValue: string;
  dropdownItems: Option[];
  onSelectValue: (value: string) => void;
}

const LabelDropdown = ({ label, selectedItemValue, dropdownItems, onSelectValue }: LabelDropdownProps) => {
  const onChange = (option: Option) => {
    onSelectValue(option.value);
  };

  return (
    <div className={styles.container}>
      {
        label
        && (
        <div className={styles.label}>
          {label}
        </div>
        )
      }
      <Dropdown
        options={dropdownItems}
        onChange={onChange}
        controlClassName={styles.dropboxClassName}
        value={selectedItemValue}
        placeholder="Select an option"
      />
    </div>
  );
};

export default LabelDropdown;
