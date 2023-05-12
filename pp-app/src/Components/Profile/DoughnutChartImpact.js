import React from 'react';
import Chart from 'chart.js';
import { useEffect, useState} from 'react';


export default function ImpactChart(props) {
  const [donatedByRefferals, setDonatedByRefferals] = useState(null);
  const [data, setData] = useState([1]);
  const [bgColor, setBgColor] = useState(null);
  const mustReload = React.createRef();

  useEffect(() => {

    const setBgColorAndDataToDefault = () => {
      setData([1]);
      setBgColor(['rgba(231, 230, 230)']);
    };

    const setBgColorAndDataToCorrect = () => {
      setData([props.donatedByRefferals, props.donatedByUser]);
      setBgColor([
        'rgba(244, 220, 191)',
        'rgba(108, 51, 51)',
      ]);
    };

    setDonatedByRefferals(props.donatedByRefferals);
    (props.donatedByRefferals === 0 && props.donatedByUser === 0) ?
      setBgColorAndDataToDefault()
      :
      setBgColorAndDataToCorrect();
        
  }, [props.donatedByRefferals, props.donatedByUser])

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
    
  }, [donatedByRefferals]);
  return (
    <>
      <canvas id="doughnut" ref={mustReload}></canvas>
    </>
  );
}



