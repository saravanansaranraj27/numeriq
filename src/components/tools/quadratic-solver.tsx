"use client";

import { useState } from "react";
import { solveQuadratic } from "@/lib/math/equations";

export default function QuadraticSolver() {
  const [values, setValues] = useState({ a: "1", b: "-5", c: "6" });
  const [result, setResult] = useState("");
  const solve = () => {
    try {
      const roots = solveQuadratic(Number(values.a), Number(values.b), Number(values.c));
      setResult(`Discriminant: ${roots.discriminant} · Roots: ${roots.roots.join(" | ")}`);
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Unable to solve");
    }
  };
  return (
    <section className="tool-card">
      <div className="tool-copy">
        <span className="eyebrow">Math Tool</span>
        <h2>Quadratic Solver</h2>
        <p>Solve ax² + bx + c = 0, including complex roots.</p>
      </div>
      <div className="triple-inputs">
        {(["a", "b", "c"] as const).map((key) => (
          <input
            key={key}
            value={values[key]}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            aria-label={key}
            type="number"
          />
        ))}
      </div>
      <button onClick={solve}>Solve quadratic</button>
      <div className="result-box">
        {result || <span className="result-placeholder">Results appear here.</span>}
      </div>
    </section>
  );
}
