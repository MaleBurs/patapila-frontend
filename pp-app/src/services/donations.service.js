import axios from "axios";
const API_URL = "http://localhost:8080/api/payment/";
const API_MP_URL = "http://localhost:8080/api/paymentmp/";

const generateTransaction = (userId, amount, type) => {
  return axios.post(API_URL + "createTransaction", {
    userId,
    amount,
    type
  });
};
const createAndPayTransaction = (userId, amount, type, name, lastname) => {
  return axios.post(API_MP_URL + "createAndPayTransaction", {
    userId,
    amount,
    type,
    name,
    lastname
  });
};

const getPreference = async (id) => {
  return axios.post(API_MP_URL + "getPreference", {
      id,
    });
}

const generateSubscription = (userId, amount, type, frequency, nextPaymentDate) => {
  return axios.post(API_URL + "createSubscription", {
    userId,
    amount,
    type,
    frequency,
    nextPaymentDate
  });
};

const addReferred = (userReferredId, userReferrerId) => {
  return axios.post(API_URL + "addReferred", {
    userReferredId,
    userReferrerId,
  });
};

const modifySubscriptionState  = (subscriptionId, state) => {
  return axios.post(API_URL + "modifySubscriptionState", {
    subscriptionId,
    state,
  }); };
  
const modifySubscription = (subscriptionId, amount, frequency, nextPaymentDate) => {
  return axios.post(API_URL + "modifySubscription", {
    subscriptionId,
    amount,
    frequency,
    nextPaymentDate
  });
};

const getSubscription = async (userId) => {
  try {
    const response = await axios.post(API_URL + "getSubscription", {
      userId,
    });
    return response;
  } catch (e) {
      console.log(e);
  }
}

const subscriptionsByMonth = async (month,year) => {
  try {
    const response = await axios.post(API_URL + "getSubscriptionsStatesByMonth",{
      month,
      year,
    });
    return response;
  } catch (e) {
      console.log(e);
  }
}


const DonationService = {
  generateTransaction,
  generateSubscription,
  getSubscription,
  modifySubscriptionState,
  modifySubscription,
  subscriptionsByMonth,
  addReferred,
  createAndPayTransaction,
  getPreference
}
export default DonationService;