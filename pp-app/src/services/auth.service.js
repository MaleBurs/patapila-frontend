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
const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "signin", {
      email,
      password,
    });

    if (response.data.email) {
      if (response.data.profilePicture) {
        ImageService.saveCompressedVersionToLocalStorage(response.data.profilePicture);
      } else {
        localStorage.setItem("compressedImage", null);
      }

      delete response.data.profilePicture;
      localStorage.setItem("user", JSON.stringify(response.data));

      const userPublicProfileConfig = await PublicProfileConfigurationServices.getPublicProfileConfiguration(response.data.id);
      localStorage.setItem("publicProfileConfig", JSON.stringify(userPublicProfileConfig.data));

      const userPublicProfileInfo = await PublicProfileInformationServices.getPublicProfileInformation(response.data.id);
      localStorage.setItem("publicProfileInf", JSON.stringify(userPublicProfileInfo.data));

      const userPersonalInformation = await PersonalInformationServices.getUserPersonalInformation(response.data.id);
      localStorage.setItem("userPersonalInf", JSON.stringify(userPersonalInformation.data));
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
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



const getUserProfilePhoto = () => {
  return localStorage.getItem("compressedImage")===null
   ?  null :  localStorage.getItem("compressedImage") ;
};

const updatedCurrentUserInLocalStorage = async (id) => {
  const response = await axios
    .post(API_URL + "findUserById", { id });
  if (response) {
    if (response.data.profilePicture) {
      ImageService.saveCompressedVersionToLocalStorage(response.data.profilePicture);
    } else {
      localStorage.setItem("compressedImage", null);
    }
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
  getUserMilestones,
  updateUserInformation,
  updatedCurrentUserInLocalStorage,
  changeUserEmail,
}
export default AuthService;