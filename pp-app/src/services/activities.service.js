import axios from "axios";
const API_URL = "https://dashboard.patapila.org/api/activities/";

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
const createActivity =  (activityTypeId, description, userId) => {
  return axios.post(API_URL + "createActivity",{
    activityTypeId, 
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
