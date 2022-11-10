import "../../App.css"
import React from "react";
import ChangePasswordForm from "../../Components/Forms/PasswordModificationForms/PasswordModificationsViaEmail/ChangePasswordForm"
import NavBar from "../../Components/NavBars/NavBar";

export default function RegistrationForm(props) {

  return (
    <>  
    <div className="mx-auto -mt-6 z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 greenBg min-h-screen place-content-center">
    <NavBar></NavBar> 
    <ChangePasswordForm></ChangePasswordForm> 
    </div>
    </>
  )
}