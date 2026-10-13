"use client";

import { useState } from "react";
import { percentage, percentChange, percentOf } from "@/lib/math/percentage";

function parseFiniteInput(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function safePercentage(part: string, whole: string) {
  const parsedPart = parseFiniteInput(part);
  const parsedWhole = parseFiniteInput(whole);
  if (parsedPart === null || parsedWhole === null) return "—";
  try {
    return `${percentage(parsedPart, parsedWhole).toFixed(2)}%`;
  } catch {
    return "—";
  }
}

function safePercentOf(value: string, rate: string) {
  const parsedValue = parseFiniteInput(value);
  const parsedRate = parseFiniteInput(rate);
  if (parsedValue === null || parsedRate === null) return "—";
  try {
    const result = percentOf(parsedValue, parsedRate);
    return Number.isFinite(result) ? result.toFixed(2) : "—";
  } catch {
    return "—";
  }
}

function safePercentChange(oldValue: string, newValue: string) {
  const parsedOldValue = parseFiniteInput(oldValue);
  const parsedNewValue = parseFiniteInput(newValue);
  if (parsedOldValue === null || parsedNewValue === null) return "—";
  try {
    return `${percentChange(parsedOldValue, parsedNewValue).toFixed(2)}%`;
  } catch {
    return "—";
  }
}

export default function Percentage() {
  const [part, setPart] = useState("25");
  const [whole, setWhole] = useState("200");
  const [value, setValue] = useState("500");
  const [rate, setRate] = useState("12");
  const [oldValue, setOldValue] = useState("100");
  const [newValue, setNewValue] = useState("125");

  return (
    <section className="tool-card">
      <div className="tool-copy">
        <span className="eyebrow">Math Tool</span>
        <h2>Percentage Calculator</h2>
        <p>Calculate ratios, percentage values and changes.</p>
      </div>
      <div className="percentage-cards">
        <div>
          <span>What % is part of whole?</span>
          <div className="form-grid">
            <input value={part} onChange={(event) => setPart(event.target.value)} />
            <input value={whole} onChange={(event) => setWhole(event.target.value)} />
          </div>
          <strong>{safePercentage(part, whole)}</strong>
        </div>
        <div>
          <span>Percent of value</span>
          <div className="form-grid">
            <input value={value} onChange={(event) => setValue(event.target.value)} />
            <input value={rate} onChange={(event) => setRate(event.target.value)} />
          </div>
          <strong>{safePercentOf(value, rate)}</strong>
        </div>
        <div>
          <span>Percentage change</span>
          <div className="form-grid">
            <input value={oldValue} onChange={(event) => setOldValue(event.target.value)} />
            <input value={newValue} onChange={(event) => setNewValue(event.target.value)} />
          </div>
          <strong>{safePercentChange(oldValue, newValue)}</strong>
        </div>
      </div>
    </section>
  );
}
