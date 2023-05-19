import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import DonationService from '../../../../services/donations.service';
import { useCurrentUser } from '../../../../Context/CurrentUserContext';
import { useEffect, useState } from 'react'
import { useAmount } from  '../../../../Context/AmountContext'
import {useSubscriptionPeriod} from  '../../../../Context/SubscriptionContext'
import ActServices from "../../../../services/activities.service";
import AuthService from "../../../../services/auth.service";
import { textos } from './DonationModificationTexts';
import ActivarDonacion from "../../../Images/Activar donación.png";
import PausarDonacion from "../../../Images/Pausar donación.png";
import CancelarDonacion from "../../../Images/Cancelar donación.png";

const ModifyStatePopUp = (props) => {

    const states ={
      A:{
        title: "Activa",
        colorStyle: "text-[#0F6938] border-[#0F6938]",
        color: "#0F6938",
        pausedOption: true,
        activeOption: false,
      },
      P:{
        title: "Pausada",
        colorStyle: "text-[#eb8301] border-[#eb8301]",
        color: "#eb8301",
        pausedOption: false,
        activeOption: true,
      },
    }
  
    const {subscriptionData} = useCurrentUser()
    const [showModal, setShowModal] = useState(false);
    const { selectedAmount} = useAmount()
    const { subsPeriod , paymentDay} = useSubscriptionPeriod()
    const [choosedPaused, setChoosedPaused] = useState(false);
    const [choosedCancelled, setChoosedCancelled] = useState(false);
    const [choosedActive, setChoosedActive] = useState(false);
    const [currentState, setCurrentState] = useState(states[subscriptionData.subscriptionState.state]);
    const currentUser = AuthService.getCurrentUser();


    useEffect(() => {
      setCurrentState(states[subscriptionData.subscriptionState.state])
    }, [subscriptionData.subscriptionState.state])

    const cancelledSubscriptionEvenctDescription = (amount, frequency) =>{
      return {title: "Has cancelado una suscripción", description: "Has cancelado una suscripción de $"+amount+" que se cobraba "+frequency+"."}
    }
    
    const pausedSubscriptionEvenctDescription = (amount, frequency) =>{
        return {title: "Has pausado una suscripción", description: "Has pausado una suscripción de $"+amount+" que se cobraba "+frequency+"."}
    }

    const resetSubscriptionEvenctDescription = (amount, frecuency, nextPaymentDate) =>{
      return {title: "Has reanudado una suscripción", description: "Has reanudado una suscripción de "+amount+", que se cobra "+frecuency+ " y la próxima fecha de pago es el "+nextPaymentDate+"." }
    }
  
    const closeModal = () => {
      setShowModal(false);
      setChoosedCancelled(false);
      setChoosedPaused(false);
      setChoosedActive(false);
    };


    const handleCancelledSubs = async () => {
      return new Promise((resolve, reject) => {
        DonationService.modifySubscriptionState(subscriptionData.id, 'C').then(
          () => {
            ActServices.createActivity(7, cancelledSubscriptionEvenctDescription(selectedAmount, subsPeriod.label).description, currentUser.id).then(
              (res) => {
                resolve(); // Resolve the promise when the operation is completed
              }
            );
          },
          (error) => {
            const resMessage =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            reject(error); // Reject the promise if there is an error
          }
        );
      });
    };
    const handlePausedSubs = async () => {
      return new Promise((resolve, reject) => {
        DonationService.modifySubscriptionState(subscriptionData.id, 'P').then(
          () => {
            ActServices.createActivity(8, pausedSubscriptionEvenctDescription(selectedAmount, subsPeriod.label).description, currentUser.id).then(
              (res) => {
                resolve();
              }
            );
          },
          (error) => {
            const resMessage =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            reject(error);
          }
        );
      });
    };
    
    const handleResetDonation = async () => {
      return new Promise((resolve, reject) => {
        DonationService.modifySubscriptionState(subscriptionData.id, 'A').then(
          () => {
            ActServices.createActivity(5, resetSubscriptionEvenctDescription(selectedAmount, subsPeriod.label, paymentDay).description, currentUser.id).then(
              (res) => {
                resolve();
              }
            );
          },
          (error) => {
            const resMessage =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);
            reject(error);
          }
        );
      });
    };
  
    const handleNextStep = async() =>{
      if(choosedCancelled){
        await handleCancelledSubs();
        setShowModal(false);
        window.location.reload();
      }else if (choosedPaused){
        await handlePausedSubs();
        setShowModal(false);
        window.location.reload();
      } else if (choosedActive){
        handleResetDonation();
          setShowModal(false);
          window.location.reload();
      }
    }
    
    return (
      <>       
      <button onClick={()=> setShowModal(true)} className={`flex flex-row items-center justify-around rounded-3xl w-fit border-2 font-Pop-L text-xs tracking-widest py-1 px-4 space-x-3 ${currentState.colorStyle}`}>
          <div>{currentState.title} </div>
          <FontAwesomeIcon icon={faAngleDown} style={{color: currentState.color,}} />
      </button>

      {showModal &&
        <>
        <div className="darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl p-10">
            
            <div className="space-y-10 p-8  rounded-md relative flex flex-col w-auto bg-white outline-none focus:outline-none"> 
              <button className="place-self-end" onClick={closeModal}>
                <FontAwesomeIcon icon={faXmark} style={{color: "#000000"}} size="2x" />
              </button>
              <div className='px-12 flex flex-col'>
                <div className="text-center font-Pop-M text-lg place-self-center tracking-wide purpleText">
                  Cambiar el estado de mi suscripción
                </div>
                <div className='text-center text-xs font-Pop-L mt-4'>
                  Sabemos que las circustancias de cada persona cambian. En vez de cancelar tu suscripción podes pausarla. Cuando tu situación sea favorable podrás reactivarla. 
                </div>
                <div className='flex flex-row w-full items-center justify-center space-x-5 mt-8'>

                  {currentState.pausedOption &&
                    <button onClick={()=>{setChoosedCancelled(false); setChoosedPaused(true); setChoosedActive(false)}} className={`rounded-md p-8 flex flex-col basis-1/2 items-center duration-700 border ${choosedPaused ? 'blackText border-solid border-gray-400': 'text-gray-500 hover:border-solid hover:border-[#e4e4e4] border-[#e7e6e6] border-dashed'}`}>
                      <img src={PausarDonacion} alt="pausar" className='w-24 h-auto'/>
                      <div className='font-Pop-R text-sm tracking-widest mt-4'>Pausar la Suscripción</div>
                      <div className='font-Pop-L text-xs tracking-wide mt-2'>No se realizará ningún cargo en la tarjeta, mientras la suscripción se encuentre pausada.</div>
                  </button>}
                  {currentState.activeOption &&
                    <button onClick={()=>{setChoosedCancelled(false); setChoosedPaused(false); setChoosedActive(true)}} className={`rounded-md p-8 flex flex-col basis-1/2 items-center duration-700 border ${choosedActive ? 'blackText border-solid border-gray-400': 'text-gray-500 hover:border-solid hover:border-[#e4e4e4] border-[#e7e6e6] border-dashed'}`}>
                      <img src={ActivarDonacion} alt="activar" className='w-24 h-auto'/>
                      <div className='font-Pop-R text-sm tracking-widest mt-4'>Reanudar Suscripción</div>
                      <div className='font-Pop-L text-xs tracking-wide mt-2'>Se volerá a activa la suscripción que se encontraba pausada ¡Gracias por su ayuda!</div>
                  </button>}
                  <button onClick={()=>{setChoosedCancelled(true); setChoosedPaused(false); setChoosedActive(false)}} className={`rounded-md p-8 flex flex-col basis-1/2 items-center duration-700 border ${choosedCancelled ? 'blackText border-solid border-gray-400': 'text-gray-500 hover:border-solid hover:border-[#e4e4e4] border-[#e7e6e6] border-dashed'}`}>
                      <img src={CancelarDonacion} alt="cancelar" className='w-24 h-auto'/>
                      <div className='font-Pop-R text-sm tracking-widest mt-4'>Cancelar Suscripción</div>
                      <div className='font-Pop-L text-xs tracking-wide mt-2'>Se desactivará tu suscripcion definitivamemte. Podrás seguir accediendo a tu cuenta.</div>
                  </button>
 
                </div>
                <button onClick={handleNextStep} className='purpleBgHover bg-[#6c3333] tracking-widest py-4 px-6 uppercase text-white font-Pop-R text-sm rounded-md mt-8 mb-4 place-self-end'>Continuar</button>
              </div>
      
            </div>
          </div>
        </div>    
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        }      
      </>
    )
  }
  
  export default ModifyStatePopUp;

              {/* <Popover.Panel className={"absolute top-0 right-0 mt-4 p-3 rounded-lg almostWhiteBg grayBorder space-y-2"}>
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
            </Popover.Panel> */}