"use client";

import { useEffect, useState } from "react";
import { evaluateExpression, formatNumber } from "@/lib/math/calculator";
import type { AngleMode, CalculatorHistoryItem } from "@/types/numeriq";
import Display from "./display";
import Keypad from "./keypad";
import History from "./history";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<AngleMode>("DEG");
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState<CalculatorHistoryItem[]>([]);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  useEffect(() => {
    const savedAngle = localStorage.getItem("numeriq-angle-mode");
    if (savedAngle === "DEG" || savedAngle === "RAD") setMode(savedAngle);
    if (localStorage.getItem("numeriq-save-history") !== "false") {
      const stored = localStorage.getItem("numeriq-history");
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch {
          setHistory([]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("numeriq-save-history") !== "false") {
      localStorage.setItem("numeriq-history", JSON.stringify(history.slice(0, 30)));
    }
  }, [history]);

  const calculate = () => {
    try {
      const value = evaluateExpression(expression, mode, memory);
      const formatted = formatNumber(value);
      setResult(formatted);
      setHasEvaluated(true);
      setHistory((current) =>
        [{ expression, result: formatted, timestamp: Date.now() }, ...current].slice(0, 30),
      );
    } catch {
      setResult("Error");
      setHasEvaluated(true);
    }
  };

  const handleKey = (key: string) => {
    if (key === "AC") {
      setExpression("");
      setResult("");
      setHasEvaluated(false);
      return;
    }
    if (key === "⌫") {
      setExpression((current) => current.slice(0, -1));
      setResult("");
      setHasEvaluated(false);
      return;
    }
    if (key === "=") {
      calculate();
      return;
    }
    if (key === "MC") {
      setMemory(0);
      return;
    }
    if (key === "MR") {
      setExpression((current) => (hasEvaluated ? String(memory) : current + String(memory)));
      setResult("");
      setHasEvaluated(false);
      return;
    }
    if (key === "M+") {
      try {
        setMemory((current) => current + evaluateExpression(expression, mode, current));
      } catch {}
      return;
    }
    if (key === "M-") {
      try {
        setMemory((current) => current - evaluateExpression(expression, mode, current));
      } catch {}
      return;
    }
    const isBinaryOperator = ["+", "-", "×", "÷", "/", "^"].includes(key);
    if (hasEvaluated) {
      if (isBinaryOperator && result !== "" && result !== "Error") {
        setExpression(`${result}${key}`);
      } else {
        setExpression(key);
      }
      setResult("");
      setHasEvaluated(false);
      return;
    }
    setExpression((current) => current + key);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleKey("=");
      } else if (event.key === "Escape") {
        handleKey("AC");
      } else if (/^[0-9.+*\/()^-]$/.test(event.key)) {
        handleKey(event.key);
      } else if (event.key === "Backspace") {
        handleKey("⌫");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="workspace-grid calculator-workspace">
      <section className="panel calculator-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">Calculator</span>
            <h2>Scientific workspace</h2>
          </div>
          <div className="mode-switch">
            <button className={mode === "DEG" ? "selected" : ""} onClick={() => setMode("DEG")}>
              DEG
            </button>
            <button className={mode === "RAD" ? "selected" : ""} onClick={() => setMode("RAD")}>
              RAD
            </button>
          </div>
        </div>
        <Display
          expression={expression}
          result={result}
          mode={`${mode} · M ${formatNumber(memory)}`}
        />
        <Keypad onKey={handleKey} />
      </section>
      <History
        items={history}
        onClear={() => setHistory([])}
        onUse={(item) => {
          setExpression(item.expression);
          setResult(item.result);
        }}
      />
    </div>
  );
}
