import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const contentDir = path.join(repoRoot, 'content');

const exerciseOpeningTagPattern = /<Exercise\b[\s\S]*?>/g;
const titlePropPattern = /\btitle\s*=/;
const headingPattern = /^#{2,6}\s+\S/;

const listMdxFiles = (dirPath) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            files.push(...listMdxFiles(entryPath));
            continue;
        }

        if (entry.isFile() && entry.name.endsWith('.mdx')) {
            files.push(entryPath);
        }
    }

    return files;
};

const lineNumberAt = (content, index) =>
    content.slice(0, index).split('\n').length;

const previousNonBlankLine = (lines, startLineIndex) => {
    for (let lineIndex = startLineIndex - 1; lineIndex >= 0; lineIndex -= 1) {
        const line = lines[lineIndex];
        if (line.trim() !== '') {
            return { line, lineNumber: lineIndex + 1 };
        }
    }

    return null;
};

const toRepoRelativePath = (filePath) =>
    path.relative(repoRoot, filePath).replaceAll(path.sep, '/');

const violations = [];
let exerciseCount = 0;

for (const filePath of listMdxFiles(contentDir)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    const relativePath = toRepoRelativePath(filePath);

    for (const match of content.matchAll(exerciseOpeningTagPattern)) {
        exerciseCount += 1;

        const openingTag = match[0];
        const lineNumber = lineNumberAt(content, match.index);

        if (titlePropPattern.test(openingTag)) {
            violations.push(
                `${relativePath}:${lineNumber} <Exercise> must not use a title prop.`
            );
        }

        const previousLine = previousNonBlankLine(lines, lineNumber - 1);
        if (!previousLine || !headingPattern.test(previousLine.line.trim())) {
            violations.push(
                `${relativePath}:${lineNumber} <Exercise> must be immediately preceded by a non-empty Markdown heading at level 2-6.`
            );
        }
    }
}

if (violations.length > 0) {
    console.error('Exercise heading verification failed:');
    for (const violation of violations) {
        console.error(`- ${violation}`);
    }
    process.exitCode = 1;
} else {
    console.log(
        `Exercise heading verification passed (${exerciseCount} Exercise block${exerciseCount === 1 ? '' : 's'} checked).`
    );
}
