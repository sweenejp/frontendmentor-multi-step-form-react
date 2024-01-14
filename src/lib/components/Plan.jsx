import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import ArcadeIcon from './icons/ArcadeIcon';
import AdvancedIcon from './icons/AdvancedIcon';
import ProIcon from './icons/ProIcon';
import Button from './Button';
import Toggle from './Toggle';
import Paper from './Paper';
import { billingCycleAbrevs } from '../copyMaps';
import { useFormContext } from '../../FormProvider';
import RadioButton from './RadioButton';
import styles from './Plan.module.css';

/**
 * @param {object} props
 * @param {'arcade' | 'advanced' | 'pro'} props.plan
 * */
const Icon = ({ plan }) => {
  switch (plan) {
    case 'arcade':
      return <ArcadeIcon />;
    case 'advanced':
      return <AdvancedIcon />;
    case 'pro':
      return <ProIcon />;
    default:
      null;
  }
};

const Plan = () => {
  const { form, setFormValue, plans, goToNextStep, goToPreviousStep } =
    useFormContext();

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleToggleChange = (event) => {
    const {
      target: { checked },
    } = event;

    setFormValue('billingCycle', checked ? 'yearly' : 'monthly');
  };

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;

    setFormValue(name, value);
  };

  return (
    <FormWrapper
      title="Select Your Plan"
      subtitle="You have the option of monthly or yearly billing."
      formActions={
        <>
          <Button variant="secondary" onClick={goToNextStep}>
            Next Step
          </Button>
          <Button variant="tertiary" onClick={goToPreviousStep}>
            Go Back
          </Button>
        </>
      }
    >
      <div>
        <fieldset className={styles.fieldset}>
          {plans.map((plan) => (
            <RadioButton
              key={plan.value}
              label={plan.displayValue}
              name="plan"
              value={plan.value}
              checked={plan.value === form.plan}
              onChange={handleChange}
              sublabel={`$${plan.billingCycles[form.billingCycle].price}/${
                billingCycleAbrevs[form.billingCycle]
              }`}
              details={
                plan.billingCycles[form.billingCycle].monthsFree
                  ? `${
                      plan.billingCycles[form.billingCycle].monthsFree
                    } months free`
                  : ''
              }
              selected={form.plan === plan.value}
              icon={
                <Icon
                  // @ts-ignore
                  plan={plan.value}
                />
              }
            />
          ))}
        </fieldset>
        <Paper
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Toggle
            checked={form.billingCycle === 'yearly'}
            name="isYearly"
            checkedLabel="Yearly"
            uncheckedLabel="Montly"
            onChange={handleToggleChange}
          />
        </Paper>
      </div>
    </FormWrapper>
  );
};

export default Plan;
