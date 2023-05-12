import { useFrequency } from  '../../../../Context/FrequencyContext'
import { useState, useEffect } from 'react'
import { useAmount } from '../../../../Context/AmountContext'
import { useSubscriptionPeriod } from '../../../../Context/SubscriptionContext'
import DonationService from '../../../../services/donations.service'
import AuthService from '../../../../services/auth.service'
import DonationMadeModal from "../../../Utiles/Modal/DonationMadeModal";
import { useNavigate } from "react-router-dom"
import Messages from '../../Messages'
import ActServices from '../../../../services/activities.service'
import {textos} from "./MakeDonationTexts"

const StartDonation = ({ setStep }) => {
  const { selectedFrequency } = useFrequency();
  const {selectedAmount} = useAmount();
  const { paymentDay, subsPeriod} = useSubscriptionPeriod();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const [showModal, setShowModal] = useState(false);

  const newSubscriptionEvenctDescription = (amount, frequency, nextPaymentDate) =>{
    return {title: "Te has suscrito!", description: "Has iniciado una suscripción de $"+amount+" que se cobra " + frequency + " y tiene como próxima fecha de pago "+nextPaymentDate+"."}
  }
  const newOneTimeDonationEvenctDescription = (amount) =>{
    return {title: "Has realizado una donación!", description: "Has realizado una donación de $"+amount+"."}
  }

  useEffect(() => {
    setMessage("");
  }, [selectedFrequency])

  const closeModal = () => {
    setShowModal(false);
    navigate("/gracias");
  };

  const isFormValid = () =>{
    if (selectedFrequency === 2 && (paymentDay===null || paymentDay=== undefined)){
      setMessage(textos.restriccionFechaPago);
      return false
    }
    if (selectedAmount < 1 || selectedAmount===undefined){
      setMessage(textos.restriccionMontoDonacion);
      return false
    }
    return true
  }

  const submitDonation = (e) => {
    e.preventDefault();
    setMessage("");
    if (isFormValid()) {
      if(selectedFrequency === 2){
      DonationService.generateSubscription(currentUser.id, selectedAmount, selectedFrequency, Number(subsPeriod.value), paymentDay).then(
        () => {
          setShowModal(true);
          ActServices.createActivity(2, newSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay).description, currentUser.id). then(
            (res)=> console.log(res)
          )
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        })
        }else{
        DonationService.generateTransaction(currentUser.id, selectedAmount,"onlyTime").then(
          () => {
            setShowModal(true);
            ActServices.createActivity(3, newOneTimeDonationEvenctDescription(selectedAmount).description, currentUser.id). then(
              (res)=> console.log(res)
            )
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
          }
      );
    } 
    }
  };

  return (
    <>
    
    {showModal ? (
      <DonationMadeModal value={showModal} onChange={closeModal} header={(selectedFrequency === 1) ? "¡Tu donación ha sido realizada con éxito!" : "¡Tu suscripción ha sido activada con éxito!"} action={(selectedFrequency === 1) ? "realizado una donación" : "activado una suscripción"} body={"Gracias a tu ayuda podemos brindar atención nutricional a los niños de la comunidad."} buttonText={"Queremos darte las gracias!"}></DonationMadeModal>
    ) : null}
      <button onClick={submitDonation}
        className="rounded-xl p-3 h-auto w-full text-center greenBg yellowBgHover font-Pop-SB text-base text-white">
        {(selectedFrequency === 1)  ? "Donar" : "Donar periódicamente"}
      </button>
       {message && (
        <Messages.ErrorMessage message={message}/>
        )}
    </>
  )
}

export default StartDonation