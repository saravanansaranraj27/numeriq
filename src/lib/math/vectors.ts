export type Vector = number[];

function validate(a: Vector, b: Vector) {
  if (a.some((value) => !Number.isFinite(value)) || b.some((value) => !Number.isFinite(value)))
    throw new Error("Vector components must be finite numbers");
  if (!a.length || a.length !== b.length)
    throw new Error("Vectors must have the same non-zero dimension");
}

export function dotProduct(a: Vector, b: Vector): number {
  validate(a, b);
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

export function magnitude(vector: Vector): number {
  if (!vector.length) throw new Error("Vector cannot be empty");
  if (vector.some((value) => !Number.isFinite(value)))
    throw new Error("Vector components must be finite numbers");
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

export function angleBetween(a: Vector, b: Vector): number {
  validate(a, b);
  const denominator = magnitude(a) * magnitude(b);
  if (denominator === 0) throw new Error("Zero vectors have no angle");
  return (Math.acos(Math.min(1, Math.max(-1, dotProduct(a, b) / denominator))) * 180) / Math.PI;
}

export function addVectors(a: Vector, b: Vector): Vector {
  validate(a, b);
  return a.map((value, index) => value + b[index]);
}

export function subtractVectors(a: Vector, b: Vector): Vector {
  validate(a, b);
  return a.map((value, index) => value - b[index]);
}

export function crossProduct(a: Vector, b: Vector): Vector {
  validate(a, b);
  if (a.length !== 3) throw new Error("Cross product requires two 3D vectors");
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

export function projectionScalar(a: Vector, b: Vector): number {
  const denominator = magnitude(b);
  if (denominator === 0) throw new Error("Cannot project onto a zero vector");
  return dotProduct(a, b) / denominator;
}
