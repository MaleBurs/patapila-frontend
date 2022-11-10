import { useFrequency } from  '../../../Context/FrequencyContext'
const CustomAmountButton = ({ onClick }) => {
  const { selectedFrequency } = useFrequency()
  return (
    <div className='col-span-2 p-1'>
      <button
        onClick={onClick}
        className='text-center space-x-3 justify-center flex-auto flex flex-rows w-full h-auto m-1 purpleBgHover purpleBorder border-gray-400 purpleText rounded-lg uppercase font-Pop-M py-4 px-6'>
          <div className='text-xl'>
          $
          </div>
          <div className='text-lg'>
            {(selectedFrequency === 1)  ? "ARS" : "ARS/MES"}
          </div>
      </button>
    </div>
  )
}

export default CustomAmountButton