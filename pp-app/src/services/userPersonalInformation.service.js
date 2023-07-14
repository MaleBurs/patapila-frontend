import axios from "axios";
const API_URL = "https://dashboard.patapila.org/api/userInformation/";


const updateUserPersonalInformation = (userId, city, country, dateOfBirth, phoneNumber) => {
    return axios.post(API_URL + "updateUserPersonalInformation", {
        userId,
        city,
        country,
        dateOfBirth,
        phoneNumber
    });
};
const getUserPersonalInformation = (userId) => {
    return axios.post(API_URL + "getUserPersonalInformation", {
        userId,
    });
};

const updateUserPersonalInformationInLocalStorage = async (userId) => {
    const response = await axios
      .post(API_URL + "getUserPersonalInformation", { userId });
    if (response) {
      localStorage.setItem("userPersonalInf", JSON.stringify(response.data));
    }
    return response.data;
  };

  const getUserPersonalInf = () => {
    return JSON.parse(localStorage.getItem("userPersonalInf"));
  };

const PersonalInformationServices = {
    updateUserPersonalInformation,
    getUserPersonalInformation,
    getUserPersonalInf,
    updateUserPersonalInformationInLocalStorage
}

export default PersonalInformationServices;