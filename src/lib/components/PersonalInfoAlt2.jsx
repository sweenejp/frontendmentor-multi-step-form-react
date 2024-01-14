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

  // NOTE: you could do a more react-ish approach which is simply to validate the state's version of each input's value (which of course ought to be in sync anyway because of the onChange callback). This would require writin ga different version of `hasError` - one if which takes a second `inputType` param explicitly instead of teasing it out of the `Element` param like the original version of that function did. But in this case, I want to be able to focus on the first element that has error so we need to have a ref anyway to achieve that. This ends up reading a little easier, and is more Reactish, but doesn't prevent us from having to pass refs around.
  /** @param {React.MouseEvent<HTMLButtonElement>} event */
  function handleNext(event) {
    event.preventDefault();
    const newErrors = {
      name: hasError(nameValue, 'text'),
      email: hasError(emailValue, 'email'),
      phone: hasError(phoneValue, 'tel'),
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
