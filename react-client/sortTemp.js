import '../App.css';
import React, {useState} from 'react';
import BarChart, {initCharts} from "./BarChart";
import { useForm } from "react-hook-form";
import {calcMedian, createLabels, createScatterData} from "../service/calculationServices";



export const sortComponent = ()=>{
    let arr=[];
    let dataLength=16;
    let testingArr=[];
    let [dataWasm,setDataWasm]=useState([]);
    let [dataJS,setDataJS]=useState([]);
    //let [rnds, genNumbers] =useState([]);
    let [medianWasm, setMedianWasm]=useState(0);
    let [medianJs, setMedianJS]=useState(0);
    let [labels, setLabels] = useState([]);
    /*let [numbers, calcNumber] =useState([]);
    let [numbersJS, calcNumberJS] =useState([]);*/
    let [renderCharts, setRenderCharts] =useState(false);
    /*const [res, calcRes] = useState(0);*/



    const generateNumbers=()=>{
        //genNumbers(arr=[]);
        let rndArr=[];
        for(var i=0;i<10000;i++){
            //genNumbers( arr => [...arr, Math.floor(Math.random() * 10000)]);
            rndArr.push(Math.floor(Math.random() * 10000));
        }
        return rndArr
    };

    const sortNumbersWasm = ()=>{
        return new Promise(function(resolve, reject) {
            import ('sort-wasm').then(({ bubble_sort }) => {
                let rnds = generateNumbers();
                console.time('WasmCall');
                let res=bubble_sort(rnds);
                resolve(res);//
                console.timeEnd('WasmCall');
            });

        })
    };

    const sortNumberJS = ()=>{
        return new Promise(function(resolve, reject) {

            import('../sortAlgorithmJs/sortAlg').then(({sortNumbersJS})=>{

                let rnds=generateNumbers();
                console.time('JSCall');
                let res=sortNumbersJS(rnds);

                resolve(res); //
                console.timeEnd('JSCall');
            })
        });

    };

    const testSortWASM= async () => {
        //WASM
        let timeSumWASM = 0;
        let timeArrWASM = [];
        for (var i = 0; i < dataLength; i++) {
            let start = window.performance.now();
            let res=await sortNumbersWasm();
            let end = window.performance.now();
            console.log(res);
            let time = end - start;
            timeSumWASM = timeSumWASM + time;
            timeArrWASM.push(time);
        }
        let dataArrWASM = timeArrWASM;
        let medianWASM = calcMedian(timeArrWASM);
        let scatterDataWasm = createScatterData(timeArrWASM);
        setLabels(createLabels(timeArrWASM));

        console.log(timeSumWASM);
        console.log(timeArrWASM);
        return {data: dataArrWASM, median: medianWASM, scatterData: scatterDataWasm}

    };


    const testSortJS= async () => {
        //JS
        let timeSum = 0;
        let timeArrJS = [];

        for (var i = 0; i < dataLength; i++) {
            let start = window.performance.now();
            console.time('JsCall');
            let res =await sortNumberJS();

            console.timeEnd('JsCall');
            console.log(res);
            let end = window.performance.now();
            let time = end - start;
            timeSum = timeSum + time;
            timeArrJS.push(time);
        }

        let dataArrJS = timeArrJS;
        let medianJS = calcMedian(timeArrJS);
        setLabels(createLabels(timeArrJS));
        let scatterDataJS = createScatterData(timeArrJS);
        console.log(timeSum);
        console.log(timeArrJS);
        return {data: dataArrJS, median: medianJS, scatterData: scatterDataJS}


    };

    const sortNumbersWASM = async () => {
        let resWasm =  await testSortWASM();

        setDataWasm(resWasm);
        setRenderCharts(true);
        //setTimeout(function(){  }, 4000);

    };

    const sortNumbersJS = async ()=>{
        let resJS = await testSortJS();
        setDataJS(resJS);
        setRenderCharts(true);
    };

    return (<div>
        <h3>Bubble Sort</h3>
        <div className={"optionCnt"}>
            <button className={"btn btn-primary"} onClick={generateNumbers}>Generate</button>
            <button className={"btn btn-primary"} onClick={sortNumbersWASM}>SortWASM</button>
            <button className={"btn btn-primary"} onClick={sortNumbersJS}>SortJS</button>
        </div>
        <div className={"chartsCnt"}>
            { renderCharts ?  <BarChart  dataWasm={dataWasm} dataJS={dataJS} labels={labels}   /> : null }

        </div>
    </div>)
};
export default sortComponent;