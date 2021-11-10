import Log from '../models/logs.model.js';
import express from 'express';
import cloudinary from '../utils/cloudinary.js';

const logsRouter = express.Router();

logsRouter.post('/', async (req, res) => {
  console.log('inside logsrouter: ', req.body)
  const body = req.body;
  /* try {
    const fileStr = body.imagedata;
    const uploadResponse = await cloudinary.v2.uploader
      .upload(fileStr, { upload_preset: 'hunter_setup', });
    const imageid = uploadResponse.public_id;
    const newLog = new Log ({
      animal: body.animal,
      gender: body.gender,
      weight: body.weight,
      fur: body.fur,
      distance: body.distance,
      difficulty: body.difficulty,
      trophytype
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong with the upload'})
  } */


});



export default logsRouter;