import React from 'react';
import FormWrapper from './FormWrapper';
import Button from './Button';
import { useFormContext } from '../../FormProvider';
import mockFetch from '../mockFetch';
import Paper from './Paper';
import { billingCycleFull } from '../copyMaps';
import { generatePrice } from './AddOns';
import styles from './Summary.module.css';

const Summary = () => {
  const {
    goToPreviousStep,
    form,
    formSubmission,
    setFormSubmissionStatus,
    setFormSubmissionData,
    setStep,
    selectedPlan,
    selectedAddOns,
  } = useFormContext();

  const handleSubmit = async () => {
    setFormSubmissionStatus('pending');
    const res = await mockFetch(form);
    setFormSubmissionData(res.data);
    setFormSubmissionStatus(res.status);
  };

  return (
    <FormWrapper
      title="Finishing up"
      subtitle="Double-check everything looks OK before confirming."
      formActions={
        <>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={formSubmission.status === 'pending'}
          >
            Confirm
          </Button>
          <Button variant="tertiary" onClick={goToPreviousStep}>
            Go Back
          </Button>
        </>
      }
    >
      <Paper style={{ padding: '24px' }}>
        <div
          className={
            form.addOns.length
              ? `${styles.plan} ${styles['has-add-ons']}`
              : styles['add-ons']
          }
        >
          <p className={styles['plan-value']}>
            {selectedPlan?.displayValue} ({billingCycleFull[form.billingCycle]})
          </p>
          <div className={styles['plan-bottom']}>
            <button
              className={styles['change-plan']}
              onClick={() => setStep(2)}
            >
              Change
            </button>
            <p className={styles['plan-price']}>
              {generatePrice(selectedPlan.billingCycles, form.billingCycle)}
            </p>
          </div>
        </div>
        <div className={styles['add-ons']}>
          {selectedAddOns.map((addOn) => (
            <div className={styles['add-on']} key={addOn.value}>
              <p className={styles['add-on-value']}>{addOn.displayValue}</p>
              <p className={styles['add-on-price']}>
                +{generatePrice(addOn.billingCycles, form.billingCycle)}
              </p>
            </div>
          ))}
        </div>
      </Paper>
    </FormWrapper>
  );
};

export default Summary;
