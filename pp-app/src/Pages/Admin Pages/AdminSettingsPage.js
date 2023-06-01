import React from "react";
import AuthService from "../../services/auth.service";
import AdminNavBar from "../../Components/NavBars/AdminNavBar";
import AdminSettings from "../../Components/Settings/AdminSettings";
import { CurrentAdminContextProvider } from "../../Context/CurrentAdminContext";

const UserSettingsPage = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <>
      <div className="mx-auto relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
      {(currentUser) ? (
      <>
        <CurrentAdminContextProvider>
        <AdminNavBar/>
        <div className="mx-auto z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 h-screen bg-cover place-content-center">
        {currentUser ? 
        <AdminSettings/> 
        :
        <></>
        }
        </div>
        </CurrentAdminContextProvider> 
      </>
      ) : (<></>)
    }
    </div> 
    </>
  );
};
export default UserSettingsPage;