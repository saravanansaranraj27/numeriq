import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

describe("Numeriq navigation and application smoke tests", () => {
  test("static tool route declares all supported tools", () => {
    const page = read("src/app/[tool]/page.tsx");
    for (const tool of [
      "home",
      "calculator",
      "equation",
      "quadratic",
      "statistics",
      "matrix",
      "units",
      "percentage",
      "graphing",
      "calculus",
      "complex",
      "vectors",
      "emi",
      "compound",
      "investment",
      "settings",
    ]) {
      assert.match(page, new RegExp(`['"]${tool}['"]`));
    }
  });

  test("root route renders the Numeriq application shell", () => {
    const page = read("src/app/page.tsx");
    assert.match(page, /import NumeriqApp from ["']@\/components\/numeriq-app["']/);
    assert.match(page, /<NumeriqApp\s*\/>/);
  });

  test("tool route renders the main application shell", () => {
    const page = read("src/app/[tool]/page.tsx");
    assert.match(page, /import NumeriqApp from ["']@\/components\/numeriq-app["']/);
    assert.match(page, /<NumeriqApp\s*\/>/);
  });

  test("application shell imports shared navigation and tool components", () => {
    const app = read("src/components/numeriq-app.tsx");
    assert.match(app, /from ["']@\/components\/layout\/header["']/);
    assert.match(app, /from ["']@\/components\/layout\/sidebar["']/);
    assert.match(app, /from ["']@\/components\/calculator\/calculator["']/);
  });
});
