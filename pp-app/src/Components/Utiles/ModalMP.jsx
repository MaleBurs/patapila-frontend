import "../NavBars/navBar.css"
import "../../App.css"
import { useFrequency } from  '../../Context/FrequencyContext'
import Buttons from "./Butttons"
import { useAmount } from "../../Context/AmountContext"
import { useSubscriptionPeriod } from "../../Context/SubscriptionContext"
import { loadMercadoPago } from "@mercadopago/sdk-js";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import AuthService from "../../services/auth.service"
import { CardPayment } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('APP_USR-f47fd464-5fff-4477-a671-9bed449388e9');


const ModalWithDetails = (props) =>{
  const currentUser = AuthService.getCurrentUser();
  const initialization = {
    amount: 980,
  };
  
  const onSubmit = async (formData) => {
    // Callback called when the submit button is clicked to send data
    const body = {data: formData, user_id: currentUser.id}
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