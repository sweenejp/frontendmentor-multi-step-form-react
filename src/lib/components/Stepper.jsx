import React from 'react';
import styles from './Stepper.module.css';

/** @param {boolean} active */
const createBulletClass = (active) => {
  if (active) {
    return `${styles.bullet} ${styles.active}`;
  }

  return styles.bullet;
};

/**
 * @param {object} props
 * @param {number} props.currentStep
 */
const Stepper = ({ currentStep }) => {
  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <div className={createBulletClass(currentStep === 1)}>1</div>
        <div className={styles.stepText}>
          <div className={styles.label}>Step 1</div>
          <div className={styles.title}>Your Info</div>
        </div>
      </div>
      <div className={styles.step}>
        <div className={createBulletClass(currentStep === 2)}>2</div>
        <div className={styles.stepText}>
          <div className={styles.label}>Step 2</div>
          <div className={styles.title}>Select Plan</div>
        </div>
      </div>
      <div className={styles.step}>
        <div className={createBulletClass(currentStep === 3)}>3</div>
        <div className={styles.stepText}>
          <div className={styles.label}>Step 3</div>
          <div className={styles.title}>Add-ons</div>
        </div>
      </div>
      <div className={styles.step}>
        <div className={createBulletClass(currentStep === 4)}>4</div>
        <div className={styles.stepText}>
          <div className={styles.label}>Step 4</div>
          <div className={styles.title}>Summary</div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
