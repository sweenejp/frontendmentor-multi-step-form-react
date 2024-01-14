import React, { useState, useRef } from 'react';
import hasError from '../hasError';
import Button from './Button';
import TextField from './TextField';
import FormWrapper from './FormWrapper';
import styles from './FormWrapper.module.css';
import { useFormContext } from '../../FormProvider';

const PersonalInfo = () => {
  const {
    form: { name: nameValue, email: emailValue, phone: phoneValue },
    setFormValue,
    goToNextStep,
  } = useFormContext();
  // define initialErrors to help correct typing
  /** @type {Record<string, string | null | undefined>}*/
  const initialErrors = {};
  const [errors, setErrors] = useState(initialErrors);

  /** @param {React.ChangeEvent<HTMLInputElement>} event */
  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;

    setFormValue(name, value);
  };

  // NOTE: Compare this to the much more straight forward way of accomplishing this in Svelte. It feels a little weird to validate the error of the input by passing in the ref instead of just using the input values that are passed in as props in this component (`nameValue`, `emailValue`, and `phoneValue`). However, we need the ref in order to do the `focus` anway so we might as well use the ref to
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  /** @param {React.MouseEvent<HTMLButtonElement>} event */
  function handleNext(event) {
    event.preventDefault();
    const newErrors = {
      name: hasError(nameRef.current),
      email: hasError(emailRef.current),
      phone: hasError(phoneRef.current),
    };

    setErrors(newErrors);

    if (newErrors.name) {
      // @ts-ignore
      nameRef.current.focus();

      return;
    }

    if (newErrors.email) {
      // @ts-ignore
      emailRef.current.focus();

      return;
    }

    if (newErrors.phone) {
      // @ts-ignore
      phoneRef.current.focus();

      return;
    }

    goToNextStep();
  }

  return (
    <FormWrapper
      title="Personal info"
      subtitle="Please provide your name, email address, and phone number."
      formActions={
        <Button variant="secondary" onClick={handleNext}>
          Next Step
        </Button>
      }
    >
      <div className={styles.formContent}>
        <TextField
          label="Name"
          type="text"
          name="name"
          placeholder="e.g Stephen King"
          required
          error={errors.name}
          value={nameValue}
          onChange={handleChange}
          ref={nameRef}
        />
        <TextField
          label="Email Address"
          type="email"
          name="email"
          placeholder="e.g stephenking@lorem.com"
          required
          error={errors.email}
          value={emailValue}
          onChange={handleChange}
          ref={emailRef}
        />
        <TextField
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="e.g +1 234 567 890"
          required
          error={errors.phone}
          value={phoneValue}
          onChange={handleChange}
          ref={phoneRef}
        />
      </div>
    </FormWrapper>
  );
};

export default PersonalInfo;
