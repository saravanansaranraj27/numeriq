import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".json"]);
const ignored = new Set(["node_modules", ".next", "out", ".git", "tests"]);

function sourceFiles(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...sourceFiles(full));
    else if (sourceExtensions.has(path.extname(entry.name))) result.push(full);
  }
  return result;
}

const files = sourceFiles(root);

describe("project quality contracts", () => {
  test("required application source directories exist", () => {
    for (const directory of ["src/app", "src/components", "src/lib/math", "src/types", "styles"]) {
      assert.ok(fs.statSync(path.join(root, directory)).isDirectory(), directory);
    }
  });

  test("production configuration keeps static export enabled", () => {
    const config = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
    assert.match(config, /output:\s*["']export["']/);
    assert.match(config, /basePath:\s*isProduction\s*\?\s*["']\/numeriq["']/);
  });

  test("package metadata identifies Numeriq and its framework scripts", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
    assert.equal(pkg.name, "numeriq");
    assert.equal(pkg.scripts.dev, "next dev");
    assert.equal(pkg.scripts.build, "next build");
  });

  test("source files do not contain forbidden important declarations", () => {
    const hits = files.filter((file) => fs.readFileSync(file, "utf8").includes("!" + "important"));
    assert.deepEqual(hits, []);
  });

  test("math utility modules cover the application feature areas", () => {
    for (const file of [
      "calculator.ts",
      "calculus.ts",
      "complex.ts",
      "equations.ts",
      "finance.ts",
      "matrix.ts",
      "percentage.ts",
      "statistics.ts",
      "vectors.ts",
    ]) {
      assert.ok(fs.existsSync(path.join(root, "src/lib/math", file)), file);
    }
  });

  test("shared tool types define every route identifier", () => {
    const types = fs.readFileSync(path.join(root, "src/types/numeriq.ts"), "utf8");
    for (const id of [
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
      assert.match(types, new RegExp(`["']${id}["']`));
    }
  });
});
