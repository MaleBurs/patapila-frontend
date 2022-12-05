import axios from "axios";
const API_URL = "http://localhost:8080/api/payment/";
const API_URL_NOTIFICATIONS = "http://localhost:8080/api/notification/";


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

const getPaymentSubs =  () => {
  return axios.post(API_URL + "getPaymentSubs", {});
}

const getPaymentSubsNE =  () => {
  return axios.post(API_URL + "getPaymentSubsNE", {});
}

const getPaymentSubsE =  () => {
  return axios.post(API_URL + "getPaymentSubsE", {});
}

const emmitPaymentSubs =  (id) => {
  return axios.post(API_URL + "emmitPaymentSubs",{
    id,
  });
}

const modifyPaymentSubs =  (amount, paymentDate, id) => {
  return axios.post(API_URL + "modifyPaymentSubs",{
    amount,
    paymentDate,
    id,
  });
}

const getNotifications =  () => {
  return axios.post(API_URL_NOTIFICATIONS + "getNotifications",{
  });
}
const createNotification =  (title, description) => {
  return axios.post(API_URL_NOTIFICATIONS + "createNotification",{
    title,
    description,
  });
}
const deleteNotification =  (id) => {
  return axios.post(API_URL_NOTIFICATIONS + "deleteNotification",{
    id,
  });
}
const readNotifications =  (id) => {
  return axios.post(API_URL_NOTIFICATIONS + "readNotifications",{
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
  emmitPaymentSubs,
  modifyPaymentSubs,
  getNotifications,
  createNotification,
  deleteNotification,
  readNotifications,
}

export default PaymentManagerService;
