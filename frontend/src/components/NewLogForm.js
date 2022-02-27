import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Compress from 'compress.js';
import animalsList from '../data/animals.js';
import weaponsList from '../data/weapons.js';
import ammoArray from '../data/ammo.js';
import reservesList from '../data/reserves.js';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { useAuth0 } from '@auth0/auth0-react';
import { Image } from 'mui-image';

const NewLogForm = ({ setLogs }) => {

  const compress = new Compress();

  const animalOptions = Object.keys(animalsList);
  const weaponOptions = weaponsList.map(weapon =>
  (
    {
      'label': weapon[0],
      'type': weapon[1],
      'group': weapon[1].toUpperCase()
    }
  ));


  const difficultyOptions = ["1 - Trivial", "2 - Minor", "3 - Very easy", "4 - Easy", "5 - Medium",
    "6 - Hard", "7 - Very hard", "8 - Mythical", "9 - Legendary", "10 - Fabled"];

  const [formAnimal, setFormAnimal] = useState(animalOptions[0]);
  const [availableFurTypes, setAvailableFurTypes] = useState(animalsList[formAnimal].furtypes);
  const [formFurtype, setFormFurtype] = useState(availableFurTypes[0])
  const [formGender, setFormGender] = useState('Male');
  const [formWeight, setFormWeight] = useState('');
  const [formDistance, setFormDistance] = useState('');
  const [formDifficulty, setFormDifficulty] = useState(difficultyOptions[0])
  const [formRating, setFormRating] = useState('');
  const [formBadge, setFormBadge] = useState('None');
  const [formWeapon, setFormWeapon] = useState(weaponOptions[0]);
  const [availableAmmo, setAvailableAmmo] = useState(ammoArray[formWeapon.type]);
  const [formAmmo, setFormAmmo] = useState(ammoArray[formWeapon.type][0]);
  const [formShotDistance, setFormShotDistance] = useState('');
  const [formReserve, setFormReserve] = useState(reservesList[0]);
  const [formNotes, setFormNotes] = useState('');

  const [weightInvalid, setWeightInvalid] = useState(false);
  const [distanceInvalid, setDistanceInvalid] = useState(false);
  const [ratingInvalid, setRatingInvalid] = useState(false);
  const [shotDistanceInvalid, setShotDistanceInvalid] = useState(false);

  const [open, setOpen] = useState(false);

  const { getAccessTokenSilently } = useAuth0();



  useEffect(() => {
    setAvailableFurTypes(animalsList[formAnimal].furtypes);
  }, [formAnimal]);

  useEffect(() => {
    setFormFurtype(availableFurTypes[0]);
  }, [availableFurTypes]);

  useEffect(() => {
    setAvailableAmmo(ammoArray[formWeapon.type]);
  }, [formWeapon]);


  useEffect(() => {
    setFormAmmo(availableAmmo[0]);
  }, [availableAmmo]);

  useEffect(() => {
    if (formWeight < 0 || formWeight > 2000) {
      setWeightInvalid(true)
    } else {
      setWeightInvalid(false)
    }
  }, [formWeight]);

  useEffect(() => {
    if (formDistance < 0 || formDistance > 50000) {
      setDistanceInvalid(true)
    } else {
      setDistanceInvalid(false)
    }
  }, [formDistance]);

  useEffect(() => {
    if (formRating < 0 || formRating > 1000) {
      setRatingInvalid(true)
    } else {
      setRatingInvalid(false)
    }
  }, [formRating]);

  useEffect(() => {
    if (formShotDistance < 0 || formShotDistance > 800) {
      setShotDistanceInvalid(true)
    } else {
      setShotDistanceInvalid(false)
    }
  }, [formShotDistance]);

  const [previewSource, setPreviewSource] = useState('');
  const [imageFile, setImageFile] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setImageFile(e.target.files[0])
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }


  const submitNewLog = async () => {
    //const selectedAnimal = animalsList[formAnimal];

    const token = await getAccessTokenSilently();

    const compressedImageArray = await compress.compress([imageFile], { size: 1, quality: 1 })
    const compressedImageData = compressedImageArray[0];
    const compressedImage = `data:${compressedImageData.ext};base64,${compressedImageData.data}`

    const newLog = {
      animal: formAnimal,
      gender: formGender,
      weight: formWeight,
      furtype: formFurtype,
      distance: formDistance,
      difficulty: formDifficulty,
      rating: formRating,
      badge: formBadge,
      weapon: formWeapon.label,
      weapontype: formWeapon.type,
      ammo: formAmmo,
      shotdistance: formShotDistance,
      reserve: formReserve,
      notes: formNotes,
      imagedata: compressedImage,
    };

    console.log(`newLog`, newLog)

    try {
      const uploadedLog = await axios.post('/api/logs', newLog, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log(`uploadedLog`, uploadedLog)
      console.log(`uploadedLog.data`, uploadedLog.data)
      setLogs(currentLogs => currentLogs.concat(uploadedLog.data));
    } catch (error) {
      console.log(error);
    }

  }

  const clearForm = () => {
    setFormAnimal(animalOptions[0]);
    setAvailableFurTypes(animalsList[formAnimal].furtypes);
    setFormFurtype(availableFurTypes[0])
    setFormGender('Male');
    setFormWeight('');
    setFormDistance('');
    setFormDifficulty(difficultyOptions[0]);
    setFormRating('');
    setFormBadge('None');
    setFormNotes('');
    setPreviewSource('');
    setFormWeapon(weaponOptions[0]);
    setAvailableAmmo(ammoArray[formWeapon.type]);
    setFormAmmo(ammoArray[formWeapon.type][0]);
    setFormShotDistance('');
    setFormReserve(reservesList[0]);
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
    clearForm();
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmitDialog = (e) => {
    e.preventDefault();
    if (previewSource) {
      handleCloseDialog();
      submitNewLog();
    };
  };


  return (

    <Box>

      <Button variant="outlined" color="success" onClick={handleClickOpenDialog}>
        +
      </Button>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <DialogTitle id="form-dialog-title">New log</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the image and the data
          </DialogContentText>

          {previewSource ?
            <Image src={previewSource} alt="chosen" sx={{m:1}} />
            :
            <label htmlFor="imageuploadbutton">
              <Input sx={{ display: "none" }} type='file' id="imageuploadbutton" name='image'
                accept=".jpg,.jpeg,.png" onChange={handleFileInputChange} />
              <Button sx={{
                m:1,
                height: { xs: 200, sm: 400, md: 600, lg: 800, xl: 950 },
                width: { xs: 300, sm: 500, md: 800, lg: 1000, xl: 1200 },
              }} variant="outlined" component="span">
                <AddPhotoAlternateIcon />
              </Button>
            </label>
          }
          <form id="newLogForm" onSubmit={handleSubmitDialog}>

            <Autocomplete
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
              InputLabelProps={{ shrink: true }}
              sx={{ width: 150 }}
              error={weightInvalid}
              autoComplete="off"
              inputProps={{ type: "number", step: "any", min: "0", max: "2000", }}
              required
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>

              }}
              value={formWeight}
              onChange={(e) => setFormWeight(e.target.value)}
            />

            <Autocomplete
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
              InputLabelProps={{ shrink: true }}
              sx={{ width: 150 }}
              error={distanceInvalid}
              autoComplete="off"
              inputProps={{ type: "number", step: "any", min: "0", max: "50000", }}
              required
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>

              }}
              value={formDistance}
              onChange={(e) => setFormDistance(e.target.value)}
            />

            <FormControl sx={{ width: 150 }}>
              <InputLabel id="difficulty">Difficulty</InputLabel>
              <Select
                labelId="difficulty"
                label="Difficulty"
                value={formDifficulty}
                onChange={(e) => setFormDifficulty(e.target.value)}
              >
                {difficultyOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
              </Select>
            </FormControl>

            <TextField
              id="rating-textfield"
              label="Trophy rating"
              required
              InputLabelProps={{ shrink: true }}
              sx={{ width: 100 }}
              error={ratingInvalid}
              autoComplete="off"
              inputProps={{ type: "number", step: "any", min: "0", max: "1000", }}
              variant="outlined"
              value={formRating}
              onChange={(e) => setFormRating(e.target.value)}
            />

            <FormControl sx={{ width: 150 }}>
              <InputLabel id="animal-gender">Badge</InputLabel>
              <Select
                labelId="animal-badge"
                label="Badge"
                value={formBadge}
                onChange={(e) => setFormBadge(e.target.value)}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Bronze">Bronze</MenuItem>
                <MenuItem value="Silver">Silver</MenuItem>
                <MenuItem value="Gold">Gold</MenuItem>
                <MenuItem value="Diamond">Diamond</MenuItem>
                <MenuItem value="Great One">Great One</MenuItem>
              </Select>
            </FormControl>

            <Autocomplete
              id="weapons-combobox"
              options={weaponOptions}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              groupBy={(option) => option.group}
              sx={{ width: 200 }}
              disableClearable
              value={formWeapon}
              onChange={(e, newValue) => setFormWeapon(newValue)}
              renderInput={(params) => <TextField {...params} label="Weapon" />}
            />

            <Autocomplete
              id="ammo-combobox"
              options={availableAmmo}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: 200 }}
              disableClearable
              value={formAmmo}
              onChange={(e, newValue) => setFormAmmo(newValue)}
              renderInput={(params) => <TextField {...params} label="Ammo" />}
            />

            <TextField
              id="shotdistance-textfield"
              label="Shot Distance"
              variant="outlined"
              sx={{ width: 150 }}
              error={shotDistanceInvalid}
              inputProps={{ type: "number", step: "any", min: "0", max: "800", }}
              required
              autoComplete="off"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>

              }}
              value={formShotDistance}
              onChange={(e) => setFormShotDistance(e.target.value)}
            />
            <FormControl sx={{ width: 150 }}>
              <InputLabel id="reserve">Reserve</InputLabel>
              <Select
                labelId="reserve"
                label="Reserve"
                value={formReserve}
                onChange={(e) => setFormReserve(e.target.value)}
              >
                {reservesList.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
              </Select>
            </FormControl>

            <TextField
              id="notes-textfield"
              label="Notes"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              multiline
              rows={4}
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button type="submit" form="newLogForm" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
};

export default NewLogForm;