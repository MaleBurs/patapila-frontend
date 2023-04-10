import { useAmount } from  '../../../Context/AmountContext'
import impactSubsValues from '../../../Values/impactSubsValues'
import { useState, useEffect } from 'react'

const SubscriptionImpactForSelectedAmount = () => {
    const { selectedAmount } = useAmount()
    const [amountImpact , setAmountImpact] = useState(impactSubsValues[selectedAmount])

    useEffect(() => {
        setAmountImpact(impactSubsValues[selectedAmount])
      }, [selectedAmount])

  return (
    <>
    <div className='text-center font-Pop-L text-sm tracking-wide text-gray-500'>
    {
    defineImpact(selectedAmount,amountImpact)
    }
    </div>
    </>
  )
}

export default SubscriptionImpactForSelectedAmount

function defineImpact(selectedAmount,amountImpact) {
    return (selectedAmount !== 0) ?
    defineImpactIfAmountIsNotCero(amountImpact)
    :
    defineImpactIfAmountIsCero()
}

function defineImpactIfAmountIsCero() {
    return "Todavía no estas brindando atención nutricional a algún niños/as."
}

function defineImpactIfAmountIsNotCero(amountImpact) {
    return (amountImpact) ?
        `Estas brindando atención nutricional a ${amountImpact} niños/as.`
        :
        `Estas brindando atención nutricional a niños/as.`
}
