import Log from '../models/logs.model.js';
import User from '../models/users.model.js';
import express from 'express';
import cloudinary from '../utils/cloudinary.js';
import checkJwt from '../middleware/jwtCheck.js';

import Tesseract from 'tesseract.js';
import jimp from 'jimp';
import stringSimilarity from 'string-similarity';
import animalsArray from '../data/animals.js'

const logsRouter = express.Router();

logsRouter.get('/', checkJwt, async (req, res) => {
  const userid = req.user.sub;
  const logs = await Log.find({ user: userid }).populate('user').populate('likes', 'username -_id');
  res.json(logs);
});

logsRouter.get('/user/:username', checkJwt, async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username: username });

  const logs = await Log.find({ user: user }).populate('user').populate('likes', 'username -_id');
  res.json(logs);
});

logsRouter.get('/user/:username/recent', checkJwt, async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username: username });

  const logs = await Log.find({ user: user }).sort({ _id: -1 }).limit(3).populate('user').populate('likes', 'username -_id');
  res.json(logs);
});


logsRouter.get('/recent', async (req, res) => {
  const recentLogs = await Log.find().sort({ _id: -1 }).limit(10).populate('user').populate('likes', 'username -_id');
  res.json(recentLogs);
});

logsRouter.get('/recent/followed', checkJwt, async (req, res) => {
  const userid = req.user.sub;
  const followedUserIds = await User.findById(userid).select('followed');
  const recentFollowedLogs = await Log.find().where('user').in(followedUserIds.followed)
  .sort({ _id: -1 }).limit(30).populate('user').populate('likes', 'username -_id');
  res.json(recentFollowedLogs);
});

logsRouter.get('/mostliked', async (req, res) => {
  const listOfMostLikedLogs = await Log.aggregate([{$project: {numberOfLikes: {$cond: { if: { $isArray: "$likes" }, then: { $size: "$likes"}, else: 0 } } } } ])
  .sort({ numberOfLikes: -1 }).limit(10)//.populate('user').populate('likes', 'username -_id');
  //const mostLikedLogs = await Log.find({ 'likes': { $exists: true, $ne: [] } }).sort({ likes: 1 }).limit(10).populate('user').populate('likes', 'username -_id');
  
  const mostLikedLogs = await Log.find().where('_id').in(listOfMostLikedLogs.map(log => log._id))
  .populate('user').populate('likes', 'username -_id');

  mostLikedLogs.sort((a,b) => b.likes.length - a.likes.length)

  res.json(mostLikedLogs);
});


logsRouter.post('/', checkJwt, async (req, res) => {
  console.log('inside logsrouter: ', req.body)
  const body = req.body;
  try {
    const fileStr = body.imagedata;
    const uploadResponse = await cloudinary.v2.uploader
      .upload(fileStr, { upload_preset: 'hunter_setup', });
    const imageid = uploadResponse.public_id;
    const newLog = new Log({
      user: req.user.sub,
      animal: body.animal,
      gender: body.gender,
      weight: body.weight,
      furtype: body.furtype,
      distance: body.distance,
      difficulty: body.difficulty,
      rating: body.rating,
      badge: body.badge,
      weapon: body.weapon,
      weapontype: body.weapontype,
      ammo: body.ammo,
      shotdistance: body.shotdistance,
      reserve: body.reserve,
      notes: body.notes,
      images: [imageid]
    });

    console.log(`newLog`, newLog);

    const uploadedLog = await newLog.save();

    console.log(`uploadedLog`, uploadedLog)

    res.json(uploadedLog)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong with the upload' })
  }
});

logsRouter.post('/ocrimage', checkJwt, async (req, res) => {
  //EI KÄYTÖSSÄ. OCR TEHDÄÄN SELAIMESSA
  const body = req.body;
  const startTime = Date.now();

  try {
/*     const fileStr = body.imagedata;

    const imageBuffer = Buffer.from(fileStr, 'base64');

    const image = await jimp.read(imageBuffer)

    const preparedImage = await image.crop(0, 0, 600, 250).invert().threshold({ max: 10 }).getBase64Async("image/png") */

    const { createWorker } = Tesseract;
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUWVXYZ- '
    });

    const rectangle = { left: 0, top: 0, width: 600, height: 250 };
    const { data: { text } } = await worker.recognize(body.imagedata, {  });
    const animal = text.split('\n')[0];
    await worker.terminate();

    const animals = Object.keys(animalsArray);
    const matchedAnimal = stringSimilarity.findBestMatch(animal.toLocaleLowerCase(), animals)

    console.log('animal', animal)
    console.log('matchedAnimal', matchedAnimal)

    const timeTakenForOCR = `${(Date.now() - startTime)/1000}`
    console.log('Server-side OCR took ', timeTakenForOCR);

    res.json({ animal : matchedAnimal.bestMatch.target, time: timeTakenForOCR })
  } catch (error) {
    console.log('ocr error', error)
    res.status(500).json('ocr error')
  }
});

logsRouter.delete('/:id', checkJwt, async (req, res) => {
  const logId = req.params.id;
  try {
    await Log.findByIdAndDelete(logId);
    res.status(204).end();
  } catch (error) {
    console.log('error with delete', error)
    res.status(500).json({ error: error })
  }
});

logsRouter.put('/:id/likes', checkJwt, async (req, res) => {
  const logId = req.params.id;
  const userid = req.user.sub;
  try {
    const logToLike = await Log.findById(logId);
    logToLike.likes.addToSet(userid);
    const updatedLog = await logToLike.save();

    const userToUpdate = await User.findById(userid);
    userToUpdate.likedLogs.addToSet(updatedLog._id);
    await userToUpdate.save();

    res.json({ 'id': updatedLog._id, 'numberOfLikes': updatedLog.likes.length });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
});

logsRouter.delete('/:id/likes', checkJwt, async (req, res) => {
  const logId = req.params.id;
  const userid = req.user.sub;
  try {
    const logToDislike = await Log.findById(logId);
    logToDislike.likes.pull(userid);
    const updatedLog = await logToDislike.save();

    const userToUpdate = await User.findById(userid);
    userToUpdate.likedLogs.pull(updatedLog._id);
    await userToUpdate.save();
    console.log('updatedLog', updatedLog)
    res.json({ 'id': updatedLog._id, 'numberOfLikes': updatedLog.likes.length });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
});



export default logsRouter;