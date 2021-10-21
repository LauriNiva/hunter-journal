import axios from 'axios';
import React, { useState } from 'react';

const UploadImage = () => {

  //const [fileInput, setFileInput] = useState('');
  //const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if(!previewSource) return;
    uploadImage(previewSource);
  }
  
  const uploadImage = async (base64EncodedImage) => {

    try {
      const uploadedImage = await axios.post('/api/upload', { imagedata: base64EncodedImage });
      console.log(`uploadedImage`, uploadedImage.data)
    } catch (error) {
      console.log(error);
    }
  }
  
  
  

  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <input type='file' name='image' onChange={handleFileInputChange} />
        <button type='submit'>Upload</button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{height: '150px'}} />
      )}
    </div>
  )
};

export default UploadImage;
