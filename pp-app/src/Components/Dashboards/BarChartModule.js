import React from 'react';
import BarChart from './BarChart';

export default function BarChartModule(props) {

  return (
        <>   
         <div className="flex p-7 flex-[0_0_auto] self-center" onClick={props.openModule}>
          <div className="chart-container" style={{position: 'relative', height:'50vh', width:'60vh'}}> 
            <BarChart data={props.data} label={props.label} id={props.id}></BarChart>
          </div>
        </div>     
  </>
  );
}

