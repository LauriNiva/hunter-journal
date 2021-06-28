import express from 'express';
const app = express();
import cloudinary from './utils/cloudinary.js';

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }))

app.post('/api/upload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.v2.uploader
      .upload(fileStr, { upload_preset: 'hunter_setup', });
    res.json(uploadResponse.public_id)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong with the upload'})
  }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});