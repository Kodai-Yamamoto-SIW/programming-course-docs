import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { sanitizeStudentWorks } from '../sanitize-student-works.mjs';

const createTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'works-'));

test('sanitizeStudentWorks renames folders to numeric ids', () => {
  const basePath = createTempDir();
  const yearPath = path.join(basePath, '2025');
  const fromPath = path.join(yearPath, '25020001 Jane Doe');
  fs.mkdirSync(fromPath, { recursive: true });

  const result = sanitizeStudentWorks({ basePath });

  assert.equal(result.errors.length, 0);
  assert.ok(fs.existsSync(path.join(yearPath, '25020001')));
  assert.deepEqual(result.renamed, [
    {
      from: path.relative(process.cwd(), fromPath),
      to: path.relative(process.cwd(), path.join(yearPath, '25020001')),
    },
  ]);
});

test('sanitizeStudentWorks reports error when id is missing', () => {
  const basePath = createTempDir();
  const yearPath = path.join(basePath, '2025');
  fs.mkdirSync(path.join(yearPath, 'student-name-only'), {
    recursive: true,
  });

  const result = sanitizeStudentWorks({ basePath });

  assert.equal(result.errors.length, 1);
});
