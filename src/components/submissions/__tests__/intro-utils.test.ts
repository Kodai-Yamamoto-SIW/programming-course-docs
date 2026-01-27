import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeIntroInput } from '../intro-utils';

test('normalizeIntroInput trims and returns null for empty input', () => {
  assert.equal(normalizeIntroInput('   '), null);
  assert.equal(normalizeIntroInput('\n\n'), null);
});

test('normalizeIntroInput normalizes line endings', () => {
  assert.equal(
    normalizeIntroInput(' Hello\r\nWorld \r\n'),
    'Hello\nWorld'
  );
});
