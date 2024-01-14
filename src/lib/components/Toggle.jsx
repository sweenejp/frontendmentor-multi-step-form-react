import React from 'react';
import styles from './Toggle.module.css';

/**
 * @param {object} props
 * @param {boolean} props.checked
 * @param {string} props.name
 * @param {string} props.uncheckedLabel
 * @param {string} props.checkedLabel
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.onChange
 */
const Toggle = ({ checked, name, uncheckedLabel, checkedLabel, onChange }) => {
  // TODO
  /** @type {React.KeyboardEventHandler<HTMLDivElement>} */
  function handleKeyDown(event) {
    if (event.key === ' ') {
      checked = !checked;
    }
  }

  return (
    <label className={styles.label}>
      <span>{uncheckedLabel}</span>
      <div
        className={styles.outer}
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div
          className={
            checked ? `${styles.inner} ${styles.checked}` : `${styles.inner}`
          }
        />
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        className={styles.input}
      />
      <span>{checkedLabel}</span>
    </label>
  );
};

export default Toggle;
