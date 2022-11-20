import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../services/auth.service";
import Input from "react-validation/build/input";
import Modal from "../../../Utiles/Modal"
import { useNavigate } from "react-router-dom";
import ValidationFunctions from "../../../../functions/validations";
import "../../../../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Messages from "../../Messages";

const ChangePasswordFromProfileForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [password2Shown, setPassword2Shown] = useState(false);

  const continuePostNavigationSuccessful = () => {
    setShowModal(true);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleNewPassword = () => {
    setNewPasswordShown(!newPasswordShown);
  };
  const togglePassword2 = () => {
    setPassword2Shown(!password2Shown);
  };

  function closeModal() {
    setShowModal(false);
    navigate("/settings");
    window.location.reload();
  };

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

  const validateSamePassword = () => {
    if (password !== password2) {
      setMessage('Las contraseñas deben coincidir!');
      return false;
    } else {
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
        <Modal value={showModal} onChange={closeModal} header={"Tu contraseña ha sido cambiada con exito!"} body={""} buttonText={"Continuar"}></Modal>
      ) : null}

      <Form className="px-11 py-8 blackText flex flex-col space-y-6" onSubmit={handlePasswordChange} ref={form}>

        <div className="tracking-wide font-Pop-SB uppercase blackText text-sm">Cambiar contraseña </div>
        <div className="space-y-4 rounded-md mb-[-5px] flex-rows "> 
          <div className= "relative flex flex-row justify-between bg-transparent h-auto block w-full rounded-xl border border-gray-300 px-2 focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
            <Input
              type={(!passwordShown) ? "password" : "text"}
              className="bg-transparent block w-full border-transparent py-2 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-R text-sm focus:outline-none"
              name="oldpassword"
              value={oldpassword}
              placeholder="Contraseña antigua"
              onChange={onChangeOldPassword}
              validations={[ValidationFunctions.required]}
            />
            <span className="pt-2 px-2"><FontAwesomeIcon onClick={togglePassword} icon={passwordShown? "fa-solid fa-eye-slash": "fa-solid fa-eye"} color='#000'size={14} /></span>
          </div>  
          <div className= "relative flex flex-row justify-between bg-transparent h-auto block w-full rounded-xl border border-gray-300 px-2 focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
            <Input
                type={(!newPasswordShown) ? "password" : "text"}
                className="bg-transparent block w-full border-transparent py-2 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-R text-sm focus:outline-none"
                name="password"
                value={password}
                placeholder="Contraseña nueva"
                onChange={onChangePassword}
                validations={[ValidationFunctions.required, ValidationFunctions.vpassword]}
            />
            <span className="pt-2 px-2"><FontAwesomeIcon onClick={toggleNewPassword} icon={newPasswordShown? "fa-solid fa-eye-slash": "fa-solid fa-eye"} color='#000'size={14} /></span>
          </div>
          <div className= "relative flex flex-row justify-between bg-transparent h-auto block w-full rounded-xl border border-gray-300 px-2 focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
            <Input
              type={(!password2Shown) ? "password" : "text"}
              className="bg-transparent block w-full border-transparent py-2 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-R text-sm focus:outline-none"
              name="password2"
              value={password2}
              placeholder="Confirmar contraseña"
              onChange={onChangePassword2}
              validations={[ValidationFunctions.required]}
            />
            <span className="pt-2 px-2"><FontAwesomeIcon onClick={togglePassword2} icon={password2Shown? "fa-solid fa-eye-slash": "fa-solid fa-eye"} color='#000'size={14} /></span>
          </div>
        </div>

        {message && (
          <Messages.ErrorMessage message={message}/>
        )}
        {confirmationMessage && (
          <Messages.ConfirmationMessage message={confirmationMessage}/>
        )}

        <div className="flex flex-rows justify-between pt-4">
          <button onClick={closeForm} className="mx-3 py-3 h-fit px-7 greyBg rounded-xl tracking-widest font-Pop-M uppercase text-gray-500 duration-700 hover:bg-gray-300 focus:bg-gray-300  hover:text-white focus:text-white text-sm">Volver atrás</button>
          <button onClick={null} className="mx-3 py-3 h-fit px-7 bg-[#0F6938] text-white rounded-xl tracking-widest font-Pop-M uppercase duration-700 hover:bg-[#6c3333] focus:bg-[#6c3333]  text-sm">Guardar Cambios</button>
        </div>

        <CheckButton style={{ display: "none" }} ref={checkBtn} />


      </Form>
    </>
  );
}

export default ChangePasswordFromProfileForm;