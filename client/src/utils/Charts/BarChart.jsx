import React from 'react'
import {Bar} from 'react-chartjs-2'




import './BarChart.css'
import {Chart,LinearScale,CategoryScale,BarElement,Legend,Title, Tooltip} from 'chart.js';
Chart.register(LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip)

const labels=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]

const options={
    responsive: true,
    //maintainAspectRatio: false,

    scales: {
        x: {
            barPercentage: 0.8,
            categoryPercentage: 0.9,
            grid: {
                display: false, // Remove vertical grid lines
            },
          
        },
    
       
    },
    plugins:{

       legend:{
        postion:"top"
       },
       title:{
        display: true,
        text: "State Vise Sales",
        fontSize: 30
       }
    }
}
const data={
    labels,datasets:[
        {
            label:"AndhraPradesh",
            data:[10216,11317,12456,11116,10016,30456,40523,25015,45631,42310,56014,12304],
            backgroundColor: "#fe8a96",
            barThickness:8,
           
            
        },
        {
            label:"Bihar",
            data:[10216,11317,12456,11116,10016,30456,40523,25015,45631,42310,56014,12304],
            backgroundColor:"#3a9be9",
            barThickness:8
        },
        {
            label:"Karnataka",
            data:[10216,11317,12456,11116,10016,30456,40523,25015,45631,42310,56014,12304], 
            backgroundColor:"#39d2bc",
            barThickness:8
        }, 
       
       
        
       
       
    ]
}

const Charts = () => {
  return (
    <div className='chart-container'>
        <Bar data={data} options={options} barSize={10} />
    </div>
  )
}

export default Charts 









