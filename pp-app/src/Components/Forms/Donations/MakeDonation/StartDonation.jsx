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
  const {selectedAmount} = useAmount();
  const { paymentDay, subsPeriod} = useSubscriptionPeriod();
  const [preferenceId, setPreferenceId] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const newSubscriptionEvenctDescription = (amount, frequency, nextPaymentDate) =>{
    return {title: "Te has subscipto!", description: "Has iniciado una subscripción de $"+amount+" que se cobra " + frequency + " y tiene como próxima fecha de pago "+nextPaymentDate+"."}
  }

  useEffect(() => {
    setMessage("");
  }, [selectedFrequency])

  useEffect(() => {
    console.log("entro");
    if (preferenceId) {
      console.log("entro al if");
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://sdk.mercadopago.com/js/v2';
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        const mp = new window.MercadoPago('APP_USR-2ea7a2db-fb60-4ec4-a7e6-7dc2de112d06', {
          locale: 'es-AR'
        });
        const checkout = mp.checkout({
          preference: {
            id: preferenceId
          },
          render: {
            container: '.cho-container',
            label: 'Pagar con Mercado Pago',
          },
          theme: {
            elementsColor: '#0F6938',
            headerColor: '#e7e6e6'
          },
          openMode: 'modal',
          autoOpen: true,
        })
      });
    }
  }, [preferenceId]);


  const closeModalSuccess = () => {
    setShowModalSuccess(false);
    navigate("/inicio");
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
          ActServices.createActivity(newSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay).title, newSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay).description, currentUser.id).then(
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
            if(response.data){
              // window.location.href = response.data.url
              setPreferenceId(response.data.preferenceId)
              console.log("preferencia seteada");
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
      <button onClick={submitDonation}
        className="rounded-xl p-3 h-auto w-full text-center greenBg yellowBgHover font-Pop-SB text-base text-white">
        {(selectedFrequency === 1)  ? "Donar" : "Donar periódicamente"}
      </button>
      <div className='cho-container flex justify-center'>
    </div>
       {message && (
        <Messages.ErrorMessage message={message}/>
        )}
    </>
  )
}

export default StartDonation