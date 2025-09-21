// A browser-friendly version of dataService
// Uses fetch instead of Node imports
const API_BASE = "http://localhost:4001";
// adjust to your server port

async function remoteGet(path) {
  const res = await fetch(API_BASE + path);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function remotePost(path, body) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

async function remoteDelete(path) {
  const res = await fetch(API_BASE + path, {method: "DELETE"});
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
  return res.json().catch(() => ({})); // in case server returns no body
}

// ==== Export the same functions as dataService.ts ====
const ds = {
  getTranscript: (studentID) => remoteGet(`/transcripts/${studentID}`),
  getAllTranscripts: () => remoteGet(`/transcripts`),
  getGrade: (studentID, course) => remoteGet(`/transcripts/${studentID}/${course}`),
  getStudentIDs: (studentName) => remoteGet(`/studentids?name=${studentName}`),
  addStudent: (studentName) => remotePost(`/transcripts`, {name: studentName}),
  addGrade: (studentID, course, grade) =>
    remotePost(`/transcripts/${studentID}/${course}`, {grade}),
  deleteTranscript: (studentID) => remoteDelete(`/transcripts/${studentID}`),
};

// Expose globally for ui.js
window.ds = ds;
