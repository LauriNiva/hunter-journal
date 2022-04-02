import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Compress from 'compress.js';

import animalsList from '../data/animals.js';
import weaponsList from '../data/weapons.js';
import availableAmmoList from '../data/availableAmmoList.js';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { useAuth0 } from '@auth0/auth0-react';
import { Image } from 'mui-image';
import { Container } from '@mui/material';

const difficultyOptions = ["1 - Trivial", "2 - Minor", "3 - Very easy", "4 - Easy", "5 - Medium",
  "6 - Hard", "7 - Very hard", "8 - Mythical", "9 - Legendary", "10 - Fabled"];


const EditLogForm = ({ setLogs, log }) => {

  console.log('log', log)

  const imageUrl = `https://res.cloudinary.com/devniva/image/upload/v1636547210/`;



  const compress = new Compress();
  const { getAccessTokenSilently } = useAuth0();


  const animalOptions = Object.keys(animalsList);
  const weaponOptions = weaponsList.map(weapon =>
  (
    {
      'label': weapon[0],
      'type': weapon[1],
      'group': weapon[1].toUpperCase()
    }
  ));

  const canBeGreatOne = (animal) => {
    const currentGreatOnes = ['Red Deer', 'Whitetail Deer'];
    return currentGreatOnes.includes(animal);
  }

  const [formAnimal, setFormAnimal] = useState(log.animal);
  const [availableFurTypes, setAvailableFurTypes] = useState(animalsList[log.animal].furtypes);
  const [formFurtype, setFormFurtype] = useState(log.furtype)
  const [formGender, setFormGender] = useState(log.gender);
  const [formWeight, setFormWeight] = useState(log.weight);
  const [formDistance, setFormDistance] = useState(log.distance);
  const [animalDifficulty, setAnimalDifficulty] = useState(log.difficulty)
  const [formDifficulty, setFormDifficulty] = useState(difficultyOptions[log.difficulty - 1])
  const [formRating, setFormRating] = useState(log.rating);
  const [formBadge, setFormBadge] = useState(log.badge);
  const [formWeapon, setFormWeapon] = useState(weaponOptions.find(weapon => weapon.label === log.weapon));
  const [availableAmmo, setAvailableAmmo] = useState(availableAmmoList[log.weapon].ammo);
  const [formAmmo, setFormAmmo] = useState(log.ammo);
  const [formShotDistance, setFormShotDistance] = useState(log.shotdistance);
  const [availableReserves, setAvailableReserves] = useState(animalsList[log.animal].reserves)
  const [formReserve, setFormReserve] = useState(log.reserve);
  const [formNotes, setFormNotes] = useState(log.notes);

  const [weightInvalid, setWeightInvalid] = useState(false);
  const [distanceInvalid, setDistanceInvalid] = useState(false);
  const [ratingInvalid, setRatingInvalid] = useState(false);
  const [shotDistanceInvalid, setShotDistanceInvalid] = useState(false);

  const [open, setOpen] = useState(false);

  const [previewSources, setPreviewSources] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);


  useEffect(() => {
    setAvailableFurTypes(animalsList[formAnimal].furtypes);
    setFormFurtype(animalsList[formAnimal].furtypes[0]);

    setAvailableReserves(animalsList[formAnimal].reserves);
    setFormReserve(animalsList[formAnimal].reserves[0])

    setAnimalDifficulty(animalsList[formAnimal].difficulty);
    setFormDifficulty(difficultyOptions[animalsList[formAnimal].difficulty - 1])

  }, [formAnimal]);

  useEffect(() => {
    setAvailableAmmo(availableAmmoList[formWeapon.label].ammo.reverse()); // reverse jotta polymer-tip on ensin 
  }, [formWeapon]);

  useEffect(() => {
    if(!availableAmmo.includes(formAmmo)){
      setFormAmmo(availableAmmo[0]);
    }
  }, [availableAmmo,formAmmo]);

  useEffect(() => {
    const animalRatings = animalsList[formAnimal].trophyscore;
    if (formRating >= animalRatings.diamond) {
      setFormBadge('Diamond')
    } else if (formRating >= animalRatings.gold) {
      setFormBadge('Gold')
    } else if (formRating >= animalRatings.silver) {
      setFormBadge('Silver')
    } else if (formRating < animalRatings.silver) {
      setFormBadge('Bronze')
    }
  }, [formRating, formAnimal])


  // ----Form validation----
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
  // ^^^^Form validation^^^^




  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setImageFiles(imageFiles.concat(e.target.files[0]));
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSources(previewSources.concat(reader.result));
    }
  }


  const updateTheLog = async () => {

    const token = await getAccessTokenSilently();

    const compressedImageArray = await compress.compress(imageFiles,
      { size: 0.4, quality: 0.8, maxWidth: 1400, maxHeight: 1000, });

    const imageArray = compressedImageArray.map(img => `${img.prefix}${img.data}`);


    const changesToTheLog = {};

    if (log.animal !== formAnimal) changesToTheLog.animal = formAnimal;
    if (log.gender !== formGender) changesToTheLog.gender = formGender;
    if (log.weight !== formWeight) changesToTheLog.weight = formWeight;
    if (log.furtype !== formFurtype) changesToTheLog.furtype = formFurtype;
    if (log.distance !== formDistance) changesToTheLog.distance = formDistance;
    if (log.difficulty !== formDifficulty) changesToTheLog.difficulty = formDifficulty;
    if (log.rating !== formRating) changesToTheLog.rating = formRating;
    if (log.badge !== formBadge) changesToTheLog.badge = formBadge;
    if (log.weapon !== formWeapon.label) changesToTheLog.weapon = formWeapon.label;
    if (log.weapontype !== formWeapon.type) changesToTheLog.weapontype = formWeapon.type;
    if (log.ammo !== formAmmo) changesToTheLog.ammo = formAmmo;
    if (log.shotdistance !== formShotDistance) changesToTheLog.shotdistance = formShotDistance;
    if (log.reserve !== formReserve) changesToTheLog.reserve = formReserve;
    if (log.notes !== formNotes) changesToTheLog.notes = formNotes;
    changesToTheLog.oldImageIds = log.images;
    changesToTheLog.imagedata = imageArray;


    try {
      const updatedLog = await axios.put(`/api/logs/${log._id}`, changesToTheLog, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setLogs(currentLogs => currentLogs.map(log => log._id === updatedLog.data._id ? updatedLog.data : log));
    } catch (error) {
      console.log(error);
    }

  }

  const clearForm = () => {
    setFormAnimal(log.animal);
    setAvailableFurTypes(animalsList[log.animal].furtypes);
    setFormFurtype(log.furtype)
    setFormGender(log.gender);
    setFormWeight(log.weight);
    setFormDistance(log.distance);
    setFormDifficulty(log.difficulty);
    setFormRating(log.rating);
    setFormBadge(log.badge);
    setFormNotes(log.notes);
    //setPreviewSource('');
    setFormWeapon(weaponOptions.find(weapon => weapon.label === log.weapon));
    setAvailableAmmo(availableAmmoList[formWeapon.label].ammo.reverse());
    setFormAmmo(log.ammo);
    setFormShotDistance(log.shotdistance);
    setFormReserve(log.reserve)
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
    clearForm();
  };

  const handleCloseDialog = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setOpen(false);
  };

  const handleSubmitDialog = (e) => {
    e.preventDefault();
    handleCloseDialog();
    updateTheLog();
  };

  const formInputWidth = () => {
    return { xs: 150, sm: 200 };
  }

  return (

    <Box>

      <Button sx={{ textTransform: 'none', fontSize: '16px', width: '100%' }} color="primary" onClick={handleClickOpenDialog}>
        Edit
      </Button>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="lg" >
        <DialogTitle id="form-dialog-title">Edit log</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>



          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Image src={imageUrl + log.images[0]} showLoading sx={{}} />
          </Box>

          <Container disableGutters sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {log.images.map((img, index) =>
              <Image key={img} src={imageUrl + img} width='150px' />
            )}

            {previewSources.map((img, index) =>
              <Image key={img + index} src={img} width='150px' />

            )}

            {((previewSources.length + log.images.length) < 3) &&

              <label htmlFor="imageuploadbutton">
                <Input sx={{ display: "none" }} type='file' id="imageuploadbutton" name='image'
                  accept=".jpg,.jpeg,.png" onChange={handleFileInputChange} />
                <Button sx={{
                  m: 1,
                  height: 100,
                  width: 150,
                }} variant="outlined" component="span">
                  <AddPhotoAlternateIcon />
                </Button>
              </label>
            }

          </Container>



          <form id="newLogForm" onSubmit={handleSubmitDialog}>
            <Box sx={{
              mt: 3,
              display: 'grid',
              gap: 1,
              gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
              gridTemplateRows: { xs: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr 1fr" },
              gridTemplateAreas: {
                xs:
                  `"animal reserve"
                    "gender distance"
                    "weight weapon"
                    "fur ammo"
                    "difficulty shotdistance"
                    "rating notes"
                    "badge notes"`,
                md:
                  `"animal distance reserve notes"
                  "gender difficulty weapon notes"
                  "weight rating ammo notes"
                  "fur badge shotdistance notes"`
              }
            }}>

              <Autocomplete
                id="animals-combobox"
                options={animalOptions}
                sx={{ width: formInputWidth, gridArea: "animal" }}
                disableClearable
                value={formAnimal}
                onChange={(e, newValue) => setFormAnimal(newValue)}
                renderInput={(params) => <TextField {...params} label="Animal" />}
              />

              <FormControl sx={{ width: formInputWidth, gridArea: "gender" }}>
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
                sx={{ width: formInputWidth, gridArea: "weight" }}
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
                sx={{ width: formInputWidth, gridArea: "fur" }}
                value={formFurtype}
                onChange={(e, newValue) => setFormFurtype(newValue)}
                renderInput={(params) => <TextField {...params} label="Fur" />}
              />

              <TextField
                id="distance-textfield"
                label="Tracking distance"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ width: formInputWidth, gridArea: "distance" }}
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

              <FormControl sx={{ width: formInputWidth, gridArea: "difficulty" }}>
                <InputLabel id="difficulty">Difficulty</InputLabel>
                <Select
                  labelId="difficulty"
                  label="Difficulty"
                  value={formDifficulty}
                  onChange={(e) => setFormDifficulty(e.target.value)}
                >
                  {difficultyOptions.slice(0, animalDifficulty).reverse().map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                id="rating-textfield"
                label="Trophy rating"
                required
                InputLabelProps={{ shrink: true }}
                sx={{ width: formInputWidth, gridArea: "rating" }}
                error={ratingInvalid}
                autoComplete="off"
                inputProps={{ type: "number", step: "any", min: "0", max: "1000", }}
                variant="outlined"
                value={formRating}
                onChange={(e) => setFormRating(e.target.value)}
              />

              <FormControl sx={{ width: formInputWidth, gridArea: "badge" }}>
                <InputLabel id="animal-badge">Badge</InputLabel>
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
                  {canBeGreatOne(formAnimal) && <MenuItem value="Great One">Great One</MenuItem>}
                </Select>
              </FormControl>

              <Autocomplete
                id="weapons-combobox"
                options={weaponOptions}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                groupBy={(option) => option.group}
                sx={{ width: formInputWidth, gridArea: "weapon" }}
                disableClearable
                value={formWeapon}
                onChange={(e, newValue) => setFormWeapon(newValue)}
                renderInput={(params) => <TextField {...params} label="Weapon" />}
              />

              <Autocomplete
                id="ammo-combobox"
                options={availableAmmo}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: formInputWidth, gridArea: "ammo" }}
                disableClearable
                value={formAmmo}
                onChange={(e, newValue) => setFormAmmo(newValue)}
                renderInput={(params) => <TextField {...params} label="Ammo" />}
              />

              <TextField
                id="shotdistance-textfield"
                label="Shot Distance"
                variant="outlined"
                sx={{ width: formInputWidth, gridArea: "shotdistance" }}
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
              <FormControl sx={{ width: formInputWidth, gridArea: "reserve" }}>
                <InputLabel id="reserve">Reserve</InputLabel>
                <Select
                  labelId="reserve"
                  label="Reserve"
                  value={formReserve}
                  onChange={(e) => setFormReserve(e.target.value)}
                >
                  {availableReserves.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                sx={{ width: formInputWidth, gridArea: "notes" }}
                id="notes-textfield"
                label="Notes"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                multiline
                rows={4}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
              />

            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button type="submit" form="newLogForm" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
};

export default EditLogForm;