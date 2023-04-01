import "../../Components/LogInForm/LogIn.css";
import LogoHerramienta from "../../Components/Images/logoHerramienta.png";
import Buttons from '../../Components/Utiles/Butttons';
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import "./changePassword.css"
import AuthService from "../../services/auth.service";
import Input from "react-validation/build/input";
import { useParams } from 'react-router-dom';
import Modal from "../Utiles/Modal"
import ValidationFunctions from "../../functions/validations";
import Messages from "../Forms/Messages";
import textos from "./changePasswordFormsTexts";

export default function ChangePasswordForm(props)  {
  const form = useRef();
  const [showModal, setShowModal] = React.useState(false);
  const checkBtn = useRef();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const continuePostNavigationSuccessful = () =>{
    setShowModal(true);
  };

  
  function closeModal() {
    setShowModal(false);
    navigate("/login");
    window.location.reload();
  };

  function navigateToLogIn(){
      navigate("/login");
      window.location.reload(); 
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
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
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0 && validateSamePassword()) {
      AuthService.updatePasswordViaEmail(params.token,password).then(
        (response) => {
          continuePostNavigationSuccessful();
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
  return (

    <>
       {showModal ? (
        <Modal value={showModal} onChange={closeModal} header={textos.contraseñaCambiadaExitosamente} body={textos.inicieSesionParaContinuar} buttonText={textos.irALogIn}></Modal>
      ) : null}
      <div className="min-h-full md:items-center mb-10 justify-items-center grid px-4 md:pb-9 mt-3 lg:mt-20 px-8 pt-10 lg:px-8 mt-3 lg:mt-20">
        <div className="grid content-center w-full rounded-3xl max-w-md space-y-2 bg-white bg-opacity-90 lg:mx-60 drop-shadow-2xl p-8 md:p-16 h-4/5 md:h-2/3 lg:h-4/5 my-5 lg:my-10">
         <div className="">
              <img
              className="mx-auto h-40 w-auto"
              src={LogoHerramienta}
              alt="LogoHerramienta"
              />
          </div>

           <Form className="" onSubmit={handlePasswordChange} ref={form}>

           <div className="grid justify-items-center mb-9">
                <div className="gray-300 titleText text-[18pt] font-semibold text-center">
                  {textos.cambiarContraseña}
                </div>
          </div>

            <div className="space-y-3 rounded-md mb-[-5px]">       
                <Input
                  type="password"
                  className="relative bg-transparent h-12 block w-full rounded-xl border border-gray-300 px-6 py-2 text-gray-900 placeholder-gray-600 focus:z-10 placeholderText focus:outline-none placeholderTextOnInput sm:text-sm form-control"
                  name="password"
                  value={password}
                  placeholder="Contraseña nueva"
                  onChange={onChangePassword}
                  validations={[ValidationFunctions.required, ValidationFunctions.vpassword]}
                />
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
    
            <Buttons.SolidGreenButton text={"Guardar cambios"} color={"purpleBg"} margins={"my-6 md:my-6"} onClick={null}/>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />

          {message && (
            <Messages.ErrorMessage message={message}/>
            )}
            
          </Form>
        </div>
      </div>
</>
  )
}