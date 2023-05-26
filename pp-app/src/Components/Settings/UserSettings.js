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
import PersonalInformationServices from "../../services/userPersonalInformation.service";
import 'react-phone-number-input/style.css';

import { TextInput, FullDatePicker, PhoneNumberInput, CountryCitySelector } from "./MyInputs";
import { isPossiblePhoneNumber } from "react-phone-number-input";


const UserSettings = () => {
  const {userPersonalInf} = useCurrentUser();
  const [setRequestToChangeDonation] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const onCloseChangeDonationForm = () => setRequestToChangeDonation(false);
  const {subscriptionData} = useCurrentUser()
  const [name, setName] = useState(currentUser.name);
  const [lastname, setLastname] = useState(currentUser.lastname);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [birthday, setBirthday] = useState(userPersonalInf.dateOfBirth);
  const [celphone, setCelphone] = useState(userPersonalInf.phoneNumber);
  const [country, setCountry] = useState(userPersonalInf.country);
  const [city, setCity] = useState(userPersonalInf.city);
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeName = (e) => setName(e.target.value);
  const onChangeLastname = (e) => setLastname(e.target.value);
  const onChangeCelphone = (newCelphone) => setCelphone(newCelphone);
  const onChangeBirthday = (newDate) => setBirthday(newDate);
  const onChangeCity = (newCity) => setCity(newCity);
  const onChangeCountry = (newCountry) => setCountry(newCountry);
  
  const changeLoadingState = () =>{
    setLoading(current => !current);
  }

  const userInformation = bringUserInformation(name, onChangeName, lastname, onChangeLastname, birthday, onChangeBirthday, celphone, onChangeCelphone, country, onChangeCountry, city, onChangeCity);

  function handleDataChange() {
    let completedOperations = 0;
    const totalOperations = (file ? 1 : 0) + (name !== currentUser.name || lastname !== currentUser.lastname ? 1 : 0) + (birthday !== currentUser.birthday || celphone !== currentUser.celphone || country !== currentUser.country || city !== currentUser.city ? 1 : 0);
  
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
  
    if (birthday !== currentUser.birthday || celphone !== currentUser.celphone || country !== currentUser.country || city !== currentUser.city) {
      if (celphone) {
        if (!isPossiblePhoneNumber(celphone)) {
          setErrorMessage("La longitud del numero de celular no es valida.");
          return;
        }
      }
      PersonalInformationServices.updateUserPersonalInformation(currentUser.id, city, country, birthday, celphone).then(
        () => {
          PersonalInformationServices.updateUserPersonalInformationInLocalStorage(currentUser.id).then(
            () => {
              setCurrentUser(PersonalInformationServices.getUserPersonalInf());
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
  
    if (!file && !name && !lastname && birthday === currentUser.birthday && celphone === currentUser.celphone && country === currentUser.country && city === currentUser.city) {
      changeLoadingState();
      return;
    }
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

function bringUserInformation(name, onChangeName, lastname, onChangeLastname, birthday, onChangeBirthday, celphone, onChangeCelphone, country, onChangeCountry, city, onChangeCity ) {
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
    {
      title: "Fecha de nacimiento",
      content: [
        {
          title:"YYYY-MM-DD",
          value: birthday,
          onChange: onChangeBirthday,
          validations: [],
          component: FullDatePicker,
        }
      ],
    },
    {
      title: "Celular",
      content: [
        {
          title: "Celular",
          value: celphone,
          onChange: onChangeCelphone,
          validations: [],
          component: PhoneNumberInput,
        },
      ]  
    },
    {
      title: "Lugar de Residencia",
      content: [
        {
          title: "País",
          value: {
            country: country,
            city: city,
          },
          onChange: {
            onChangeCountry: onChangeCountry,
            onChangeCity: onChangeCity,
          },
          validations: [],
          component: CountryCitySelector,
        },
      ]  
    }
  ];
}


