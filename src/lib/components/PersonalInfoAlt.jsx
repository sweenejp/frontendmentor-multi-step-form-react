import React, { useState, useRef } from 'react';
import hasError from '../hasError';
import Button from './Button';
import TextField from './TextField';
import FormWrapper from './FormWrapper';

const goToNextStep = () => {};

/**
 * @param {object} props
 * @param {string} props.nameValue
 * @param {string} props.emailValue
 * @param {string} props.phoneValue
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.onChange
 */
const PersonalInfo = ({ nameValue, emailValue, phoneValue, onChange }) => {
  // define initialErrors to help correct typing
  /** @type {Record<string, string | null | undefined>}*/
  const initialErrors = {};
  const [errors, setErrors] = useState(initialErrors);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  /** @param {React.MouseEvent<HTMLButtonElement>} event */
  function handleNext(event) {
    event.preventDefault();
    /** @type {Record<string, string | null | undefined>} */
    const newErrors = {};
    // This seems to work... but this might be an anti pattern and something I definitely try to avoid in React. Here I'm basically reading the value attribute of all the inputs and then setting the local error state object if the an error exists on the particular element. Since the point of the `hasError`function is to return specific error messages based on the type of input element, the function needs to accept an HTML element in order to work. So we need to either use useRef, or to query select like you would in vanilla js. I actually don't fully understand how this is any different using useRef in fact.
    document.querySelectorAll('input').forEach((element) => {
      newErrors[element.name] = hasError(element);
    });

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
      <div>
        <TextField
          label="Name"
          type="text"
          name="name"
          placeholder="e.g Stephen King"
          required
          error={errors.name}
          value={nameValue}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          ref={phoneRef}
        />
      </div>
    </FormWrapper>
  );
};

export default PersonalInfo;

{
  /* <style>
	.form-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style> */
}
