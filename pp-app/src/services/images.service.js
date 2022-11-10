import axios from "axios";
import AuthService from "./auth.service";

const upload = async(file) => {
    const fd = new FormData()
    fd.append('file', file)
    await axios.post(`https://pp-app-backend.herokuapp.com/api/profile/picture/${AuthService.getCurrentUser().id}`, fd)
}

const getImageUrl = async() => {
    const { data } = await axios.get(`https://pp-app-backend.herokuapp.com/api/profile/picture/${AuthService.getCurrentUser().id}`, { responseType: 'blob' })
    const blob = new Blob([data], { type: 'image' })
    return URL.createObjectURL(blob)
}
const getMilestoneUrl = async(milestoneId) => {
    const { data } = await axios.get(`https://pp-app-backend.herokuapp.com/api/milestone/picture/${milestoneId}`, { responseType: 'blob' })
    const blob = new Blob([data], { type: 'image' })
    return URL.createObjectURL(blob)
}


const ImageService = {
    upload,
    getImageUrl,
    getMilestoneUrl,
}

export default ImageService;