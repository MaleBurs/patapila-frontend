import React from 'react';
import PieChart from './PieChart';
import { useOpenChartsContext } from '../../Context/OpenChartsContext';

export default function PieChartModule(props) {
  const {setShowPieChart} = useOpenChartsContext();

  return (
    <>     
      <div className="flex p-7 flex-[0_0_auto] h-[35vh]" onClick={() => setShowPieChart(true)}>  
        <div className="chart-container" style={{position: 'relative', height:'50vh', width:'50vh'}}>            
          <PieChart legendSize="15"></PieChart>
        </div>
      </div>      
    </>
  );
}

