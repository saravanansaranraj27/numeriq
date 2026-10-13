export type Complex = { real: number; imaginary: number };
function validate(value: Complex) {
  if (!Number.isFinite(value.real) || !Number.isFinite(value.imaginary))
    throw new Error("Complex components must be finite numbers");
}
function validatePair(a: Complex, b: Complex) {
  validate(a);
  validate(b);
}
export function addComplex(a: Complex, b: Complex): Complex {
  validatePair(a, b);
  return { real: a.real + b.real, imaginary: a.imaginary + b.imaginary };
}
export function multiplyComplex(a: Complex, b: Complex): Complex {
  validatePair(a, b);
  return {
    real: a.real * b.real - a.imaginary * b.imaginary,
    imaginary: a.real * b.imaginary + a.imaginary * b.real,
  };
}
export function magnitudeComplex(value: Complex): number {
  validate(value);
  return Math.hypot(value.real, value.imaginary);
}
export function formatComplex(value: Complex): string {
  validate(value);
  const sign = value.imaginary >= 0 ? "+" : "-";
  return `${value.real} ${sign} ${Math.abs(value.imaginary)}i`;
}
export function subtractComplex(a: Complex, b: Complex): Complex {
  validatePair(a, b);
  return { real: a.real - b.real, imaginary: a.imaginary - b.imaginary };
}
export function divideComplex(a: Complex, b: Complex): Complex {
  validatePair(a, b);
  const denominator = b.real * b.real + b.imaginary * b.imaginary;
  if (denominator === 0) throw new Error("Cannot divide by zero complex number");
  return {
    real: (a.real * b.real + a.imaginary * b.imaginary) / denominator,
    imaginary: (a.imaginary * b.real - a.real * b.imaginary) / denominator,
  };
}
export function conjugateComplex(value: Complex): Complex {
  validate(value);
  return { real: value.real, imaginary: -value.imaginary };
}
export function argumentComplex(value: Complex): number {
  validate(value);
  if (value.real === 0 && value.imaginary === 0) throw new Error("Zero has no defined argument");
  return (Math.atan2(value.imaginary, value.real) * 180) / Math.PI;
}
