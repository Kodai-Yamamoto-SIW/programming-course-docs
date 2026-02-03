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
});
