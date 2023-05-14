import axios from "axios";
const API_URL = "http://localhost:8080/api/publicProfile/";

const updatePublicProfileInformation = (userId, linkedInProfile, facebookProfile, twitterProfile, instagramProfile, headerText, biography, chosenCoverPhotoId ) => {
  return axios.post(API_URL + "updatePublicProfileInformation", {
    userId,
    linkedInProfile,
    facebookProfile,
    twitterProfile,
    instagramProfile,
    headerText,
    biography,
    chosenCoverPhotoId
  });
};
const getPublicProfileInformation = (userId) => {
    return axios.post(API_URL + "getPublicProfileInformation", {
        userId,
    });
  };
const updatedPublicProfileConfigurationInLocalStorage = async (userId) => {
  const response = await axios.post(API_URL + "getPublicProfileInformation", { userId });
  if (response) {
      localStorage.setItem("publicProfileInf", JSON.stringify(response.data));
  }
  return response.data;
}

const getPublicProfileInf = () => {
  return JSON.parse(localStorage.getItem("publicProfileInf"));
};
const PublicProfileInformationServices = {
    updatePublicProfileInformation,
    getPublicProfileInformation,
    updatedPublicProfileConfigurationInLocalStorage,
    getPublicProfileInf
}

export default PublicProfileInformationServices;