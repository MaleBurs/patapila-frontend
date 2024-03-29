import React from "react";
import "../../../../App.css"
import Amounts from '../Amounts'
import { useState } from 'react'
import DashedLine from '../../../Utiles/DashedLine'
import { useAmount } from  '../../../../Context/AmountContext'
import {useSubscriptionPeriod} from  '../../../../Context/SubscriptionContext'
import SubscriptionPeriod from './SubscriptionPeriod'
import SelectPaymentDay from '../SelectPaymentDay'
import { useSubModContext } from "../../../../Context/SubscriptionModificationContext";
import Buttons from "../../../Utiles/Butttons";
import { useCurrentUser } from "../../../../Context/CurrentUserContext";
import DonationService from "../../../../services/donations.service";
import ConfirmSubscriptionModificationModal from "../../../Utiles/Modal/ConfirmSubscriptionModificationModal";
import SubscriptionAmountImpactMessage from "./SubscriptionAmountImpactMessage";
import SubscriptionImpactForSelectedAmount from "../SubscriptionImpactForSelectedAmount";
import Messages from "../../Messages";
import CustomAmountInput from './CustomAmountInput'
import ActServices from "../../../../services/activities.service";
import AuthService from "../../../../services/auth.service";
import { textos } from "./DonationModificationTexts";

const determineExplanationTextForPaymentDay = (subsPeriod, userWantsToModifySubs) => {
  return(userWantsToModifySubs ? 
        ((subsPeriod.value === "1") ?
        "¿Qué día del mes quiere que se realize el pago?"
        :"¿Qué día quiere donar?")
      : "Fecha del Próximo Pago")
}
const ChangeDonationFromProfileForm = () =>{
  const {userWantsToModifySubs, setIfUserWantsToModifySubs} = useSubModContext();
  const {subscriptionData} = useCurrentUser();
  const [showModalWithConfirmation, setShowModalWithConfirmation] = useState(false);
  const { selectedAmount} = useAmount()
  const { subsPeriod, paymentDay} = useSubscriptionPeriod()
  const currentUser = AuthService.getCurrentUser();
  const [message, setMessage] = useState("");

  const modificationSubscriptionEvenctDescription = (amount, frecuency, nextPaymentDate) =>{
    return {title: "Has modificado una suscripción", description: "El monto es de "+amount+", se cobra "+frecuency+ " y la próxima fecha de pago es el "+nextPaymentDate+"." }
  }

  const resetSubscriptionEvenctDescription = (amount, frecuency, nextPaymentDate) =>{
    return {title: "Has reanudado una suscripción", description: "Has reanudado una suscripción de "+amount+", que se cobra "+frecuency+ " y la próxima fecha de pago es el "+nextPaymentDate+"." }
  }

  const closeModalWithConfirmation = () => {
    setShowModalWithConfirmation(false);
  };

  const handleResetDonation = () =>{
    DonationService.modifySubscriptionState(subscriptionData.id, 'A').then(
        () => {
          ActServices.createActivity(5 , resetSubscriptionEvenctDescription(selectedAmount,subsPeriod.label,paymentDay).description, currentUser.id). then(
            (res)=> 
            {
            window.location.reload();
            }
          )
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        })
}
  const isFormValid = () =>{
    if (paymentDay===null || paymentDay=== undefined){
      setMessage(textos.restriccionFechaPago);
      return false
    }
    if (selectedAmount < 1 || selectedAmount===undefined){
      setMessage(textos.restriccionMontoDonacion);
      return false
    }
    return true
  }

  const modifyDonation = (e) => {
    e.preventDefault();
    setMessage("");
    if (isFormValid()) {
      DonationService.modifySubscription(subscriptionData.id, selectedAmount, parseInt(subsPeriod.value), paymentDay).then(
        (res) => {
          setIfUserWantsToModifySubs(false);
          ActServices.createActivity(6, modificationSubscriptionEvenctDescription(selectedAmount,subsPeriod.label,paymentDay).description, currentUser.id). then(
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
    } 
  };

  return(
    <>
    {showModalWithConfirmation ? (
      <ConfirmSubscriptionModificationModal 
      value={showModalWithConfirmation} 
      onChange={closeModalWithConfirmation} 
      header={(subscriptionData.subscriptionState.state !== 'P') ?
        textos.confirmacionModifciacion : textos.confirmacionReanudacion
        } 
      body={(subscriptionData.subscriptionState.state !== 'P') ? textos.queSucedeAlModificar
              :  textos.queSucedeAlRenaudar} 
      saveChanges={(subscriptionData.subscriptionState.state !== 'P') ? modifyDonation : handleResetDonation}
      action= {(subscriptionData.subscriptionState.state !== 'P') ? "Ahora tu suscripción será" : "Se reanudará tu suscripción"} cancelButton="Cancelar" saveButton={(subscriptionData.subscriptionState.state !== 'P') ? "Actualizar" : "Reanudar"}></ConfirmSubscriptionModificationModal>
    ) : null}
    <div className="p-6 md:p-6 lg:py-8 lg:px-11">
    <div className='flex flex-col space-y-8 md:space-y-6'>
      <Amounts showOptions={userWantsToModifySubs} customAmountInput={<CustomAmountInput/>}></Amounts>
      <SubscriptionImpactForSelectedAmount></SubscriptionImpactForSelectedAmount>
      <DashedLine></DashedLine>
      <div className='space-y-6'>
        <SubscriptionPeriod></SubscriptionPeriod>
        <SelectPaymentDay 
          explanationText={determineExplanationTextForPaymentDay(subsPeriod, userWantsToModifySubs)}
          initialValue={subscriptionData.nextPaymentDate}
          disabled ={!userWantsToModifySubs}  
        />
      </div>
      {message && (
        <Messages.ErrorMessage message={message}/>
        )}
      {userWantsToModifySubs ?
      <div className="flex flex-col justify-between space-y-8 w-full md:space-y-6">
        <DashedLine></DashedLine>
        <SubscriptionAmountImpactMessage></SubscriptionAmountImpactMessage>
        <div className="flex flex-row justify-between space-x-6 w-full">
          <Buttons.IndicationButton text={"Cancelar"} onClick={()=>{setIfUserWantsToModifySubs(false); setMessage("")}} customStyle={"w-full basis-1/2 text-gray-500 greyBg w-full text-gray-500 hover:bg-gray-300 focus:bg-gray-300 "}></Buttons.IndicationButton>
          <Buttons.IndicationButton  text={"Modificar"} customStyle={"basis-1/2 text-white bg-[#6c3333] purpleBgHover w-full"} onClick={()=>{setShowModalWithConfirmation(true)}}></Buttons.IndicationButton>
        </div>
      </div>
      :
        ((subscriptionData.subscriptionState.state !== 'P') ?
        <Buttons.IndicationButton  text={"Modificar Donación"} customStyle={"w-full text-white bg-[#6c3333] purpleBgHover "} onClick={()=>setIfUserWantsToModifySubs(true)}></Buttons.IndicationButton>
        :
        <>
        <div className="flex flex-col space-y-6">
          <Buttons.IndicationButton  text={"Reanudar Donación"} customStyle={"w-full text-white bg-[#6c3333] purpleBgHover "} onClick={()=>{setShowModalWithConfirmation(true)}}></Buttons.IndicationButton>
          <div className="font-Pop-L text-xs text-center text-gray-400 basis-1/2" >{textos.pausada}</div> 
        </div>
        </>
        )}
     
    </div>
    </div>
    </>
  );
}

export default ChangeDonationFromProfileForm;

