import { useAmount } from  '../../../../Context/AmountContext'
import { useFrequency } from  '../../../../Context/FrequencyContext'
import impactSubsValues from '../../../../Values/impactSubsValues'
import { useState, useEffect } from 'react'
import AmountImpactMessage from '../AmountImpactMessage'

const DonationAmountImpactMessage = () => {;
    const { selectedAmount } = useAmount()
    const { selectedFrequency } = useFrequency();
    const [amountImpact , setAmountImpact] = useState(impactSubsValues[selectedAmount]);

    useEffect(() => {
        setAmountImpact(impactSubsValues[selectedAmount])
      }, [selectedAmount])

  return (
    <>
        <AmountImpactMessage message={defineDonationImpactMessage(selectedAmount, amountImpact, selectedFrequency)}/>
    </>
  )
}

export default DonationAmountImpactMessage;

function defineDonationImpactMessage(selectedAmount, selectedFrequency, amountImpact) {
    return (selectedAmount !== 0) ?
    defineDonationImpactMessageIfAmountIsNotCero(selectedAmount, amountImpact)
    :
    defineDonationImpactMessageIfAmountIsCero(selectedFrequency)
}

function defineDonationImpactMessageIfAmountIsCero(selectedFrequency) {
    return (selectedFrequency === 1) ?
        "Realiza una donación para brindar atención nutricional a niños/as de la comunidad." :
        "Realiza una donación todos los meses para brindar atención nutricional a niños/as de la comunidad."
}

function defineDonationImpactMessageIfAmountIsNotCero(selectedAmount, amountImpact) {
    return (amountImpact) ?
        `Con tu donación de $${selectedAmount} brindas atención nutricional a ${amountImpact} niños/as todos los meses.`
        :
        `Con tu donación de $${selectedAmount} brindas atención nutricional a niños/as de la comunidad`
}


