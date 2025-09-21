import * as rs from './remoteService';
import {StudentID, Course, Transcript} from './types';
//GET/transcripts/:id
export async function getTranscript(studentID: StudentID):Promise<Transcript>{
    return rs.remoteGet(`/transcripts/${studentID}`);
}
//GET/transcripts
export async function getAllTranscripts(): Promise<Transcript[]>{
    return rs.remoteGet('/transcripts');
}
//GET/transcripts/:studentID/:course
export async function getGrade(studentID:StudentID, course: Course):Promise<{grade:number}>{
    return rs.remoteGet(`/transcripts/${studentID}/${course}`);
}
//GET/studentids?name=string
export async function getStudentIDs(studentName: string): Promise<StudentID[]>{
    return rs.remoteGet(`/studentids?name=${studentName}`);
}
//POST/transcripts
export async function addStudent(studentName:string):Promise<{name:string}>{
    return rs.remotePost('/transcripts', {name: studentName});
}
//POST/transcripts/:studentID/:course
export async function addGrade(studentID:StudentID, course:Course, grade: number):Promise<{grade:number}>{
    return rs.remotePost(`/transcripts/${studentID}/${course}`, {grade: grade});
}
//DELETE/transcripts/:studentID
export async function deleteTranscript(studentID:StudentID):Promise<void>{
    return rs.remoteDelete(`/transcripts/${studentID}`);
}

