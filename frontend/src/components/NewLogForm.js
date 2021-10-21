import { Autocomplete, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import animalsArray from '../animals.js';

const NewLogForm = () => {

  const animalOptions = Object.keys(animalsArray);
  const [formAnimal, setFormAnimal] = useState(animalOptions[0]);
  const [availableFurTypes, setAvailableFurTypes] = useState(animalsArray[formAnimal].furtypes);
  const [formFurtype, setFormFurtype] = useState(availableFurTypes[0])
  const [formGender, setFormGender] = useState('Male');
  const [formWeight, setFormWeight] = useState('');
  const [formDistance, setFormDistance] = useState('');
  const [formRating, setFormRating] = useState('');


  useEffect(() => {
    setAvailableFurTypes(animalsArray[formAnimal].furtypes);
  }, [formAnimal]);

  useEffect(() => {
    setFormFurtype(availableFurTypes[0]);
  }, [availableFurTypes]);

  const [previewSource, setPreviewSource] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }


  // console.log(`availableFurTypes`, availableFurTypes)
  // console.log(`formAnimal`, formAnimal)
  // console.log(`formGender`, formGender)
  // console.log(`formFurType`, formFurtype)
  // console.log(`formWeight`, formWeight)

  const handleSubmit = (e) => {
    e.preventDefault();
    submitNewLog();
  }

  const submitNewLog = async () => {
    const selectedAnimal = animalsArray[formAnimal];

    const newLog = {
      animal: formAnimal,
      gender: formGender,
      weight: formWeight,
      furtype: formFurtype,
      distance: formDistance,
      rating: formRating,
      imagedata: previewSource,
    };

    console.log(`newLog`, newLog)

    /* try {
      const uploadedLog = await axios.post('/api/upload', { imagedata: previewSource });
    } catch (error) {
      console.log(error);
    } */

  }



  return (
    <Box>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{height: '150px'}} />
      )}
      <input type='file' name='image' onChange={handleFileInputChange} />

      <form onSubmit={handleSubmit}>
        <Autocomplete
          disablePortal
          id="animals-combobox"
          options={animalOptions}
          sx={{ width: 300 }}
          disableClearable
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
        <TextField
          id="weight-textfield"
          label="Weight"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>

          }}
          value={formWeight}
          onChange={(e) => setFormWeight(e.target.value)}
        />
        <Autocomplete
          disablePortal
          disableClearable
          id="furtypes-combobox"
          options={availableFurTypes}
          sx={{ width: 300 }}
          value={formFurtype}
          onChange={(e, newValue) => setFormFurtype(newValue)}
          renderInput={(params) => <TextField {...params} label="Fur" />}
        />
        <TextField
          id="distance-textfield"
          label="Tracking distance"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>

          }}
          value={formDistance}
          onChange={(e) => setFormDistance(e.target.value)}
        />
        <TextField
          id="rating-textfield"
          label="Trophy rating"
          variant="outlined"
          value={formRating}
          onChange={(e) => setFormRating(e.target.value)}
        />
        <Button type="submit" variant="contained">Add</Button>

      </form>


    </Box>
  )
};

export default NewLogForm;