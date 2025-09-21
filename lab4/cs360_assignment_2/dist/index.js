"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ds = __importStar(require("./dataService"));
async function main() {
    try {
        console.log("=== Transcript Manager Client ===");
        //Add new student
        const newStudent = await ds.addStudent('Alice');
        console.log("Added student:", newStudent);
        //Find that student's ID
        const ids = await ds.getStudentIDs("Alice");
        console.log("Alice's student IDs:", ids);
        const studentID = ids[0];
        console.log(studentID);
        //Get transcript
        let transcript = await ds.getTranscript(studentID);
        console.log("Initial transcript:", transcript);
        //Add a grade for Alice
        const addedGrade = await ds.addGrade(studentID, 'math101', 92);
        console.log("Added grade:", addedGrade);
        //Get that grade back
        const grade = await ds.getGrade(studentID, 'math101');
        console.log("Retrieved grade:", grade);
        //Get transcript again
        transcript = await ds.getTranscript(studentID);
        console.log("Transcript after adding grade:", transcript);
        //Delete that grade
        await ds.deleteTranscript(studentID);
        console.log("Deleted all grades for Alice.");
        console.log("=== All API calls finished successfully ===");
    }
    catch (err) {
        console.error("Error in main():", err);
    }
}
main();
