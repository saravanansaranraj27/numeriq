"use client";

import { useState } from "react";
import { calculateStatistics } from "@/lib/math/statistics";

export default function Statistics() {
  const [input, setInput] = useState("12, 15, 18, 20, 25");
  const [result, setResult] = useState<ReturnType<typeof calculateStatistics> | null>(null);
  const [error, setError] = useState("");
  const run = () => {
    try {
      const tokens = input.split(",").map((token) => token.trim());
      if (tokens.some((token) => token === "" || !Number.isFinite(Number(token))))
        throw new Error("Enter only valid numbers separated by commas");
      const values = tokens.map(Number);
      setResult(calculateStatistics(values));
      setError("");
    } catch (cause) {
      setResult(null);
      setError(cause instanceof Error ? cause.message : "Invalid dataset");
    }
  };
  return (
    <section className="tool-card">
      <div className="tool-copy">
        <span className="eyebrow">Math Tool</span>
        <h2>Statistics</h2>
        <p>Enter comma-separated numerical values.</p>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} />
      <button onClick={run}>Analyze dataset</button>
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      {result && (
        <div className="metrics-grid">
          {Object.entries(result).map(([key, value]) => (
            <div className="metric" key={key}>
              <span>{key}</span>
              <strong>
                {Array.isArray(value)
                  ? value.length
                    ? value.join(", ")
                    : "None"
                  : Number(value).toPrecision(8)}
              </strong>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
