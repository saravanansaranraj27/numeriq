"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { all, create } from "mathjs";
import Icon from "@/components/icons";

const math = create(all);
const width = 760;
const height = 360;
const palette = ["plot-line-1", "plot-line-2", "plot-line-3"];
const functionOptions = [
  { value: "sin(x)", label: "sin(x)" },
  { value: "cos(x)", label: "cos(x)" },
  { value: "tan(x)", label: "tan(x)" },
  { value: "x", label: "x" },
  { value: "x^2", label: "x²" },
  { value: "0.1*x^2", label: "0.1x²" },
  { value: "sqrt(x)", label: "√x" },
  { value: "abs(x)", label: "|x|" },
  { value: "1/x", label: "1/x" },
];

type Point = { x: number; y: number };

function formatExpression(expression: string) {
  return functionOptions.find((option) => option.value === expression)?.label ?? expression;
}

function plot(expression: string, min: number, max: number, count = 260) {
  const segments: Point[][] = [[]];
  let lastY: number | null = null;
  for (let i = 0; i <= count; i += 1) {
    const x = min + ((max - min) * i) / count;
    try {
      const value = math.evaluate(expression, { x });
      const y = typeof value === "number" && Number.isFinite(value) ? value : null;
      const jump = y !== null && lastY !== null && Math.abs(y - lastY) > 20;
      if (y === null || jump) {
        if (segments[segments.length - 1].length) segments.push([]);
        lastY = null;
        continue;
      }
      segments[segments.length - 1].push({ x, y });
      lastY = y;
    } catch {
      if (segments[segments.length - 1].length) segments.push([]);
      lastY = null;
    }
  }
  return segments.filter((segment) => segment.length > 1);
}

export default function FunctionPlotter() {
  const [expressions, setExpressions] = useState(["sin(x)", "0.1*x^2"]);
  const [range, setRange] = useState(10);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  useEffect(() => {
    const closeOnOutside = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(".plot-select-menu-portal")) return;
      if (controlsRef.current && !controlsRef.current.contains(event.target as Node))
        setOpenDropdown(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  useEffect(() => {
    if (openDropdown === null) {
      setMenuPosition(null);
      return;
    }
    const updatePosition = () => {
      const trigger = triggerRefs.current[openDropdown];
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const top = Math.min(rect.bottom + 6, window.innerHeight - 48);
      const availableBelow = Math.max(96, window.innerHeight - top - 12);
      setMenuPosition({
        top,
        left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)),
        width: Math.min(rect.width, window.innerWidth - 16),
        maxHeight: Math.min(280, availableBelow),
      });
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [openDropdown]);
  const plots = useMemo(
    () => expressions.map((expression) => plot(expression, -range, range)),
    [expressions, range],
  );
  const yLimit = Math.max(
    5,
    ...plots
      .flatMap((segments) => segments.flatMap((points) => points.map((point) => Math.abs(point.y))))
      .filter(Number.isFinite)
      .map((value) => Math.min(value, 50)),
  );
  const xToPx = (x: number) => ((x + range) / (2 * range)) * width;
  const yToPx = (y: number) => height / 2 - (y / yLimit) * (height / 2 - 20);

  const updateExpression = (index: number, value: string) => {
    setExpressions((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };

  return (
    <section className="tool-card graph-card">
      <div className="tool-copy">
        <span className="eyebrow">Graphing</span>
        <h2>Function Plotter</h2>
        <p>Plot multiple functions and adjust the range to explore the graph.</p>
      </div>
      <div className="plot-controls" ref={controlsRef}>
        {expressions.map((expression, index) => (
          <div className="plot-control-row" key={`${index}-${expression}`}>
            <div className="plot-select-wrap">
              <button
                type="button"
                className="plot-select-trigger"
                ref={(element) => {
                  triggerRefs.current[index] = element;
                }}
                aria-label={`Choose function ${index + 1}`}
                aria-haspopup="listbox"
                aria-expanded={openDropdown === index}
                onClick={() => setOpenDropdown((current) => (current === index ? null : index))}
              >
                <span>{formatExpression(expression)}</span>
                <svg aria-hidden="true" viewBox="0 0 20 20">
                  <path d="m5 7.5 5 5 5-5" />
                </svg>
              </button>
            </div>
            {expressions.length > 1 && (
              <button
                type="button"
                className="plot-remove"
                onClick={() =>
                  setExpressions((current) => current.filter((_, itemIndex) => itemIndex !== index))
                }
                aria-label={`Remove function ${index + 1}`}
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setExpressions((current) => (current.length < 3 ? [...current, "cos(x)"] : current))
          }
          disabled={expressions.length >= 3}
        >
          Add function
        </button>
        <label>
          <span>Range</span>
          <input
            type="range"
            min="2"
            max="30"
            value={range}
            onChange={(event) => setRange(Number(event.target.value))}
          />
          <strong>{range}</strong>
        </label>
      </div>
      {openDropdown !== null &&
        menuPosition &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="plot-select-menu plot-select-menu-portal"
            role="listbox"
            aria-label={`Function options for row ${openDropdown + 1}`}
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
              maxHeight: menuPosition.maxHeight,
            }}
          >
            {functionOptions.map((option) => (
              <button
                type="button"
                role="option"
                aria-selected={expressions[openDropdown] === option.value}
                className={`plot-select-option${expressions[openDropdown] === option.value ? " is-selected" : ""}`}
                key={option.value}
                onClick={() => {
                  updateExpression(openDropdown, option.value);
                  setOpenDropdown(null);
                }}
              >
                <span>{option.label}</span>
                {expressions[openDropdown] === option.value && <Icon name="check" size={15} />}
              </button>
            ))}
          </div>,
          document.body,
        )}
      <div className="plot-wrap">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Function graph">
          {Array.from({ length: 9 }, (_, index) => {
            const x = (width / 8) * index;
            const y = (height / 8) * index;
            return (
              <g key={index}>
                <line x1={x} y1={0} x2={x} y2={height} className="plot-grid" />
                <line x1={0} y1={y} x2={width} y2={y} className="plot-grid" />
              </g>
            );
          })}
          <line x1={0} y1={height / 2} x2={width} y2={height / 2} className="plot-axis" />
          <line x1={width / 2} y1={0} x2={width / 2} y2={height} className="plot-axis" />
          {plots.map((segments, index) =>
            segments.map((points, segmentIndex) => (
              <polyline
                key={`${index}-${segmentIndex}`}
                points={points.map((point) => `${xToPx(point.x)},${yToPx(point.y)}`).join(" ")}
                className={`plot-line ${palette[index % palette.length]}`}
              />
            )),
          )}
        </svg>
      </div>
      <div className="plot-legend">
        {expressions.map((expression, index) => (
          <span key={`${expression}-${index}`}>{formatExpression(expression)}</span>
        ))}
      </div>
    </section>
  );
}
