import React from 'react';
import { useOpenChartsContext } from '../../Context/OpenChartsContext';

export default function ChartModal(props) {
    const {setShowBarChart1, setShowBarChart2, setShowBarChart3, setShowPieChart, setShowBarChart2Cols, setShowBarChart4} = useOpenChartsContext();
  return (
    <>
    <div className="darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="my-6 mx-auto py-12 px-16 bg-white rounded-md w-fit h-auto flex flex-col space-y-6">
        <button onClick={()=>{setShowBarChart1(false);setShowBarChart2(false);setShowBarChart3(false); setShowBarChart4(false); setShowPieChart(false); setShowBarChart2Cols(false)}} className="font-Pop-SB text-lg text-gray-500 text-end px-10 hover:ease-in-out duration-300">X</button>
        <div className='flex flex-row space-x-8'>  
            <div className="flex flex-[0_0_auto] self-center">
              <div className="chart-container" style={props.chartContainerStyle}> 
                  {props.chart}
              </div>
            </div>
            <div className='self-center'>
              {props.label}
            </div>
        </div>  
      </div>
    </div>
  </>
  );
}

