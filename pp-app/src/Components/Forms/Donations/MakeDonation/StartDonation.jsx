import { useFrequency } from  '../../../../Context/FrequencyContext'
import { useState, useEffect } from 'react'
import { useAmount } from '../../../../Context/AmountContext'
import { useSubscriptionPeriod } from '../../../../Context/SubscriptionContext'
import DonationService from '../../../../services/donations.service'
import AuthService from '../../../../services/auth.service'
import ModalWithDetails from "../../../Utiles/ModalWithDetails";
import { useNavigate } from "react-router-dom"
import Messages from '../../Messages'
import ActServices from '../../../../services/activities.service'
import ModalMP from '../../../Utiles/ModalMP'


const StartDonation = ({ setStep }) => {
  const { selectedFrequency } = useFrequency();
  const {selectedAmount} = useAmount();
  const { paymentDay, subsPeriod} = useSubscriptionPeriod();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const [showModal, setShowModal] = useState(false);
  const [showMpModal, setShowMpModal] = useState(false);

  const newSubscriptionEvenctDescription = (amount, frequency, nextPaymentDate) =>{
    return {title: "Te has suscrito!", description: "Has iniciado una suscripción de $"+amount+" que se cobra " + frequency + " y tiene como próxima fecha de pago "+nextPaymentDate+"."}
  }
  const newOneTimeDonationEvenctDescription = (amount) =>{
    return {title: "Has realizado una donación de única vez!", description: "Has realizado una donación de $"+amount+"."}
  }

  useEffect(() => {
    setMessage("");
  }, [selectedFrequency])

  const closeModal = () => {
    setShowModal(false);
    navigate("/inicio");
    window.location.reload();
  };

  const closeMpModal = () => {
    setShowMpModal(false);
    navigate("/inicio");
    window.location.reload();
  };

  const isFormValid = () =>{
    if (selectedFrequency === 2 && (paymentDay===null || paymentDay=== undefined)){
      setMessage("Para activar una suscripción debe seleccionar la fecha del primer pago.");
      return false
    }
    if (selectedAmount < 1 || selectedAmount===undefined){
      setMessage("El monto a donar debe ser de al menos $1.");
      return false
    }
    return true
  }

  const submitDonation = (e) => {
    e.preventDefault();
    setMessage("");
    if (isFormValid()) {
      if(selectedFrequency === 2){
      /*DonationService.generateSubscription(currentUser.id, selectedAmount, selectedFrequency, subsPeriod.value, paymentDay).then(
        () => {
          setShowModal(true);
          ActServices.createActivity(newSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay).title, newSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay).description, currentUser.id). then(
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
        })*/
        setShowMpModal(true);
        }else{
        DonationService.generateTransaction(currentUser.id, selectedAmount,"onlyTime").then(
          () => {
            setShowModal(true);
            ActServices.createActivity(newOneTimeDonationEvenctDescription(selectedAmount).title, newOneTimeDonationEvenctDescription(selectedAmount).description, currentUser.id). then(
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
    {showMpModal ? (<ModalMP onChange={closeMpModal}/>): null}
    {showModal ? (
      <ModalWithDetails value={showModal} onChange={closeModal} header={(selectedFrequency === 1) ? "Tu donación ha sido realizada con éxito!" : "Tu suscripción ha sido activada con éxito!"} action={(selectedFrequency === 1) ? "realizó una donación" : "activó una suscripción"} body={"Muchas gracias por realizar una donación para brindar atención nutricional a niños/as de la comunidad."} buttonText={"Continuar"}></ModalWithDetails>)
      : null}
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