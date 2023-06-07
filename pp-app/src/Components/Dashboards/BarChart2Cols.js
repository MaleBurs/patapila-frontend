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
          },{
            label: props.label2,
            data: Array.from(props.data2,(m)=>m.value),
            backgroundColor: [
              '#FF9800',   // Orange
              '#2196F3',   // Blue
              '#8BC34A',   // Light Green
              '#FFEB3B',   // Yellow
              '#9C27B0',   // Purple
              '#03A9F4',   // Light Blue
              '#FF5722',   // Deep Orange
              '#8BC34A',   // Light Green
              '#9E9D24',   // Lime
              '#FF5722',   // Deep Orange
              '#03A9F4',   // Light Blue
              '#9E9D24',   // Lime
            ],
            hoverBackgroundColor: [
              '#FB8C00',   // Dark Orange
              '#1976D2',   // Dark Blue
              '#689F38',   // Dark Green
              '#FDD835',   // Dark Yellow
              '#7B1FA2',   // Dark Purple
              '#0288D1',   // Dark Light Blue
              '#E64A19',   // Dark Deep Orange
              '#689F38',   // Dark Green
              '#827717',   // Dark Lime
              '#E64A19',   // Dark Deep Orange
              '#0288D1',   // Dark Light Blue
              '#827717',   // Dark Lime
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
    let ctx = document.getElementById(props.id).getContext('2d');
    window.myBar = new Chart(ctx, config);
  }, [props.data]);
  return (
    <>
      <canvas id={props.id}></canvas>
    </>
  );
}