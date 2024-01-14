import React from 'react';
import styles from './RadioButton.module.css';

/** @param {boolean} [selected] */
const createLabelClass = (selected) => {
  if (selected) {
    return `${styles.label} ${styles.selected}`;
  }

  return styles.label;
};

/** @typedef {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} InputAttributes */

/**
 * @typedef PropsI
 * @property {boolean} selected
 * @property {InputAttributes['name']} name
 * @property {InputAttributes['value']} value
 * @property {string} details
 * @property {string} label
 * @property {string} sublabel
 * @property {React.ReactNode} icon
 */

/**
 * @param {PropsI & InputAttributes} props
 */
const RadioButton = ({
  details,
  label,
  name,
  sublabel,
  value,
  icon,
  onChange,
  checked,
}) => {
  // TODO
  const handleKeyDown = () => {};

  return (
    <div
      role="radio"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <label
        className={createLabelClass(checked)}
        style={{ overflow: 'hidden' }}
        // style="overflow: hidden; height: {$heightTweened}px;"
      >
        <div className={styles.container}>
          {icon}
          <div className={styles.labels}>
            <div className={styles['label--main']}>{label}</div>
            <div className={styles['label--sublabel']}>{sublabel}</div>

            {details && (
              <div className={styles['label--details']}>{details}</div>
            )}
            <input
              className={styles.input}
              type="radio"
              name={name}
              value={value}
              checked={checked}
              onChange={onChange}
            />
          </div>
        </div>
      </label>
    </div>
  );
};

export default RadioButton;
