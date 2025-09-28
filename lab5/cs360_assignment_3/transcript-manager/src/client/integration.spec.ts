import * as client from './client';
import Express from 'express';
import * as http from 'http';
import transcriptServer from '../server/transcriptServer';
import { AddressInfo } from 'net';
import { setBaseURL } from './remoteService';
import * as db from '../server/transcriptManager';

/**
 * Tests for the Transcript Manager. This test suite automatically deploys a local testing server
 * and cleans it up when it's done. Each test is hermetic, as the datastore is cleared before each
 * test runs.
 */
describe('TranscriptManager', () => {
  // The server instance, once deployed for testing purposes
  let server: http.Server;

  // Set up the server once before all tests run
  beforeAll(async () => {
    // Deploy a testing server
    const app = Express();
    server = http.createServer(app);

    // Add the transcript server's routes to the express server
    transcriptServer(app);

    db.initialize();

    // Start the server on a random, free port, then fetch that address and configure the client to use that server.
    await server.listen();
    const address = server.address() as AddressInfo;
    setBaseURL(`http://localhost:${address.port}`);
  });

  // Tear down the server once all tests are done
  afterAll(async () => {
    // After all tests are done, shut down the server to avoid any resource leaks
    await server.close();
  });

  // Clear the datastore before each test to ensure hermetic tests
  beforeEach(() => {
    // Before any test runs, clean up the datastore. This should ensure that tests are hermetic.
    db.initialize();
  });

  it('POST /transcripts returns 201 and an ID for valid name', async () => {
    const createdStudent = await client.addStudent('Aziza');
    expect(createdStudent.studentID).toBeGreaterThan(0);

    const ids = await client.getStudentIDs('Aziza');
    expect(ids).toContain(createdStudent.studentID);
  });

  it('POST /transcripts returns 400 when name missing or empty', async () => {
    // Empty string should cause server error
    await expect(client.addStudent('')).rejects.toThrow(/No student name/i);
  });

  it('allows multiple students to have the same name, giving them different IDs', async () => {
    const [s1, s2] = await Promise.all([
      client.addStudent('Aziza'),
      client.addStudent('Aziza'),
    ]);
    expect(s1.studentID).not.toBe(s2.studentID);

    const ids = await client.getStudentIDs('Aziza');
    expect(ids).toEqual(expect.arrayContaining([s1.studentID, s2.studentID]));
  });

  // ------------------------------------------------------------------
  // Student fetching
  // ------------------------------------------------------------------
  it('GET /transcripts/:id returns 200 with body for valid ID', async () => {
    const created = await client.addStudent('Sardor');
    const transcript = await client.getTranscript(created.studentID);

    expect(transcript.student.studentName).toBe('Sardor');
    expect(transcript.student.studentID).toBe(created.studentID);
  });

  it('GET /transcripts/:id returns 404 for missing ID', async () => {
    await expect(client.getTranscript(9999)).rejects.toThrow(/No student with id/i);
  });

  it('GET /studentids?name=… returns all IDs for the name', async () => {
    const a = await client.addStudent('Jasur');
    const b = await client.addStudent('Jasur');

    const ids = await client.getStudentIDs('Jasur');
    expect(ids).toEqual(expect.arrayContaining([a.studentID, b.studentID]));
  });

  // ------------------------------------------------------------------
  // Deletion
  // ------------------------------------------------------------------
  it('DELETE /transcripts/:id returns 204 and actually deletes', async () => {
    const created = await client.addStudent('Nigora');
    await client.deleteStudent(created.studentID);

    // Should be gone from student IDs
    const ids = await client.getStudentIDs('Nigora');
    expect(ids).not.toContain(created.studentID);

    // Fetching transcript should fail
    await expect(client.getTranscript(created.studentID)).rejects.toThrow(/404/);
  });

  // ------------------------------------------------------------------
  // Grades
  // ------------------------------------------------------------------
  it('POST /transcripts/:studentID/:course returns 201 when adding grade', async () => {
    const created = await client.addStudent('Aziza');
    await client.addGrade(created.studentID, 'CS360', 95);

    const transcript = await client.getTranscript(created.studentID);
    expect(transcript.grades).toEqual(
      expect.arrayContaining([{ course: 'CS360', grade: 95 }]),
    );
  });

  it('rejects duplicate grade for same course', async () => {
    const created = await client.addStudent('Aziza');
    await client.addGrade(created.studentID, 'CS360', 95);

    // Second attempt should fail
    await expect(client.addGrade(created.studentID, 'CS360', 88)).rejects.toThrow(
      /already has a grade/i,
    );
  });

  it('rejects invalid grade input (non-numeric)', async () => {
    const created = await client.addStudent('Aziza');
    // @ts-expect-error - testing invalid case
    await expect(client.addGrade(created.studentID, 'CS360', '')).rejects.toThrow(
      /Invalid grade/i,
    );
  });

  it('GET /transcripts/:studentID/:course returns the grade object', async () => {
    const created = await client.addStudent('Aziza');
    await client.addGrade(created.studentID, 'CS360', 100);

    const grade = await client.getGrade(created.studentID, 'CS360');
    expect(grade).toEqual({ studentID: created.studentID, course: 'CS360', grade: 100 });
  });
});