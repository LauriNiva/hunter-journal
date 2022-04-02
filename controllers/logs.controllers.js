import Log from '../models/logs.model.js';
import User from '../models/users.model.js';
import express from 'express';
import cloudinary from '../utils/cloudinary.js';
import checkJwt from '../middleware/jwtCheck.js';


const logsRouter = express.Router();

//
// const updateWeapons = async () => {

//   const replaced = await Log.updateMany({weapon: "Kullman .22H Wasp"}, {weapon: "Kullman .22H"});
//   console.log('replaced', replaced)
// }

//updateWeapons()

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
  const listOfMostLikedLogs = await Log.aggregate([{ $project: { numberOfLikes: { $cond: { if: { $isArray: "$likes" }, then: { $size: "$likes" }, else: 0 } } } }])
    .sort({ numberOfLikes: -1 }).limit(10)//.populate('user').populate('likes', 'username -_id');
  //const mostLikedLogs = await Log.find({ 'likes': { $exists: true, $ne: [] } }).sort({ likes: 1 }).limit(10).populate('user').populate('likes', 'username -_id');

  const mostLikedLogs = await Log.find().where('_id').in(listOfMostLikedLogs.map(log => log._id))
    .populate('user').populate('likes', 'username -_id');

  mostLikedLogs.sort((a, b) => b.likes.length - a.likes.length)

  res.json(mostLikedLogs);
});


logsRouter.post('/', checkJwt, async (req, res) => {
  console.log('inside logsrouter: ', req.body)
  const body = req.body;
  try {

    let imageIdArray = [];

    for (const imgdata of body.imagedata) {

      const uploadResponse = await cloudinary.v2.uploader
        .upload(imgdata, { upload_preset: 'hunter_setup', });

      const imageid = uploadResponse.public_id;

      imageIdArray.push(imageid)

    }


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
      images: imageIdArray
    });

    console.log(`newLog`, newLog);

    const uploadedLog = await newLog.save();
    await uploadedLog.populate('user').execPopulate();

    console.log(`uploadedLog`, uploadedLog)

    res.json(uploadedLog)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong with the upload' })
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

logsRouter.put('/:id', checkJwt, async (req, res) => {
  const logId = req.params.id;
  const updates = req.body;

  let imageIdArray = req.body.oldImageIds;

  for (const imgdata of req.body.imagedata) {
    const uploadResponse = await cloudinary.v2.uploader
      .upload(imgdata, { upload_preset: 'hunter_setup', });
    const imageid = uploadResponse.public_id;
    imageIdArray.push(imageid)
  }

  delete updates.oldImageIds;
  delete updates.imagedata;
  updates.images = imageIdArray;

  try {
    console.log('logId', logId)
    console.log('updates', updates)
    const updatedLog = await Log.findByIdAndUpdate(logId, updates, { new: true });
    await updatedLog.populate('user').execPopulate();

    res.json(updatedLog);
  } catch (error) {
    console.log('error with update', error)
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