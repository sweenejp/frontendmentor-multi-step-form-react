import React from 'react';
import styles from './Button.module.css';

/** @typedef {React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} ButtonAttributes */

/**
 * @typedef PropsI
 * @property {'primary' | 'secondary' | 'tertiary'} variant
 * @property {boolean} [disabled]
 * @property {boolean} [loading]
 * @property {React.ReactNode} children
 */

/**
 * @param {PropsI & ButtonAttributes} props
 */
const Button = ({ variant, disabled, loading, children, ...rest }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'loading...' : children}
    </button>
  );
};

export default Button;
