import '../App.css';
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import BarChart, {initCharts, cleanGraphsUp} from "./barChart";
import {
    calcMean,
    createLabels,
    createScatterData,
    generateNumbers,
    calcEvolutionData,


} from "../service/calculationServices";
import Select from 'react-select';

export const sortComponent = ()=>{

    //hooks und variablen definieren
    let iterationLength=16;
    let [dataWasm,setDataWasm]=useState([]);
    let [dataJS,setDataJS]=useState([]);
    let [labels, setLabels] = useState([]);
    let [renderCharts, setRenderCharts] =useState(false);
    let [option, setOption]=useState(500);
    let [selectValue,setSelectValue]=useState(option);

    //select options definieren
    const options = [
        { value: 500, label: 'Step 1' ,url:1},
        { value: 1000, label: 'Step 2' ,url:2},
        { value: 10000, label: 'Step 3',url:3 }
    ];

    //Wasm Benchmark Funktion
    const sortNumbersWasm = ()=>{
        return new Promise(function(resolve, reject) {
        import ('sort-wasm').then(({ bubble_sort }) => {
            let timeSumWASM = 0;
            let timeArrWASM = [];
            let rnds;
            for (var i = 0; i < iterationLength; i++) {
                rnds=  generateNumbers(option);
                let start = window.performance.now();
                let res=bubble_sort(rnds);
                let end = window.performance.now();
                let time = end - start;
                timeSumWASM = timeSumWASM + time;
                timeArrWASM.push(time);
            }
            let dataArrWASM = timeArrWASM;
            let meanWASM = calcMean(timeArrWASM);
            let evolutionDataWASM = calcEvolutionData(timeArrWASM);
            let scatterDataWasm = createScatterData(timeArrWASM);
            setLabels(createLabels(timeArrWASM));
            resolve({data: dataArrWASM, mean: meanWASM, scatterData: scatterDataWasm, evolutionDataWASM:evolutionDataWASM});//

        });

        })
    };

    //JavaScript Benchmark Funktion
    const sortNumberJS = ()=>{
        return new Promise(function(resolve, reject) {
        import('../sortAlgorithmJs/sortAlg').then(({bubbleSort})=>{
            let timeSum = 0;
            let timeArrJS = [];
            let rnds;
            for (var i = 0; i < iterationLength; i++) {
                rnds= generateNumbers(option);
                let start = window.performance.now();
                let res=bubbleSort(rnds);
                let end = window.performance.now();
                let time = end - start;
                timeSum = timeSum + time;
                timeArrJS.push(time);
            }
            let dataArrJS = timeArrJS;
            let meanJS = calcMean(timeArrJS);
            let evolutionDataJS = calcEvolutionData(timeArrJS);
            setLabels(createLabels(timeArrJS));
            let scatterDataJS = createScatterData(timeArrJS);
            resolve({data: dataArrJS, mean: meanJS, scatterData: scatterDataJS, evolutionDataJS: evolutionDataJS}); //

            })
        });

    };

    /*Aufruf Benchmark Funktion Wasm
      Aufruf Service Funktion Wasm
      Aufruf BarChart Komponente Wasm*/
    const testSortWASM= async () => {
        //WASM
        let resWasm =  await sortNumbersWasm();
        setDataWasm(resWasm);
        setRenderCharts(true);
    };

    /*Aufruf Benchmark Funktion JavaScript
      Aufruf Service Funktion JavaScript
      Aufruf BarChart Komponente JavaScript*/
    const testSortJS= async () => {
        //JS
        let resJS = await sortNumberJS();
        setDataJS(resJS);
        setRenderCharts(true);
    };

    //Select onChange Event Listener
    const setSelect=(selectedOption)=>{
        setOption(selectedOption.value);
        let urlFix=new URL(window.location.href);
        urlFix.searchParams.set('v',selectedOption.url );
        //urlFix = window.location.href+'?v='+selectedOption.url;
        window.location.href = urlFix;
    };

    //useEffect für Select
    useEffect(() => {
        const queryString = window.location.search;
        let url=window.location.href;
        if(queryString==null){
            setOption(500);
        }
        else if(queryString.split("=")[1]==="2"){
            setOption(1000);
        }
        else if(queryString.split("=")[1]==="3"){
            setOption(10000);
        }
        else{
            setOption(500);
        }
    });

    //default reload Function für Select um Benchmark mit Cache nach Page Reload zu gewährleisten
    const checkFunc=()=>{
        const queryString = window.location.search;
        let url=window.location.href;

        if(queryString==null){
           return options[0];
       }
       else if(queryString.split("=")[1]==="2"){
           return options[1];
       }
       else if(queryString.split("=")[1]==="3"){
           return options[2];
       }
       else{
           return options[0];
       }
    };

    //HTML Code Block UI
    return (<div>
        <h3>Bubble Sort</h3>
        <p>Sorting a random Array of integers with BubbleSort and return a sorted Array</p>
        <ul>
            <li>Step 1: sort 500 random Integers </li>
            <li>Step 2: sort 1000 random Integers </li>
            <li>Step 3: sort 10000 random Integers </li>
        </ul>
        <div className={"optionCnt"}>
            <button className={"btn btn-primary"} onClick={testSortWASM}>Sort Rust</button>
            <button className={"btn btn-primary"} onClick={testSortJS}>Sort JS</button>
            <Select className={"selectOptions"} options={options}  onChange={setSelect} defaultValue={checkFunc()} />
        </div>
        <div className={"chartsCnt"}>
            { renderCharts ?  <BarChart  dataWasm={dataWasm} dataJS={dataJS} labels={labels}   /> : null }
        </div>
    </div>)
};
export default sortComponent;