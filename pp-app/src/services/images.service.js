import axios from "axios";
import { Buffer } from 'buffer';
import AuthService from "./auth.service";

async function createFileFromPath(path) {
    const response = await fetch(path);
    const contentType = response.headers.get('Content-Type');
    const extension = path.substring(path.lastIndexOf('.') + 1);
    const type = contentType || `image/${extension}`;
    const blob = await response.blob();
    const file = new File([blob], path.substring(path.lastIndexOf('/') + 1), { type });
    return file;
}

// Upload an image
const uploadImage = async (path) => {
    createFileFromPath(path).then(async file => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post('http://localhost:8080/api/upload-image', formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
    });
};
//¿Cómo llamo a la función uploadImage?
//Para subir una imagen a la BD
//import Handshake from "../Images/Handshake.png"
//ImageService.uploadImage(Handshake); //Se sube la imagen Handshake a la BD :)  
  
// Retrieve an image by ID
const getImage = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/images/${AuthService.getCurrentUser().id}`);
    console.log(response)
    return response.data
};

//¿Cómo llamo a la función getImage? Esta función retorna una promesa
//Recurperar la imagen con id=2
//const [image, setImage] = React.useState('');  
//useEffect(() => {
//    ImageService.getImage(2).then(resp=> setImage(resp));
//}, [])
//<img src={image} alt="imageID2" />
  
const convertBinaryImageToUsableImage = (buffer) => {
    const uint8Array = new Uint8Array(buffer.data);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    const imgSrc = `data:image/png;base64,${base64String}`;
    return imgSrc;
}

const convertBiggerBinaryImageToUsableImage = (buffer) => {
    const uint8Array = new Uint8Array(buffer.data);
    const blob = new Blob([uint8Array], { type: 'image/png' });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
}
  

const setUserProfilePicture = async (id, file) =>{ 
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', id);
    const response = await axios.post('http://localhost:8080/api/auth/setUserProfilePicture', formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}


function saveCompressedVersionToLocalStorage(profilePicture) {
    const dataURL = Buffer.from(profilePicture.data).toString('base64');
  
    const img = new Image();
    img.src = `data:image/${profilePicture.type};base64,${dataURL}`;
  
    img.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 100; // Set the desired width
      canvas.height = 100; // Set the desired height
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedDataUrl = canvas.toDataURL(`image/${profilePicture.type}`, 0.5); // Set the desired compression level (0-1)
  
      try {
        localStorage.setItem('compressedImage', compressedDataUrl);
        console.log('Compressed image saved to local storage.');
      } catch (e) {
        console.error('Error saving compressed image to local storage:', e);
      }
    });
  }

const getMilestoneUrl = async(milestoneId) => {
    const { data } = await axios.get(`http://localhost:8080/milestone/picture/${milestoneId}`, { responseType: 'blob' })
    const blob = new Blob([data], { type: 'image' })
    return URL.createObjectURL(blob)
}

const upload = async(file) => {
    const fd = new FormData()
    fd.append('file', file)
    return axios.post(`http://localhost:8080/profile/picture/${AuthService.getCurrentUser().id}`, fd)
}

const getImageUrl = async() => {
    const { data } = await axios.get(`http://localhost:8080/profile/picture/${AuthService.getCurrentUser().id}`, { responseType: 'blob' })
    const blob = new Blob([data], { type: 'image' })
    return URL.createObjectURL(blob)
}

const ImageService = {
    getImage,
    getImageUrl,
    uploadImage,
    upload,
    convertBinaryImageToUsableImage,
    convertBiggerBinaryImageToUsableImage,
    setUserProfilePicture,
    saveCompressedVersionToLocalStorage,
    getMilestoneUrl,
}

export default ImageService;