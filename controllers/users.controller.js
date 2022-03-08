import User from '../models/users.model.js';
import express from 'express';
import checkJwt from '../middleware/jwtCheck.js';

const usersRouter = express.Router();

usersRouter.get('/', checkJwt, async (req, res) => {
  try {
    console.log('req.user.sub', req.user.sub)
    const userid = req.user.sub;
    const user = await User.findById(userid).populate('followed', 'username -_id').populate('followers', 'username -_id');
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
        _id: req.user.sub
      }
    );

    const createdUser = await newUser.save();
    res.json(createdUser)

  } catch (error) {
    console.log('error creating a user: ', error.errors);
    res.status(500).json({ error })
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