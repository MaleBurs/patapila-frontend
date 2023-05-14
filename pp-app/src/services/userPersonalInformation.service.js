import axios from "axios";
const API_URL = "http://localhost:8080/api/userInformation/";


const updateUserPersonalInformation = (userId, city, country, address, dateOfBirth, phoneNumber) => {
    return axios.post(API_URL + "updateUserPersonalInformation", {
        userId,
        city,
        country,
        address,
        dateOfBirth,
        phoneNumber
    });
};
const getUserPersonalInformation = (userId) => {
    return axios.post(API_URL + "getUserPersonalInformation", {
        userId,
    });
};

const PersonalInformationServices = {
    updateUserPersonalInformation,
    getUserPersonalInformation
}

export default PersonalInformationServices;