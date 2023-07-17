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
import { CardPayment } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('APP_USR-f47fd464-5fff-4477-a671-9bed449388e9');


const StartDonation = ({ setStep }) => {
  const { selectedFrequency } = useFrequency();
  const {selectedAmount} = useAmount();
  const { paymentDay, subsPeriod} = useSubscriptionPeriod();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const [showModal, setShowModal] = useState(false);
  const [showMpModal, setShowMpModal] = useState(false);
  const initialization = {
    amount: selectedAmount,
  };
  const customization = {
    paymentMethods: {
     minInstallments: 1,
     maxInstallments: 2,
   },
  };
  
  const newSubscriptionEvenctDescription = (amount, frequency, nextPaymentDate) =>{
    return {title: "Te has suscrito!", description: "Has iniciado una subscripción de $"+amount+" que se cobra " + frequency + " y tiene como próxima fecha de pago "+nextPaymentDate.substring(0,10)+"."}
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

  const onSubmit = async (formData) => {
    // Callback called when the submit button is clicked to send data
    const body = {data: formData, user_id: currentUser.id, amount: selectedAmount, frequency: selectedFrequency, subsPeriod: subsPeriod.value, paymentDay: paymentDay}
    console.log(body);

    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/payment/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          // Check if the response was successful
          if (response.ok) {
            setShowModal(true);
            ActServices.createActivity(newSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay.substring(0,10)).title, newSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay).description, currentUser.id). then(
              (res)=> console.log(res)
            )
            return response.json();
          } else {
            throw new Error('Error processing payment.');
          }
        })
        .then((responseData) => {
          resolve(responseData);
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        });
    });
  };
  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
  /*
    Callback llamado cuando Brick está listo.
    Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
  */
  };
 

  return (
    <>
    {showMpModal ? (<>
            <CardPayment
              initialization={initialization}
              customization={customization}
              onSubmit={onSubmit}
              onReady={onReady}
              onError={onError}
            />
        </>): null}
    {showModal ? (
      <ModalWithDetails value={showModal} onChange={closeModal} header={(selectedFrequency === 1) ? "Tu donación ha sido realizada con éxito!" : "Tu suscripción ha sido activada con éxito!"} action={(selectedFrequency === 1) ? "realizó una donación" : "activó una subscripción"} body={"Muchas gracias por realizar una donación para brindar atención nutricional a niños/as de la comunidad."} buttonText={"Continuar"}></ModalWithDetails>)
      : null}
      {!showMpModal ? (<button onClick={submitDonation}
        className="rounded-xl p-3 h-auto w-full text-center greenBg yellowBgHover font-Pop-SB text-base text-white">
        {(selectedFrequency === 1)  ? "Donar" : "Pagar con Mercado Pago"}
      </button>):null}
       {message && (
        <Messages.ErrorMessage message={message}/>
        )}
    </>
  )
}

export default StartDonation