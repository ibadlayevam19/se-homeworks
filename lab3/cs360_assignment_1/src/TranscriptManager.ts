export type StudentID=number
export type Student={studentID: number, studentName: string}
export type Course={courseName:string}
export type CourseGrade={course:Course, grade:number}
export type Transcript={student:Student, grades:CourseGrade[]}
let transcripts: Transcript[]=[]
let nextStudentID: number=1



// initializes the database with 4 students,
// each with an empty transcript (handy for debugging)
export function initialize() {
    addStudent("Sardor")
    addStudent("Jasur")
    addStudent("Jasur")
    addStudent("Nigora")
}

// returns a list of all the transcripts.
// handy for debugging
export function getAll() {
    return transcripts
}

// creates an empty transcript for a student with this name,
// and returns a fresh ID number
export function addStudent(name:string) : StudentID {
    const newStudent: Student ={studentID:nextStudentID++, studentName:name}
    const newTranscript: Transcript={student:newStudent, grades:[]}
    transcripts.push(newTranscript)
    return newStudent.studentID
}

// gets transcript for given ID.  Returns undefined if missing
export function getTranscript(studentID:number) : Transcript | undefined {
    return transcripts.find(t => t.student.studentID===studentID)
}


// returns list of studentIDs matching a given name
export function getStudentIDs(studentName:string) : StudentID[]{
    return transcripts.filter(t=>t.student.studentName===studentName)
    .map(t=>t.student.studentID)
}
// deletes student with the given ID from the database.
// throws exception if no such student. 
export function deleteStudent(studentID:StudentID) {
    const index=transcripts.findIndex(t=>t.student.studentID===studentID)
    if(index===-1){
        throw new Error(`No student with ID ${studentID}`)
        
    }
    transcripts.splice(index, 1)
}

// adds a grade for the given student in the given course.
// throws error if student already has a grade in that course.
export function addGrade(studentID: StudentID, course: Course, grade: number) {
    const transcript=getTranscript(studentID)
    if(!transcript){
        throw new Error(`No student with ID ${studentID}`)
    }
    if(transcript.grades.some(g=>g.course.courseName===course.courseName)){
        throw new Error(`Student already has grade for course ${course.courseName}`)
    }
    transcript.grades.push({course, grade})
} 

// returns the grade for the given student in the given course
// throws an error if no such student or no such grade
export function getGrade(studentID:StudentID, course:Course) : number {
    const transcript=getTranscript(studentID)
    if(!transcript){
        throw new Error(`No student with ID ${studentID}`)
    }
    const courseGrade=transcript.grades.find(g=>g.course.courseName===course.courseName)
    if(!courseGrade){
        throw new Error(`No grade found for course ${course.courseName}`)
    }
    return courseGrade.grade
}