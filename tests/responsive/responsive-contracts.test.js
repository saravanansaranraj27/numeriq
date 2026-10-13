import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const styleFiles = [
  "styles/globals.css",
  "styles/layout.css",
  "styles/calculator.css",
  "styles/tools.css",
  "styles/advanced.css",
  "styles/finance.css",
  "styles/graphing.css",
  "styles/settings.css",
];
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

describe("responsive layout contracts", () => {
  test("shared application layout components exist", () => {
    assert.ok(fs.existsSync(path.join(root, "src/components/layout/header.tsx")));
    assert.ok(fs.existsSync(path.join(root, "src/components/layout/sidebar.tsx")));
  });

  test("every declared stylesheet exists", () => {
    for (const file of styleFiles) assert.ok(fs.existsSync(path.join(root, file)), file);
  });

  test("combined stylesheets define responsive media queries", () => {
    const styles = styleFiles.map(read).join("\n");
    assert.match(styles, /@media/);
    assert.match(styles, /max-width|min-width/);
  });

  test("layout stylesheet defines responsive rules", () => {
    const styles = read("styles/layout.css");
    assert.match(styles, /@media/);
    assert.match(styles, /max-width|min-width/);
  });

  test("stylesheets do not rely on important declarations", () => {
    const hits = styleFiles.filter((file) => read(file).includes("!" + "important"));
    assert.deepEqual(hits, []);
  });
});
