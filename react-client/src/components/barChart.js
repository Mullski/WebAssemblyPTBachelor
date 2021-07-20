import '../App.css';
import React, {useState, useRef, useEffect} from 'react';
import Chart from 'chart.js';
import {Line, Bar, Scatter} from 'react-chartjs-2';
import { useForm } from "react-hook-form";

let lineChart;
let meanChart;
let scatterChart;
let evolutionChart;

export const BarChart =(dataSets)=>{

    //hook deklaration für Charts
    const [lineChartData,setLineChartData]= useState({});
    const [barChartData,setBarChartData]= useState({});
    const [scatterDataWasm,setScatterChartDataWasm]= useState({});
    const [evolutionData,setEvolutionData]= useState({});

    //Iteration-Plot
    const initLineChartData = (dataSets)=>{
         lineChart =(data)=>{
            setLineChartData({
                labels: data.labels,
                datasets:[
                    {
                        label:'WASM',
                        data:data.dataWasm.data,
                        backgroundColor:['blue'],
                        strokeStyle:"blue",
                        borderWidth:4
                    },
                    {
                        label:'JS',
                        data:data.dataJS.data,
                        backgroundColor:['red'],
                        strokeStyle:"red",
                        borderWidth:4
                    },
                ],
            })
        };
        useEffect(()=>{
            lineChart(dataSets);
        },[dataSets]);
    };

    //Mean-Plot
    const initBarChartData=(dataSets)=>{
         meanChart =(data)=>{
            setBarChartData({
                labels: ['Mean'],
                datasets: [
                    {
                        label: "WASM",
                        data: [dataSets.dataWasm.mean],
                        backgroundColor: 'rgba(114, 113, 230, 1)',
                        borderColor: "blue",
                        borderWidth: 1
                    },
                    {
                        label: "JS",
                        data: [dataSets.dataJS.mean],
                        backgroundColor: 'rgba(234, 121, 121, 1)',
                        borderColor: "red",
                        borderWidth: 1
                    }]
            })
        };
        useEffect(()=>{
            meanChart(dataSets);
        },[dataSets]);
    };

    //Scatter-Plot
    const initScatterChartDataWasm=(dataSets)=>{
         scatterChart =(data)=>{
            setScatterChartDataWasm({
                labels: 'Scatter Test',
                datasets:[
                    {
                        label:'WASM',
                        data:dataSets.dataWasm.scatterData,
                        backgroundColor:['blue'],
                        borderWidth:4
                    },
                    {
                        label:'JS',
                        data:dataSets.dataJS.scatterData,
                        backgroundColor:['red'],
                        borderWidth:4
                    }
                ],
                options: {
                    scales: {
                        x: {
                            suggestedMin: 50,
                            suggestedMax: 100
                        }
                    }
                }
            });
        };
        useEffect(()=>{
            scatterChart(dataSets);
        },[dataSets]);
    };

    //Evolution-Plot
    const initEvolutionChartData=(dataSets)=>{
         evolutionChart =(data)=>{
            setEvolutionData({
                labels: data.labels,
                datasets:[
                    {
                        label:'WASM',
                        data:data.dataWasm.evolutionDataWASM,
                        backgroundColor:['blue'],
                        strokeStyle:"blue",
                        borderWidth:4
                    },
                    {
                        label:'JS',
                        data:data.dataJS.evolutionDataJS,
                        backgroundColor:['red'],
                        strokeStyle:"red",
                        borderWidth:4
                    },
                ],
            })
        };
        useEffect(()=>{
            evolutionChart(dataSets);
        },[dataSets]);
    };

    initLineChartData(dataSets);
    initBarChartData(dataSets);
    initScatterChartDataWasm(dataSets);
    initEvolutionChartData(dataSets);



return(
    <div className={'chartWrapperComp'}>
    <div className={"barChartWrapper"}>
        <div className={"chartLabelWrapper"}>
            <h3>Iteration</h3>
            <Line data={lineChartData}/>
        </div>
        <div className={"chartLabelWrapper"}>
            <h3>Mean</h3>
            <Bar data={barChartData}/>
        </div>
    </div>
        <div className={"barChartWrapper"}>
            <div className={"chartLabelWrapper"}>
                <h3>Scatter </h3>
                <Scatter data={scatterDataWasm} />
            </div>
            <div className={"chartLabelWrapper"}>
                <h3>Evolution</h3>
                <Line data={evolutionData} />
            </div>
        </div>
    </div>
)

};
export const cleanGraphsUp =()=>{
    lineChart(0);
    meanChart(0);
    scatterChart(0);
    evolutionChart(0);
};
export default BarChart;