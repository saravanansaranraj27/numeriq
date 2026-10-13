"use client";

import { useState } from "react";
import {
  addComplex,
  argumentComplex,
  conjugateComplex,
  divideComplex,
  formatComplex,
  magnitudeComplex,
  multiplyComplex,
  subtractComplex,
} from "@/lib/math/complex";

export default function ComplexNumbers() {
  const [a, setA] = useState({ real: "2", imaginary: "3" });
  const [b, setB] = useState({ real: "4", imaginary: "-1" });
  const [result, setResult] = useState("");
  const run = (
    type: "add" | "subtract" | "multiply" | "divide" | "magnitude" | "conjugate" | "argument",
  ) => {
    const left = { real: Number(a.real), imaginary: Number(a.imaginary) };
    const right = { real: Number(b.real), imaginary: Number(b.imaginary) };
    try {
      if (
        [left.real, left.imaginary, right.real, right.imaginary].some(
          (value) => !Number.isFinite(value),
        )
      )
        throw new Error("Enter finite numbers for both complex values");
      const value =
        type === "add"
          ? addComplex(left, right)
          : type === "subtract"
            ? subtractComplex(left, right)
            : type === "multiply"
              ? multiplyComplex(left, right)
              : type === "divide"
                ? divideComplex(left, right)
                : type === "conjugate"
                  ? conjugateComplex(left)
                  : left;
      setResult(
        type === "magnitude"
          ? `|a| = ${magnitudeComplex(value)}`
          : type === "argument"
            ? `arg(a) = ${argumentComplex(value).toFixed(4)}°`
            : formatComplex(value),
      );
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Invalid complex operation");
    }
  };
  return (
    <section className="tool-card">
      <div className="tool-copy">
        <span className="eyebrow">Advanced Math</span>
        <h2>Complex Numbers</h2>
        <p>Operate on a + bi values.</p>
      </div>
      <div className="complex-inputs">
        {[
          ["a", a, setA],
          ["b", b, setB],
        ].map(([label, value, setter]) => (
          <div key={label as string}>
            <span>{label as string}</span>
            <input
              value={(value as typeof a).real}
              onChange={(e) =>
                (setter as typeof setA)({ ...(value as typeof a), real: e.target.value })
              }
            />
            <input
              value={(value as typeof a).imaginary}
              onChange={(e) =>
                (setter as typeof setA)({ ...(value as typeof a), imaginary: e.target.value })
              }
            />
          </div>
        ))}
      </div>
      <div className="button-row">
        <button onClick={() => run("add")}>Add</button>
        <button onClick={() => run("subtract")}>Subtract</button>
        <button onClick={() => run("multiply")}>Multiply</button>
        <button onClick={() => run("divide")}>Divide</button>
        <button onClick={() => run("magnitude")}>Magnitude A</button>
        <button onClick={() => run("conjugate")}>Conjugate A</button>
        <button onClick={() => run("argument")}>Argument A</button>
      </div>
      <div className="result-box">
        {result || <span className="result-placeholder">Results appear here.</span>}
      </div>
    </section>
  );
}
