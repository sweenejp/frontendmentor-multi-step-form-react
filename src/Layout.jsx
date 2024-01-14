import React from 'react';
import Stepper from './lib/components/Stepper';
import styles from './Layout.module.css';
import { useFormContext } from './FormProvider';

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
const Layout = ({ children }) => {
  const { step } = useFormContext();

  return (
    <div className={styles.flexCenterContainerVert}>
      <div className={styles.container}>
        <Stepper currentStep={step} />
        <div className={styles.contentFlexWrapper}>
          <div className={styles.contentContainer}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
