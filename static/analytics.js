// Analytics JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics page
    initAnalyticsPage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load analytics data
    loadAnalyticsData();
});

// Sample analytics data
const analyticsData = {
    kpis: {
        totalApplications: { value: 1248, change: 15.2, trend: 'up' },
        successfulHires: { value: 28, change: 8.7, trend: 'up' },
        avgDaysToHire: { value: 18.5, change: -3.2, trend: 'down' },
        conversionRate: { value: 2.2, change: 0.4, trend: 'up' }
    },
    applicationsData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Applications',
            data: [180, 220, 290, 340, 380, 420],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
        }]
    },
    sourcesData: {
        labels: ['LinkedIn', 'Indeed', 'Company Website', 'Referrals', 'Job Boards', 'Other'],
        datasets: [{
            data: [35, 25, 20, 10, 7, 3],
            backgroundColor: [
                '#3b82f6',
                '#22c55e',
                '#f59e0b',
                '#ef4444',
                '#8b5cf6',
                '#64748b'
            ]
        }]
    },
    timeToHireData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [{
            label: 'Average Days',
            data: [22, 20, 18, 16, 19, 18],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4
        }]
    }
};

let charts = {};

function initAnalyticsPage() {
    console.log('Analytics page initialized');
    
    // Animate KPIs on load
    animateKPIs();
    
    // Initialize charts
    initializeCharts();
}

function setupEventListeners() {
    // Export report button
    const exportBtn = document.getElementById('exportReportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExportReport);
    }
    
    // Generate report button
    const generateBtn = document.getElementById('generateReportBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerateReport);
    }
    
    // Date range selector
    const dateRangeSelect = document.getElementById('dateRangeSelect');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', handleDateRangeChange);
    }
    
    // Chart period buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const period = e.target.dataset.period;
            if (period) {
                handleChartPeriodChange(e.target, period);
            }
        });
    });
    
    // Report action buttons
    document.querySelectorAll('.report-actions .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.textContent.toLowerCase().trim();
            const reportCard = e.target.closest('.report-card');
            const reportTitle = reportCard.querySelector('h4').textContent;
            
            if (action === 'view') {
                viewReport(reportTitle);
            } else if (action === 'download') {
                downloadReport(reportTitle);
            }
        });
    });
}

function loadAnalyticsData() {
    console.log('Loading analytics data...');
    
    // Simulate loading delay
    setTimeout(() => {
        updateKPIs();
        updateCharts();
        console.log('Analytics data loaded');
    }, 500);
}

function animateKPIs() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    kpiCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
            
            // Animate the numbers
            const numberElement = card.querySelector('h3');
            const targetValue = parseFloat(numberElement.textContent.replace(/[^\d.]/g, ''));
            const isPercentage = numberElement.textContent.includes('%');
            
            animateNumber(numberElement, 0, targetValue, 1500, isPercentage);
        }, index * 150);
    });
}

