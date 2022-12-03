import React from "react";
import "../../App.css"

const ErrorMessage = (props) => {
  return (
    <>
    <div className="grid form-group justify-items-center pb-4">
      <div className="alert redText alert-danger text-xs font-Pop-R justify-items-center" role="alert">
        {props.message}
      </div>
    </div>
    </>
  );
};

const ConfirmationMessage = (props) => {
  return (
    <>
    <div className="grid form-group justify-items-center pb-4 mb:-mt-10  lg:-mt-7">
    <div className="alert text-center greenText infoText uppercase alert-danger text-xs justify-items-center" role="alert">
      {props.message}
    </div>
    </div>
    </>
  );
};

const Messages = {
  ErrorMessage,
  ConfirmationMessage
};
export default Messages;