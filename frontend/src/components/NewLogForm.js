import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import animalsArray from '../animals.js';

const NewLogForm = () => {

  const animalOptions = Object.keys(animalsArray);
  const [availableFurTypes, setAvailableFurTypes] = useState([]);
  const [formAnimal, setFormAnimal] = useState(animalOptions[0]);
  const [formFurtype, setFormFurtype] = useState('')
  const [formGender, setFormGender] = useState('Male');

  useEffect(()=> {
    setAvailableFurTypes(animalsArray[formAnimal].furtypes);
    setFormFurtype('')
  },[formAnimal]);

  console.log(`availableFurTypes`, availableFurTypes)
  console.log(`formAnimal`, formAnimal)



  const submitNewLog = (params) => {

  }



  return (
    <div>

      <form>
        <Autocomplete
          disablePortal
          id="animals-combobox"
          options={animalOptions}
          sx={{ width: 300 }}
          value={formAnimal}
          onChange={(e, newValue) => setFormAnimal(newValue)}
          renderInput={(params) => <TextField {...params} label="Animal" />}
        />
        <FormControl sx={{ width: 150 }}>
          <InputLabel id="animal-gender">Gender</InputLabel>
          <Select
            labelId="animal-gender"
            label="Gender"
            value={formGender}
            onChange={(e) => setFormGender(e.target.value)}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>

          </Select>
        </FormControl>
        <Autocomplete
          disablePortal
          id="furtypes-combobox"
          options={availableFurTypes}
          sx={{ width: 300 }}
          value={formFurtype}
          onChange={(e, newValue) => setFormFurtype(newValue)}
          renderInput={(params) => <TextField {...params} label="Fur" />}
        />


      </form>


      {/*  <Formik
        initialValues={{ gender: '', weight: '', category: '' }}
        onSubmit={(data, actions) => {
          submitNewLog(data);
          actions.resetForm();
        }}>
        {() => (
          <Form> 
            <Field name='animal' type='select' label='Animal' as='select' onChange={console.log('beep')}>
              {Object.keys(animalsArray).map(animal => <option key={animal} value={animal}>{animal}</option>)}
            </Field>
            <Field name='gender'  type='select' label='Gender' as='select'>
              <option value='male'>Male</option>
              <option value='female'>Female</option>

            </Field>         
            <Field name='weight'  type='input' label='Weight' as={TextField}></Field>
            <Field name='fur'  type='input' label='Fur type' as={TextField}></Field>         
            <Field name='distance'  type='input' label='Tracking distance' as={TextField}></Field>
            <Field name='difficulty'  type='input' label='Difficulty' as={TextField}></Field>                  
            <Field name='trophyrating'  type='input' label='Trophy rating' as={TextField}></Field>
            <Button type='submit'>Submit</Button>
          </Form>
        )}
      </Formik> */}
    </div>
  )
};

export default NewLogForm;