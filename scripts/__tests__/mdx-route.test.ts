import assert from 'node:assert/strict';
import test from 'node:test';
import { shouldIgnoreMdxPath } from '@/lib/mdx-route';

test('shouldIgnoreMdxPath ignores empty and _next paths', () => {
  assert.equal(shouldIgnoreMdxPath(undefined), true);
  assert.equal(shouldIgnoreMdxPath([]), true);
  assert.equal(shouldIgnoreMdxPath(['_next', 'static', 'chunks']), true);
});

test('shouldIgnoreMdxPath ignores static-asset-like requests', () => {
  assert.equal(
    shouldIgnoreMdxPath(['docs', 'css-basics', 'img', 'image1.png']),
    true,
  );
  assert.equal(
    shouldIgnoreMdxPath(['docs', 'css-basics', 'backgrounds', 'image2.JPG']),
    true,
  );
  assert.equal(shouldIgnoreMdxPath(['docs', 'downloads', 'lesson.zip']), true);
  assert.equal(shouldIgnoreMdxPath(['docs', 'downloads', 'handout.pdf']), true);
});

test('shouldIgnoreMdxPath does not ignore normal doc routes', () => {
  assert.equal(shouldIgnoreMdxPath(['docs', 'intro']), false);
  assert.equal(shouldIgnoreMdxPath(['docs', 'css-basics', 'backgrounds']), false);
  assert.equal(shouldIgnoreMdxPath(['docs', 'release-notes', 'v1.0']), false);
});
