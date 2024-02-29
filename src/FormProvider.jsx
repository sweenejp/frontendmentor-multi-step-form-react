import React, { useState, useContext, createContext } from 'react';
import plans from './mockdata/plans.json';
import addOns from './mockdata/addOns.json';
import Layout from './Layout';

/**
 * @typedef FormI
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {'monthly' | 'yearly'} billingCycle
 * @property {'arcade' | 'advanced' | 'pro'} plan
 * @property {string[]} addOns
 */

/** @type {FormI} */
const initialFormValue = {
  name: '',
  email: '',
  phone: '',
  billingCycle: 'monthly',
  plan: 'arcade',
  addOns: [],
};

/**
 * @typedef FormContextValueI
 * @property {FormI} form
 * @property {number} step
 * @property {(key: string, value: string | boolean | string[]) => void} setFormValue
 * @property {() => void} goToNextStep
 * @property {() => void} goToPreviousStep
 * @property {(step: number) => void} setStep
 * @property {typeof plans} plans
 * @property {typeof addOns} addOns
 * @property {{status: 'idle' | 'pending' | 'success', data: FormI | null}} formSubmission
 * @property {(status: 'idle' | 'pending' | 'success') => void} setFormSubmissionStatus
 * @property {(formData: FormI) => void} setFormSubmissionData
 * @property {typeof plans[0]} selectedPlan
 * @property {typeof addOns} selectedAddOns
 * */

/** @type {{status: 'idle' | 'pending' | 'success', data: FormI | null }} */
const initialFormSubmission = { status: 'idle', data: null };

const initialStep = 1;

/** @type {React.Context<FormContextValueI>} */
const formContext = createContext({
  form: initialFormValue,
  step: initialStep,
  setFormValue: (key, value) => {},
  goToNextStep: () => {},
  goToPreviousStep: () => {},
  setStep: (step) => {},
  plans,
  addOns,
  formSubmission: initialFormSubmission,
  setFormSubmissionStatus: (status) => {},
  setFormSubmissionData: (data) => {},
  selectedPlan: plans[0],
  selectedAddOns: [addOns[0]],
});

export const useFormContext = () => useContext(formContext);

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
const FormProvider = ({ children }) => {
  const [step, setStep] = useState(initialStep);
  const [form, setForm] = useState(initialFormValue);
  const [formSubmission, setFormSubmission] = useState(initialFormSubmission);

  /** @type {FormContextValueI['setFormSubmissionStatus']} */
  const setFormSubmissionStatus = (status) => {
    setFormSubmission({ ...formSubmission, status });
  };

  /** @type {FormContextValueI['setFormSubmissionData']} */
  const setFormSubmissionData = (data) => {
    setFormSubmission({ ...formSubmission, data });
  };

  /**
   * @param {string} key
   * @param {string | boolean | string[]} value
   * */
  const setFormValue = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);

  const selectedPlan =
    plans.find((plan) => plan.value === form.plan) || plans[0];
  const selectedAddOns = addOns.filter((addOn) =>
    form.addOns.includes(addOn.value)
  );

  return (
    <formContext.Provider
      value={{
        form,
        step,
        setFormValue,
        goToNextStep,
        goToPreviousStep,
        setStep,
        plans,
        addOns,
        formSubmission,
        setFormSubmissionStatus,
        setFormSubmissionData,
        selectedPlan,
        selectedAddOns,
      }}
    >
      <Layout>{children}</Layout>
    </formContext.Provider>
  );
};

export default FormProvider;
