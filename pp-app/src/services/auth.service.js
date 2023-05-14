import axios from "axios";
import ImageService from "./images.service";
import PublicProfileConfigurationServices from "./publicProfileConfiguration.service";
import PublicProfileInformationServices from "./publicProfileInformation.service";
import PersonalInformationServices from "./userPersonalInformation.service";

const API_URL = "http://localhost:8080/api/auth/";
const register = (name,lastname, email, password, role) => {
  return axios.post(API_URL + "signup", {
    name,
    lastname,
    email,
    password,
    role
  });
};
const updatePasswordViaEmail = (token, password) => {
  return axios.post(API_URL + "updatePasswordViaEmail", {
    token,
    password,
  });
};
const updatePasswordViaSettings= (id,oldpassword, password) => {
  return axios.post(API_URL + "changePasswordViaSettings", {
    id,
    oldpassword,
    password,
  });
};
const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        response.data.profilePicture ? ImageService.saveCompressedVersionToLocalStorage(response.data.profilePicture) : localStorage.setItem("compressedImage", null);
        delete response.data.profilePicture;
        localStorage.setItem("user", JSON.stringify(response.data));
        PublicProfileConfigurationServices.getPublicProfileConfiguration(response.data.id).then((userPublicProfileConfig) => {
          localStorage.setItem("publicProfileConfig", JSON.stringify(userPublicProfileConfig.data));
        });
        PublicProfileInformationServices.getPublicProfileInformation(response.data.id).then((userPublicProfileInfo) => {
          localStorage.setItem("publicProfileInf", JSON.stringify(userPublicProfileInfo.data));
        });
        PersonalInformationServices.getUserPersonalInformation(response.data.id).then((userPersonalInformation) => {
          localStorage.setItem("userPersonalInf", JSON.stringify(userPersonalInformation.data));
        } );
      }
      return response.data;
    });
};
const sendMailTokenToResetPassword = (email) => {
  return axios.post(API_URL + "sendMailTokenToResetPassword", {
      email,
    })
};
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("publicProfileConfig");
  localStorage.removeItem("publicProfileInf");
  localStorage.removeItem("userPersonalInf");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUserPersonalInf = () => {
  return JSON.parse(localStorage.getItem("userPersonalInf"));
};

const getPublicProfileConfig = () => {
  return JSON.parse(localStorage.getItem("publicProfileConfig"));
};

const getPublicProfileInf = () => {
  return JSON.parse(localStorage.getItem("publicProfileInf"));
};

const getUserProfilePhoto = () => {
  return localStorage.getItem("compressedImage")===null
   ?  null :  localStorage.getItem("compressedImage") ;
};

const updatedCurrentUserInLocalStorage = async (userId) => {
  const response = await axios
    .post(API_URL + "getCurrentUser", { userId });
  if (response) {
    ImageService.saveCompressedVersionToLocalStorage(response.data.profilePicture);
    delete response.data.profilePicture;
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const findUserById = async (id) => {
    try {
      const response = await axios.post(API_URL + "findUserById", {
        id,
      });
      return response;
    } catch (e) {
        console.log(e);
    }
};


const getUserMilestones = async (userId) => {
  try {
    const response = await axios.post("http://localhost:8080/api/milestone/getUserWithMilestones", {
      userId,
    });
    return response;
  } catch (e) {
      console.log(e);
  }
};

const getUserLifeImpact = async (userId) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/getUserLifeImpact", {
      userId,
    });
    return response;
  } catch (e) {
      console.log(e);
  }
};

const updateUserInformation = async (name, lastname, userId) => {
  try {
    const response = await axios.post(API_URL + "updateUserInformation", {
      name,
      lastname,
      userId,
    });
    return response;
  } catch (e) {
      console.log(e);
  }
};

const changeUserEmail = async (email, oldPassword, userId) => {
  return await axios.post(API_URL + "changeUserEmail", {
      email,
      oldPassword,
      userId,
    });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserProfilePhoto,
  sendMailTokenToResetPassword,
  updatePasswordViaEmail,
  updatePasswordViaSettings,
  findUserById,
  getUserLifeImpact,
  getUserMilestones,
  updateUserInformation,
  updatedCurrentUserInLocalStorage,
  changeUserEmail,
  getPublicProfileConfig,
  getPublicProfileInf,
  getUserPersonalInf
}
export default AuthService;