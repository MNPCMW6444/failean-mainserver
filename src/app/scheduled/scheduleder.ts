import {getEmailModel} from "../mongo-models/abtest/emailModel";

const scheduleWaitingListReadyEmail=()=>setInterval(async()=>{

   ( await (getEmailModel()).find()).forEach((doc)=>{
       if(doc.email)
   })
}, 600000)



const scheduleAll=()=>{
    scheduleWaitingListReadyEmail();
};
export default  scheduleAll