import "../NavBars/navBar.css"
import "../../App.css"
import { useFrequency } from  '../../Context/FrequencyContext'
import Buttons from "./Butttons"
import { useAmount } from "../../Context/AmountContext"
import { useSubscriptionPeriod } from "../../Context/SubscriptionContext"
import ManoConCorazon from "../Images/ManoConCorazon.png"

const DonationMadeModal = (props) =>{
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
            <div className="relative w-auto mx-auto max-w-3xl p-10">
              {/*content*/}
              <div className="p-12 rounded-md relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="font-Pop-M text-lg tracking-widest purpleText text-center">
                  {props.header}
                </div>
                {/*body*/}
                <div className="mt-8 mb-4 flex flex-row space-x-3 px-5">  
                  <img className="w-20 h-20" src={ManoConCorazon} alt="donation made"/>          
                  <div className="font-Pop-L flex items-center flex-wrap space-x-1 leading-relaxed text-sm tracking-[0.2px] text-gray-600">
                    {
                      (selectedFrequency ===2) ?
                      <p>Has {props.action} de <span className="underline decoration-gray-400 underline-offset-2">${selectedAmount}</span>. Tu suscripción se cobrará <span className="underline decoration-gray-400 underline-offset-2">{subsPeriod.label}</span> y el primer pago se realizará el día <span className="underline decoration-gray-400 underline-offset-2">{paymentDay}</span>.</p>
                      : 
                      <p>Has {props.action} de <span className="underline decoration-gray-400 underline-offset-2">${selectedAmount}</span>. Tus donaciones nos ayudan a brindar atención nutricional a más niños de la comunidad.</p>
                    }
                  </div>
                </div>   
                {/*footer*/}
                <div className="flex items-center justify-end">
                  <Buttons.SolidGreenButton text={props.buttonText} color={"greenBg"} margins={"tracking-widest"} onClick={closeModal}/>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default DonationMadeModal;