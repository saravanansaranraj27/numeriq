export function percentage(part: number, whole: number): number {
  if (!Number.isFinite(part) || !Number.isFinite(whole)) throw new Error("Enter finite numbers");
  if (whole === 0) throw new Error("Whole cannot be zero");
  return (part / whole) * 100;
}

export function percentOf(value: number, percentValue: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(percentValue))
    throw new Error("Enter finite numbers");
  const result = (value * percentValue) / 100;
  if (!Number.isFinite(result)) throw new Error("Result is outside the supported numeric range");
  return result;
}

export function percentChange(oldValue: number, newValue: number): number {
  if (!Number.isFinite(oldValue) || !Number.isFinite(newValue))
    throw new Error("Enter finite numbers");
  if (oldValue === 0) throw new Error("Old value cannot be zero");
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}
