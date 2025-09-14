import * as express from 'express'
import * as db from './TranscriptManager'


const app: express.Application =express()
const PORT=4001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

db.initialize()
console.log("Initial list of transcripts:")
console.log(db.getAll())

//get all students and their transcripts
app.get("/transcripts", (req, res) => {
    console.log('Handling GET/transcripts')
    let data=db.getAll()
    console.log(data)
    res.status(200).send(data)
    
});

//post(add) student and their id to database 
app.post("/transcripts", (req, res)=>{
    const studentName : string=req.body.name

    let studentID=db.addStudent(studentName)
    console.log(`Handling POST/transcripts name=${studentName}, id=${studentID}`)
    res.status(200).send({studentName, studentID})
});

//get transcript of student with given id in params
app.get("/transcripts/:id", (req, res)=>{
    const id=req.params.id
    console.log(`Handling GET/transcripts/:id id=${id}`)
    const theTranscript=db.getTranscript(parseInt(id))
    if(theTranscript===undefined){
         return res.status(404).send(`NO student with id=${id}`) 
    }
    res.status(200).send(theTranscript)
});

// get student id(s) with given name
app.get("/studentids", (req, res)=>{
    const studentName=req.query.name as string
    console.log(`Handling GET/studentids?name=${studentName}`)
    const ids=db.getStudentIDs(studentName)
    console.log(`ids=${ids}`)
    res.status(200).send(ids)
});

//delete student with given id
app.delete("/transcripts/:id", (req, res)=>{
    const id=parseInt(req.params.id)
    console.log(`Handling DELETE/transcripts, id=${id}`)
    try{
        db.deleteStudent(id)
        res.sendStatus(200)
    } catch(e){
        res.status(404).send(e.toString())
    }
});

// add grade for a student in a course
app.post("/transcripts/:id/:course", (req, res) => {
    const id = parseInt(req.params.id);
    const courseName = req.params.course;
    const grade = parseInt(req.body.grade);

    console.log(`Handling POST/transcripts/${id}/${courseName}, grade=${grade}`);

    try {
        db.addGrade(id, { courseName }, grade);
        res.status(200).send("OK");
    } catch (e: any) {
        res.status(400).send(e.toString());
    }
});

// get grade for a student in a course
app.get("/transcripts/:id/:course", (req, res) => {
    const id = parseInt(req.params.id);
    const courseName = req.params.course;

    console.log(`Handling GET/transcripts/${id}/${courseName}`);

    try {
        const grade = db.getGrade(id, { courseName });
        res.status(200).json({
            studentID: id,
            course: courseName,
            grade: grade
        });
    } catch (e: any) {
        res.status(404).send(e.toString());
    }
});



app.listen(PORT, ()=> { 
    console.log(`Express server now listening on localhost:${PORT}`)
})