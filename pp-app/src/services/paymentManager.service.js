import axios from "axios";
const API_URL = "http://localhost:8080/api/payment/";


const createPaymentSubs =  (user, amount, date) => {
  return axios.post(API_URL + "createPaymentSubs",{
    user,  
    amount,
    date
    });
}

const deletePaymentSubs =  (id) => {
  return axios.post(API_URL + "deletePaymentSubs",{
    id,
  });
}

const deletePaymentSubsFromSuggested =  (id) => {
  return axios.post(API_URL + "deletePaymentSubsFromSuggested",{
    id,
  });
}

const getPaymentSubs =  (user, amount, date) => {
  return axios.post(API_URL + "getPaymentSubs", {});
}

const getPaymentSubsNE =  (user, amount, date) => {
  return axios.post(API_URL + "getPaymentSubsNE", {});
}

const getPaymentSubsE =  (user, amount, date) => {
  return axios.post(API_URL + "getPaymentSubsE", {});
}

const emmitPaymentSubs =  (id) => {
  return axios.post(API_URL + "emmitPaymentSubs",{
    id,
  });
}


const PaymentManagerService = {
  createPaymentSubs,
  getPaymentSubs,
  deletePaymentSubs,
  getPaymentSubsNE,
  getPaymentSubsE,
  deletePaymentSubsFromSuggested,
  emmitPaymentSubs
}

export default PaymentManagerService;
