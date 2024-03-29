import React from "react";
import AuthService from "../../services/auth.service";
import UserSettings from "../../Components/Settings/UserSettings";
import UserNavBar from "../../Components/NavBars/UserNavBar";
import navigationOptions from "../../Components/NavBars/navigationOptions";
import { CurrentUserContextProvider} from "../../Context/CurrentUserContext";

const UserSettingsPage = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {(currentUser) ? (
      <>
        <CurrentUserContextProvider>
        <UserNavBar navigation={navigationOptions.userNavigation}/>
        <UserSettings/>
        </CurrentUserContextProvider> 
      </>
      ) : (<></>)
    }
    </div> 
    </>
  );
};
export default UserSettingsPage;