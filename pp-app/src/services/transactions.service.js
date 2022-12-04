import axios from "axios";
const API_URL = "http://localhost:8080/api/payment/";
const getOnlyTimeTransactions = (limit, offset) => {
  return axios.post(API_URL + "getOnlyTimeTransactions", {
    limit,
    offset,
  });
};
const getRecurrentTransactions = (limit, offset) => {
  return axios.post(API_URL + "getRecurrentTransactions", {
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

const AdminServices = {
    getRecurrentTransactions,
    getOnlyTimeTransactions,
    getMonthIncome,
    getSubscriptions,
    modifyTransactionState
  }

export default AdminServices;
