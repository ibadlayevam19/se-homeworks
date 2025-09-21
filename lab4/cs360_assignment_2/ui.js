// ui.js

// Add student
window.addStudent = async function () {
  const name = document.querySelector("#studentName").value;
  const result = await ds.addStudent(name);
  document.querySelector("#output").textContent = JSON.stringify(result, null, 2);
};

// Get transcript
window.getTranscript = async function () {
  const id = document.querySelector("#studentId").value;
  const result = await ds.getTranscript(id);
  document.querySelector("#output").textContent = JSON.stringify(result, null, 2);
};

// Get grade
window.getGrade = async function () {
  const id = document.querySelector("#gradeStudentIdGet").value;
  const course = document.querySelector("#courseGet").value;
  const result = await ds.getGrade(id, course);
  document.querySelector("#output").textContent = JSON.stringify(result, null, 2);
};

// Add/Update grade
window.addGrade = async function () {
  const id = document.querySelector("#gradeStudentIdAdd").value;
  const course = document.querySelector("#courseAdd").value;
  const grade = document.querySelector("#gradeAdd").value;
  const result = await ds.addGrade(id, course, grade);
  document.querySelector("#output").textContent = JSON.stringify(result, null, 2);
};

// Find Student IDs
window.findStudentIDs = async function () {
  const name = document.querySelector("#searchName").value;
  const result = await ds.getStudentIDs(name);
  document.querySelector("#output").textContent = JSON.stringify(result, null, 2);
};

