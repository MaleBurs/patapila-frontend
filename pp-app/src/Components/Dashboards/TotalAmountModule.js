import {React} from 'react';
import { useDashboardContext } from '../../Context/DashboardContext';
import Chart from 'chart.js';
import { useEffect, useState, useRef} from 'react';

export default function TotalAmountModule(props) {
  const { totalAmountByModeMonth, totalAmountMonth } = useDashboardContext();
  return (
        <>          
        <div className="flex p-7 flex-col space-y-4 divide-y divide-dashed divide-[#e7e6e6]"> 

        <div className="inline-block w-full px-4 block flex flex-row justify-around font-Pop-M purpleText rounded-md uppercase h-auto py-1 md:py-1 focus:purpleBorder border-[1px] border-gray-300 mx-15">
          <div className='self-center md:basis-1/8 text-sm '>
              $
          </div>
          <input
            type='text'
            disabled
            autoFocus
            value = {totalAmountMonth}
            className='bg-transparent shrink md:basis-3/4 self-center border-none focus:outline-none focus:border-transparent focus:ring-0 text-sm  '>
          </input>
          <div className='self-center md:basis-1/8 text-sm '>
              ARS
          </div>
        </div>

        <div className='flex flex-col space-y-8'>
          <div className="chart-container place-self-center" style={{position: 'relative', width:'40vh'}}>
            <SubsAmountVSTransAmount amountByTrans={totalAmountByModeMonth.onlyTimeAmount} amountBySubs={totalAmountByModeMonth.recurrentAmount}></SubsAmountVSTransAmount>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
              <span className="inline-flex rounded-full bg-[#6c3333] h-3 w-3"></span>
              <div>Importe total por donaciones: ${totalAmountByModeMonth.onlyTimeAmount}</div>
            </div>
            <div className="font-Pop-L text-xs text-gray-700 flex flex-row space-x-2">
              <span className="inline-flex rounded-full bg-[#f4dcbf] h-3 w-3"></span>
              <div>Importe total por suscripciones: ${totalAmountByModeMonth.recurrentAmount}</div>
            </div>
          </div>  
        </div> 
            
        </div>
          
  </>
  );

}


function SubsAmountVSTransAmount(props) {
  const [data, setData] = useState([1]);
  const [bgColor, setBgColor] = useState(null);
  const mustReload = useRef(null);

  useEffect(() => {

    const setBgColorAndDataToDefault = () => {
      setData([1]);
      setBgColor(['rgba(231, 230, 230)']);
    };

    const setBgColorAndDataToCorrect = () => {
      setData([props.amountByTrans, props.amountBySubs]);
      setBgColor([
        'rgba(244, 220, 191)',
        'rgba(108, 51, 51)',
      ]);
    };

    ( props.amountBySubs=== 0 && props.amountByTran=== 0) ?
      setBgColorAndDataToDefault()
      :
      setBgColorAndDataToCorrect();
        
  }, [props.amountByTrans, props.amountBySubs])

  useEffect(() => {

    let config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data,
            backgroundColor:bgColor,            
          },
        ],
      },
      options: {
        cutoutPercentage: 70,
        events: [],
        plugins: {
          tooltip: {
            events: []
          }
        }
      }
    };
    let ctx = document.getElementById("doughnut").getContext('2d');
    ctx.height = 10;
    window.myBar = new Chart(ctx, config);
    
  }, []);
  return (
    <>
      <canvas id="doughnut" ref={mustReload}></canvas>
    </>
  );
}





