import axios from "axios";
const API_URL = "http://localhost:8080/api/activities/";

const getUserActivities = (id) => {
  return axios.post(API_URL + "getUserActivities", {
    id
  });
};
const getUserLatesActivities = (id) => {
  return axios.post(API_URL + "getUserLatesActivities", {
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
    getUserLatesActivities
  }

export default ActServices;
