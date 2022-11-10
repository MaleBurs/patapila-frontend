import React, {useEffect} from "react";
import AuthService from "../../services/auth.service";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import { CurrentUserContextProvider} from "../../Context/CurrentUserContext";
import UserInformationSection from "../../Components/Profile/UserInformationSection";
import CopyLinkSection from "../../Components/Profile/CopyLinkSection";
import MilestonesProgress from "../../Components/Profile/MilestonesProgress";
import LatestActivity from "../../Components/Profile/LatestActivty";


const UserHome = () => {
  const currentUser = AuthService.getCurrentUser();
  const isAdmin = () => {
    return JSON.stringify((AuthService.getCurrentUser()).roles) === JSON.stringify(["ROLE_ADMIN"]);
  };
  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {(currentUser) ? (
      <>
      {(isAdmin())  ?
        <UserNavBar navigation={navigationOptions.adminNavigation} currentUser={currentUser}/>
          :
        <UserNavBar navigation={navigationOptions.userNavigation} currentUser={currentUser}/>}
        <CurrentUserContextProvider>

          <UserInformationSection></UserInformationSection>
          
          <div className="flex flex-col md:flex-row px-10 md:px-12 lg:px-32 md:space-x-5 lg:space-x-16 bg-[#f6f7f36b]">
            <div className="md:basis-3/5">
              <MilestonesProgress/>
            </div>
            <div className="md:basis-2/5 flex flex-col space-y-4">
              <CopyLinkSection/>
              <LatestActivity/>
            </div>
          </div>
        
        </CurrentUserContextProvider>
        </>
      ) : (
      <></>
    )}
    </div> 
    </>
  );
};
export default UserHome;