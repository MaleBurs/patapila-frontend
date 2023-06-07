import React from 'react';
import BarChart2Cols from './BarChart2Cols';

export default function BarChart2ColsModule(props) {

  return (
        <>   
         <div className="flex p-7 flex-[0_0_auto] self-center" onClick={props.openModule}>
          <div className="chart-container" style={{position: 'relative', height:'50vh', width:'60vh'}}> 
            <BarChart2Cols data={props.data} data2={props.data2} label={props.label} label2={props.label2} id={props.id}></BarChart2Cols>
          </div>
        </div>     
  </>
  );
}

