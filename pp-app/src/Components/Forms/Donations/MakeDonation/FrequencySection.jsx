import FrequencyButton from "./FrequencyButton"
import frequencyEnum from "../../../../Values/frequency.enum"

const FrequencySection = () => {
  return (
    <div className="w-full flex flex-row font-Pop-M text-sm">
      <FrequencyButton label="Única vez" value={frequencyEnum.once} position="left"/>
      <FrequencyButton label="Suscripción" value={frequencyEnum.monthly} position= "right"/>
    </div>
  )
}


export default FrequencySection