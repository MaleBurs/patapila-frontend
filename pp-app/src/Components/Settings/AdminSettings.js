import React, { useState } from "react";
import "../../App.css"
import AuthService from "../../services/auth.service";
import Card from "../Utiles/Card";
import InformationColumn from "../Forms/UserInformationForms/InformationColumn";
import UploadProfileImage from "./UploadProfileImage";
import ChangeAccountInformationSection from "./ChangeAccountInformationSection";
import TwoColumnsPage from "../Utiles/TwoColumnsPage";
import ValidationFunctions from "../../functions/validations";
import ImageService from "../../services/images.service";
import 'react-phone-number-input/style.css';
import { TextInput} from "./MyInputs";
import { useCurrentAdmin } from "../../Context/CurrentAdminContext";

const AdminSettings = () => {
  const {profilePicture} = useCurrentAdmin();
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [name, setName] = useState(currentUser.name);
  const [lastname, setLastname] = useState(currentUser.lastname);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeName = (e) => setName(e.target.value);
  const onChangeLastname = (e) => setLastname(e.target.value);
  
  const changeLoadingState = () =>{
    setLoading(current => !current);
  }

  const userInformation = bringUserInformation(name, onChangeName, lastname, onChangeLastname); 

  function handleDataChange() {
    let completedOperations = 0;
    const totalOperations = (file ? 1 : 0) + (name !== currentUser.name || lastname !== currentUser.lastname ? 1 : 0);
  
    changeLoadingState();
    if (file) {
      ImageService.setUserProfilePicture(currentUser.id, file).then(() => {
        AuthService.updatedCurrentUserInLocalStorage(currentUser.id).then(() => {
          setCurrentUser(AuthService.getCurrentUser());
          completedOperations++;
          if (completedOperations === totalOperations) {
            window.location.reload();
          }
        });
      });
    }
    if (name !== currentUser.name || lastname !== currentUser.lastname) {
      AuthService.updateUserInformation(name, lastname, currentUser.id).then(
        () => {
          AuthService.updatedCurrentUserInLocalStorage(currentUser.id).then(() => {
            setCurrentUser(AuthService.getCurrentUser());
            completedOperations++;
            if (completedOperations === totalOperations) {
              window.location.reload();
            }
          });
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          setErrorMessage(resMessage);
        }
      );
    }
  
    if (!file && !name && !lastname) {
      changeLoadingState();
      return;
    }
  }
  
  return (
    <>
        <div className="static z-10 flex flex-col space-y-10 min-w-screen pb-10 py-10 border-t border-[#e7e6e6] almostWhiteBg">

        <div className="px-32">
        <TwoColumnsPage 
        column1={
            <Card 
            width=""
            title="Información del Usuario"
            content={
                <>
                <UploadProfileImage file={file} setFile={setFile} profilePicture={profilePicture}/>
                <InformationColumn message={errorMessage} onChangeMessage={setErrorMessage} information={userInformation} submitFunction={handleDataChange} loading={()=>loading}/>
                </>
            }
            />
        } 
        column2={
            <>
            <Card
            width=""
            title="Cuenta"
            content={
                <ChangeAccountInformationSection></ChangeAccountInformationSection>
            }
            />
            </>
        }/>
        </div>
    </div>  
    </>
  );
};
export default AdminSettings;

function bringUserInformation(name, onChangeName, lastname, onChangeLastname) { //, birthday, onChangeBirthday, celphone, onChangeCelphone, country, onChangeCountry, city, onChangeCity ) {
  return [
    {
      title: "Nombre Completo",
      content: [
        {
          title: "Nombre",
          value: name,
          onChange: onChangeName,
          validations: [ValidationFunctions.vstrings, ValidationFunctions.required],
          component: TextInput,
        },
        {
          title: "Apellido",
          value: lastname,
          onChange: onChangeLastname,
          validations: [ValidationFunctions.vstrings, ValidationFunctions.required],
          component: TextInput,
        },
      ]
    },
  ];
}


