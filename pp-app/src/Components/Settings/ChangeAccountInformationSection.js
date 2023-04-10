import React, {useState} from "react";
import "../../App.css"
import ChangePasswordFromProfileForm from "../Forms/PasswordModificationForms/PasswordModificationsViaSettings/ChangePasswordFromProfileForm";
import ChangeEmail from "../Forms/UserInformationForms/ChangeEmail";

const ChangeAccountInformationSection = (props) => {
    const [requestToChangePassword, setRequestToChangePassword] = useState(false);
    const onOpenChangePasswordForm = () => setRequestToChangePassword(true);
    const onCloseChangePasswordForm = () => setRequestToChangePassword(false);

    const [requestToChangeEmail, setRequestToChangeEmail] = useState(false);
    const onOpenChangeEmailForm = () => setRequestToChangeEmail(true);
    const onCloseChangeEmailForm = () => setRequestToChangeEmail(false);

  return (
    <div className="flex flex-col divide-y divide-dashed divide-[#e7e6e6]">
    {!requestToChangePassword ? (
        <RequestToChangeMoreSensibleInformation onClick={onOpenChangePasswordForm} text="Contraseña" />
    ): (
        <>
        <ChangePasswordFromProfileForm onClose={onCloseChangePasswordForm}></ChangePasswordFromProfileForm>
        </>
    )}
    {!requestToChangeEmail ? (
        <RequestToChangeMoreSensibleInformation onClick={onOpenChangeEmailForm} text="Mail"/>
    ): (
        <>
        <ChangeEmail onClose={onCloseChangeEmailForm}></ChangeEmail>
        </>
    )}
    </div>
  );
};
export default ChangeAccountInformationSection;

const RequestToChangeMoreSensibleInformation = ({onClick, text}) => {
    return (
    <div className="p-7 blackText flex flex-row space-x-2 justify-between">
        <div className="tracking-widest font-Pop-R text-xs blackText">{text}</div>
        <button onClick={onClick} className="font-Pop-M text-end tracking-widest text-xs uppercase text-[#6c3333] hover:text-[#6c333349] duration-100"> {"Modificar " + text} </button>
    </div>
    );
}
