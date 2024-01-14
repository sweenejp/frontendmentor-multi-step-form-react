import React from 'react';
import addOns from '../../mockdata/addOns.json';
import FormWrapper from './FormWrapper';
import CheckboxGroup from './CheckboxGroup';
import Button from './Button';
import { useFormContext } from '../../FormProvider';
import { billingCycleAbrevs } from '../copyMaps';

/**
 *  @param {AddOnI['billingCycles']} billingCycles
 *  @param {'monthly' | 'yearly'} selectedBillingCycle
 */
export function generatePrice(billingCycles, selectedBillingCycle) {
  return `$${billingCycles[selectedBillingCycle].price}/${billingCycleAbrevs[selectedBillingCycle]}`;
}

const AddOns = () => {
  const { goToNextStep, goToPreviousStep, form, setFormValue } =
    useFormContext();

  return (
    <FormWrapper
      title="Pick Add-ons"
      subtitle="Add-ons help enhance your gaming experience."
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
      <div slot="form-content">
        <fieldset
          style={{
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <CheckboxGroup
            checkboxes={addOns.map(
              ({ billingCycles, description, displayValue, value }) => ({
                value,
                details: description,
                label: displayValue,
                sublabel: `+${generatePrice(billingCycles, form.billingCycle)}`,
              })
            )}
            selectedValue={form.addOns}
            onChange={(addOns) => setFormValue('addOns', addOns)}
          />
        </fieldset>
      </div>
    </FormWrapper>
  );
};

export default AddOns;
