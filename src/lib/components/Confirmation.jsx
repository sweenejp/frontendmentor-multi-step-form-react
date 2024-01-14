import React from 'react';
import { useFormContext } from '../../FormProvider';
import ThankYouIcon from './icons/ThankYouIcon';
import { billingCycleFull } from '../copyMaps';
import FormWrapper from './FormWrapper';

const Confirmation = () => {
  const {
    form: { name, email, phone, billingCycle },
    selectedPlan,
    selectedAddOns,
  } = useFormContext();

  return (
    <div className="container">
      <ThankYouIcon />
      <h2 className="h2">Thank you!</h2>
      <p style={{ marginBottom: '16px' }}>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
      <p>Subscription summary:</p>
      <ul className="ul">
        <li>Name: {name}</li>
        <li>Email: {email}</li>
        <li>Phone: {phone}</li>
        <li>
          Plan: {selectedPlan?.displayValue} ({billingCycleFull[billingCycle]})
          <ul>
            {selectedAddOns.map((addOn) => (
              <li key={addOn.value}>{addOn.displayValue}</li>
            ))}
          </ul>
        </li>
      </ul>
      <br />
      <div className="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="https://www.jimmysweeney.page">Jimmy Sweeney</a>.
      </div>
    </div>
  );
};

export default Confirmation;
