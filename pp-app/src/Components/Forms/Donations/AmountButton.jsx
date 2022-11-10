import { useAmount } from '../../../Context/AmountContext'

const getSelectedColors = (selected) => {
  return selected ? 'yellowBg text-white border-[#eb8301] border-1 ' : 
  'bg-[#f5f8f2] border-[#f5f8f2] border-1 text-[#08361c]'
}

const AmountButton = ({ amount, selected }) => {
  const { setSelectedAmount } = useAmount()
  const handleClick = () => {
    setSelectedAmount(amount)
  }
  return (
    <div className='m-1'>
      <button className={`space-x-3 justify-center flex flex-row rounded-3xl uppercase font-Pop-M py-1 w-full h-auto border m-1 ${getSelectedColors(selected)}`} onClick={handleClick}>
        <div className='text-sm'>
          ${amount}
        </div>
      </button>
    </div>
  )
}

export default AmountButton