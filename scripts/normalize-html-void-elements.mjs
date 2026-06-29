import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);

const ignoredDirectories = new Set([
    '.git',
    'node_modules',
    'agent-rules-private',
]);

const markdownExtensions = new Set(['.md', '.mdx']);
const htmlExtensions = new Set(['.html']);

const voidElementPattern =
    /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)(\s[^<>]*?)?\s*\/>/gi;

export function normalizeHtmlVoidElements(source) {
    return source.replace(
        voidElementPattern,
        (_match, tagName, attributes = '') => {
            return `<${tagName}${attributes}>`;
        }
    );
}

export function normalizeMarkdownHtmlFences(source) {
    return source.replace(
        /(```html[^\n]*\n)([\s\S]*?)(\n```)/gi,
        (_match, openingFence, code, closingFence) => {
            return `${openingFence}${normalizeHtmlVoidElements(code)}${closingFence}`;
        }
    );
}

export function normalizeFileContent(filePath, source) {
    const extension = path.extname(filePath).toLowerCase();

    if (htmlExtensions.has(extension)) {
        return normalizeHtmlVoidElements(source);
    }

    if (markdownExtensions.has(extension)) {
        return normalizeMarkdownHtmlFences(source);
    }

    return source;
}

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

function isTargetFile(filePath) {
    const relativePath = path.relative(repoRoot, filePath);
    const normalizedRelativePath = relativePath.split(path.sep).join('/');

    if (!normalizedRelativePath.startsWith('content/')) {
        return false;
    }

    const extension = path.extname(filePath).toLowerCase();
    return markdownExtensions.has(extension) || htmlExtensions.has(extension);
}

async function main() {
    const mode = process.argv[2];

    if (mode !== '--write' && mode !== '--check') {
        console.error(
            'Usage: node scripts/normalize-html-void-elements.mjs --write|--check'
        );
        process.exit(2);
    }

    const changedFiles = [];

    for await (const filePath of walk(repoRoot)) {
        if (!isTargetFile(filePath)) {
            continue;
        }

        const source = await fs.readFile(filePath, 'utf8');
        const normalized = normalizeFileContent(filePath, source);

        if (source === normalized) {
            continue;
        }

        const relativePath = path
            .relative(repoRoot, filePath)
            .split(path.sep)
            .join('/');
        changedFiles.push(relativePath);

        if (mode === '--write') {
            await fs.writeFile(filePath, normalized);
        }
    }

    if (changedFiles.length === 0) {
        console.log('HTML void element style is already normalized.');
        return;
    }

    if (mode === '--write') {
        console.log('Normalized HTML void element style:');
        for (const file of changedFiles) {
            console.log(`  ${file}`);
        }
        return;
    }

    console.error('HTML void element style is not normalized:');
    for (const file of changedFiles) {
        console.error(`  ${file}`);
    }
    process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    await main();
}
