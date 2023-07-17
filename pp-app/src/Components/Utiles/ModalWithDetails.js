import "../NavBars/navBar.css"
import "../../App.css"
import { useFrequency } from  '../../Context/FrequencyContext'
import Buttons from "./Butttons"
import { useAmount } from "../../Context/AmountContext"
import { useSubscriptionPeriod } from "../../Context/SubscriptionContext"

const ModalWithDetails = (props) =>{
  const { selectedAmount} = useAmount();
  const { selectedFrequency } = useFrequency();
  const { subsPeriod, paymentDay} = useSubscriptionPeriod();

    function closeModal(event) {
        props.onChange(event.target.userWantsToRegister);
    }

    return(
        <>
          <div
            className="darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl p-10">
              {/*content*/}
              <div className="  space-y-9 p-12 rounded-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t">
                  <h3 className="font-Pop-SB text-[20pt] tracking-[0px] blackText">
                    {props.header}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex flex-col space-y-10">
                    <div className="font-Pop-M flex flex-wrap space-x-1 leading-relaxed font-Pop-R text-[15pt] text-medium tracking-[0.2px] purpleText">
                      <p>Se </p><p>{props.action}</p>
                      <p>de </p>
                      <p className="underline decoration-[#eb8301] decoration-wavy underline-offset-4">${selectedAmount}</p>
                      {
                      (selectedFrequency ===2) ?
                      <>
                      <p>, que se cobra </p>
                      <p className="underline decoration-[#eb8301] decoration-wavy underline-offset-4">{subsPeriod.label},</p>
                      <p>con el próximo pago el día </p>
                      <p className="underline decoration-[#eb8301] decoration-wavy underline-offset-4">{paymentDay.substring(0,10)}</p>
                      </>
                      : <></>
                      }
                      <p>.</p>
                    </div>
                  <p className="text-center font-Pop-R text-lg text-gray-400">                   {props.body}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end">
                  <Buttons.SolidGreenButton text={props.buttonText} color={"greenBg"} margins={"mr-1 mb-1"} onClick={closeModal}/>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ModalWithDetails;