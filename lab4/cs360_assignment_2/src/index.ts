import * as ds from './dataService';
import {Transcript} from "./types";
async function main(){
    try{
        console.log("=== Transcript Manager Client ===");

        //Add new student
        const newStudent=await ds.addStudent('Alice');
        console.log("Added student:", newStudent);
        //Find that student's ID
        const ids=await ds.getStudentIDs("Alice");
        console.log("Alice's student IDs:", ids);
        const studentID=ids[0];
        console.log(studentID)
        //Get transcript
        let transcript: Transcript=await ds.getTranscript(studentID);
        console.log("Initial transcript:", transcript);
        //Add a grade for Alice
        const addedGrade=await ds.addGrade(studentID, 'math101', 92);
        console.log("Added grade:", addedGrade);
        //Get that grade back
        const grade=await ds.getGrade(studentID, 'math101');
        console.log("Retrieved grade:", grade);
        //Get transcript again
        transcript=await ds.getTranscript(studentID);
        console.log("Transcript after adding grade:", transcript);
        //Delete that grade
        await ds.deleteTranscript(studentID);
        console.log("Deleted all grades for Alice.");

        console.log("=== All API calls finished successfully ===");
    }catch(err){
        console.error("Error in main():", err);
    }
}

    main();

