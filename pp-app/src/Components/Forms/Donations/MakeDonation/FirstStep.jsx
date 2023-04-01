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
import {textos} from './MakeDonationTexts'

const determineExplanationTextForPaymentDay = (subsPeriod) => {
  return ((subsPeriod.value === "1") ?
    textos.diaMes
    : textos.primerDonacionDia)
  }

const FirstStep = ({ setStep }) => {
  const { selectedFrequency } = useFrequency()
  const {subscriptionData} = useCurrentUser()
  const { subsPeriod } = useSubscriptionPeriod()

  return (
    <>
    <StepTitle 
      titleText={!(subscriptionData) || (selectedFrequency===1) ? 
      textos.invitacionLucha 
      : ((subscriptionData.subscriptionState.state !== 'P') ?
        textos.donaRecurrentemente
        :
        textos.subsPausada
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
              initialValue={null}
              disabled ={false}  
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
        textos.instrModSusc
        : textos.instRenaudar }></ModifyDonationMessage>
      <ModifyDonation/>  
      </>
      }
      </>
      }
      </>
  )
}

export default FirstStep
