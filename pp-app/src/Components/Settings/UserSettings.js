import React, { useState } from "react";
import "../../App.css"
import AuthService from "../../services/auth.service";
import ChangeDonationFromProfileForm from "../Forms/Donations/DonationModification/ChangeDonarionFromProfileForm";
import { SubModContextProvider} from "../../Context/SubscriptionModificationContext";
import { useCurrentUser } from "../../Context/CurrentUserContext";
import ModifyStatePopUp from "../Forms/Donations/DonationModification/ModifyStatePopUp";
import { AmountContextProvider } from  '../../Context/AmountContext'
import { FrequencyContextProvider } from "../../Context/FrequencyContext";
import { SubscriptionContextProvider } from "../../Context/SubscriptionContext";
import Card from "../Utiles/Card";
import InformationColumn from "../Forms/UserInformationForms/InformationColumn";
import UploadProfileImage from "./UploadProfileImage";
import ChangeAccountInformationSection from "./ChangeAccountInformationSection";
import UserInformationSection from "../Profile/UserInformationSection";
import TwoColumnsPage from "../Utiles/TwoColumnsPage";
import ValidationFunctions from "../../functions/validations";
import ImageService from "../../services/images.service";

const UserSettings = () => {
  const [setRequestToChangeDonation] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const onCloseChangeDonationForm = () => setRequestToChangeDonation(false);
  const {subscriptionData} = useCurrentUser()
  const [name, setName] = useState(currentUser.name);
  const [lastname, setLastname] = useState(currentUser.lastname);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };
  const changeLoadingState = () =>{
    setLoading(current => !current);
  }

  const userInformation = bringUserInformation(name, onChangeName, lastname, onChangeLastname);

  function handleDataChange({ setMessage }) {
    changeLoadingState();
    AuthService.updateUserInformation(name, lastname, currentUser.id).then(
      () => {
        AuthService.updatedCurrentUserInLocalStorage(currentUser.id).then(
          setCurrentUser(AuthService.getCurrentUser())
        );
        ImageService.upload(file).then(() => { window.location.reload(); });
        //window.location.reload();
        changeLoadingState();
      },
      (error) => {
        const resMessage = (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  }
  
  return (
    <>
        <div className="static z-10 flex flex-col space-y-10 min-w-screen pb-10">

        <UserInformationSection
            description="Administrá tu cuenta y tus suscripciones. "
            backToHome={true}
            select="ajustes"
        ></UserInformationSection>
        
        <div className="px-32">
        <TwoColumnsPage 
        column1={
            <Card 
            width=""
            title="Información del Usuario"
            content={
                <>
                <UploadProfileImage file={file} setFile={setFile}/>
                <InformationColumn information={userInformation} submitFunction={handleDataChange} loading={()=>loading}/>
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
            {subscriptionData ?
            <SubscriptionContextProvider>
            <FrequencyContextProvider>
            <SubModContextProvider>
            <AmountContextProvider>
                <Card 
                width=""
                title="Suscripción" 
                content={<ChangeDonationFromProfileForm onClose={onCloseChangeDonationForm}/>}
                popup={<ModifyStatePopUp></ModifyStatePopUp> }
                /> 
            </AmountContextProvider>
            </SubModContextProvider>  
            </FrequencyContextProvider>  
            </SubscriptionContextProvider>
            : null}
            </>
        }/>
        </div>
    </div>  
    </>
  );
};
export default UserSettings;

function bringUserInformation(name, onChangeName, lastname, onChangeLastname) {
  return [
    {
      title: "Nombre Completo",
      content: [
        {
          title: "Nombre",
          value: name,
          onChange: onChangeName,
          validations: [ValidationFunctions.vstrings, ValidationFunctions.required],
        },
        {
          title: "Apellido",
          value: lastname,
          onChange: onChangeLastname,
          validations: [ValidationFunctions.vstrings, ValidationFunctions.required],
        },
      ]
    },
  ];
}
