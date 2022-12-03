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

const StartDonation = () => {
  const { selectedFrequency } = useFrequency();
  const {selectedAmount, setPayedAmount, payedAmount} = useAmount();
  const { paymentDay, subsPeriod} = useSubscriptionPeriod();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFailure, setShowModalFailure] = useState(false);
  const queryParameters = new URLSearchParams(window.location.search)
  const status = queryParameters.get('status');
  const preference_id = queryParameters.get('preference_id');

  const newSubscriptionEvenctDescription = (amount, frequency, nextPaymentDate) =>{
    return {title: "Te has subscipto!", description: "Has iniciado una subscripción de $"+amount+" que se cobra " + frequency + " y tiene como próxima fecha de pago "+nextPaymentDate+"."}
  }
  const newOneTimeDonationEvenctDescription = (amount) =>{
    return {title: "Tu donación de única vez ha sido realizada con éxito!", description: "Has realizado una donación de $"+amount+"."}
  }

  const rejectedOneTimeDonationEvenctDescription = (amount) =>{
    return {title: "Tu donación de única vez que fue rechazada!", description: "Tu donación de $"+amount+" fue rechazada."}
  }

  const pendingOneTimeDonationEvenctDescription = (amount) =>{
    return {title: "Tu donación de única vez esta pendiente!", description: "Has realizado una donación de $"+amount+" que se encuentra pendiente de ser cobrada."}
  }

  useEffect(() => {
    setMessage("");
  }, [selectedFrequency])

  useEffect(() => {
    managePayment();
  },[payedAmount]);

  const managePayment = () => {
    if(status !=undefined){
      if(status == "approved"){
        if(payedAmount !=0){
          setShowModalSuccess(true);
        }else{ 
          DonationService.getPreference(preference_id).then(
          (res) => {
            setPayedAmount(res.data.response.items[0].unit_price);
              ActServices.createActivity(newOneTimeDonationEvenctDescription(res.data.response.items[0].unit_price).title, newOneTimeDonationEvenctDescription(res.data.response.items[0].unit_price).description, currentUser.id). then(
                (res)=> console.log(res)
              )
          },
          (error) => {
            console.log(error);
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
          })
      }
      }else if(status == "rejected"){
        if(payedAmount != 0){
          setShowModalFailure(true)
        }else{
          DonationService.getPreference(preference_id).then(
          (res) => {
            setPayedAmount(res.data.response.items[0].unit_price);
            ActServices.createActivity(rejectedOneTimeDonationEvenctDescription(res.data.response.items[0].unit_price).title, rejectedOneTimeDonationEvenctDescription(res.data.response.items[0].unit_price).description, currentUser.id). then(
              (res)=> console.log(res)
            )
          },
          (error) => {
            console.log(error);
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
          })
      }}
    }
  }

  const closeModalSuccess = () => {
    setShowModalSuccess(false);
    navigate("/inicio");
    window.location.reload();
  };

  const closeModalFailure = () => {
    setShowModalFailure(false);
    navigate("/donar");
    window.location.reload();
  };

  const isFormValid = () =>{
    if (selectedFrequency === 2 && (paymentDay===null || paymentDay=== undefined)){
      setMessage("Para activar una subscripción debe seleccionar la fecha del primer pago.");
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
      DonationService.generateSubscription(currentUser.id, selectedAmount, selectedFrequency, subsPeriod.value, paymentDay).then(
        () => {
          setShowModalSuccess(true);
          ActServices.createActivity(newSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay).title, newSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay).description, currentUser.id). then(
            (res)=> console.log(res)
          )
          //window.location.reload();
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
        DonationService.createAndPayTransaction(currentUser.id, selectedAmount,"onlyTime", currentUser.name, currentUser.lastname).then(
          (response) => {
            console.log(response);
            if(response.data.url){
              window.location.href = response.data.url
            }
            //navigate("a donde querramos mandar");
            //window.location.reload();
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
    
    {showModalSuccess ? (
      <ModalWithDetails value={showModalSuccess} onChange={closeModalSuccess} header={(selectedFrequency === 1) ? "Tu donación ha sido realizada con éxito!" : "Tu suscripción ha sido activada con éxito!"} action={(selectedFrequency === 1) ? "Se realizó una donación de " : "Se activó una suscripción de "} body={"Muchas gracias por realizar una donación para brindar atención nutricional a niños/as de la comunidad."} buttonText={"Continuar"}></ModalWithDetails>
    ) : null}
    {showModalFailure ? (
      <ModalWithDetails value={showModalFailure} onChange={closeModalFailure} header={"El pago de tu donación ha sido rechazado!"} action={"Se rechazo el pago de una donación de "} body={"Tu donación no ha sido realizada. Prueba realizar una donación con otro monto para brindar atención nutricional a niños/as de la comunidad."} buttonText={"Continuar"}></ModalWithDetails>
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