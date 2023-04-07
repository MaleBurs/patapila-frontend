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
import InformationColumn from "./InformationColumn";
import UploadProfileImage from "./UploadProfileImage";
import ChangePasswordOptionSection from "./ChangePasswordOptionSection";
import UserInformationSection from "../Profile/UserInformationSection";
import TwoColumnsPage from "../Utiles/TwoColumnsPage";

const UserSettings = () => {
  const [setRequestToChangeDonation] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const userData = [{title: "Nombre", information: currentUser.name+' '+currentUser.lastname},{title:"Email", information:currentUser.email}];
  const onCloseChangeDonationForm = () => setRequestToChangeDonation(false);
  const {subscriptionData} = useCurrentUser()

  return (
    <>
        <div className="static z-10 flex flex-col space-y-10 min-w-screen pb-10">

        <UserInformationSection
            description="Administrá tu cuenta y tus suscripciones. "
            backToHome={true}
            select="ajustes"
        ></UserInformationSection>
        
        <TwoColumnsPage 
        column1={
            <Card 
            width=""
            title="Perfil de Usuario"
            content={
                <>
                <UploadProfileImage/>
                <InformationColumn information={userData}/>
                </>
            }
            />
        } 
        column2={
            <>
            <Card
            width=""
            title="Cambiar Contraseña"
            content={
                <ChangePasswordOptionSection></ChangePasswordOptionSection>
            }
            />
            {subscriptionData ?
            <SubscriptionContextProvider>
            <FrequencyContextProvider>
            <SubModContextProvider>
            <AmountContextProvider>
                <Card 
                width=""
                title="Modificar suscripción" 
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
    </>
  );
};
export default UserSettings;