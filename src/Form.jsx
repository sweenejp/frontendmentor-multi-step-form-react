import React from 'react';
import Stepper from './lib/components/Stepper';
import styles from './Form.module.css';
import { useFormContext } from './FormProvider';
import PersonalInfo from './lib/components/PersonalInfo';
import Plan from './lib/components/Plan';
import AddOns from './lib/components/AddOns';
import Summary from './lib/components/Summary';
import Confirmation from './lib/components/Confirmation';

const Form = () => {
  const { step, formSubmission } = useFormContext();

  if (formSubmission.status === 'success') {
    return <Confirmation />;
  }

  if (step === 1) {
    return <PersonalInfo />;
  }

  if (step === 2) {
    return <Plan />;
  }

  if (step === 3) {
    return <AddOns />;
  }

  if (step === 4) {
    return <Summary />;
  }
};

export default Form;
