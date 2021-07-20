use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct Event{
    created: String,
    dtend: String,
    dtstart: String,
    summary: String,
    uid: String,
}

#[wasm_bindgen]
pub fn parse_string(data:String) {
    let mut created ="";
    let mut dtend ="";
    let mut dtstart = "";
    let mut summary = "";
    let mut uid = "";
    let mut x :Vec<Event> = Vec::new();
    let _v: Vec<String> = data.split("\n").map(|s| s.to_string()).collect();
    let index_outer=0;
    for index_outer in index_outer.._v.len(){
        if _v[index_outer]==("BEGIN:VEVENT") {
            let index= index_outer;
            for index in index.._v.len(){
                if _v[index].contains("CREATED"){
                    let created_vec: Vec<&str> = _v[index].split(':').collect();
                    created=created_vec[1];
                }
                else if _v[index].contains("DTEND"){
                    let dtend_vec: Vec<&str> = _v[index].split(';').collect();
                    dtend=dtend_vec[1];
                }
                else if _v[index].contains("DTSTART"){
                    let dstart_vec: Vec<&str> = _v[index].split(';').collect();
                    dtstart=dstart_vec[1];
                }
                else if _v[index].contains("SUMMARY"){
                    let summary_vec: Vec<&str> = _v[index].split(':').collect();
                    summary=summary_vec[1];
                }
                else if _v[index].contains("UID"){
                    let uid_vec: Vec<&str> = _v[index].split(':').collect();
                    uid=uid_vec[1];
                }
                else if _v[index].contains("END:VEVENT"){
                    let eventfound = Event {
                        created: created.to_string(),
                        dtend: dtend.to_string(),
                        dtstart: dtstart.to_string(),
                        summary: summary.to_string(),
                        uid: uid.to_string(),
                    };
                    x.push(eventfound);
                    break;
                }
            }
        }
    }
}


