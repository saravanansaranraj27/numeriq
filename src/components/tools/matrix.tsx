"use client";

import { useState } from "react";
import {
  addMatrices,
  determinant,
  inverseMatrix,
  matrixToText,
  multiplyMatrices,
  subtractMatrices,
  transposeMatrix,
} from "@/lib/math/matrix";

const parseMatrix = (text: string) => {
  if (text.trim() === "") throw new Error("Matrix cannot be empty");

  const rows = text
    .trim()
    .split(/\r?\n/)
    .map((row) => {
      const cells = row.split(",").map((cell) => cell.trim());

      if (cells.some((cell) => cell === "")) {
        throw new Error("Each matrix cell must contain a number");
      }

      const values = cells.map(Number);

      if (values.some((value) => !Number.isFinite(value))) {
        throw new Error("Matrix cells must be finite numbers");
      }

      return values;
    });

  const columnCount = rows[0]?.length ?? 0;

  if (columnCount === 0 || rows.some((row) => row.length !== columnCount)) {
    throw new Error("All matrix rows must have the same number of columns");
  }

  return rows;
};

export default function MatrixCalculator() {
  const [a, setA] = useState("1,2\n3,4");
  const [b, setB] = useState("5,6\n7,8");
  const [result, setResult] = useState("");

  const run = (
    operation: "add" | "subtract" | "multiply" | "determinant" | "transpose" | "inverse",
  ) => {
    try {
      const left = parseMatrix(a);

      switch (operation) {
        case "add":
          setResult(matrixToText(addMatrices(left, parseMatrix(b))));
          break;
        case "subtract":
          setResult(matrixToText(subtractMatrices(left, parseMatrix(b))));
          break;
        case "multiply":
          setResult(matrixToText(multiplyMatrices(left, parseMatrix(b))));
          break;
        case "determinant":
          setResult(String(determinant(left)));
          break;
        case "transpose":
          setResult(matrixToText(transposeMatrix(left)));
          break;
        case "inverse":
          setResult(matrixToText(inverseMatrix(left)));
          break;
      }
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Invalid matrix");
    }
  };

  return (
    <section className="tool-card">
      <div className="tool-copy">
        <span className="eyebrow">Math Tool</span>
        <h2>Matrix Calculator</h2>
        <p>Use comma-separated columns and new lines for rows.</p>
      </div>

      <div className="matrix-editors">
        <textarea value={a} onChange={(e) => setA(e.target.value)} aria-label="Matrix A" />
        <textarea value={b} onChange={(e) => setB(e.target.value)} aria-label="Matrix B" />
      </div>

      <div className="button-row">
        <button onClick={() => run("add")}>A + B</button>
        <button onClick={() => run("subtract")}>A − B</button>
        <button onClick={() => run("multiply")}>A × B</button>
        <button onClick={() => run("determinant")}>det(A)</button>
        <button onClick={() => run("transpose")}>Transpose A</button>
        <button onClick={() => run("inverse")}>Inverse A</button>
      </div>

      <pre className="result-box matrix-result">
        {result || <span className="result-placeholder">Result appears here.</span>}
      </pre>
    </section>
  );
}
