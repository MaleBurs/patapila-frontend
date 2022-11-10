import React from 'react';
import BarChart from './BarChart';
import { useOpenChartsContext } from '../../Context/OpenChartsContext';

export default function BarChartModule(props) {
  const {setShowBarChart} = useOpenChartsContext();

  return (
        <>   
         <div className="flex p-7 flex-[0_0_auto] self-center" onClick={()=> setShowBarChart(true)}>
          <div className="chart-container" style={{position: 'relative', height:'50vh', width:'60vh'}}> 
            <BarChart></BarChart>
          </div>
        </div>     
  </>
  );
}

