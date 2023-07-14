import axios from "axios";
const API_URL = "https://dashboard.patapila.org/api/publicProfileURL/";

const getpublicProfileURL = (id) => {
  return axios.post(API_URL + "getUserPublicProfileURL", {
    id
  });
};

const DonorServices = {
  getpublicProfileURL
}

export default DonorServices;