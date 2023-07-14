import axios from "axios";
const API_URL = "https://dashboard.patapila.org/api/publicProfileConfig/";


const updatePublicProfileConfiguration = (userId, showLifeImpact, showReferralsQuantity, showTotalAmountDonated, showReferralsTotalAmountDonated) => {
    return axios.post(API_URL + "updatePublicProfileConfiguration", {
        userId, 
        showReferralsTotalAmountDonated,
        showTotalAmountDonated,
        showLifeImpact,
        showReferralsQuantity
    });
};
const getPublicProfileConfiguration = (userId) => {
    return axios.post(API_URL + "getPublicProfileConfiguration", {
        userId,
    });
};

const updatedPublicProfileConfigurationInLocalStorage = async (userId) => {
    const response = await axios.post(API_URL + "getPublicProfileConfiguration", { userId });
    if (response) {
        localStorage.setItem("publicProfileConfig", JSON.stringify(response.data));
    }
    return response.data;
}
const getPublicProfileConfig = () => {
    return JSON.parse(localStorage.getItem("publicProfileConfig"));
  };
  
const PublicProfileConfigurationServices = {
    updatePublicProfileConfiguration,
    getPublicProfileConfiguration,
    updatedPublicProfileConfigurationInLocalStorage,
    getPublicProfileConfig
}

export default PublicProfileConfigurationServices;