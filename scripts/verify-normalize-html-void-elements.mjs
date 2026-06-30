import assert from 'node:assert/strict';
import {
    normalizeFileContent,
    normalizeHtmlVoidElements,
    normalizeMarkdownHtmlFences,
} from './normalize-html-void-elements.mjs';

assert.equal(normalizeHtmlVoidElements('<br />'), '<br>');
assert.equal(normalizeHtmlVoidElements('<br >'), '<br>');
assert.equal(
    normalizeHtmlVoidElements('<img src="x.png" alt="x" />'),
    '<img src="x.png" alt="x">'
);
assert.equal(
    normalizeHtmlVoidElements('<meta charset="UTF-8" />'),
    '<meta charset="UTF-8">'
);
assert.equal(
    normalizeHtmlVoidElements('<link rel="stylesheet" href="style.css" />'),
    '<link rel="stylesheet" href="style.css">'
);
assert.equal(
    normalizeHtmlVoidElements('<input type="text" />'),
    '<input type="text">'
);
assert.equal(normalizeHtmlVoidElements('<hr />'), '<hr>');
assert.equal(
    normalizeHtmlVoidElements('<source src="a.mp4" type="video/mp4" />'),
    '<source src="a.mp4" type="video/mp4">'
);
assert.equal(
    normalizeHtmlVoidElements('<small\n>補足</small\n>'),
    '<small>補足</small>'
);
assert.equal(
    normalizeHtmlVoidElements('<strong\n>重要</strong\n>'),
    '<strong>重要</strong>'
);

const markdown = [
    '<Exercise />',
    '',
    '```html',
    '<br />',
    '<img src="x.png" alt="x" />',
    '```',
].join('\n');

assert.equal(
    normalizeMarkdownHtmlFences(markdown),
    [
        '<Exercise />',
        '',
        '```html',
        '<br>',
        '<img src="x.png" alt="x">',
        '```',
    ].join('\n')
);

assert.equal(
    normalizeFileContent('content/docs/sample/index.mdx', markdown),
    [
        '<Exercise />',
        '',
        '```html',
        '<br>',
        '<img src="x.png" alt="x">',
        '```',
    ].join('\n')
);

assert.equal(
    normalizeFileContent('content/docs/sample/index.html', '<br />'),
    '<br>'
);

assert.equal(
    normalizeFileContent('content/docs/sample/style.css', '<br />'),
    '<br />'
);

console.log('HTML normalizer verification passed.');
