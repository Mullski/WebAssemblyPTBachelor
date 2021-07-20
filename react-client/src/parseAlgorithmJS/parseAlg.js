
export const parseIcs =(icsString)=>{
    let strArr=icsString.split('\n');
    let indexOuter=0;
    let eventsObj =[];
    let created;
    let dtend;
    let dtstart;
    let summary;
    let uid;
    for(indexOuter;indexOuter<strArr.length;indexOuter++){
        if(strArr[indexOuter]=="BEGIN:VEVENT"){
             let index=indexOuter;

          for (index; index<strArr.length;index++){
              if(strArr[index].includes("CREATED")){
                let createdProp=strArr[index].split(":");
                created=createdProp[1];
              }
              else if(strArr[index].includes("DTEND")){
                let dtendProp = strArr[index].split(";");
                dtend=dtendProp[1];
              }
              else if(strArr[index].includes("DTSTART")){
                  let dtstartProp = strArr[index].split(";");
                  dtstart=dtstartProp[1];
              }
              else if(strArr[index].includes("SUMMARY")){
                  let summaryProp = strArr[index].split(":");
                  summary=summaryProp[1];

              }
              else if(strArr[index].includes("UID")){
                  let uId = strArr[index].split(":");
                  uid=uId[1];
              }
              else if (strArr[index].includes("END:VEVENT")){
                  let icsObject={CREATED: created, DTEND: dtend, DTSTART: dtstart, SUMMARY: summary, UID:uid };
                  eventsObj.push(icsObject);
                  break;
              }
            }
        }

    }
    return eventsObj;
};
