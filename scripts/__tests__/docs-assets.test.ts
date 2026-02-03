import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const readRepoFile = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");

test("background exercise previews resolve images via CodePreview images map", () => {
  const mdx = readRepoFile("content/docs/css-basics/backgrounds/index.mdx");

  assert.ok(mdx.includes('cssPath="css/style.css"'));
  assert.ok(mdx.includes('"img/image1.png"'));
  assert.ok(mdx.includes('"css/image2.png"'));
  assert.ok(mdx.includes('sourceId="bg-exercise-1"'));
  assert.ok(mdx.includes('sourceId="bg-exercise-2"'));
  assert.ok(mdx.includes('sourceId="bg-exercise-3"'));
  assert.ok(mdx.includes('sourceId="bg-exercise-4"'));
  assert.ok(mdx.includes('sourceId="bg-exercise-5"'));
  assert.ok(mdx.includes("htmlVisible={false}"));
  assert.ok(mdx.includes("cssVisible={false}"));
});

test("shorthand-properties previews resolve background-sample.png via CodePreview images map", () => {
  const mdx = readRepoFile("content/docs/css-basics/shorthand-properties/index.mdx");

  assert.ok(mdx.includes('cssPath="style.css"'));
  assert.ok(mdx.includes('"img/background-sample.png"'));
  assert.ok(mdx.includes('new URL("./img/background-sample.png", import.meta.url)'));
});
