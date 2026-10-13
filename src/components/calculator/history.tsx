import type { CalculatorHistoryItem } from "@/types/numeriq";

type HistoryProps = {
  items: CalculatorHistoryItem[];
  onClear: () => void;
  onUse: (item: CalculatorHistoryItem) => void;
};

export default function History({ items, onClear, onUse }: HistoryProps) {
  return (
    <section className="history-panel panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Session</span>
          <h3>History</h3>
        </div>
        <button className="text-button" onClick={onClear}>
          Clear
        </button>
      </div>
      <div className="history-list">
        {items.length === 0 ? (
          <div className="empty-state">Your calculations will appear here.</div>
        ) : (
          items.map((item) => (
            <button className="history-item" key={item.timestamp} onClick={() => onUse(item)}>
              <span>{item.expression}</span>
              <strong>{item.result}</strong>
            </button>
          ))
        )}
      </div>
    </section>
  );
}