function animateNumber(element, start, end, duration, isPercentage = false) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easedProgress;
        
        if (isPercentage) {
            element.textContent = current.toFixed(1) + '%';
        } else if (end >= 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = current.toFixed(1);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function updateKPIs() {
    const kpiData = analyticsData.kpis;
    
    // Update values and trends
    document.querySelectorAll('.kpi-card').forEach((card, index) => {
        const keys = Object.keys(kpiData);
        if (keys[index]) {
            const data = kpiData[keys[index]];
            const changeElement = card.querySelector('.kpi-change span');
            const iconElement = card.querySelector('.kpi-change i');
            
            if (changeElement && iconElement) {
                const sign = data.change >= 0 ? '+' : '';
                changeElement.textContent = `${sign}${data.change}% vs last month`;
                
                // Update trend
                if (data.trend === 'up') {
                    card.querySelector('.kpi-change').className = 'kpi-change positive';
                    iconElement.className = 'fas fa-arrow-up';
                } else {
                    card.querySelector('.kpi-change').className = 'kpi-change negative';
                    iconElement.className = 'fas fa-arrow-down';
                }
            }
        }
    });
}

function initializeCharts() {
    // Applications Trend Chart
    const applicationsCtx = document.getElementById('applicationsChart');
    if (applicationsCtx) {
        charts.applications = new Chart(applicationsCtx, {
            type: 'line',
            data: analyticsData.applicationsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            }
        });
    }
    
    // Sources Chart
    const sourcesCtx = document.getElementById('sourcesChart');
    if (sourcesCtx) {
        charts.sources = new Chart(sourcesCtx, {
            type: 'doughnut',
            data: analyticsData.sourcesData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }
    
    // Time to Hire Chart
    const timeToHireCtx = document.getElementById('timeToHireChart');
    if (timeToHireCtx) {
        charts.timeToHire = new Chart(timeToHireCtx, {
            type: 'bar',
            data: analyticsData.timeToHireData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

function updateCharts() {
    // Update chart data based on current filters/settings
    Object.keys(charts).forEach(chartKey => {
        if (charts[chartKey]) {
            charts[chartKey].update();
        }
    });
}

function handleChartPeriodChange(button, period) {
    // Update active button
    const chartButtons = button.parentElement.querySelectorAll('.chart-btn');
    chartButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Update chart data based on period
    console.log(`Updating chart for period: ${period}`);
    
    // Here you would typically fetch new data for the selected period
    // For demo purposes, we'll just show a message
    showToast(`Chart updated for ${period} view`, 'info');
}

function handleDateRangeChange(e) {
    const days = parseInt(e.target.value);
    console.log(`Updating analytics for last ${days} days`);
    
    // Here you would typically fetch new data for the selected date range
    // For demo purposes, we'll simulate data update
    showToast(`Analytics updated for last ${days} days`, 'info');
    
    // Animate KPIs again to show "new" data
    setTimeout(animateKPIs, 200);
}

function handleExportReport() {
    console.log('Exporting analytics report...');
    
    // Create a simple CSV export simulation
    const csvContent = generateCSVReport();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `analytics_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Analytics report exported successfully!', 'success');
    }
}

function generateCSVReport() {
    const data = [
        ['Metric', 'Value', 'Change %'],
        ['Total Applications', '1,248', '+15.2'],
        ['Successful Hires', '28', '+8.7'],
        ['Avg Days to Hire', '18.5', '-3.2'],
        ['Conversion Rate', '2.2%', '+0.4'],
        [''],
        ['Department', 'Positions', 'Applications', 'Hires', 'Rate'],
        ['Technology', '12', '456', '18', '3.9%'],
        ['Design', '6', '234', '8', '3.4%'],
        ['Marketing', '4', '198', '5', '2.5%'],
        ['Sales', '8', '312', '12', '3.8%']
    ];
    
    return data.map(row => row.join(',')).join('\n');
}

function handleGenerateReport() {
    // Show report generation modal or form
    const reportTypes = [
        'Monthly Hiring Summary',
        'Department Performance',
        'Source Effectiveness',
        'Time to Hire Analysis',
        'Cost per Hire Report'
    ];
    
    const reportType = prompt(`Select report type:\n${reportTypes.map((type, index) => `${index + 1}. ${type}`).join('\n')}`);
    
    if (reportType && reportType >= 1 && reportType <= reportTypes.length) {
        const selectedReport = reportTypes[reportType - 1];
        console.log(`Generating ${selectedReport}...`);
        showToast(`Generating ${selectedReport}...`, 'info');
        
        // Simulate report generation
        setTimeout(() => {
            showToast(`${selectedReport} generated successfully!`, 'success');
        }, 2000);
    }
}

function viewReport(reportTitle) {
    console.log(`Viewing report: ${reportTitle}`);
    
    // Create a simple report view modal
    const modal = document.createElement('div');
    modal.className = 'modal large active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${reportTitle}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body report-view">
                <div class="report-summary">
                    <h3>Executive Summary</h3>
                    <p>This report provides insights into recruitment performance for the selected period. Key findings include improved application quality and reduced time-to-hire metrics.</p>
                </div>
                
                <div class="report-metrics">
                    <h3>Key Metrics</h3>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <label>Total Applications</label>
                            <span>1,248</span>
                        </div>
                        <div class="metric-item">
                            <label>Successful Hires</label>
                            <span>28</span>
                        </div>
                        <div class="metric-item">
                            <label>Conversion Rate</label>
                            <span>2.2%</span>
                        </div>
                        <div class="metric-item">
                            <label>Avg. Time to Hire</label>
                            <span>18.5 days</span>
                        </div>
                    </div>
                </div>
                
                <div class="report-recommendations">
                    <h3>Recommendations</h3>
                    <ul>
                        <li>Continue focusing on LinkedIn and referral channels for quality candidates</li>
                        <li>Implement automated screening to reduce time-to-hire further</li>
                        <li>Increase marketing team hiring budget to improve conversion rates</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for report view
    const style = document.createElement('style');
    style.textContent = `
        .report-view {
            max-height: 70vh;
            overflow-y: auto;
        }
        
        .report-summary, .report-metrics, .report-recommendations {
            margin-bottom: 2rem;
        }
        
        .report-view h3 {
            color: #1e293b;
            margin-bottom: 1rem;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 0.5rem;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        
        .metric-item {
            background: #f8fafc;
            padding: 1rem;
            border-radius: 0.5rem;
        }
        
        .metric-item label {
            display: block;
            font-size: 0.875rem;
            color: #64748b;
            margin-bottom: 0.5rem;
        }
        
        .metric-item span {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
        }
        
        .report-recommendations ul {
            margin-left: 1.5rem;
        }
        
        .report-recommendations li {
            margin-bottom: 0.5rem;
            color: #64748b;
        }
    `;
    
    if (!document.querySelector('#report-view-styles')) {
        style.id = 'report-view-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // Close modal event
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function downloadReport(reportTitle) {
    console.log(`Downloading report: ${reportTitle}`);
    
    // Simulate PDF download
    showToast(`Downloading ${reportTitle}...`, 'info');
    
    setTimeout(() => {
        showToast(`${reportTitle} downloaded successfully!`, 'success');
    }, 1500);
}

function showToast(message, type = 'success') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                           type === 'error' ? 'exclamation-circle' : 
                           'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add toast styles if not exists
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: white;
                border-radius: 0.5rem;
                padding: 1rem 1.5rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 9999;
                animation: slideInRight 0.3s ease-out;
            }
            
            .toast-success {
                border-left: 4px solid #22c55e;
                color: #22c55e;
            }
            
            .toast-error {
                border-left: 4px solid #ef4444;
                color: #ef4444;
            }
            
            .toast-info {
                border-left: 4px solid #3b82f6;
                color: #3b82f6;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Utility functions for data processing
function calculateTrendPercentage(current, previous) {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function generateRandomData(length, min = 0, max = 100) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Export for global access
window.AnalyticsApp = {
    updateCharts,
    handleChartPeriodChange,
    handleDateRangeChange,
    viewReport,
    downloadReport,
    generateCSVReport
};