import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";
import Input from "react-validation/build/input";
import Modal from "../../Utiles/Modal"
import ValidationFunctions from "../../../functions/validations";
import "../../../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Messages from "../Messages";
import Loading from "../../Utiles/Loading";

const ChangeEmail = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [showModal, setShowModal] = React.useState(false);
  const [password, setOldPassword] = useState("");
  const [email, setEmail] = useState(currentUser.email);
  const [message, setMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  const continuePostNavigationSuccessful = () => {
    setShowModal(true);
    AuthService.updatedCurrentUserInLocalStorage(currentUser.id).then(
      setCurrentUser(AuthService.getCurrentUser())
    );
    window.location.reload();
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  function closeModal() {
    setShowModal(false);
  };

  function closeForm(event) {
    props.onClose();
  }
  const onChangeOldPassword = (e) => {
    const password = e.target.value;
    setOldPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordChange = (e) => {
    setLoadingState(true);
    e.preventDefault();
    setMessage("");
    setConfirmationMessage("");
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0 && message==="" ) {
      AuthService.changeUserEmail(email, password, currentUser.id).then(
        (response) => {  
          continuePostNavigationSuccessful();
        },
        (error) => {
          const resMessage = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setLoadingState(false);
        }
      ).catch((error) => {
        const resMessage = (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
          setMessage(resMessage);
      })
    }

  };

  return (
    <>

      {showModal ? (
        <Modal value={showModal} onChange={closeModal} header={"Has cambiado tu mail!"} body={"Tu mail ha sido actualizado con éxito. Hacé click en continuar para volver a los ajustes de cuenta."} buttonText={"Continuar"}></Modal>
      ) : null}

      <Form className="px-11 py-8 blackText flex flex-col space-y-6" onSubmit={handlePasswordChange} ref={form}>

        <div className="font-Pop-R tracking-widest text-xs uppercase blackText"> Modificar Mail </div>
        <div className="space-y-4 rounded-md mb-[-5px] flex-rows "> 
      
          <div className= "items-center pr-4 relative flex flex-row justify-between bg-transparent h-auto block w-full rounded-md border border-[#e7e6e6] focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
            <Input
              type="text"
              className="bg-transparent block w-full border-transparent py-3 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-L text-xs tracking-wide focus:outline-none"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChangeEmail}
              validations={[ValidationFunctions.required, ValidationFunctions.validEmail]}
            />
          </div>
          <div className= " pr-4 relative flex flex-row justify-between bg-transparent h-auto block w-full rounded-md border border-[#e7e6e6] focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
            <Input
              type={(!passwordShown) ? "password" : "text"}
              className="bg-transparent block w-full border-transparent py-3 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-L text-xs tracking-wide focus:outline-none"
              name="oldpassword"
              value={password}
              placeholder="Contraseña Actual"
              onChange={onChangeOldPassword}
              validations={[ValidationFunctions.required]}
            />
           <span className="pt-3 self-start"> <FontAwesomeIcon onClick={togglePassword} icon={passwordShown? "fa-solid fa-eye-slash": "fa-solid fa-eye"} color='#000'size="2xs" /></span>
          </div>  
        </div>

        {message && (
          <Messages.ErrorMessage message={message}/>
        )}
        {confirmationMessage && (
          <Messages.ConfirmationMessage message={confirmationMessage}/>
        )}

        <div className="flex flex-rows justify-between">
          <button onClick={closeForm} className="px-3 w-fit greyBg rounded-md tracking-widest font-Pop-M uppercase text-gray-500 duration-700 hover:bg-gray-300 hover:text-white text-sm">Cancelar</button>
          <div className="self-end">
            <button
              className="flex flex-row space-x-3 items-center w-fit font-Pop-M purpleBgHover uppercase tracking-widest text-sm py-3 rounded-md px-2 bg-[#6c3333] text-white"
              ref={checkBtn} onClick={null}
            >
            <div>Guardar Cambios</div>
              {loadingState ? <Loading/> : null}
            </button >
          </div> 
        </div>

        <CheckButton style={{ display: "none" }} ref={checkBtn} />


      </Form>
    </>
  );
}

export default ChangeEmail;