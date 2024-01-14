import React, { useRef, useState } from 'react';
import styles from './Checkbox.module.css';

/** @param {boolean} [selected] */
const createLabelClass = (selected) => {
  if (selected) {
    return `${styles.label} ${styles.selected}`;
  }

  return styles.label;
};

/**
 * @typedef Checkbox
 * @property {string} label
 * @property {string} sublabel
 * @property {string} details
 * @property {string} value
 * */

/**
 * @param {object} props
 * @param {Checkbox[]} props.checkboxes
 * @param {string[]} props.selectedValue
 * @param {(value: string[]) => void} props.onChange
 */
const CheckboxGroup = ({ checkboxes, selectedValue, onChange }) => {
  const [groupValue, setGroupValue] = useState(selectedValue);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChange = (event) => {
    const {
      target: {
        checked,
        value,
        dataset: { index },
      },
    } = event;

    if (!index) return;

    if (checked) {
      const newGroupValue = [...groupValue];
      newGroupValue.splice(Number(index), 0, value);
      setGroupValue(newGroupValue);
      onChange(newGroupValue);
    } else {
      const newGroupValue = groupValue.filter((val) => val !== value);
      setGroupValue(newGroupValue);
      onChange(newGroupValue);
    }
  };

  return checkboxes.map((checkbox, index) => (
    <label
      key={checkbox.value}
      className={createLabelClass(selectedValue.includes(checkbox.value))}
    >
      <input
        data-index={index}
        className={styles.input}
        type="checkbox"
        value={checkbox.value}
        onChange={handleChange}
        checked={selectedValue.includes(checkbox.value)}
      />
      <div className={styles.labels}>
        <div className={styles.left}>
          <div className={styles['label--main']}>{checkbox.label}</div>
          <div className={styles['label--details']}>{checkbox.details}</div>
        </div>
        <div className={styles['label--sublabel']}>{checkbox.sublabel}</div>
      </div>
    </label>
  ));
};

export default CheckboxGroup;
