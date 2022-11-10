import { useAmount } from  '../../../Context/AmountContext'
import CustomAmountButton from './CustomAmountButton'
import CustomAmountInput from './CustomAmountInput'

const CustomAmount = ({ selected }) => {
  const { setSelectedAmount } = useAmount()
  const onClick = () => {
    setSelectedAmount(0)
  }
  const onChange = (event) => {
    const amount = parseInt(event.target)
    setSelectedAmount(amount)
  }
  return (
    selected ? <CustomAmountInput onChange={onChange}/> : <CustomAmountButton onClick={onClick}/>
  )
}
export default CustomAmount