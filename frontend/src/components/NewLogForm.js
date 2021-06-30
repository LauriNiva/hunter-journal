import { Button, MenuItem, TextField } from '@material-ui/core';
import Select from 'react-select'
import React from 'react';
import {Formik , Field, Form } from 'formik';
import animalsArray from '../animals.js';

const NewLogForm= () => {

  const submitNewLog = (params) => {
    
  }
  
  console.log(`Object.entries(animalsArray)`, Object.entries(animalsArray))

  return (
    <div>
      <Formik
        initialValues={{ gender: '', weight: '', category: '' }}
        onSubmit={(data, actions) => {
          submitNewLog(data);
          actions.resetForm();
        }}>
        {() => (
          <Form> 
            <Field name='animal' type='select' label='Animal' as={Select}>
              {Object.entries(animalsArray).map(animal => <MenuItem key={animal[0]} value={animal[0]}>{animal[0]}</MenuItem> )}
            </Field>
            <Field name='gender'  type='select' label='Gender' as={Select}>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>

            </Field>         
            <Field name='weight'  type='input' label='Weight' as={TextField}></Field>
            <Field name='fur'  type='input' label='Fur type' as={TextField}></Field>         
            <Field name='distance'  type='input' label='Tracking distance' as={TextField}></Field>
            <Field name='difficulty'  type='input' label='Difficulty' as={TextField}></Field>                  
            <Field name='trophyrating'  type='input' label='Trophy rating' as={TextField}></Field>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default NewLogForm;