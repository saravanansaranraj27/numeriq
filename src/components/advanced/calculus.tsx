"use client";

import { useState } from "react";
import { derivative, integrate, limit } from "@/lib/math/calculus";

export default function Calculus() {
  const [baseExpression, setBaseExpression] = useState("x");
  const [power, setPower] = useState("2");
  const expression = power.trim() === "" ? baseExpression : `(${baseExpression})^(${power})`;
  const superscripts: Record<string, string> = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "-": "⁻",
  };
  const subscriptMap: Record<string, string> = {
    "⁰": "0",
    "¹": "1",
    "²": "2",
    "³": "3",
    "⁴": "4",
    "⁵": "5",
    "⁶": "6",
    "⁷": "7",
    "⁸": "8",
    "⁹": "9",
    "⁻": "-",
  };
  const displayExpression = (value: string) =>
    value.replace(/\^\s*(-?\d+)/g, (_, power: string) =>
      [...power].map((character) => superscripts[character] ?? character).join(""),
    );
  const parseDisplayedExpression = (value: string) =>
    value.replace(
      /([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/g,
      (power) => `^${[...power].map((character) => subscriptMap[character] ?? character).join("")}`,
    );
  const [point, setPoint] = useState("3");
  const [a, setA] = useState("0");
  const [b, setB] = useState("2");
  const [result, setResult] = useState("");
  const run = (type: "derivative" | "integral" | "limit") => {
    try {
      const numericValues = type === "integral" ? [Number(a), Number(b)] : [Number(point)];
      if (numericValues.some((value) => !Number.isFinite(value)))
        throw new Error("Enter finite numeric points and bounds");
      if (type === "derivative")
        setResult(`f'(${point}) = ${derivative(expression, Number(point))}`);
      if (type === "integral")
        setResult(`∫[${a}, ${b}] f(x) dx = ${integrate(expression, Number(a), Number(b))}`);
      if (type === "limit") setResult(`lim x→${point} f(x) = ${limit(expression, Number(point))}`);
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Unable to evaluate");
    }
  };
  return (
    <section className="tool-card">
      <div className="tool-copy">
        <span className="eyebrow">Advanced Math</span>
        <h2>Calculus</h2>
        <p>Numerical derivative, Simpson integration and two-sided limit approximation.</p>
      </div>
      <div className="form-grid calculus-expression-grid">
        <label className="field-label">
          <span>Base expression</span>
          <input
            value={displayExpression(baseExpression)}
            onChange={(e) => setBaseExpression(parseDisplayedExpression(e.target.value))}
            aria-label="Base expression"
            placeholder="x"
          />
        </label>
        <label className="field-label calculus-power-field">
          <span>Power (exponent)</span>
          <input
            value={power}
            onChange={(e) => setPower(e.target.value)}
            aria-label="Power exponent"
            inputMode="text"
            placeholder="2"
          />
        </label>
      </div>
      <p className="calculus-expression-preview">
        Function:{" "}
        <strong>
          {power.trim() === ""
            ? displayExpression(baseExpression)
            : `${displayExpression(baseExpression)}${displayExpression(`^${power}`)}`}
        </strong>
      </p>
      <div className="form-grid">
        <input value={point} onChange={(e) => setPoint(e.target.value)} placeholder="Point" />
        <input value={a} onChange={(e) => setA(e.target.value)} placeholder="Lower bound" />
        <input value={b} onChange={(e) => setB(e.target.value)} placeholder="Upper bound" />
      </div>
      <div className="button-row">
        <button onClick={() => run("derivative")}>Derivative</button>
        <button onClick={() => run("integral")}>Integral</button>
        <button onClick={() => run("limit")}>Limit</button>
      </div>
      <div className="result-box">
        {result || <span className="result-placeholder">Results appear here.</span>}
      </div>
    </section>
  );
}
