/** Bar-chart renderer; index.html retains its rendered no-JS equivalent. */
export function citationChartMarkup(data) {
  const max = Math.max(1, ...data.byYear.map(({ count }) => count));
  return data.byYear
    .map(
      ({ year, count }) => `
    <div class="citation-column" aria-hidden="true">
      <div class="citation-track">
        <span class="citation-bar" style="height: ${(Math.max(0, count) / max) * 100}%">
          <span class="citation-count">${count}</span>
        </span>
      </div>
      <span class="citation-year">${year}</span>
    </div>`,
    )
    .join("");
}

export class CitationChart {
  constructor(data) {
    this.updateData(data);
  }
  updateData(data) {
    const container = document.querySelector("#citation-chart-container");
    if (!container) return;
    container.innerHTML = citationChartMarkup(data);
    container.setAttribute(
      "aria-label",
      `Citations by year: ${data.byYear.map(({ year, count }) => `${year}: ${count}`).join("; ")}`,
    );
    for (const [id, key] of [
      ["total-citations", "totalCitations"],
      ["h-index", "hIndex"],
      ["i10-index", "i10Index"],
    ]) {
      const element = document.getElementById(id);
      if (element) element.textContent = data.stats[key];
    }
  }
}
