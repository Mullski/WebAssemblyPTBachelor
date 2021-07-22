import '../App.css';
import React, {useEffect, useState} from 'react';
import { TextEncoder, TextDecoder, EncodingIndexes, getEncoding } from 'text-decoding';
import rsa from "js-crypto-rsa";
import {
    calcEvolutionData,
    calcMean,
    createLabels,
    createScatterData,
    generateNumbers
} from "../service/calculationServices";
import BarChart from "./barChart";
import Select from 'react-select';


export const cryptoComponent = ()=>{

    //hooks und variablen definieren
    const [res, calcRes] = useState(0);
    let [renderCharts, setRenderCharts] =useState(false);
    let iterationLength=10;
    let [labels, setLabels] = useState([]);
    let [dataWasm,setDataWasm]=useState([]);
    let [dataJS,setDataJS]=useState([]);
    let [option, setOption]=useState(100000);

    //select options definieren
    const options = [
        { value: 100000, label: 'Step 1' ,url:1},
        { value: 200000, label: 'Step 2' ,url:2},
        { value: 400000, label: 'Step 3' ,url:3}
    ];

    //Wasm Benchmark Funktion
    const calcWasm = ()=>{
        return new Promise(function(resolve, reject) {
             import('wasm-calc').then(({ calc }) =>  {
                let timeSumWASM = 0;
                let timeArrWASM = [];
                for (let i = 0; i < iterationLength; i++) {
                    let calcArr=generateNumbers(option);
                    let start = window.performance.now();
                    let res = calc(calcArr);
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

                resolve({data: dataArrWASM, mean: meanWASM, scatterData: scatterDataWasm, evolutionDataWASM:evolutionDataWASM});
            });
        });
    };

    //JavaScript Benchmark Funktion
    const calcJS = ()=>{
        return new Promise(function(resolve, reject) {
            import('../mathAlgorithm/computationAlgorithm').then(({indexAddition})=>{
                let timeSum = 0;
                let timeArrJS = [];
                for (let i = 0; i < iterationLength; i++) {
                    let calcArr=generateNumbers(option);
                    let start = window.performance.now();
                    let res = indexAddition(calcArr);
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

                resolve({data: dataArrJS, mean: meanJS, scatterData: scatterDataJS, evolutionDataJS: evolutionDataJS});
            });
        });
    };

    /*Aufruf Benchmark Funktion Wasm
     Aufruf Service Funktion Wasm
     Aufruf BarChart Komponente Wasm*/
    const testWasm =async()=>{
        let resWasm =  await calcWasm();
        setDataWasm(resWasm);
        setRenderCharts(true);
    };

    /*Aufruf Benchmark Funktion JavaScript
      Aufruf Service Funktion JavaScript
      Aufruf BarChart Komponente JavaScript*/
    const testJS =async()=>{
        let resJS = await calcJS();
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
            setOption(100000);
        }
        else if(queryString.split("=")[1]==="2"){
            setOption(200000);
        }
        else if(queryString.split("=")[1]==="3"){
            setOption(400000);
        }
        else{
            setOption(100000);
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
        <h3>Array Index Addition</h3>
        <p>Adds every Element in Random generated Array</p>
        <ul>
            <li>Step 1: add 100000 random Integers  </li>
            <li>Step 2: add 200000 random Integers </li>
            <li>Step 3: add 400000 random Integers </li>
        </ul>
        <div className={"optionCnt"}>
            <button className={"btn btn-primary"} onClick={testWasm}>Add Rust</button>
            <button className={"btn btn-primary"} onClick={testJS}>Add JS</button>
            <Select className={"selectOptions"} options={options}  onChange={setSelect} defaultValue={checkFunc()} />
        </div>
        <div className={"chartsCnt"}>
            { renderCharts ?  <BarChart  dataWasm={dataWasm} dataJS={dataJS} labels={labels}   /> : null }
        </div>

    </div>)
};
export default cryptoComponent;