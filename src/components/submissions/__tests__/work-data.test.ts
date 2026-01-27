import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { getStudentWorksData } from '../work-data';

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'work-data-'));

test('getStudentWorksData returns empty years when base path is missing', () => {
  const missingPath = path.join(os.tmpdir(), `missing-${Date.now()}`);
  const result = getStudentWorksData(missingPath);
  assert.deepEqual(result, { years: {} });
});

test('getStudentWorksData sorts years and entries', () => {
  const basePath = createTempDir();
  const year2025 = path.join(basePath, '2025');
  const year2024 = path.join(basePath, '2024');
  fs.mkdirSync(year2025, { recursive: true });
  fs.mkdirSync(year2024, { recursive: true });

  const studentA = path.join(year2025, '25020002');
  const studentB = path.join(year2025, '25020001');
  const studentC = path.join(year2024, '24010001');
  fs.mkdirSync(studentA, { recursive: true });
  fs.mkdirSync(studentB, { recursive: true });
  fs.mkdirSync(studentC, { recursive: true });

  const result = getStudentWorksData(basePath);

  assert.deepEqual(result.years['2024'], [
    { studentId: '24010001' },
  ]);
  assert.deepEqual(result.years['2025'], [
    { studentId: '25020001' },
    { studentId: '25020002' },
  ]);
});
