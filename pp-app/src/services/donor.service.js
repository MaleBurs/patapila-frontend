import axios from "axios";
const API_URL = "http://localhost:8080/api/publicProfileURL/";

const getpublicProfileURL = (id) => {
  return axios.post(API_URL + "getUserPublicProfileURL", {
    id
  });
};

const DonorServices = {
  getpublicProfileURL
}

export default DonorServices;