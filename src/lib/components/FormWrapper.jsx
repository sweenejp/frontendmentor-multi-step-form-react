import React from 'react';
import styles from './FormWrapper.module.css';

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} props.formActions
 * @param {string} props.subtitle
 * @param {string} props.title
 */
const FormWrapper = ({ title, subtitle, formActions, children }) => {
  return (
    <>
      <div className={styles.contentTop}>
        <h1 className={styles.h1}>{title}</h1>
        <h2 className={styles.h2}>{subtitle}</h2>
      </div>
      <form className={styles.contentBottom}>
        {children}
        <div className={styles.formActions}>{formActions}</div>
      </form>
    </>
  );
};

export default FormWrapper;
