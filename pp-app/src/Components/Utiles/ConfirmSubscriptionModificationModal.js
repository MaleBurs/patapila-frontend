import "../NavBars/navBar.css"
import "../../App.css"
import { useAmount } from "../../Context/AmountContext"
import { useSubscriptionPeriod } from "../../Context/SubscriptionContext"

const ConfirmSubscriptionModificationModal = (props) =>{
  const { selectedAmount} = useAmount();
  const { subsPeriod, paymentDay} = useSubscriptionPeriod();
    function closeModal(event) {
        props.onChange(event.target.userWantsToRegister);
    }
    function saveChangesFromModal(event) {
      props.saveChanges(event);
      closeModal(event);
    }
    return(
        <>
          <div
            className="darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-2xl p-16">
              {/*content*/}
              <div className=" space-y-10 px-12 py-16 rounded-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="font-Pop-M text-base tracking-widest purpleText text-center">
                  {props.header}
                </div>
                {/*body*/}                
                <div className="font-Pop-L text-center flex flex-wrap space-x-1 leading-relaxed font-Pop-R text-sm tracking-wider text-gray-600 px-2">
                  <p>{props.action} de <span className="underline decoration-gray-400 underline-offset-2">${selectedAmount}</span>. Tu suscripción se cobrará <span className="underline decoration-gray-400 underline-offset-2">{subsPeriod.label}</span> y el próximo pago se realizará el día <span className="underline decoration-gray-400 underline-offset-2">{paymentDay}</span>.</p>
                </div>
                <div className="flex items-center flex-rows justify-between">
                <button onClick={closeModal} className="mx-3 py-3 h-fit px-7 greyBg rounded-md tracking-widest font-Pop-M uppercase font-medium text-gray-500 duration-700 hover:bg-gray-300 focus:bg-gray-300  hover:text-white focus:text-white text-xs">{props.cancelButton}</button>
                <button onClick={saveChangesFromModal} text="Guardar Cambios" className="mx-3 py-3 h-fit px-7 bg-[#0F6938] text-white rounded-md tracking-widest font-Pop-M uppercase font-medium duration-700 hover:bg-[#6c3333] focus:bg-[#6c3333]  text-xs">{props.saveButton}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ConfirmSubscriptionModificationModal;