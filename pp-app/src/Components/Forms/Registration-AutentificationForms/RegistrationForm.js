import "../../../App.css"
import LogoLucha from "../../Images/Lucha.png"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import AuthService from "../../../services/auth.service";
import DonationService from "../../../services/donations.service";
import Modal from "../../Utiles/Modal";
import ValidationFunctions from "../../../functions/validations"
import BaseAutetificationForm from "./BaseAutentificationForm";
import ActServices from "../../../services/activities.service";

export default function RegistrationForm(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();
  const userRegistredEventDescription = {title: "Te has unido a la Comunidad!", description: "" };

  function refferalEventDescription(name,lastName){
    return {title: "Has referido a un amigo!", description: "Has referido a "+name+" "+lastName+"."}
  }

  function closeModal() {
    setShowModal(false);
    navigate("/login");
    window.location.reload();
  };

  function navigateToLogInPage() {
    navigate("/login");
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePassword2 = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
  };

  const validateSamePassword = ({setMessage}) =>{
    if (password !== password2) {
      setMessage('Las contraseñas deben coincidir!');
      return false;
    }else{
      return true;
    }
  }

  const continuePostNavigationSuccessful = () =>{
    setShowModal(true);
  };

  const handleRegister = ({setMessage}) => {
    setSuccessful(false);
    if (validateSamePassword({setMessage})) {

      AuthService.register(name, lastname, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          if(props.refferalUser){
            DonationService.addReferred(props.refferalUser.id,response.data.id);
          }
          ActServices.createActivity(userRegistredEventDescription.title, userRegistredEventDescription.description, response.data.id). then(
            (res)=> console.log(res)
          )
          ActServices.createActivity(refferalEventDescription(name,lastname).title, refferalEventDescription(name,lastname).description, response.data.id). then(
            (res)=> console.log(res)
          )
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
          setSuccessful(false);
        },
      );
      
    }
  };

  const inputs = [
    {
      type:"text",
      name:"email",
      value: email,
      placeholder: "Email",
      onChange: onChangeEmail,
      validations: [ValidationFunctions.required, ValidationFunctions.validEmail],
    },{
      type:"text",
      name:"name",
      value: name,
      placeholder: "Nombre",
      onChange: onChangeName,
      validations: [ValidationFunctions.required, ValidationFunctions.vstrings],
    },
    {
      type:"text",
      name:"lastname",
      value: lastname,
      placeholder: "Apellido",
      onChange: onChangeLastname,
      validations: [ValidationFunctions.required, ValidationFunctions.vstrings],
    },{
      type:"password",
      name:"password",
      value:password,
      placeholder:"Contraseña",
      onChange:onChangePassword,
      validations:[ValidationFunctions.required, ValidationFunctions.vpassword],
      },{
        type:"password",
        name:"password2",
        value: password2,
        placeholder: "Confirma contraseña",
        onChange: onChangePassword2,
        validations: [ValidationFunctions.required, ValidationFunctions.vpassword],
      }
  ];


  return (
    <>  
      {showModal ? (
        <Modal value={showModal} onChange={closeModal} header={"Tu cuenta ha sido creada con exito!"} body={" Para formar parte de la comunidad y comenzar a tener un impacto, junto a Pata Pila, inicie sesión."} buttonText={"Ir a iniciar sesión"}></Modal>
      ) : null}
      {!successful && (
        <BaseAutetificationForm 
        textOnButton={"Registrarse"}
        inputs={inputs}
        submitFunction={handleRegister}
        functionAfterSeparationLine={navigateToLogInPage}
        textAfterSeparationLine="¿Ya tienes una cuenta?"
        actionAfterSeparationLine= "Inicia sesión"
        logo = {LogoLucha}
        validationOfSamePasswordActive
        extraStyles={props.extraStyles}
      />
     )}
    </>
  )
}