import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);
const contentDir = path.join(repoRoot, 'content');
const verifierPath = path.join(
    repoRoot,
    'scripts',
    'verify-exercise-headings.mjs'
);

const runVerifier = () =>
    spawnSync(process.execPath, [verifierPath], {
        cwd: repoRoot,
        encoding: 'utf8',
    });

const outputOf = (result) => `${result.stdout}\n${result.stderr}`;

test('exercise heading verifier matches the site heading contract', () => {
    const fixtureDir = mkdtempSync(
        path.join(contentDir, '.exercise-heading-test-')
    );
    const fixturePath = path.join(fixtureDir, 'fixture.mdx');

    try {
        writeFileSync(
            fixturePath,
            '## Invalid level\n\n<Exercise>\n</Exercise>\n',
            'utf8'
        );

        let result = runVerifier();
        assert.notEqual(result.status, 0, outputOf(result));
        assert.match(outputOf(result), /level 3-6/);

        writeFileSync(
            fixturePath,
            '### Valid level\n\n<Exercise>\n</Exercise>\n',
            'utf8'
        );

        result = runVerifier();
        assert.equal(result.status, 0, outputOf(result));

        writeFileSync(
            fixturePath,
            [
                '### Not adjacent',
                '',
                'Intervening text.',
                '',
                '<Exercise>',
                '</Exercise>',
                '',
            ].join('\n'),
            'utf8'
        );

        result = runVerifier();
        assert.notEqual(result.status, 0, outputOf(result));
    } finally {
        rmSync(fixtureDir, {
            recursive: true,
            force: true,
        });
    }
});

test('pre-commit runs the lightweight content guard after lint-staged', () => {
    const hook = readFileSync(
        path.join(repoRoot, '.husky', 'pre-commit'),
        'utf8'
    );
    const commands = hook
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    assert.deepEqual(commands, ['npx lint-staged', 'npm run verify:content']);

    const packageJson = JSON.parse(
        readFileSync(path.join(repoRoot, 'package.json'), 'utf8')
    );

    assert.equal(
        packageJson.scripts['verify:content'],
        'node scripts/verify-code-block-indentation.mjs && node scripts/verify-exercise-headings.mjs'
    );
});
