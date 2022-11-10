import "../../App.css"
import '../../Pages/Profile Page/profile.css'
import "../../Pages/Registration-Autentification.js/IntroductionPage.css"
import Messages from "../Forms/Messages";
import "../../Components/LogInForm/LogIn.css";
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import "../ChangePasswordForms/changePassword.css";
import AuthService from "../../services/auth.service";
import Input from "react-validation/build/input";
import { useParams } from 'react-router-dom';
import ValidationFunctions from "../../functions/validations";
//import bcrypt from 'bcryptjs';

const ChangePasswordFromProfileForm = (props) =>{
  const form = useRef();
  const checkBtn = useRef();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();
  const currentUser = AuthService.getCurrentUser();
  const [confirmationMessage, setConfirmationMessage] = useState ("");
  const bcrypt = require("bcryptjs");

  function closeForm(event) {
    props.onClose();
  }
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeOldPassword = (e) => {
    const password = e.target.value;
    setOldPassword(password);
  };

  const onChangePassword2 = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
  };

  const validateSamePassword = () =>{
    if (password !== password2) {
      setMessage('Las contraseñas deben coincidir!');
      return false;
    }else{
      return true;
    }
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage("");
    setConfirmationMessage("");
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0 && validateSamePassword()) {
      AuthService.updatePasswordViaSettings(currentUser.id, oldpassword, password).then(
        (response) => {
          setConfirmationMessage("La contraseña se ha cambiado exitosamente");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        },
      );
      
    }
  };
    return(
        <>

            <Form className="p-11 blackText flex flex-col space-y-5" onSubmit={handlePasswordChange} ref={form}>
            
            <div className="tracking-wide poppinsMediumWithWeight uppercase blackText font-bold">Cambiar contraseña </div>

              <div className="space-y-4 rounded-md mb-[-5px] flex-rows">
                <div className="flex flex-col space-x-4">
                  <Input
                    type="password"
                    className="relative bg-transparent h-12 block w-full rounded-xl border border-gray-300 px-6 py-2 text-gray-900 placeholder-gray-600 focus:z-10 placeholderText focus:outline-none placeholderTextOnInput sm:text-sm form-control"
                    name="oldpassword"
                    value={oldpassword}
                    placeholder="Contraseña antigua"
                    onChange={onChangeOldPassword}
                    validations={[ValidationFunctions.required]}
                  />   
                </div>
                <div className="flex flex-col space-x-4">   
                  <Input
                    type="password"
                    className="relative bg-transparent h-12 block w-full rounded-xl border border-gray-300 px-6 py-2 text-gray-900 placeholder-gray-600 focus:z-10 placeholderText focus:outline-none placeholderTextOnInput sm:text-sm form-control"
                    name="password"
                    value={password}
                    placeholder="Contraseña nueva"
                    onChange={onChangePassword}
                    validations={[ValidationFunctions.required, ValidationFunctions.vpassword]}
                  />
                </div>
                <div className="flex flex-col space-x-4"> 
                  <Input
                    type="password"
                    className="relative bg-transparent h-12 block w-full rounded-xl border border-gray-300 px-6 py-2 text-gray-900 placeholder-gray-600 focus:z-10 placeholderText focus:outline-none placeholderTextOnInput sm:text-sm form-control"
                    name="password2"
                    value={password2}
                    placeholder="Confirmar contraseña"
                    onChange={onChangePassword2}
                    validations={[ValidationFunctions.required]}
                  />
                </div>
            </div>

            {message && (
              <Messages.ErrorMessage message={message}/>
              )}

            <div className="flex flex-rows justify-between pt-4">
              <button onClick={closeForm} className="mx-3 py-3 h-fit px-7 grayBg rounded-xl tracking-widest poppinsMedium uppercase font-medium text-gray-500 duration-700 hover:bg-gray-300 focus:bg-gray-300  hover:text-white focus:text-white text-lg">Cancelar</button>
              <button onClick={null} className="mx-3 py-3 h-fit px-7 bg-[#0F6938] text-white rounded-xl tracking-widest poppinsMedium uppercase font-medium duration-700 hover:bg-[#6c3333] focus:bg-[#6c3333]  text-lg">Guardar Cambios</button>
            </div> 

            <CheckButton style={{ display: "none" }} ref={checkBtn} />

              {confirmationMessage && (
              <Messages.ConfirmationMessage message={confirmationMessage}/>
            )}
              
            </Form>
        </>
    );
}

export default ChangePasswordFromProfileForm;