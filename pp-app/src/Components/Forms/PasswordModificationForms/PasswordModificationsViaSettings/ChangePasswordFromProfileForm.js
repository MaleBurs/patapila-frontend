import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../../services/auth.service";
import Input from "react-validation/build/input";
import Modal from "../../../Utiles/Modal/Modal"
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
        <Modal value={showModal} onChange={closeModal} header={"Has cambiado tu contraseña!"} body={"Tu contraseña ha sido actualizada exitosamente. Hacé click en continuar para volver a los ajustes de cuenta."} buttonText={"Continuar"}></Modal>
      ) : null}

      <Form className="px-11 py-8 blackText flex flex-col space-y-6" onSubmit={handlePasswordChange} ref={form}>

        <div className="font-Pop-R tracking-widest text-xs uppercase blackText"> Modificar contraseña </div>
        <div className="space-y-4 rounded-md mb-[-5px] flex-rows "> 
          <div className= " pr-4 relative flex flex-row justify-between bg-transparent h-auto block w-full rounded-md border border-[#e7e6e6] focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
            <Input
              type={(!passwordShown) ? "password" : "text"}
              className="bg-transparent block w-full border-transparent py-3 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-L text-xs tracking-wide focus:outline-none"
              name="oldpassword"
              value={oldpassword}
              placeholder="Contraseña antigua"
              onChange={onChangeOldPassword}
              validations={[ValidationFunctions.required]}
            />
           <span className="pt-3 self-start"> <FontAwesomeIcon onClick={togglePassword} icon={passwordShown? "fa-solid fa-eye-slash": "fa-solid fa-eye"} color='#000'size="2xs" /></span>
          </div>  
          <div className= "items-center pr-4 relative flex flex-row justify-between bg-transparent h-auto block w-full rounded-md border border-[#e7e6e6] focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
            <Input
                type={(!newPasswordShown) ? "password" : "text"}
                className="bg-transparent block w-full border-transparent py-3 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-L text-xs tracking-wide focus:outline-none"
                name="password"
                value={password}
                placeholder="Contraseña nueva"
                onChange={onChangePassword}
                validations={[ValidationFunctions.required, ValidationFunctions.vpassword]}
            />
            <span className="pt-3 self-start"><FontAwesomeIcon onClick={toggleNewPassword} icon={newPasswordShown? "fa-solid fa-eye-slash": "fa-solid fa-eye"} color='#000'size={14} /></span>
          </div>
          <div className= "items-center pr-4 relative flex flex-row justify-between bg-transparent h-auto block w-full rounded-md border border-[#e7e6e6] focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
            <Input
              type={(!password2Shown) ? "password" : "text"}
              className="bg-transparent block w-full border-transparent py-3 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-L text-xs tracking-wide focus:outline-none"
              name="password2"
              value={password2}
              placeholder="Confirmar contraseña"
              onChange={onChangePassword2}
              validations={[ValidationFunctions.required]}
            />
            <span className="pt-3 self-start"><FontAwesomeIcon onClick={togglePassword2} icon={password2Shown? "fa-solid fa-eye-slash": "fa-solid fa-eye"} color='#000'size={14} /></span>
          </div>
        </div>

        {message && (
          <Messages.ErrorMessage message={message}/>
        )}
        {confirmationMessage && (
          <Messages.ConfirmationMessage message={confirmationMessage}/>
        )}

        <div className="flex flex-rows justify-between">
          <button onClick={closeForm} className="px-5 w-fit greyBg rounded-md tracking-widest font-Pop-M uppercase text-gray-500 duration-700 hover:bg-gray-300 focus:bg-gray-300  hover:text-white focus:text-white text-sm">Cancelar</button>
          <button onClick={null} className="px-4 w-fit font-Pop-M purpleBgHover uppercase tracking-widest text-sm py-3 rounded-md bg-[#6c3333] text-white">Guardar Cambios</button>
        </div>

        <CheckButton style={{ display: "none" }} ref={checkBtn} />


      </Form>
    </>
  );
}

export default ChangePasswordFromProfileForm;