import { Service } from "typedi";
import { getConnection, getRepository } from "typeorm";
import { Project } from "../entity/Project";
import { FileStorage } from "../entity/FileStorage";

@Service()
export default class ProjectService {

    async attachDrawings(projectId,d){
        d.forEach(async function (element) {  
            console.log(projectId);
            const pRep = getRepository(Project);
            let p = await pRep.find(projectId);
            
            const fRep = getRepository(FileStorage);
            const f = await pRep.find(element);
            // p.drawings[0] = f; 
            // console.log(sql);
        });
    }
    statusUpdate(currentStatus, newStatus){
        if (currentStatus === newStatus){
            return true;
        } else {
            if (currentStatus === "f3073ad7-90a8-42e1-8f4e-47e040e2cc17") { // Open
                if (newStatus === "c13e39b6-9da6-4ae1-b37a-08adf90b41f8") {
                    return true;
                } else {
                    return false;
                }
            } else if (currentStatus === "c13e39b6-9da6-4ae1-b37a-08adf90b41f8") { // In Progress
                if ((newStatus === "05e945f7-07eb-4887-a57c-db24cb182e54") || (newStatus === "351c1889-5375-4e30-880c-b858fa3f384c")) {
                    return true;
                } else {
                    return false;
                }
            } else if (currentStatus === "05e945f7-07eb-4887-a57c-db24cb182e54") { // Under Review
                if ((newStatus === "191abc24-0924-427e-b0ed-28edbf333e20") || (newStatus === "2f239efc-c017-4d6c-8996-39fafcb88f06")){
                    return true;
                } else {
                    return false;
                }
            } else if (currentStatus === "191abc24-0924-427e-b0ed-28edbf333e20") { // Approved
                if (newStatus === "85d3b72d-95d0-44b8-909a-4aee29948ee0") {
                    return true;
                } else {
                    return false;
                }
            } else if (currentStatus === "85d3b72d-95d0-44b8-909a-4aee29948ee0") { // Done
                return false;
            } else if (currentStatus === "351c1889-5375-4e30-880c-b858fa3f384c") { // Canceled
                if (newStatus === "f3073ad7-90a8-42e1-8f4e-47e040e2cc17") {
                    return true;
                } else {
                    return false;
                }
            } else if (currentStatus === "2f239efc-c017-4d6c-8996-39fafcb88f06") { // Rejected
                if (newStatus === "c13e39b6-9da6-4ae1-b37a-08adf90b41f8") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}