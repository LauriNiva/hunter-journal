import User from '../models/user.model.js';
import express from 'express';
import checkJwt from '../middleware/jwtCheck.js';

const usersRouter = express.Router();

usersRouter.get('/', checkJwt, async (req, res) => {
  try {
    console.log('req.user.sub', req.user.sub)
    const userid = req.user.sub;
    const user = await User.findById(userid);
    res.json(user);
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


export default usersRouter;