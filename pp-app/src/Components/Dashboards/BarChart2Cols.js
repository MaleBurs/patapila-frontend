import React from 'react';
import Chart from 'chart.js';
import { useEffect } from 'react';


export default function BarChart2Cols(props) {

  useEffect(() => {
    let date = new Date();
    let month = date.getMonth();
    let config = {
      type: "bar",
      data: {
        labels: Array.from(props.data,(m)=>m.label).filter((obj, index) => index < month + 1), 
        datasets: [
          {
            label: props.label,
            data: Array.from(props.data,(m)=>m.value).filter((obj, index) => index < month + 1),
            backgroundColor: 
              'rgba(131, 157, 154)',
            hoverBackgroundColor: 
              "#AFC0BE", 
          },{
            label: props.label2,
            data: Array.from(props.data2,(m)=>m.value),
            backgroundColor: 
              'rgba(235, 131, 1)',
            hoverBackgroundColor: 
              "#FE9A20",                         
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
    let ctx = document.getElementById(props.id).getContext('2d');
    window.myBar = new Chart(ctx, config);
  }, [props.data]);
  return (
    <>
      <canvas id={props.id}></canvas>
    </>
  );
}