import * as db from './transcriptManager';
import { addStudent } from './transcriptManager';

describe('Testing addStudent() method', () => {
  beforeEach(() => {
    db.initialize();
  });

  it('should create 4 dummy students when you call initialize()', () => {
    const transcripts = db.getAll();
    expect(transcripts.length).toBe(4);
  });

  it('should check valid inputs for addStudent()', () => {
    const length = db.getAll().length;
    const id = addStudent('Li');
    expect(typeof id).toBe('number');
    expect(id).toBeGreaterThanOrEqual(length);
  });

  it('should check invalid inputs for addStudent()', () => {
    expect(() => addStudent(null)).toThrow();
    expect(() => addStudent('')).toThrow();
    //expect(() => addStudent('A')).toThrow();
    //expect(() => addStudent('Abcd1234')).toThrow();
  });
});
