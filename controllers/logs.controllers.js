import Log from '../models/logs.model.js';
import User from '../models/users.model.js';
import express from 'express';
import cloudinary from '../utils/cloudinary.js';
import checkJwt from '../middleware/jwtCheck.js';


const logsRouter = express.Router();

logsRouter.get('/', checkJwt, async (req, res) => {
  const userid = req.user.sub;
  const logs = await Log.find({ user: userid }).populate('user').populate('likes','username -_id');
  res.json(logs);
});

logsRouter.get('/recent', async (req, res) => {
  const recentLogs = await Log.find().sort({_id: -1}).limit(10).populate('user').populate('likes','username -_id');
  res.json(recentLogs);
});

logsRouter.get('/mostliked', async (req, res) => {
  const mostLikedLogs = await Log.find({ 'likes': { $exists: true } }).sort({likes: 1}).limit(10).populate('user').populate('likes','username -_id');
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

logsRouter.delete('/:id', checkJwt, async (req, res) => {
  const logId = req.params.id;
  try{
    await Log.findByIdAndDelete(logId);
    res.status(204).end();
  }catch (error) {
    console.log('error with delete',error)
    res.status(500).json({ error: error})
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

    res.json({'id': updatedLog._id, 'numberOfLikes': updatedLog.likes.length });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error})
  }
});

logsRouter.delete('/:id/likes', checkJwt, async (req, res) => {
  const logId = req.params.id;
  const userid = req.user.sub;
  try {
    
  } catch (error) {
    
  }
});



export default logsRouter;