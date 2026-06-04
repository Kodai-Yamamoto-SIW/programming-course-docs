import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);
const samplePath = path.join(repoRoot, 'content', 'sample.mdx');

const source = [
    '```html',
    '<p>',
    '  <strong>返却期限を過ぎた本がある場合は、新しく借りる前に返却してください。</strong>',
    '</p>',
    '```',
    '',
].join('\n');

const config = await prettier.resolveConfig(samplePath);
const formatted = await prettier.format(source, {
    ...config,
    filepath: samplePath,
});

assert.equal(
    formatted,
    source,
    'Prettier must preserve fenced source examples instead of reformatting embedded languages.'
);
