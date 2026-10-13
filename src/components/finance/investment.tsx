"use client";

import { useState } from "react";
import { investmentFutureValue } from "@/lib/math/finance";

export default function Investment() {
  const [principal, setPrincipal] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const run = () => {
    try {
      setResult(
        investmentFutureValue(
          Number(principal),
          Number(monthly),
          Number(rate),
          Number(years),
        ).toFixed(2),
      );
      setError("");
    } catch (cause) {
      setResult("");
      setError(cause instanceof Error ? cause.message : "Unable to calculate result");
    }
  };
  return (
    <section className="tool-card finance-card">
      <div className="tool-copy">
        <span className="eyebrow">Finance</span>
        <h2>Investment Calculator</h2>
        <p>Estimate future value with recurring monthly contributions.</p>
      </div>
      <div className="form-grid">
        <input
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          type="number"
          placeholder="Initial principal"
        />
        <input
          value={monthly}
          onChange={(e) => setMonthly(e.target.value)}
          type="number"
          placeholder="Monthly contribution"
        />
        <input
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          type="number"
          placeholder="Annual rate %"
        />
        <input
          value={years}
          onChange={(e) => setYears(e.target.value)}
          type="number"
          placeholder="Years"
        />
      </div>
      <button onClick={run}>Project investment</button>
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      <div className="result-box">
        {result || <span className="result-placeholder">Results appear here.</span>}
      </div>
    </section>
  );
}
