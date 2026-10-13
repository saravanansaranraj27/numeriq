import Icon from "@/components/icons";

type KeypadProps = {
  onKey: (value: string) => void;
};

const keys = [
  ["MC", "MR", "M+", "M-", "AC"],
  ["sin(", "cos(", "tan(", "(", ")"],
  ["7", "8", "9", "÷", "⌫"],
  ["4", "5", "6", "×", "^"],
  ["1", "2", "3", "-", "+"],
  ["0", ".", "π", "=", "√("],
];

export default function Keypad({ onKey }: KeypadProps) {
  return (
    <div className="calculator-keypad">
      {keys.flat().map((key) => (
        <button
          key={key}
          className={`calc-key ${key === "=" ? "key-equals" : ""} ${["AC", "MC", "MR", "M+", "M-"].includes(key) ? "key-memory" : ""}`}
          onClick={() => onKey(key)}
        >
          {key === "⌫" ? <Icon name="backspace" size={18} aria-label="Backspace" /> : key}
        </button>
      ))}
    </div>
  );
}
