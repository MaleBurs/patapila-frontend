import axios from "axios";
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
const getMilestoneUrl = async(milestoneId) => {
    const { data } = await axios.get(`http://localhost:8080/milestone/picture/${milestoneId}`, { responseType: 'blob' })
    const blob = new Blob([data], { type: 'image' })
    return URL.createObjectURL(blob)
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
    const response = await axios.get(`http://localhost:8080/api/images/${id}`, {
        responseType: 'arraybuffer' // Set the response type to arraybuffer to receive the image data as binary
    });

    const blob = new Blob([response.data], { type: 'image/png' }); // Convert the binary data to a Blob object
    return URL.createObjectURL(blob); // Create a URL representing the Blob object, which can be used as the source for an <img> element
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


const ImageService = {
    upload,
    getImageUrl,
    getMilestoneUrl,
    getImage,
    uploadImage,
    convertBinaryImageToUsableImage
}

export default ImageService;