import "../NavBars/navBar.css"
import "../../App.css"
import { useAmount } from "../../Context/AmountContext"
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { useSubscriptionPeriod } from "../../Context/SubscriptionContext"
import Input from "react-validation/build/input";
import ValidationFunctions from "../../functions/validations";
import Messages from "../Forms/Messages"

const ModalWithConfirmationAndDetails = (props) =>{
  const form = useRef();
  const checkBtn = useRef();
  const { selectedAmount} = useAmount();
  const [cancel, setCancel] = useState("");
  const [message, setMessage] = useState("");
  const { subsPeriod, paymentDay} = useSubscriptionPeriod();
    function closeModal(event) {
        props.onChange(event.target.userWantsToRegister);
    }
    function saveChangesFromModal(event) {
      props.saveChanges(event);
      closeModal(event);
    }
    function calculateDate(){
      if((typeof(paymentDay) === 'string')){
        const [dateStr] = paymentDay.split('T');
        const [year, month, day] = dateStr.split('-');
        const date = day+'/'+month+'/'+year;
        return date;
      }else{
        return paymentDay;
      }
    }

    const onChangeCancel = (e) => {
      const cancel = e.target.value;
      setCancel(cancel);
    };

    const handleCancelRequest = (e) => {
      e.preventDefault();
      setMessage("");
      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
        saveChangesFromModal(e);
      }
    };

    return(
        <>
          <div
            className="darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
                <Form className="px-11 py-8 blackText flex flex-col space-y-6" onSubmit={handleCancelRequest} ref={form}>
            <div className="relative w-auto my-6 mx-auto max-w-3xl p-16">
              {/*content*/}
              <div className="  space-y-9 p-12 rounded-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t">
                  <h3 className="font-Pop-SB text-base purpleText">
                    {props.header}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex flex-col space-y-10">
                    <div className="font-Pop-M flex flex-wrap space-x-1 leading-relaxed font-Pop-R text-sm tracking-[0.2px] purpleText">
                      <p className="normal-case">Se </p><p className="normal-case">{props.action}</p><p className="normal-case">una donación de </p>
                      <p className="normal-case underline decoration-[#eb8301] decoration-wavy underline-offset-4">${selectedAmount}</p>
                      <p className="normal-case">, que se cobra </p>
                      <p className="normal-case underline decoration-[#eb8301] decoration-wavy underline-offset-4">{subsPeriod.label},</p>
                      <p className="normal-case">con el próximo pago el día </p>
                       <p className="normal-case underline decoration-[#eb8301] decoration-wavy underline-offset-4">{(calculateDate())}</p>
                       <p className="normal-case">.</p>
                    </div>
                </div>
                <div className="space-y-5">
                <p className="normal-case text-center font-Pop-R text-sm text-gray-400">
                   Escribe "Cancelar" para confirmar
                  </p>
                  <div className= "relative flex flex-row items-center bg-transparent block rounded-xl h-fit  border border-gray-300 focus:z-10 focus:outline-none greenBorderWhenFocus form-control">
                  <Input
                  type={"text"}
                  className="bg-transparent block w-full border-transparent mx-3 py-2 text-gray-900 placeholder-red focus:border-transparent focus:ring-0 font-Pop-R text-sm focus:outline-none"
                  name="cancelar"
                  value={cancel}
                  placeholder="Escribe 'Cancelar'"
                  onChange={onChangeCancel}
                  validations={[ValidationFunctions.required, ValidationFunctions.vcancel]}
                  />
                                  {message && (
                    <>
                        <div className="grid form-group justify-items-center pb-4">
                          <div className="alert redText alert-danger text-sm font-Pop-R justify-items-center" role="alert">
                            {message}
                          </div>
                        </div>
                    </>
                  )}
                  </div>
                </div>
                <div className="flex items-center flex-rows justify-between">
                <button onClick={closeModal} className="mx-3 py-3 h-fit px-7 greyBg rounded-xl tracking-widest font-Pop-M uppercase font-medium text-gray-500 duration-700 hover:bg-gray-300 focus:bg-gray-300  hover:text-white focus:text-white text-xs">Volver atrás</button>
                <button onClick={null} text="Guardar Cambios" className="mx-3 py-3 h-fit px-7 bg-[#0F6938] text-white rounded-xl tracking-widest font-Pop-M uppercase font-medium duration-700 hover:bg-[#6c3333] focus:bg-[#6c3333]  text-xs">Cancelar suscripción</button>
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </div>
            </div>
          </Form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ModalWithConfirmationAndDetails;