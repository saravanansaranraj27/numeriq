import { all, create } from "mathjs";

const math = create(all);

function evaluate(expression: string, x: number): number {
  const value = math.evaluate(expression, { x });
  if (typeof value !== "number" || !Number.isFinite(value))
    throw new Error("Expression is not finite at the selected point");
  return value;
}

export function derivative(expression: string, x: number, h = 0.00001): number {
  if (!Number.isFinite(x) || !Number.isFinite(h) || h <= 0)
    throw new Error("Point and step size must be finite, and step size must be positive");
  return (evaluate(expression, x + h) - evaluate(expression, x - h)) / (2 * h);
}

export function integrate(expression: string, a: number, b: number, steps = 1000): number {
  if (
    !Number.isFinite(a) ||
    !Number.isFinite(b) ||
    !Number.isInteger(steps) ||
    steps < 2 ||
    steps % 2 !== 0
  )
    throw new Error(
      "Bounds must be finite and Simpson integration requires an even number of steps (at least 2)",
    );
  const width = (b - a) / steps;
  let sum = 0;
  for (let index = 0; index <= steps; index += 1) {
    const x = a + index * width;
    const weight = index === 0 || index === steps ? 1 : index % 2 === 0 ? 2 : 4;
    sum += weight * evaluate(expression, x);
  }
  return (sum * width) / 3;
}

export function limit(expression: string, point: number): number {
  if (!Number.isFinite(point)) throw new Error("Limit point must be finite");
  const distances = [0.1, 0.01, 0.001, 0.0001, 0.00001];
  const leftSamples: number[] = [];
  const rightSamples: number[] = [];
  for (const distance of distances) {
    leftSamples.push(evaluate(expression, point - distance));
    rightSamples.push(evaluate(expression, point + distance));
  }

  const left = leftSamples[leftSamples.length - 1];
  const right = rightSamples[rightSamples.length - 1];
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  const tolerance = 1e-4 * scale;
  const leftChange = Math.abs(leftSamples[4] - leftSamples[3]);
  const rightChange = Math.abs(rightSamples[4] - rightSamples[3]);

  if (Math.abs(left - right) > tolerance) {
    throw new Error("Two-sided limit does not exist or could not be estimated reliably");
  }
  if (leftChange > tolerance || rightChange > tolerance) {
    throw new Error("Limit does not appear to converge at the selected point");
  }

  const result = (left + right) / 2;
  if (!Number.isFinite(result)) throw new Error("Limit could not be evaluated");
  return result;
}
