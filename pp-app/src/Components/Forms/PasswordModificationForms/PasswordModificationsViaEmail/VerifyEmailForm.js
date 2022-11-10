import React, { useState, useRef } from "react";
import LogoHerramienta from "../../../Images/logoHerramienta.png";
import Buttons from "../../../Utiles/Butttons";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../services/auth.service";
import Input from "react-validation/build/input";
import { useNavigate } from "react-router-dom";
import ValidationFunctions from "../../../../functions/validations";
import Messages from "../../Messages";
import "../../../../App.css"
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
      <div className="min-h-full md:items-center mb-10 justify-items-center grid px-4 md:pb-9  ">
        <div className="grid content-center w-full rounded-3xl max-w-md space-y-2 bg-white bg-opacity-90 lg:mx-60 drop-shadow-2xl p-8 md:p-14 md:py-6 h-fit my-5 lg:my-10">
          <div className="">
              <img
              className="mx-auto h-32 w-auto"
              src={LogoHerramienta}
              alt="LogoHerramienta"
              />
          </div>

          <div className="grid justify-items-center mb-4">
                <div className="gray-300 font-Pop-SB tracking-[0.5px] uppercase text-base text-center">
                  ¿Tienes problemas para iniciar sesión?
                </div>
          </div>
          <div className="grid justify-items-center mb-10">
                <div className="text-slate-600 text-center font-Pop-M tracking-[0.5px] text-sm">
                Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.
                </div>
          </div>
          <Form className="" ref={form}>

            <div className="-space-y-px rounded-md mt-2">
            <Input
                  type="text"
                  className="relative bg-transparent block w-full rounded-xl border border-gray-300 px-6 py-3 text-gray-900 placeholder-gray-600 focus:z-10 font-Pop-R text-xs tracking-[0.5px] focus:outline-none greenBorderWhenFocus form-control"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={onChangeEmail}
                  validations={[ValidationFunctions.required]}
                />       
           </div>
    
            <Buttons.SolidGreenButton text={"Enviar enlace"} color={"greenBg"} margins={"my-5 md:my-7"} onClick={handleEmailChangeRequest}/> 

            <div className="flex flex-rows justify-center mb-5 md:mb-10">
                <div className="gray-300 font-Pop-R tracking-[0.5px] text-sm">
                  ¿No tienes una cuenta?
                </div>
                <button className="ml-3 mb-3 yellowText greenTextHover font-Pop-SB tracking-[0.5px] text-sm" onClick={navigateToRegistrationPage} >
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