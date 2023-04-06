import React from 'react';
import Chart from 'chart.js';
import { useEffect, useState} from 'react';
import DonationService from '../../services/donations.service';
import AuthService from '../../services/auth.service';


export default function ImpactChart() {
  const [donatedByRefferals, setDonatedByRefferals] = useState(null);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    DonationService.amountDonatedByRefferals(currentUser.id).then(res=>setDonatedByRefferals(res.data.total))
  }, [])
  useEffect(() => {
    let config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [currentUser.totalAmountDonated, donatedByRefferals],
            backgroundColor: [
              'rgba(244, 220, 191)',
              'rgba(108, 51, 51)',
            ],            
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
      <canvas id="doughnut"></canvas>
    </>
  );
}



