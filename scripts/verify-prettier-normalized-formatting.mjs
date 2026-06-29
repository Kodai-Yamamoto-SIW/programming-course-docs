import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
import { normalizeFileContent } from './normalize-html-void-elements.mjs';

const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);

const ignoredDirectories = new Set([
    '.git',
    'node_modules',
    'agent-rules-private',
]);

async function* walk(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
        if (ignoredDirectories.has(entry.name)) {
            continue;
        }

        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            yield* walk(fullPath);
            continue;
        }

        if (entry.isFile()) {
            yield fullPath;
        }
    }
}

async function main() {
    const failures = [];

    for await (const filePath of walk(repoRoot)) {
        const fileInfo = await prettier.getFileInfo(filePath, {
            ignorePath: path.join(repoRoot, '.prettierignore'),
        });

        if (fileInfo.ignored || !fileInfo.inferredParser) {
            continue;
        }

        const source = await fs.readFile(filePath, 'utf8');
        const config = (await prettier.resolveConfig(filePath)) ?? {};
        const formatted = await prettier.format(source, {
            ...config,
            filepath: filePath,
        });

        const expected = normalizeFileContent(filePath, formatted);

        if (source !== expected) {
            failures.push(
                path.relative(repoRoot, filePath).split(path.sep).join('/')
            );
        }
    }

    if (failures.length === 0) {
        console.log('Prettier-normalized formatting check passed.');
        return;
    }

    console.error('The following files are not formatted as expected:');
    for (const failure of failures) {
        console.error(`  ${failure}`);
    }
    console.error('');
    console.error('Run: npm run format');
    process.exit(1);
}

await main();
