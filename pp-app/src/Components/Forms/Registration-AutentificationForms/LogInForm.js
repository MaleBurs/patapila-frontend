import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import LogoCorazon from "../../Images/LogoCorazon.png";
import AuthService from "../../../services/auth.service";
import ValidationFunctions from "../../../functions/validations";
import BaseAutetificationForm from "./BaseAutentificationForm";

export default function Login(props) {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navigateToChangePassword = () => {
    navigate('/changePasswordPage');
  }
  
  function navigateToRegistrationPage() {
    navigate("/signup");
  }

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setMail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = ({setMessage}) => {
      AuthService.login(email, password).then(
        () => {
          navigate("/inicio");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setMessage(resMessage);
        }
      );
  };

  const inputs = [
    {
    type:"text",
    name:"email",
    value:email,
    placeholder:"Email",
    onChange:onChangeEmail,
    validations:[ValidationFunctions.required],
  },{             
 
    type:"password",
    name:"password",
    value:password,
    placeholder:"Contraseña",
    onChange:onChangePassword,
    validations:[ValidationFunctions.required],
  }
  ];

  return (
    <>
    <BaseAutetificationForm 
      textOnButton="Iniciar Sesión"
      inputs={inputs}
      submitFunction={handleLogin}
      textBeforeSeparationLine = "Olvidaste tu contraseña?"
      functionAfterSeparationLine={navigateToRegistrationPage}
      functionBeforeSeparationLine={navigateToChangePassword}
      textAfterSeparationLine="¿No tenes cuenta?"
      actionAfterSeparationLine= "Regístrate"
      logo = {LogoCorazon}
      extraStyles="lg:w-1/4"
    />
    </>
  );
};