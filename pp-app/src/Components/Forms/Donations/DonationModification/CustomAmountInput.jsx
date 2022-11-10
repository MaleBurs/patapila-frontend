import { useFrequency } from  '../../../../Context/FrequencyContext'
import { useAmount } from '../../../../Context/AmountContext'
import { useSubModContext} from '../../../../Context/SubscriptionModificationContext'
import { useCurrentUser } from '../../../../Context/CurrentUserContext'
import { useEffect } from 'react'

const CustomAmountInput = () => {
  const { selectedFrequency } = useFrequency()
  const { selectedAmount, setSelectedAmount } = useAmount()
  const {userWantsToModifySubs} = useSubModContext()
  const {subscriptionData} = useCurrentUser()

  const onChange = (event) => {
    var amount = parseInt(event.target.value)
    amount = (isNaN(amount) ? 0 : amount);
    setSelectedAmount(amount);
  }
  useEffect(() => {
    setSelectedAmount(subscriptionData.amount)
  },[subscriptionData.amount, setSelectedAmount])
  
  return (
    <div className={`inline-block w-full px-4 block flex flex-row justify-around font-Pop-M purpleText rounded-md uppercase h-auto py-2 md:py-1 focus:purpleBorder border-[1px] ${useSubModContext ? "border-gray-300":"border-gray-100"}`}>
      <div className='self-center md:basis-1/8 text-sm md:text-base'>
          $
      </div>
      <input
        type='text'
        disabled={!userWantsToModifySubs}
        autoFocus
        onChange={onChange}
        value = {selectedAmount}
        className='shrink md:basis-3/4 self-center border-none focus:outline-none focus:border-transparent focus:ring-0 text-sm md:text-base '>
      </input>
      <div className='self-center md:basis-1/8 text-sm'>
          {(selectedFrequency === 1)  ? "ARS" : "ARS/MES"}
      </div>
    </div>
  )
}

export default CustomAmountInput
