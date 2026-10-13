import { all, create } from "mathjs";

const math = create(all);

export type QuadraticResult = {
  discriminant: number;
  roots: string[];
};

export function solveLinearEquation(expression: string): number {
  const equation = expression.trim();
  const equalsIndex = equation.indexOf("=");
  if (
    equalsIndex <= 0 ||
    equalsIndex !== equation.lastIndexOf("=") ||
    equalsIndex === equation.length - 1
  ) {
    throw new Error("Enter one complete equation, such as 2x + 4 = 10");
  }

  const normalize = (side: string) => {
    const compact = side.replace(/\s+/g, "");
    if (!compact) throw new Error("Both sides of the equation are required");
    // Support common implicit multiplication forms such as 2x and 2(x + 3).
    return compact
      .replace(/(\d|\))(?=x|\()/g, "$1*")
      .replace(/(x)(?=\d|\()/g, "$1*")
      .replace(/(\))(\()/g, "$1*");
  };

  const left = normalize(equation.slice(0, equalsIndex));
  const right = normalize(equation.slice(equalsIndex + 1));
  const evaluateSide = (side: string, x: number) => {
    const value = math.evaluate(side, { x });
    const numeric = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(numeric))
      throw new Error("Equation must contain finite numeric expressions");
    return numeric;
  };

  // Sampling at 0, 1, and 2 verifies that each side behaves linearly in x.
  const left0 = evaluateSide(left, 0);
  const left1 = evaluateSide(left, 1);
  const left2 = evaluateSide(left, 2);
  const right0 = evaluateSide(right, 0);
  const right1 = evaluateSide(right, 1);
  const right2 = evaluateSide(right, 2);
  const leftSlope = left1 - left0;
  const rightSlope = right1 - right0;
  const scale = Math.max(
    1,
    Math.abs(left0),
    Math.abs(left1),
    Math.abs(left2),
    Math.abs(right0),
    Math.abs(right1),
    Math.abs(right2),
  );
  const tolerance = 1e-9 * scale;
  if (
    Math.abs(left2 - left0 - 2 * leftSlope) > tolerance ||
    Math.abs(right2 - right0 - 2 * rightSlope) > tolerance
  ) {
    throw new Error("Please enter a linear equation in x");
  }

  const coefficient = leftSlope - rightSlope;
  const constant = right0 - left0;
  if (Math.abs(coefficient) <= tolerance) {
    if (Math.abs(constant) <= tolerance)
      throw new Error("This equation has infinitely many solutions");
    throw new Error("This equation has no solution");
  }
  const result = constant / coefficient;
  if (!Number.isFinite(result)) throw new Error("Could not solve the equation");
  return result;
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c) || a === 0) {
    throw new Error("Coefficient a must be non-zero");
  }
  const discriminant = b * b - 4 * a * c;
  if (discriminant > 0) {
    const root = Math.sqrt(discriminant);
    return {
      discriminant,
      roots: [String((-b + root) / (2 * a)), String((-b - root) / (2 * a))],
    };
  }
  if (discriminant === 0) {
    return { discriminant, roots: [String(-b / (2 * a))] };
  }
  const real = -b / (2 * a);
  const imaginary = Math.sqrt(-discriminant) / Math.abs(2 * a);
  return {
    discriminant,
    roots: [`${real} + ${imaginary}i`, `${real} - ${imaginary}i`],
  };
}
