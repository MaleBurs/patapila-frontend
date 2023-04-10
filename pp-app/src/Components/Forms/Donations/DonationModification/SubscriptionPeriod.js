import subscriptionPeriod from "../../../../Values/subscriptionPeriod"
import {useSubscriptionPeriod} from  '../../../../Context/SubscriptionContext'
import { useSubModContext } from "../../../../Context/SubscriptionModificationContext";
import { useEffect } from "react";
import { useCurrentUser } from "../../../../Context/CurrentUserContext";
import SelectSubscriptionPeriod from "../SelectSubscriptionPeriod";

const SubscriptionPeriod = ( ) => {
  const { subsPeriod, setSubsPeriod} = useSubscriptionPeriod()
  const {userWantsToModifySubs} = useSubModContext()
  const {subscriptionData} = useCurrentUser()

  useEffect(() => {
    const currentperiod = subscriptionPeriod.find(period => period.value === (subscriptionData.frequency).toString());
    setSubsPeriod(currentperiod);
  },[setSubsPeriod, subscriptionData.frequency])
  
    return (
      <>
      {userWantsToModifySubs ? 
      <SelectSubscriptionPeriod/>
      :
      <div className="flex flex-row md:space-x-6">
         <div className="font-Pop-R text-xs tracking-widest text-gray-500 basis-1/2" >Su donación se realiza: </div> 
         <div className="font-Pop-SB text-xs purpleText tracking-widest basis-1/2 text-end" >{subsPeriod.label}</div>
      </div>
      }
      </>
    )
  }
  
  export default SubscriptionPeriod