import axios from "axios";
const API_URL = "http://localhost:8080/api/payment/";
const getTransactions = (limit, offset) => {
  return axios.post(API_URL + "getTransactions", {
    limit,
    offset,
  });
};

const getSubscriptions = (limit, offset) => {
  return axios.post(API_URL + "getSubscriptions", {
    limit,
    offset,
  });
};

const getMonthIncome =  (month) => {
  return axios.post(API_URL + "getMonthIncome",{
      month,
    });
}

const modifyTransactionState =  (transactionId,state) => {
  return axios.post(API_URL + "modifyTransactionState",{
    transactionId,  
    state
    });
}

const modifyTransactionStateByPreference =  (preferenceId,state) => {
  return axios.post(API_URL + "modifyTransactionStateByPreference",{
    preferenceId,  
    state
    });
}

const AdminServices = {
    getTransactions,
    getMonthIncome,
    getSubscriptions,
    modifyTransactionState,
    modifyTransactionStateByPreference
  }

export default AdminServices;
