import React from 'react';
import Chart from 'chart.js';
import { useEffect, useState} from 'react';
import DonationService from '../../services/donations.service';
import AuthService from '../../services/auth.service';


export default function ImpactChart() {
  const [donatedByRefferals, setDonatedByRefferals] = useState(null);
  const currentUser = AuthService.getCurrentUser();
  const [data, setData] = useState([])
  const [bgColor, setBgColor] = useState([])
  const mustReload = React.createRef();

  useEffect(() => {

    const setBgColorAndDataToDefault = () => {
      setData([1]);
      setBgColor(['rgba(231, 230, 230)']);
    };

    const setBgColorAndDataToCorrect = (total) => {
      setData([currentUser.totalAmountDonated, total]);
      setBgColor([
        'rgba(244, 220, 191)',
        'rgba(108, 51, 51)',
      ]);
    };

    DonationService.amountDonatedByRefferals(currentUser.id).then(
      res=>{
        setDonatedByRefferals(res.data.total);
        (res.data.total === 0 && currentUser.totalAmountDonated === 0) ?
          setBgColorAndDataToDefault()
          :
          setBgColorAndDataToCorrect(res.data.total);
      }
    )
  }, [currentUser.id, currentUser.totalAmountDonated])

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



