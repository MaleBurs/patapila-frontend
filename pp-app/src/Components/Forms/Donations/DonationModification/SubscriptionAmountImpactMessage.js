import { useAmount } from  '../../../../Context/AmountContext'
import impactSubsValues from '../../../../Values/impactSubsValues'
import { useState, useEffect } from 'react'
import AmountImpactMessage from '../AmountImpactMessage'

const SubscriptionAmountImpactMessage = () => {;
    const { selectedAmount } = useAmount()
    const [amountImpact , setAmountImpact] = useState(impactSubsValues[selectedAmount]);

    useEffect(() => {
        setAmountImpact(impactSubsValues[selectedAmount])
      }, [selectedAmount])

  return (
    <>
        <AmountImpactMessage message={defineSubscriptionImpactMessage(selectedAmount, amountImpact)}/>
    </>
  )
}

export default SubscriptionAmountImpactMessage;

function defineSubscriptionImpactMessage(selectedAmount, amountImpact) {
    return (selectedAmount !== 0) ?
    defineSubscriptionImpactMessageIfAmountIsNotCero(selectedAmount, amountImpact)
    :
    defineSubscriptionImpactMessageIfAmountIsCero()
}

function defineSubscriptionImpactMessageIfAmountIsCero() {
    return "Con tu donación brindas todos los meses atención nutricional a niños/as de la comunidad."
}

function defineSubscriptionImpactMessageIfAmountIsNotCero(selectedAmount, amountImpact) {
    return (amountImpact) ?
        `Con tu donación de $${selectedAmount} brindas atención nutricional a ${amountImpact} niños/as todos los meses.`
        :
        `Con tu donación de $${selectedAmount} brindas atención nutricional a niños/as de la comunidad`
}


