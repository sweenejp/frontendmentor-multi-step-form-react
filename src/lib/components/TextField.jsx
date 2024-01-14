import React, { forwardRef, useEffect, useState } from 'react';
import hasError from '../hasError';
import * as styles from './TextField.module.css';
// NOTE: requires vscode extension for intellisense of css modules

/** @typedef {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} InputAttributes */

/**
 * @typedef PropsI
 * @property {string} label
 * @property {string | null} [error]
 */

const TextField = forwardRef(
  /**
   * @param {PropsI & InputAttributes} props
   */
  function TextField(props, ref) {
    const { label, error: errorProp, ...rest } = props;
    const { onBlur, onChange } = rest;
    const [error, setError] = useState(errorProp);

    useEffect(() => {
      if (errorProp) {
        setError(errorProp);
      }
    }, [errorProp]);

    /** @param {React.ChangeEvent<HTMLInputElement>} event */
    function handleChange(event) {
      if (!event.target || !(event.target instanceof HTMLInputElement)) {
        return;
      }

      if (onChange) {
        onChange(event);
      }

      // validate on input change only if there is an existing error
      if (!error) {
        return;
      }

      // @ts-ignore
      setError(hasError(event.target));
    }

    /** @param {React.FocusEvent<HTMLInputElement, Element>} event */
    function handleBlur(event) {
      if (!event.target || !(event.target instanceof HTMLInputElement)) {
        return;
      }

      if (onBlur) {
        onBlur(event);
      }

      // @ts-ignore
      setError(hasError(event.target));
    }

    return (
      <label className={styles.label}>
        <div className={styles.labelText}>
          {label}
          {error && <strong className={styles.errorMessage}>{error}</strong>}
        </div>
        <input
          {...rest}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={ref}
          className={styles.input}
        />
      </label>
    );
  }
);

export default TextField;
