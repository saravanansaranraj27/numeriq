export type ThemeMode = "light" | "dark" | "system";
export type AngleMode = "DEG" | "RAD";

export type CalculatorHistoryItem = {
  expression: string;
  result: string;
  timestamp: number;
};

export type ToolId =
  | "home"
  | "calculator"
  | "equation"
  | "quadratic"
  | "statistics"
  | "matrix"
  | "units"
  | "percentage"
  | "graphing"
  | "calculus"
  | "complex"
  | "vectors"
  | "emi"
  | "compound"
  | "investment"
  | "settings";

export type ToolDefinition = {
  id: ToolId;
  label: string;
  group: string;
  description: string;
};
