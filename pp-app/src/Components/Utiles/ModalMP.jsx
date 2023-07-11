import "../NavBars/navBar.css"
import "../../App.css"
import { useFrequency } from  '../../Context/FrequencyContext'
import Buttons from "./Butttons"
import { useAmount } from "../../Context/AmountContext"
import { useSubscriptionPeriod } from "../../Context/SubscriptionContext"
import { loadMercadoPago } from "@mercadopago/sdk-js";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { CardPayment } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('TEST-f1525308-046b-487b-9e5d-0c161a26c7ad');


const ModalWithDetails = (props) =>{
  const { selectedAmount} = useAmount();
  const { selectedFrequency } = useFrequency();
  const { subsPeriod, paymentDay} = useSubscriptionPeriod();
  const {cardForm, setCardForm} = useState();
  const initialization = {
    amount: 980,
  };
  
  const onSubmit = async (formData) => {
    // Callback called when the submit button is clicked to send data
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/payment/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          // Check if the response was successful
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error processing payment.');
          }
        })
        .then((responseData) => {
          // Receive the payment result
          resolve(responseData);
        })
        .catch((error) => {
          // Handle the error response when attempting to create the payment
          reject(error);
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
 

  async function createCheckoutButton() {
    closeModal();
  }
  function closeModal(event) {
      props.onChange(event.target.userWantsToRegister);
  }

    return(
        <>
            <CardPayment
              initialization={initialization}
              onSubmit={onSubmit}
              onReady={onReady}
              onError={onError}
            />
        </>
    );
}

export default ModalWithDetails;