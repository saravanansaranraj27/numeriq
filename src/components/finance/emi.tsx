"use client";

import { useState } from "react";
import { loanTotals } from "@/lib/math/finance";

export default function Emi() {
  const [principal, setPrincipal] = useState("250000");
  const [rate, setRate] = useState("8.5");
  const [months, setMonths] = useState("60");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);
  const run = () => {
    try {
      setResult(loanTotals(Number(principal), Number(rate), Number(months)));
      setError("");
    } catch (cause) {
      setResult(null);
      setError(cause instanceof Error ? cause.message : "Unable to calculate EMI");
    }
  };
  return (
    <section className="tool-card finance-card">
      <div className="tool-copy">
        <span className="eyebrow">Finance</span>
        <h2>EMI & Loan Calculator</h2>
        <p>Estimate monthly payment, total repayment and interest.</p>
      </div>
      <div className="form-grid">
        <input
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          type="number"
          placeholder="Principal"
        />
        <input
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          type="number"
          placeholder="Annual rate %"
        />
        <input
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          type="number"
          placeholder="Months"
        />
      </div>
      <button onClick={run}>Calculate EMI</button>
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      {result && (
        <div className="metrics-grid">
          <div className="metric">
            <span>Monthly payment</span>
            <strong>{result.monthlyPayment.toFixed(2)}</strong>
          </div>
          <div className="metric">
            <span>Total payment</span>
            <strong>{result.totalPayment.toFixed(2)}</strong>
          </div>
          <div className="metric">
            <span>Total interest</span>
            <strong>{result.totalInterest.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </section>
  );
}
