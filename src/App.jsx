import React from 'react';
import Form from './Form';
import './global.css';
import FormProvider from './FormProvider';

function App() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}

export default App;
