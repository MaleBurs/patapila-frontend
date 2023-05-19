import {React, useEffect} from 'react';
import {useMonthlySubscriptionStateContext} from  '../../Context/MonthlySubscriptionStateContext'

export default function TotalAmountModule(props) {
  const { month, monthlyData } = useMonthlySubscriptionStateContext();

  const getValue = () => {
    for (const md of monthlyData){
      if(md.value === month){
        return md.amount
      }
    }
  }

  return (
        <>          
        <div className="flex p-7 flex-[0_0_auto]"> 

        <div className="inline-block w-full px-4 block flex flex-row justify-around font-Pop-M purpleText rounded-md uppercase h-auto py-1 md:py-1 focus:purpleBorder border-[1px] border-gray-300 mx-15">
          <div className='self-center md:basis-1/8 text-sm '>
              $
          </div>
          <input
            type='text'
            disabled
            autoFocus
            value = {getValue()}
            className='shrink md:basis-3/4 self-center border-none focus:outline-none focus:border-transparent focus:ring-0 text-sm  '>
          </input>
          <div className='self-center md:basis-1/8 text-sm '>
              ARS
          </div>
        </div>
            
        </div>
          
  </>
  );
}

