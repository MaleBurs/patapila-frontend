import Amounts from '../Amounts'
import StartDonation from './StartDonation'
import ModifyDonation from './ModifyDonation'
import DonationAmountImpactMessage from './DonationAmountImpactMessage'
import ModifyDonationMessage from './ModifyDonationMessage'
import DashedLine from '../../../Utiles/DashedLine'
import { useFrequency } from  '../../../../Context/FrequencyContext'
import SelectSubscriptionPeriod from '../SelectSubscriptionPeriod'
import { useCurrentUser } from "../../../../Context/CurrentUserContext";
import CustomAmountInput from './CustomAmountInput'
import SelectPaymentDay from '../SelectPaymentDay'
import StepTitle from './StepTitle';
import { useSubscriptionPeriod } from '../../../../Context/SubscriptionContext'
import SubscriptionImpactForSelectedAmount from '../SubscriptionImpactForSelectedAmount'
const determineExplanationTextForPaymentDay = (subsPeriod) => {
  return ((subsPeriod.value === "1") ?
    "¿Qué día del mes quiere que se realize el pago?"
    :"¿Qué día quiere comenzar a donar?")
  }

const FirstStep = ({ setStep }) => {
  const { selectedFrequency } = useFrequency()
  const {subscriptionData} = useCurrentUser()
  const { subsPeriod } = useSubscriptionPeriod()
  const payment = ((new Date()).getFullYear().toString() +'-'+'0'+((new Date()).getMonth() + 2).toString() + '-' + (new Date()).getDate().toString())

  return (
    <>
    <StepTitle 
      titleText={!(subscriptionData) || (selectedFrequency===1) ? 
      'Únase a la lucha contra la desnutrición infantil' 
      : ((subscriptionData.subscriptionState.state !== 'paused') ?
        "Usted ya esta realizando una donación recurrente"
        :
        "Usted ya tiene una suscripción pausada"
        )}/>  
      {(selectedFrequency===1) ? 
      <>
      <div className='flex flex-col space-y-6'>
        <Amounts showOptions={true} customAmountInput={<CustomAmountInput/>}></Amounts>
        <SubscriptionImpactForSelectedAmount/>
        <DashedLine></DashedLine>
        <DonationAmountImpactMessage></DonationAmountImpactMessage>
        <StartDonation setStep={setStep}/>  
      </div>
      </>
      :
      <>
      {!subscriptionData ?
      <>
        <div className='flex flex-col space-y-6'>
          <Amounts showOptions={true} customAmountInput={<CustomAmountInput/>}></Amounts>
          <SubscriptionImpactForSelectedAmount/>
          <DashedLine></DashedLine>
          <div className='space-y-6'>
            <SelectSubscriptionPeriod></SelectSubscriptionPeriod>
            <SelectPaymentDay 
              explanationText={determineExplanationTextForPaymentDay(subsPeriod)}
              initialValue={payment}
              disabled ={true}  
            />
          </div>
          <DashedLine></DashedLine>
          <DonationAmountImpactMessage></DonationAmountImpactMessage>
          <StartDonation setStep={setStep}/>  
        </div>
      </>
      :
      <>
      <ModifyDonationMessage 
        text={(subscriptionData.subscriptionState.state !=='P') ? 
        "Vaya a ajustes para visualizar/modificar su suscripción actual." 
        :"Vaya a ajustes para reanudar su suscripción y continuar luchando contra la desnutrición infantil."}></ModifyDonationMessage>
      <ModifyDonation/>  
      </>
      }
      </>
      }
      </>
  )
}

export default FirstStep
