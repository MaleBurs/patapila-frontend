import axios from "axios";
const API_URL = "http://localhost:8080/api/publicProfile/";

const updatePublicProfileInformation = (userId, publicProfileUrl, linkedInProfile, facebookProfile, twitterProfile, instagramProfile, headerText ) => {
  return axios.post(API_URL + "updatePublicProfileInformation", {
    userId,
    publicProfileUrl,
    linkedInProfile,
    facebookProfile,
    twitterProfile,
    instagramProfile,
    headerText,
  });
};
const getPublicProfileInformation = (userId) => {
    return axios.post(API_URL + "getPublicProfileInformation", {
        userId,
    });
  };

const PublicProfileInformationServices = {
    updatePublicProfileInformation,
    getPublicProfileInformation
}

export default PublicProfileInformationServices;