class CitationManager {
    constructor() {
        // Configuration data - Update this section to update the website
        this.data = {
            citationsByYear: [
                { year: 2020, count: 23 },
                { year: 2021, count: 63 },
                { year: 2022, count: 140 },
                { year: 2023, count: 174 },
                { year: 2024, count: 399 },
                { year: 2025, count: 570 }
            ],
            stats: {
                totalCitations: "1,370",
                hIndex: 16,
                i10Index: 23
            }
        };

        this.chartContainer = document.getElementById('citation-chart-container');
        this.totalCitationsElement = document.getElementById('total-citations');
        this.hIndexElement = document.getElementById('h-index');
        this.i10IndexElement = document.getElementById('i10-index');

        this.init();
    }

    init() {
        if (this.chartContainer) {
            this.renderChart();
        }
        this.updateStats();
    }

    renderChart() {
        const maxCitations = Math.max(...this.data.citationsByYear.map(d => d.count));
        
        // Clear existing content
        this.chartContainer.innerHTML = '';

        this.data.citationsByYear.forEach(item => {
            const percentage = (item.count / maxCitations) * 100;
            
            const barContainer = document.createElement('div');
            barContainer.className = 'flex flex-col items-center flex-1 h-full group';
            
            barContainer.innerHTML = `
                <div class="chart-container w-full bg-gray-200 dark:bg-gray-700 rounded-t h-full relative flex items-end">
                    <div class="chart-bar-vertical w-full rounded-t bg-teal-500 dark:bg-teal-400 transition-all duration-1000 ease-out" 
                         style="height: ${percentage}%" 
                         data-height="${percentage}%">
                    </div>
                    <!-- Tooltip -->
                    <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        ${item.count} citations
                    </div>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">${item.year}</div>
                <div class="text-xs text-gray-700 dark:text-gray-300 font-semibold">${item.count}</div>
            `;

            this.chartContainer.appendChild(barContainer);
        });
    }

    updateStats() {
        if (this.totalCitationsElement) {
            this.totalCitationsElement.textContent = this.data.stats.totalCitations;
        }
        if (this.hIndexElement) {
            this.hIndexElement.textContent = this.data.stats.hIndex;
        }
        if (this.i10IndexElement) {
            this.i10IndexElement.textContent = this.data.stats.i10Index;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CitationManager();
});
