import React from 'react';
import Chart from 'chart.js';
import { useEffect } from 'react';
import {useMonthlySubscriptionStateContext} from  '../../Context/MonthlySubscriptionStateContext'

export default function BarChart(props) {
  const { monthlyData } = useMonthlySubscriptionStateContext();
  const { monthlyAmounts } = useMonthlySubscriptionStateContext();
  console.log(monthlyAmounts)

  useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: Array.from(monthlyAmounts,(m)=>m.label), 
        datasets: [
          {
            label: 'RESUMEN DE COBRANZAS',
            data: Array.from(monthlyAmounts,(m)=>m.amount),
            backgroundColor: [
              'rgba(165, 192, 135)',
              'rgba(131, 157, 154)',
              'rgba(235, 131, 1)',
              '#0B4725',
              '#911229',
              '#141B41',
              '#2D080A',
              '#9DBBAE',
              '#525328',
              '#E75A0D',
              '#2F4858',
              '#98838F',
            ],
            hoverBackgroundColor: [
              "#87AB5F",
              "#AFC0BE",
              "#FE9A20",
              "#116a37",
              "#C81939",
              "#3A4DBB",
              "#570F13",
              "#7BA391",
              "#7B7C3C",
              "#F3712B",
              "#4F7892",
              "#856F7C",
            ], 
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        },
        legend:{
          display: false
        },
        
        
      }
    };
    let ctx = document.getElementById("bar").getContext('2d');
    window.myBar = new Chart(ctx, config);
  }, [monthlyAmounts]);
  return (
    <>
      <canvas id="bar"></canvas>
    </>
  );
}