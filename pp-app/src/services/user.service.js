import axios from "axios";
const API_URL = "https://dashboard.patapila.org/api/test/";
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user");
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
}
export default UserService;