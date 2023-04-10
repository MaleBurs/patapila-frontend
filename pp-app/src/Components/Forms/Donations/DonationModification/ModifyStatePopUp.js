import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@headlessui/react';
import DonationService from '../../../../services/donations.service';
import { useCurrentUser } from '../../../../Context/CurrentUserContext';
import ModalWithConfirmationAndDetails from "../../../Utiles/ModalWithConfirmationAndDetails";
import ModalWithWrittenConfirmation from "../../../Utiles/ModalWithWrittenConfirmation"
import Modal from "../../../Utiles/Modal";
import { useState } from 'react'
import { useAmount } from  '../../../../Context/AmountContext'
import {useSubscriptionPeriod} from  '../../../../Context/SubscriptionContext'
import ActServices from "../../../../services/activities.service";
import AuthService from "../../../../services/auth.service";
import { textos } from './DonationModificationTexts';

const ModifyStatePopUp = ( ) => {
  
    const {subscriptionData} = useCurrentUser()
    const [showModalWithConfirmation, setShowModalWithConfirmation] = useState(false);
    const [showModalWithWrittenConfirmation, setShowModalWithWrittenConfirmation] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { selectedAmount} = useAmount()
    const { subsPeriod } = useSubscriptionPeriod()
    const [cancellationRequest, setCancellationRequest] = useState(false);
    const currentUser = AuthService.getCurrentUser();

    const cancelledSubscriptionEvenctDescription = (amount, frequency) =>{
      return {title: "Has cancelado una suscripción", description: "Has cancelado una suscripción de $"+amount+" que se cobraba "+frequency+"."}
    }
    
    const pausedSubscriptionEvenctDescription = (amount, frequency) =>{
        return {title: "Has pausado una suscripción", description: "Has pausado una suscripción de $"+amount+" que se cobraba "+frequency+"."}
    }

    const closeModalWithConfirmation = () => {
      setShowModalWithConfirmation(false);
    };

    const closeModalWithWrittenConfirmation = () => {
      setShowModalWithWrittenConfirmation(false);
    };
  
    const closeModal = () => {
      setShowModal(false);
      setCancellationRequest(false);
      window.location.reload();
    };

    const handleCancelledSubs = () =>{
        DonationService.modifySubscriptionState(subscriptionData.id, 'C').then(
            () => {
              setShowModal(true);
              ActServices.createActivity(cancelledSubscriptionEvenctDescription(selectedAmount,subsPeriod.label).title, cancelledSubscriptionEvenctDescription(selectedAmount,subsPeriod.label).description, currentUser.id). then(
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
              console.log(resMessage);
            })
    }
    const handlePausedSubs = () =>{
        DonationService.modifySubscriptionState(subscriptionData.id, 'P').then(
            () => {
              setShowModal(true);
              ActServices.createActivity(pausedSubscriptionEvenctDescription(selectedAmount,subsPeriod.label).title, pausedSubscriptionEvenctDescription(selectedAmount,subsPeriod.label).description, currentUser.id). then(
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
              console.log(resMessage);
            })
    }
    return (
      <>
    {showModalWithConfirmation ? (
    <ModalWithConfirmationAndDetails 
    value={showModalWithConfirmation} onChange={closeModalWithConfirmation} header={
      textos.confirmacionPausa
          } body={textos.queSucedeAlPausar} saveChanges={handlePausedSubs}
    action={ "pausará"} saveButton="Guardar cambios" cancelButton="Volver atrás"></ModalWithConfirmationAndDetails>
    ) : null}
    { showModalWithWrittenConfirmation ? (
      <ModalWithWrittenConfirmation 
    value={showModalWithConfirmation} onChange={closeModalWithWrittenConfirmation} header={"¿Estás seguro de que deseas cancelar tu donación recurrente?"
          } body={textos.queSucedeAlCancelar} saveChanges={handleCancelledSubs}
    action={"cancelará"}></ModalWithWrittenConfirmation>
    ) : null

    }
    {showModal ? (
      <Modal value={showModal} onChange={closeModal} header={(!cancellationRequest) ?
      textos.pausadaOk  :  textos.canceladaOk
          }body={""} buttonText={"Continuar"}></Modal>
    ) : null}
        <Popover className={"grid relative"}>
            <Popover.Button className="focus:ring-0 justify-self-end lightgreyBgTranslucentHover rounded-3xl md:rounded-3xl w-fit ">
            <div className="flex flex-row items-center justify-around rounded-3xl w-fit border-2 font-Pop-L text-xs tracking-widest border-[#0F6938] text-[#0F6938] py-1 px-4 space-x-3">
                <div>Activa </div>
                <FontAwesomeIcon icon={faAngleDown} style={{color: "#0F6938",}} />
            </div>
            </Popover.Button>
            <Popover.Panel className={"absolute top-0 right-0 mt-4 p-3 rounded-lg almostWhiteBg grayBorder space-y-2"}>
                <div className="space-y-2">
                <button onClick={()=>{setCancellationRequest(true);setShowModalWithWrittenConfirmation(true)}} className='w-full text-left z-50 relative text-gray-400 duration-700 font-Pop-M hover:text-gray-500 focus:text-gray-500 tracking-[0.5px] grayBottomBorder block px-1 py-2 text-xs'>
                    {textos.opcionCancelar}
                </button>
                {(subscriptionData.subscriptionState.state !== 'P') ?
                <button onClick={()=>{setShowModalWithConfirmation(true)}} className='w-full text-left z-50 relative text-gray-400 duration-700 hover:text-gray-500 focus:text-gray-500 font-Pop-M tracking-[0.5px] block px-1 py-2 text-xs'>
                    {textos.opcionPausar}
                </button>
                : null
                }
                </div> 
            </Popover.Panel>
        </Popover>
      </>
    )
  }
  
  export default ModifyStatePopUp;