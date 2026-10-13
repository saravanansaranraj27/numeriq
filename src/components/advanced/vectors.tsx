"use client";

import { useState } from "react";
import {
  addVectors,
  angleBetween,
  crossProduct,
  dotProduct,
  magnitude,
  projectionScalar,
  subtractVectors,
} from "@/lib/math/vectors";

export default function Vectors() {
  const [a, setA] = useState("3,4");
  const [b, setB] = useState("5,2");
  const [result, setResult] = useState("");
  const run = (operation: "analyze" | "add" | "subtract" | "cross" | "projection") => {
    try {
      const left = a.split(",").map((part) => (part.trim() === "" ? NaN : Number(part)));
      const right = b.split(",").map((part) => (part.trim() === "" ? NaN : Number(part)));
      if (
        left.some((value) => !Number.isFinite(value)) ||
        right.some((value) => !Number.isFinite(value))
      )
        throw new Error("Enter comma-separated finite numbers in both vectors");
      if (operation === "add") setResult(`A + B = (${addVectors(left, right).join(", ")})`);
      else if (operation === "subtract")
        setResult(`A − B = (${subtractVectors(left, right).join(", ")})`);
      else if (operation === "cross")
        setResult(`A × B = (${crossProduct(left, right).join(", ")})`);
      else if (operation === "projection")
        setResult(`Scalar projection of A onto B = ${projectionScalar(left, right)}`);
      else
        setResult(
          `A·B = ${dotProduct(left, right)} · |A| = ${magnitude(left)} · |B| = ${magnitude(right)} · angle = ${angleBetween(left, right).toFixed(4)}°`,
        );
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Invalid vectors");
    }
  };
  return (
    <section className="tool-card">
      <div className="tool-copy">
        <span className="eyebrow">Advanced Math</span>
        <h2>Vectors</h2>
        <p>Enter vectors as comma-separated components.</p>
      </div>
      <div className="form-grid">
        <input value={a} onChange={(e) => setA(e.target.value)} />
        <input value={b} onChange={(e) => setB(e.target.value)} />
      </div>
      <div className="button-row">
        <button onClick={() => run("analyze")}>Analyze vectors</button>
        <button onClick={() => run("add")}>A + B</button>
        <button onClick={() => run("subtract")}>A − B</button>
        <button onClick={() => run("cross")}>A × B (3D)</button>
        <button onClick={() => run("projection")}>Scalar projection</button>
      </div>
      <div className="result-box">
        {result || <span className="result-placeholder">Results appear here.</span>}
      </div>
    </section>
  );
}
