import { all, create } from "mathjs";
import type { AngleMode } from "@/types/numeriq";

const math = create(all);

const toRadians = (value: number) => (value * Math.PI) / 180;
const toDegrees = (value: number) => (value * 180) / Math.PI;

const trig = {
  sin: (value: number, mode: AngleMode) => Math.sin(mode === "DEG" ? toRadians(value) : value),
  cos: (value: number, mode: AngleMode) => Math.cos(mode === "DEG" ? toRadians(value) : value),
  tan: (value: number, mode: AngleMode) => {
    const angle = mode === "DEG" ? toRadians(value) : value;
    // Avoid returning huge finite values at tangent's mathematical singularities.
    const distanceToSingularity =
      mode === "DEG" ? Math.abs((((value % 180) + 180) % 180) - 90) : Math.abs(Math.cos(angle));
    if (mode === "DEG" ? distanceToSingularity < 1e-12 : distanceToSingularity < 1e-15) {
      throw new Error("Tangent is undefined at this angle");
    }
    return Math.tan(angle);
  },
  asin: (value: number, mode: AngleMode) =>
    mode === "DEG" ? toDegrees(Math.asin(value)) : Math.asin(value),
  acos: (value: number, mode: AngleMode) =>
    mode === "DEG" ? toDegrees(Math.acos(value)) : Math.acos(value),
  atan: (value: number, mode: AngleMode) =>
    mode === "DEG" ? toDegrees(Math.atan(value)) : Math.atan(value),
};

export function evaluateExpression(expression: string, mode: AngleMode, memory = 0): number {
  const normalized = expression
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll("π", "pi")
    .replaceAll("√", "sqrt");
  const scope = {
    M: memory,
    sin: (x: number) => trig.sin(x, mode),
    cos: (x: number) => trig.cos(x, mode),
    tan: (x: number) => trig.tan(x, mode),
    asin: (x: number) => trig.asin(x, mode),
    acos: (x: number) => trig.acos(x, mode),
    atan: (x: number) => trig.atan(x, mode),
  };
  const value = math.evaluate(normalized, scope);
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error("Expression did not produce a finite number");
  }
  return value;
}

export function formatNumber(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return Number(value.toPrecision(12)).toString();
}
