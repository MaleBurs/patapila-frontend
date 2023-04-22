import React from "react"
import "../../App.css"
import AuthService from "../../services/auth.service";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import FirstStep from '../../Components/Forms/Donations/MakeDonation/FirstStep';
import FrequencySection from '../../Components/Forms/Donations/MakeDonation/FrequencySection';
import { FrequencyContextProvider } from '../../Context/FrequencyContext';
import { CurrentUserContextProvider } from '../../Context/CurrentUserContext'
import { AmountContextProvider } from '../../Context/AmountContext'
import { SubscriptionContextProvider } from '../../Context/SubscriptionContext'
import ImagePageContainer from "../Registration-Autentification.js/ImagePageContainer";

const DonarPage = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
        {currentUser ? (
        <>
        <CurrentUserContextProvider> 
        <UserNavBar navigation={navigationOptions.userNavigation}/>
        <div className="mt-10"><ImagePageContainer 
        bgImage="imageBgPiesitos"
        content={
        <div className="min-h-screen min-w-screen mt-6 md:mt-3 px-5 py-12 md:p-16 flex flex-row justify-cente">
            <div className="bg-white h-fit w-screen rounded-xl lg:basis-2/5 p-10 md:p-16 lg:p-12 lg:py-14 space-y-1">
                <FrequencyContextProvider>
                    <FrequencySection></FrequencySection> 
                    <AmountContextProvider>
                    <SubscriptionContextProvider>  
                    <FirstStep/>
                    </SubscriptionContextProvider>
                    </AmountContextProvider>
                    {
                    }
                </FrequencyContextProvider>
            </div>
        </div>
        }/></div>
        </CurrentUserContextProvider>
        </>
        ) : (
        <></>
    )} 
    </div> 
    </>
  );
};
export default DonarPage;