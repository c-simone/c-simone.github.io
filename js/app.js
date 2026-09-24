import { citations } from "./config.js";
import { NavigationManager } from "./components.js";
import { CitationChart } from "./citation-chart.js";

new NavigationManager();
document.body.classList.add("enhanced");
new CitationChart(citations);
