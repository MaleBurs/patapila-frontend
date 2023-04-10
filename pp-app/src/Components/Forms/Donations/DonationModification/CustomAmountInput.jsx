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
    <div className="w-full px-4 flex flex-row justify-around font-Pop-M purpleText rounded-md uppercase py-2 md:py-1 focus:purpleBorder border-[1px] border-[#e7e6e6]">
      <div className='self-center text-sm'>
          $
      </div>
      <div>
      <input
        type='text'
        disabled={!userWantsToModifySubs}
        autoFocus
        onChange={onChange}
        value = {selectedAmount}
        className='w-56 self-center border-none focus:outline-none focus:border-transparent focus:ring-0 text-sm md:text-lg'>
      </input>
      </div>
      <div className='self-center text-sm'>
          {(selectedFrequency === 1)  ? "ARS" : "ARS/MES"}
      </div>
    </div>
  )
}

export default CustomAmountInput
