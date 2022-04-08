import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Compress from 'compress.js';
import jimp from 'jimp';
import { createWorker } from 'tesseract.js';
import stringSimilarity from 'string-similarity';

import animalsList from '../data/animals.js';
import weaponsList from '../data/weapons.js';
import ammoArray from '../data/ammo.js';
import availableAmmoList from '../data/availableAmmoList.js';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddIcon from '@mui/icons-material/Add';

import { useAuth0 } from '@auth0/auth0-react';
import { Image } from 'mui-image';
import { Container } from '@mui/material';
import { IconButton } from '@mui/material';

const difficultyOptions = ["1 - Trivial", "2 - Minor", "3 - Very easy", "4 - Easy", "5 - Medium",
  "6 - Hard", "7 - Very hard", "8 - Mythical", "9 - Legendary", "10 - Fabled"];


const NewLogForm = ({ setLogs }) => {

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

  const [formAnimal, setFormAnimal] = useState(animalOptions[0]);
  const [availableFurTypes, setAvailableFurTypes] = useState(animalsList[formAnimal].furtypes);
  const [formFurtype, setFormFurtype] = useState(availableFurTypes[0])
  const [formGender, setFormGender] = useState('Male');
  const [formWeight, setFormWeight] = useState('');
  const [formDistance, setFormDistance] = useState('');
  const [animalDifficulty, setAnimalDifficulty] = useState(9)
  const [formDifficulty, setFormDifficulty] = useState(difficultyOptions[animalDifficulty - 1])
  const [formRating, setFormRating] = useState('');
  const [formBadge, setFormBadge] = useState('None');
  const [formWeapon, setFormWeapon] = useState(weaponOptions[0]);
  const [availableAmmo, setAvailableAmmo] = useState(availableAmmoList[formWeapon.label].ammo);
  const [formAmmo, setFormAmmo] = useState(ammoArray[formWeapon.type][0]);
  const [formShotDistance, setFormShotDistance] = useState('');
  const [availableReserves, setAvailableReserves] = useState(animalsList[formAnimal].reserves)
  const [formReserve, setFormReserve] = useState(availableReserves[0]);
  const [formNotes, setFormNotes] = useState('');

  const [weightInvalid, setWeightInvalid] = useState(false);
  const [distanceInvalid, setDistanceInvalid] = useState(false);
  const [ratingInvalid, setRatingInvalid] = useState(false);
  const [shotDistanceInvalid, setShotDistanceInvalid] = useState(false);

  const [open, setOpen] = useState(false);
  const [closeButtonColor, setCloseButtonColor] = useState('secondary')


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
    setFormAmmo(availableAmmo[0]);
  }, [availableAmmo]);

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

    if (imageFiles.length === 0) {

      // OCR for animal name
      const startTime = Date.now();

      const compressedImageArray = await compress.compress([file],
        { size: 1, maxWidth: 1000, maxHeight: 1000, quality: 1 });
      const compressedImageData = compressedImageArray[0];

      console.log(`Compress took ${(Date.now() - startTime) / 1000} seconds`);

      const fileStr = compressedImageData.data;
      const imageBuffer = Buffer.from(fileStr, 'base64');

      const image = await jimp.read(imageBuffer);

      const preparedImage = await image.crop(0, 0, 300, 150).invert().threshold({ max: 10 }).getBase64Async("image/png")

      console.log(`Complete preparation took ${(Date.now() - startTime) / 1000} seconds`);

      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUWVXYZ- '
      });

      const { data: { text } } = await worker.recognize(preparedImage);
      const animal = text.split('\n')[0];
      await worker.terminate();

      console.log(`OCR before similarity check took ${(Date.now() - startTime) / 1000} seconds`);

      const matchedAnimal = stringSimilarity.findBestMatch(animal.toLocaleLowerCase(), animalOptions)

      const timeTakenForOCR = `${(Date.now() - startTime) / 1000} seconds`;
      console.log(`Complete OCR took ${timeTakenForOCR}`);

      setFormAnimal(matchedAnimal.bestMatch.target)
    };


  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSources(previewSources.concat(reader.result));
    }
  }


  const submitNewLog = async () => {

    const token = await getAccessTokenSilently();

    const compressedImageArray = await compress.compress(imageFiles,
      { size: 0.4, quality: 0.8, maxWidth: 1400, maxHeight: 1000, });

    console.log('compressedImageArray', compressedImageArray)

    const imageArray = compressedImageArray.map(img => `${img.prefix}${img.data}`);

    //console.log('imageArray', imageArray)

    // const compressedImageData = compressedImageArray[0];
    // const compressedImage = `${compressedImageData.prefix}${compressedImageData.data}`

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
      imagedata: imageArray,
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
    //setAvailableFurTypes(animalsList[formAnimal].furtypes);
    //setFormFurtype(availableFurTypes[0])
    setFormGender('Male');
    setFormWeight('');
    setFormDistance('');
    //setFormDifficulty(difficultyOptions[0]);
    setFormRating('');
    setFormBadge('None');
    setFormNotes('');
    setPreviewSources([]);
    setImageFiles([]);
    //setFormWeapon(weaponOptions[0]);
    //setAvailableAmmo(ammoArray[formWeapon.type]);
    //setFormAmmo(ammoArray[formWeapon.type][0]);
    setFormShotDistance('');
    //setFormReserve(availableReserves[0])
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
    clearForm();
  };


  const handleCloseDialog = (event, reason) => {
    if (reason && reason === "backdropClick") {
      setCloseButtonColor('error');
      setTimeout(() => setCloseButtonColor('secondary'), 300);
      return;
    }
    setOpen(false);
  };

  const handleSubmitDialog = (e) => {
    e.preventDefault();
    if (imageFiles) {
      handleCloseDialog();
      submitNewLog();
    };
  };

  const formInputWidth = () => {
    return { xs: 140, sm: 200 };
  }

  return (

    <Box>

      <IconButton sx={{}} onClick={handleClickOpenDialog}>
        <AddIcon />
      </IconButton>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="lg" >
        <DialogTitle id="form-dialog-title">New log</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <Container disableGutters sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
            {previewSources[0] ?
            <Container disableGutters sx={{ maxHeight:'55vh' }}>
              <Image src={previewSources[0]} alt="chosen"  />
            </Container>
              :
              <label htmlFor="imageuploadbutton">
                <Input sx={{ display: "none" }} type='file' id="imageuploadbutton" name='image'
                  accept=".jpg,.jpeg,.png" onChange={handleFileInputChange} />
                <Button sx={{
                  m: 1,
                  height: { xs: 180, sm: 250, md: 400, lg: 450 },
                  width: { xs: 260, sm: 400, md: 600, lg: 700 },
                }} variant="outlined" component="span">
                  <AddPhotoAlternateIcon />
                </Button>
              </label>
            }

            {previewSources[0] && <Container disableGutters sx={{ width: {md:160},  ml: { sm: 1 }, mt: { xs: 1, sm: 0 }, display: 'flex', flexDirection: { md: 'column' }, justifyContent: 'center', alignItems: 'center', gap: '10px' }}>

              {previewSources.map((img, index) =>
                <Image key={img + index} src={img} width='150px' height='100px' />

              )}

              {(previewSources.length < 3 && previewSources.length > 0) &&

                <label htmlFor="imageuploadbutton">
                  <Input sx={{ display: "none" }} type='file' id="imageuploadbutton" name='image'
                    accept=".jpg,.jpeg,.png" onChange={handleFileInputChange} />
                  <Button sx={{
                    height: { xs: 50, sm: 100 },
                    width: { xs: 75, sm: 150 },
                  }} variant="outlined" component="span">
                    <AddPhotoAlternateIcon />
                  </Button>
                </label>
              }
            </Container>}
          </Container>

          <form id="newLogForm" onSubmit={handleSubmitDialog}>
            <Box sx={{
              mt: 3,
              display: 'grid',
              gap: 1,
              gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr 1fr" },
              gridTemplateRows: { xs: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr 1fr", lg: "1fr 1fr 1fr" },
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
                  "fur badge shotdistance notes"`,
                  lg:
                  `"animal reserve difficulty weapon notes"
                  "gender fur rating ammo notes"
                  "weight distance badge shotdistance notes"`        
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
          <Button onClick={handleCloseDialog} color={closeButtonColor} >
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