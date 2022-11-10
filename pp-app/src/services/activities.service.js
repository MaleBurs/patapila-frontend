import axios from "axios";
const API_URL = "https://pp-app-backend.herokuapp.com/api/activities/";

const getUserActivities = (id) => {
  return axios.post(API_URL + "getUserActivities", {
    id
  });
};
const createActivity =  (title, description, userId) => {
  return axios.post(API_URL + "createActivity",{
    title, 
    description, 
    userId
    });
}

const ActServices = {
    getUserActivities,
    createActivity,
  }

export default ActServices;
