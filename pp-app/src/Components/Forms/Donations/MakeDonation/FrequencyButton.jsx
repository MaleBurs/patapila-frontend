import { useFrequency } from  '../../../../Context/FrequencyContext'

const FrequencyButton = ({ label, value, position }) => {
  const { selectedFrequency, setSelectedFrequency } = useFrequency()
  const changeFrequency = () => {
    setSelectedFrequency(value)
  }
  return (
    <button
      onClick={changeFrequency}
      className={`basis-1/2 p-2 border-[#eb8301] border-4 ${(position === "left") ? 'rounded-l-lg' : 'rounded-r-lg'} ${((selectedFrequency === value) ? 'text-white yellowBg' : 'yellowText')}`}>
        {label}
    </button>
  )
}

export default FrequencyButton