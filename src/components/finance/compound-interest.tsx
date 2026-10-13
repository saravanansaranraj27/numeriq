"use client";

import { useState } from "react";
import { compoundInterest } from "@/lib/math/finance";

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const run = () => {
    try {
      setResult(
        compoundInterest(Number(principal), Number(rate), Number(years), Number(frequency)).toFixed(
          2,
        ),
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
        <h2>Compound Interest</h2>
        <p>Project future value using periodic compounding.</p>
      </div>
      <div className="form-grid">
        <input value={principal} onChange={(e) => setPrincipal(e.target.value)} type="number" />
        <input value={rate} onChange={(e) => setRate(e.target.value)} type="number" />
        <input value={years} onChange={(e) => setYears(e.target.value)} type="number" />
        <input value={frequency} onChange={(e) => setFrequency(e.target.value)} type="number" />
      </div>
      <button onClick={run}>Calculate future value</button>
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
