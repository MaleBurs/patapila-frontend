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

const DonarPage = () => {
  const currentUser = AuthService.getCurrentUser();
 // const [step] = useState(0);
  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      <UserNavBar navigation={navigationOptions.userNavigation} currentUser={currentUser}/>
        {currentUser ? (
        <div className="min-h-screen min-w-screen greenBg mt-6 md:mt-12 px-5 py-12 md:p-16 flex flex-row justify-cente">
            <div className="bg-white h-fit w-screen rounded-xl lg:basis-2/5 p-10 md:p-16 lg:p-12 lg:py-14 space-y-1">
                <FrequencyContextProvider>
                    <FrequencySection></FrequencySection>
                    <CurrentUserContextProvider>   
                    <AmountContextProvider>
                    <SubscriptionContextProvider>  
                    <FirstStep/>
                    </SubscriptionContextProvider>
                    </AmountContextProvider>
                    </CurrentUserContextProvider>
                    {
                    //Por ahora solo hay un paso al ser la donación un MONTO
                    /* <StepTitle titleText={step === 0 ? 'Únase a nosotros para combatir la desnutrición infantil' : 'Donando $3000 por mes'}/>
                    {
                    step === 0 ?
                    <FirstStep setStep={setStep}/>
                    : <SecondStep/> 
                    }*/}
                </FrequencyContextProvider>
            </div>
        </div>
            ) : (
        <></>
    )} 
    </div> 
    </>
  );
};
export default DonarPage;