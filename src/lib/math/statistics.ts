export type StatisticsResult = {
  count: number;
  sum: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  range: number;
  variance: number;
  standardDeviation: number;
  q1: number;
  q3: number;
  modes: number[];
};

export function calculateStatistics(values: number[]): StatisticsResult {
  if (!values.length) throw new Error("Enter at least one number");
  if (values.some((value) => !Number.isFinite(value)))
    throw new Error("All data values must be finite numbers");
  if (!Number.isFinite(values.reduce((total, value) => total + value, 0)))
    throw new Error("Dataset is outside the supported numeric range");
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((total, value) => total + value, 0);
  const mean = sum / values.length;
  const middle = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
  const quartileMedian = (data: number[]) => {
    if (!data.length) return sorted[Math.floor((sorted.length - 1) / 2)];
    const mid = Math.floor(data.length / 2);
    return data.length % 2 ? data[mid] : (data[mid - 1] + data[mid]) / 2;
  };
  const lower = sorted.slice(0, Math.floor(sorted.length / 2));
  const upper = sorted.slice(Math.ceil(sorted.length / 2));
  const counts = new Map<number, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  const highestFrequency = Math.max(...counts.values());
  const modes =
    highestFrequency <= 1
      ? []
      : [...counts.entries()]
          .filter(([, count]) => count === highestFrequency)
          .map(([value]) => value)
          .sort((a, b) => a - b);
  const variance = values.reduce((total, value) => total + (value - mean) ** 2, 0) / values.length;
  return {
    count: values.length,
    sum,
    mean,
    median,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    range: sorted[sorted.length - 1] - sorted[0],
    variance,
    standardDeviation: Math.sqrt(variance),
    q1: quartileMedian(lower),
    q3: quartileMedian(upper),
    modes,
  };
}
