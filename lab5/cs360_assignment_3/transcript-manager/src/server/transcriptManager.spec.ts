import {
    initialize,
    getAll,
    addStudent,
    getTranscript,
    getStudentIDs,
    deleteStudent,
    addGrade,
    addGradeToTranscript,
    getGrade,
    Transcript,
} from './transcriptManager'
describe('Transcript Manager Unit Tests', ()=>{
    beforeEach(()=>{
        initialize();
    });
    test('initialize populates with sample data', ()=>{
        const all=getAll();
        expect(all.length).toBeGreaterThan(0);
        const names=all.map(t=>t.student.studentName);
        expect(names).toContain('Sardor');
        expect(names).toContain('Jasur');
        expect(names).toContain('Nigora');
    });
    test('addStudent adds new student with correct name and ID', ()=>{
        const newId=addStudent('Malika', [{course: 'CS101', grade:95}]);
        const transcript=getTranscript(newId);
        expect(transcript).toBeDefined();
        expect(transcript.student.studentName).toBe('Malika');
        expect(transcript.grades[0]).toEqual({course:'CS101', grade: 95});
    });
    test('getTranscript return undefined for missing student', ()=>{
        expect(getTranscript(9999)).toBeUndefined();
    });
    test('getStudentIDs return all ids for the same name', ()=>{
        const ids=getStudentIDs('Jasur');
        expect(ids.length).toBeGreaterThanOrEqual(2);
        ids.forEach(id=>{
            const t=getTranscript(id);
            expect(t.student.studentName).toBe('Jasur');
        })
    });
    test('deleteStudent throws if student does not exist', ()=>{
        expect(()=>deleteStudent(9999)).toThrow('no student with ID = 9999');

    });
    test('addGrade adds a new grade when course not present', ()=>{
        const [first]=getAll();
        addGrade(first.student.studentID, 'MATH101', 88);

        const updated=getTranscript(first.student.studentID);
        const math=updated.grades.find(g=>g.course==='MATH101');
        expect(math).toBeDefined();
        expect(math.grade).toBe(88);
    });
    test('addGrade throws when course already exists', ()=>{
        const [first]=getAll();
        const existingCourse=first.grades[0].course;

        expect(()=>
        addGrade(first.student.studentID, existingCourse, 50)).toThrow(`student ${first.student.studentID} already has a grade in course ${existingCourse}`)
    });
    test('addGradeToTranscript returns new transcript with additional grade', ()=>{
        const [first]=getAll();
        const newTranscript: Transcript=addGradeToTranscript(first, 'HIST202', 77);

        expect(newTranscript.grades.length).toBe(first.grades.length+1);
        expect(newTranscript.grades.find(g=>g.course==='HIST202').grade).toBe(77);

        expect(first.grades.find(g=>g.course==='HIST202')).toBeUndefined();
    });
    test('addGradeToTranscript throws when course already exists', () => {
    const [first] = getAll();
    const course = first.grades[0].course;

    expect(() => addGradeToTranscript(first, course, 50)).toThrow();
  });

  test('getGrade returns the correct grade', () => {
    const [first] = getAll();
    const course = first.grades[0].course;
    const grade = getGrade(first.student.studentID, course);

    expect(grade).toBe(first.grades[0].grade);
  });

  test('getGrade throws if course not found', () => {
    const [first] = getAll();
    expect(() => getGrade(first.student.studentID, 'NON_EXISTENT')).toThrow(
      `no grade for student ${first.student.studentID} in course NON_EXISTENT`,
    );
  });





})