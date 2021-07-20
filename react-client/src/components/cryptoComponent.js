import '../App.css';
import React, {useEffect, useState} from 'react';
import {
    calcEvolutionData,
    calcMean,
    createLabels,
    createScatterData,
    randomString
} from "../service/calculationServices";
import BarChart, {cleanGraphsUp} from "./barChart";
import Select from 'react-select';


export const cryptoComponent = ()=>{

    //hooks und variablen definieren
    const [res, calcRes] = useState(0);
    let [renderCharts, setRenderCharts] =useState(false);
    let iterationLength=16;
    let size= 200000;
    let [labels, setLabels] = useState([]);
    let [dataWasm,setDataWasm]=useState([]);
    let [dataJS,setDataJS]=useState([]);
    let [option, setOption]=useState(40000);

    //select options definieren
    const options = [
        { value: 40000, label: 'Step 1' ,url:1},
        { value: 200000, label: 'Step 2' ,url:2},
        { value: 2000000, label: 'Step 3' ,url:3}
    ];

    //Wasm Benchmark Funktion
    const hashWasm = ()=>{
        return new Promise(function(resolve, reject) {
            import('wasm-hash').then(({crypto_hash}) => {
                let timeSumWASM = 0;
                let timeArrWASM = [];
                for (var i = 0; i < iterationLength; i++) {
                    let rndString=randomString(option);
                    let start = window.performance.now();
                    let res = crypto_hash(rndString);
                    let end = window.performance.now();
                    let time = end - start;
                    timeSumWASM = timeSumWASM + time;
                    timeArrWASM.push(time);
                }
                let dataArrWASM = timeArrWASM;
                let medianWASM = calcMean(timeArrWASM);
                let evolutionDataWASM = calcEvolutionData(timeArrWASM);
                let scatterDataWasm = createScatterData(timeArrWASM);
                setLabels(createLabels(timeArrWASM));

                resolve({data: dataArrWASM, mean: medianWASM, scatterData: scatterDataWasm, evolutionDataWASM:evolutionDataWASM});
            });
        });
    };

    //JavaScript Benchmark Funktion
    const hashJS = ()=>{
        return new Promise(function(resolve, reject) {
        import('../cryptoAlgJs/cryptoAlg').then(({ calcHash})=>{
            let timeSum = 0;
            let timeArrJS = [];
            for (var i = 0; i < iterationLength; i++) {
                let rndString=randomString(option);
                let start = window.performance.now();
                let res =  calcHash(rndString);
                let end = window.performance.now();
                let time = end - start;
                timeSum = timeSum + time;
                timeArrJS.push(time);
            }
            let dataArrJS = timeArrJS;
            let medianJS = calcMean(timeArrJS);
            let evolutionDataJS = calcEvolutionData(timeArrJS);
            setLabels(createLabels(timeArrJS));
            let scatterDataJS = createScatterData(timeArrJS);

            resolve({data: dataArrJS, mean: medianJS, scatterData: scatterDataJS, evolutionDataJS:evolutionDataJS});
        });
        });
    };

    /*Aufruf Benchmark Funktion Wasm
      Aufruf Service Funktion Wasm
      Aufruf BarChart Komponente Wasm*/
    const testWasm =async()=>{
        let resWasm =  await hashWasm();
        setDataWasm(resWasm);
        setRenderCharts(true);
    };

    /*Aufruf Benchmark Funktion JavaScript
      Aufruf Service Funktion JavaScript
      Aufruf BarChart Komponente JavaScript*/
    const testJS =async()=>{
        let resJS = await hashJS();
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
            setOption(40000);
        }
        else if(queryString.split("=")[1]==="2"){
            setOption(200000);
        }
        else if(queryString.split("=")[1]==="3"){
            setOption(2000000);
        }
        else{
            setOption(40000);
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
        <h3>SHA-512</h3>
        <p>Converts a random String with fixed Length to SHA-512</p>
        <ul>
            <li>Step 1: hash 40000 char long String  </li>
            <li>Step 2: hash 200000 char long String </li>
            <li>Step 3: hash 2000000 char long String </li>
        </ul>
        <div className={"optionCnt"}>
            <button className={"btn btn-primary"} onClick={testWasm}>Rust Hash</button>
            <button className={"btn btn-primary"} onClick={testJS}>JavaScript Hash</button>
            <Select className={"selectOptions"} options={options}  onChange={setSelect} defaultValue={checkFunc()} />
        </div>
        <div className={"chartsCnt"}>
            { renderCharts ?  <BarChart  dataWasm={dataWasm} dataJS={dataJS} labels={labels}   /> : null }
        </div>
    </div>)
};
export default cryptoComponent;