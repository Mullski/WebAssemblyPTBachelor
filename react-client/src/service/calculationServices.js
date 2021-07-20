//Mean Berechnung
export const calcMean=(data)=>{
    let sum= data.reduce((a, b) => a + b, 0);
    let mean= sum/data.length;
    return mean;
};

//Label Erstellung für BarChartKomponente
export const createLabels =(data)=>{
    let labels = [];
    for(let i=0;i<data.length;i++){
        labels.push(i);
    }
    return labels;
};

//X-Koordinaten Erstellung für Scatter Plot
export const createScatterData =(data)=>{
    let xYArr=[];
    for(let i=0; i<data.length; i++){
        let pointObj={x:1,y:data[i]};
        xYArr.push(pointObj);
    }
    return xYArr;
};

//Zufällige Zahlen für Eingabe der Algorithmen generieren
export const generateNumbers=(rndSize)=>{
    let rndArr=[];
    for(let i=0;i<rndSize;i++){
        rndArr.push(Math.floor(Math.random() * 1000));
    }
    return rndArr;
};

//Daten summieren für Evolution-Plot
export const calcEvolutionData=(data)=>{
    let evolutionArr=[];
    let tmp=0;
    for(let i=0;i<data.length;i++){
        tmp=tmp+data[i];
        evolutionArr.push(tmp);
    }
    return evolutionArr;
};

//Zufällige String generierung für CryptoComponent
export const randomString=(size)=>{
    let result;
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < size; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};

