import { resultItems } from "@/entities/result/model/items";

export function ResultsSection() {
  return (
    <section className="section" id="results">
      <div className="container results-grid">
        {resultItems.map((item) => (
          <div className="result-box" key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
