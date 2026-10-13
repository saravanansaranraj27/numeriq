"use client";

import { useState } from "react";
import { solveLinearEquation } from "@/lib/math/equations";

export default function EquationSolver() {
  const [equation, setEquation] = useState("2x + 4 = 10");
  const [result, setResult] = useState("");
  const solve = () => {
    try {
      setResult(`x = ${solveLinearEquation(equation)}`);
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Unable to solve");
    }
  };
  return (
    <section className="tool-card">
      <div className="tool-copy">
        <span className="eyebrow">Math Tool</span>
        <h2>Equation Solver</h2>
        <p>Solve a single-variable linear equation.</p>
      </div>
      <div className="form-row">
        <input
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          aria-label="Equation"
        />
        <button onClick={solve}>Solve</button>
      </div>
      <div className="result-box">{result || "Enter an equation and solve."}</div>
    </section>
  );
}
