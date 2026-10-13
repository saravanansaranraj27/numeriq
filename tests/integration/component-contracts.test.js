import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

describe("Numeriq component contracts", () => {
  test("main shell includes all feature component families", () => {
    const source = read("src/components/numeriq-app.tsx");
    for (const feature of [
      "calculator",
      "tools/equation-solver",
      "tools/quadratic-solver",
      "tools/statistics",
      "tools/matrix",
      "tools/unit-converter",
      "graphing/function-plotter",
      "advanced/calculus",
      "advanced/complex",
      "advanced/vectors",
      "finance/emi",
      "finance/compound-interest",
      "finance/investment",
      "settings/settings",
    ]) {
      assert.ok(source.includes(feature), feature);
    }
  });

  test("calculator component family includes display, history, and keypad", () => {
    for (const file of [
      "src/components/calculator/calculator.tsx",
      "src/components/calculator/display.tsx",
      "src/components/calculator/history.tsx",
      "src/components/calculator/keypad.tsx",
    ]) {
      assert.ok(fs.existsSync(path.join(root, file)), file);
    }
  });

  test("shared header and sidebar components exist", () => {
    assert.ok(fs.existsSync(path.join(root, "src/components/layout/header.tsx")));
    assert.ok(fs.existsSync(path.join(root, "src/components/layout/sidebar.tsx")));
  });

  test("calculator UI is connected to the calculator utility layer", () => {
    const source = read("src/components/calculator/calculator.tsx");
    assert.match(source, /@\/lib\/math\/calculator/);
  });

  test("tool components use the mathematical utility layer", () => {
    const pairs = [
      ["src/components/tools/equation-solver.tsx", "src/lib/math/equations.ts"],
      ["src/components/tools/quadratic-solver.tsx", "src/lib/math/equations.ts"],
      ["src/components/tools/statistics.tsx", "src/lib/math/statistics.ts"],
      ["src/components/tools/matrix.tsx", "src/lib/math/matrix.ts"],
      ["src/components/tools/percentage.tsx", "src/lib/math/percentage.ts"],
    ];
    for (const [component, utility] of pairs) {
      assert.ok(fs.existsSync(path.join(root, component)), component);
      assert.ok(fs.existsSync(path.join(root, utility)), utility);
    }
  });

  test("shared tool identifiers include theme and angle modes", () => {
    const source = read("src/types/numeriq.ts");
    assert.match(source, /export type ThemeMode/);
    assert.match(source, /export type AngleMode/);
    assert.match(source, /export type ToolId/);
  });
});
