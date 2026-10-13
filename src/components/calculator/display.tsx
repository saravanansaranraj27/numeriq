type DisplayProps = {
  expression: string;
  result: string;
  mode: string;
};

export default function Display({ expression, result, mode }: DisplayProps) {
  return (
    <div className="calculator-display">
      <div className="display-meta">
        <span>{mode}</span>
        <span>NUMERIQ</span>
      </div>
      <div className="display-expression">{expression || "0"}</div>
      <div className="display-result">{result || "0"}</div>
    </div>
  );
}
