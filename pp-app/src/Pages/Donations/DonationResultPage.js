import React from "react"
import "../../App.css"
import AuthService from "../../services/auth.service";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import DonationResult from '../../Components/Forms/Donations/DonationResult/DonationResult';
import { CurrentUserContextProvider } from '../../Context/CurrentUserContext'
import { AmountContextProvider } from '../../Context/AmountContext'
import { SubscriptionContextProvider } from '../../Context/SubscriptionContext'

const DonationResultPage = () => {
  const currentUser = AuthService.getCurrentUser();
 // const [step] = useState(0);
  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      <UserNavBar navigation={navigationOptions.userNavigation} currentUser={currentUser}/>
        {currentUser ? (
        <div className="min-h-screen min-w-screen greenBg mt-6 md:mt-12 px-5 py-12 md:p-16 flex flex-row justify-center">                    <CurrentUserContextProvider>   
                    <SubscriptionContextProvider>
                    <AmountContextProvider> 
                    <DonationResult/>
                    </AmountContextProvider>
                    </SubscriptionContextProvider>
                    </CurrentUserContextProvider>

        </div>
            ) : (
        <></>
    )} 
    </div> 
    </>
  );
};
export default DonationResultPage;