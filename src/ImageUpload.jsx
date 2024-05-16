import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "rfricega");

    const response = await axios.post("http://api.cloudinary.com/v1_1/dyypwqwgo/image/upload", data);
    console.log(response.data);

    setImages([...images, response.data.secure_url]);
  };

  return (
    <>
      <h1>Seleccionar imagen</h1>
      <div>
        <input type="file" accept="image/*" onChange={changeUploadImage} />
        <div>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Imagen ${index + 1}`}
                style={{ width: '200px', height: '200px' }}
              />
              <button onClick={() => setImages(images.filter((_, i) => i !== index))}>
                Eliminar Imagen
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
