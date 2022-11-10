import "../../Components/LogInForm/LogIn.css";
import React from "react";
import ChangePasswordForm from "../../Components/ChangePasswordForms/ChangePasswordForm"
import "../ChangePassword Page/ChangePasswordPage.css"
import NavBar from "../../Components/NavBars/NavBar"

export default function RegistrationForm(props) {

  return (
    <>  
    <div className="mx-auto relative flex flex-col relative imageBg min-h-screen bg-cover md:space-y-20 space-y-12 pb-16 greenBg">
    <NavBar></NavBar> 
    <ChangePasswordForm></ChangePasswordForm> 
    </div>
    </>
  )
}