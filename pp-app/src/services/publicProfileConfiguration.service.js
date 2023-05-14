import axios from "axios";
const API_URL = "http://localhost:8080/api/publicProfileConfig/";


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

const PublicProfileConfigurationServices = {
    updatePublicProfileConfiguration,
    getPublicProfileConfiguration
}

export default PublicProfileConfigurationServices;