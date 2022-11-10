import { useFrequency } from  '../../../../Context/FrequencyContext'
import { useAmount } from '../../../../Context/AmountContext'
const CustomAmountInput = () => {
  const { selectedFrequency } = useFrequency()
  const { selectedAmount, setSelectedAmount } = useAmount()

  const onChange = (event) => {
    var amount = parseInt(event.target.value)
    amount = (isNaN(amount) ? 0 : amount);
    setSelectedAmount(amount)
  }
  return (
    <div className='w-full py-1 px-4 md:px-7 block flex flex-row justify-around font-Pop-M purpleText rounded-md uppercase font-Pop-M focus:purpleBorder border-gray-300 border-solid border h-auto'>
      <div className='self-center basis-1/8 text-sm'>
          $
      </div>
      <input
        type='text'
        autoFocus
        onChange={onChange}
        value = {selectedAmount}
        className='text-base w-[10px] md:w-auto basis-3/4 self-center border-none focus:outline-none focus:border-transparent focus:ring-0'>
      </input>
      <div className='self-center basis-1/8 text-sm text-end'>
          {(selectedFrequency === 1)  ? "ARS" : "ARS/MES"}
      </div>
    </div>
  )
}

export default CustomAmountInput
