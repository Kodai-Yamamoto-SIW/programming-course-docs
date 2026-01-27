import assert from 'node:assert/strict';
import test from 'node:test';
import { mapWorkComments, mapWorkIntros } from '../work-data-mappers';

test('mapWorkIntros maps only rows with intro', () => {
  const result = mapWorkIntros([
    { student_id: '25020001', intro: '紹介文', updated_at: '2025-01-01' },
    { student_id: '25020002', intro: null, updated_at: null },
  ]);

  assert.deepEqual(result, { '25020001': '紹介文' });
});

test('mapWorkComments groups comments and normalizes author name', () => {
  const result = mapWorkComments([
    {
      id: '1',
      student_id: '25020001',
      author_name: '  たろう ',
      message: '良かったです',
      created_at: '2025-01-02T00:00:00Z',
    },
    {
      id: '2',
      student_id: '25020001',
      author_name: null,
      message: '素敵',
      created_at: '2025-01-03T00:00:00Z',
    },
  ]);

  assert.deepEqual(result, {
    '25020001': [
      {
        id: '1',
        studentId: '25020001',
        authorName: 'たろう',
        message: '良かったです',
        createdAt: '2025-01-02T00:00:00Z',
      },
      {
        id: '2',
        studentId: '25020001',
        authorName: '匿名',
        message: '素敵',
        createdAt: '2025-01-03T00:00:00Z',
      },
    ],
  });
});
