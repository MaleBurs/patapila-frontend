import React, { useState, useRef } from "react";
import "./changePassword.css";
import "../LogInForm/LogIn.css";
import LogoHerramienta from "../Images/logoHerramienta.png";
import Buttons from '../Utiles/Butttons';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import Input from "react-validation/build/input";
import { useNavigate } from "react-router-dom";
import ValidationFunctions from "../../functions/validations";
import Messages from "../Forms/Messages";


export default function VerifyEmailForm(props) {
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [confirmationMessage, setConfirmationMessage] = useState ("");

  function navigateToRegistrationPage(){
    navigate("/signup");
  }

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleEmailChangeRequest = (e) => {
    e.preventDefault();
    setMessage("");
    setConfirmationMessage("");
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.sendMailTokenToResetPassword(email).then(
        () => {
          setConfirmationMessage("El mail para cambiar la contraseña ha sido enviado");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        })
    }
  }

  return (
    <>
      <div className="min-h-full md:items-center mb-10 justify-items-center grid px-4 md:pb-9 mt-3 lg:mt-20 px-8 pt-10 lg:px-8 mt-3 lg:mt-20">
        <div className="grid content-center w-full rounded-3xl max-w-md space-y-2 bg-white bg-opacity-90 lg:mx-60 drop-shadow-2xl p-8 md:p-16 h-4/5 md:h-2/3 lg:h-4/5 my-5 lg:my-10">
          <div className="md:mt-8">
              <img
              className="mx-auto h-[150px] md:h-40 w-auto "
              src={LogoHerramienta}
              alt="LogoHerramienta"
              />
          </div>

          <div className="grid justify-items-center mb-4">
                <div className="gray-300 titleText text-[18pt] font-semibold text-center">
                  ¿Tienes problemas para iniciar sesión?
                </div>
          </div>
          <div className="grid justify-items-center mb-10">
                <div className="text-slate-600 text-center infoText text-[11pt]">
                Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.
                </div>
          </div>
          <Form className="" ref={form}>

            <div className="-space-y-px rounded-md mt-2">
            <Input
                  type="text"
                  className="relative bg-transparent h-12 block w-full rounded-xl   border border-gray-300 px-6 py-2 text-gray-900 placeholder-gray-600 focus:z-10 placeholderText focus:outline-none placeholderTextOnInput sm:text-sm form-control"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={onChangeEmail}
                  validations={[ValidationFunctions.required]}
                />       
           </div>
    
            <Buttons.SolidGreenButton text={"Enviar enlace"} color={"greenBg"} margins={"my-5 md:my-7"} onClick={handleEmailChangeRequest}/> 

            <div className="flex flex-rows justify-center mt-4 mb-5 md:mb-10">
                <div className="gray-300 relevantText  text-[11pt] md:text-[12pt]">
                  ¿No tienes una cuenta?
                </div>
                <button className="ml-3 mb-3 yellowText greenTextHover relevantText text-[12pt] md:text-[12pt] font-semibold" onClick={navigateToRegistrationPage} >
                  Regístrate
                </button>
            </div> 
            {message && (
            <Messages.ErrorMessage message={message}/>
            )}
            {confirmationMessage && (
              <Messages.ConfirmationMessage message={confirmationMessage}/>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </>
  );
};