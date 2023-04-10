import React, {useState} from "react";
import "../../App.css"
import ChangePasswordFromProfileForm from "../Forms/PasswordModificationForms/PasswordModificationsViaSettings/ChangePasswordFromProfileForm";

const ChangePasswordOptionSection = (props) => {
    const [requestToChangePassword, setRequestToChangePassword] = useState(false);
    const onOpenChangePasswordForm = () => setRequestToChangePassword(true);
    const onCloseChangePasswordForm = () => setRequestToChangePassword(false);
  return (
    <>
    {!requestToChangePassword ? (
        <div className="p-7 blackText flex flex-row space-x-2 justify-between">
            <div className="font-Pop-R text-sm blackText">Contraseña</div>
            <button onClick={onOpenChangePasswordForm} className="font-Pop-SB yellowTextHover greenText uppercase text-sm text-end">Modificar Contraseña</button>
        </div>
    ): (
        <>
            <ChangePasswordFromProfileForm  onClose={onCloseChangePasswordForm}></ChangePasswordFromProfileForm>
        </>
    )}
    </>
  );
};
export default ChangePasswordOptionSection;