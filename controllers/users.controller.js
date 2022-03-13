import User from '../models/users.model.js';
import express from 'express';
import checkJwt from '../middleware/jwtCheck.js';

const usersRouter = express.Router();

usersRouter.get('/', checkJwt, async (req, res) => {
  try {
    console.log('req.user.sub', req.user.sub)
    const userid = req.user.sub;
    const user = await User.findById(userid).populate('followed', 'username avatar -_id').populate('followers', 'username avatar -_id');
    res.json(user);
  } catch (error) {
    res.status(404).end();
  }
});

usersRouter.get('/find/:query', checkJwt, async (req, res) => {
  try {
    const query = req.params.query;
    const users = await User.find({username: new RegExp('^'+query, "i")}).select('username -_id');
    console.log('users', users)
    res.json(users);
  } catch (error) {
    res.status(404).end();
  }
});

usersRouter.post('/', checkJwt, async (req, res) => {

  const body = req.body;
  try {
    const newUser = new User(
      {
        username: body.username,
        email: body.email,
        _id: req.user.sub,
        avatar: '0'
      }
    );

    const createdUser = await newUser.save();
    res.json(createdUser)

  } catch (error) {
    console.log('error creating a user: ', error.errors);
    res.status(500).json({ error })
  }

});

//Get avatar for the user (public access)
usersRouter.get('/:username/avatar', async (req, res) => {
  const username = req.params.username;
  try {
    const userToFind = await User.findOne({ username: username });
    res.json(username + userToFind.avatar);
  } catch (error) {
    console.log(error)
  }


});

//Update users own avatar
usersRouter.put('/avatar', checkJwt, async (req, res) => {
  const userid = req.user.sub;
  const body = req.body;

  try {
    const userToUpdate = await User.findById(userid);
    userToUpdate.avatar = body.avatar;
    const updatedUser = await userToUpdate.save();
    res.json(updatedUser.username + updatedUser.avatar);
  } catch (error) {
    console.log(error)
  }
});

usersRouter.put('/:username/follow', checkJwt, async (req, res) => {
  const usernameToFollow = req.params.username;
  const followerid = req.user.sub;

  try {
    const userToFollow = await User.findOne({ username: usernameToFollow });
    userToFollow.followers.addToSet(followerid);
    const updatedUserToFollow = await userToFollow.save();

    const userToUpdate = await User.findById(followerid);
    userToUpdate.followed.addToSet(updatedUserToFollow._id);
    const updatedUser = await userToUpdate.save();
    res.json(usernameToFollow)
  } catch (error) {
    console.log('Error following user', error)
    res.status(500).json({ error });
  }
});


export default usersRouter;