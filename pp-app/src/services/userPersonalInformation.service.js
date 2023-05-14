import axios from "axios";
const API_URL = "http://localhost:8080/api/userInformation/";


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
    console.log("userPersonalInfoRespone"+response.data);
    console.log("antes"+localStorage.getItem("userPersonalInf"));
    if (response) {
      localStorage.setItem("userPersonalInf", JSON.stringify(response.data));
    }
    console.log("luego"+localStorage.getItem("userPersonalInf"));
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