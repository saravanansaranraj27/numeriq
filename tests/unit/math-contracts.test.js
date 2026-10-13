import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

describe("mathematical utility contracts", () => {
  test("calculator exports expression evaluation and number formatting", () => {
    const source = read("src/lib/math/calculator.ts");
    assert.match(source, /export function evaluateExpression/);
    assert.match(source, /export function formatNumber/);
    assert.match(source, /Expression did not produce a finite number/);
  });

  test("equation utilities expose linear and quadratic solvers", () => {
    const source = read("src/lib/math/equations.ts");
    assert.match(source, /export function solveLinearEquation/);
    assert.match(source, /export function solveQuadratic/);
    assert.match(source, /Please enter a linear equation in x/);
    assert.match(source, /Coefficient a must be non-zero/);
  });

  test("finance utilities expose financial calculation functions", () => {
    const source = read("src/lib/math/finance.ts");
    assert.match(source, /export function/);
    assert.match(source, /EMI|emi|compound|investment/i);
  });

  test("matrix utilities expose matrix operations", () => {
    const source = read("src/lib/math/matrix.ts");
    assert.match(source, /export function/);
    assert.match(source, /matrix|determinant|transpose|inverse/i);
  });

  test("statistics utilities expose descriptive calculations", () => {
    const source = read("src/lib/math/statistics.ts");
    assert.match(source, /export function/);
    assert.match(source, /mean|median|standard|variance/i);
  });

  test("advanced mathematics modules exist and export operations", () => {
    for (const file of [
      "src/lib/math/calculus.ts",
      "src/lib/math/complex.ts",
      "src/lib/math/vectors.ts",
      "src/lib/math/percentage.ts",
    ]) {
      const source = read(file);
      assert.match(source, /export function|export const/, file);
    }
  });
});
