// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initDashboard();
    
    // Add event listeners
    setupEventListeners();
    
    // Start real-time updates
    startRealTimeUpdates();
});

function initDashboard() {
    console.log('Dashboard initialized');
    
    // Animate stats on load
    animateStats();
    
    // Load recent data
    loadRecentJobs();
    loadUpcomingInterviews();
    loadPipelineData();
}

function setupEventListeners() {
    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotifications);
    }
    
    // Filter dropdown
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', filterPipelineData);
    }
    
    // Job items click
    document.querySelectorAll('.job-item').forEach(item => {
        item.addEventListener('click', () => {
            const jobTitle = item.querySelector('h3').textContent;
            showJobDetails(jobTitle);
        });
    });
    
    // Interview items click
    document.querySelectorAll('.interview-item').forEach(item => {
        item.addEventListener('click', () => {
            const candidateName = item.querySelector('h3').textContent;
            showInterviewDetails(candidateName);
        });
    });
}

function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
            
            // Animate the numbers
            const numberElement = card.querySelector('h3');
            const targetNumber = parseInt(numberElement.textContent);
            animateNumber(numberElement, 0, targetNumber, 1000);
        }, index * 100);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        
        if (element.textContent.includes('%')) {
            element.textContent = current + '%';
        } else {
            element.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function loadRecentJobs() {
    // Simulate loading recent jobs
    const jobs = [
        {
            title: 'Senior Frontend Developer',
            department: 'Technology',
            location: 'Remote',
            posted: '2 days ago',
            status: 'active',
            applicants: 12
        },
        {
            title: 'UX/UI Designer',
            department: 'Design',
            location: 'Hybrid',
            posted: '1 week ago',
            status: 'active',
            applicants: 8
        },
        {
            title: 'Product Manager',
            department: 'Management',
            location: 'On-site',
            posted: '3 days ago',
            status: 'paused',
            applicants: 24
        }
    ];
    
    // Jobs are already in HTML, just add interactive behavior
    console.log('Recent jobs loaded:', jobs.length);
}

function loadUpcomingInterviews() {
    // Simulate loading upcoming interviews
    const interviews = [
        {
            candidate: 'Sarah Johnson',
            position: 'Frontend Developer',
            time: '10:00 AM',
            date: 'Today',
            type: 'Video Call'
        },
        {
            candidate: 'Mike Chen',
            position: 'UX Designer',
            time: '2:30 PM',
            date: 'Today',
            type: 'In-person'
        },
        {
            candidate: 'Emily Davis',
            position: 'Product Manager',
            time: '11:00 AM',
            date: 'Tomorrow',
            type: 'Video Call'
        }
    ];
    
    console.log('Upcoming interviews loaded:', interviews.length);
}

function loadPipelineData() {
    // Simulate loading pipeline data
    const pipelineData = {
        applied: { count: 42, candidates: ['JS', 'MD', 'SK'] },
        screening: { count: 18, candidates: ['AL', 'BT'] },
        interview: { count: 8, candidates: ['CF', 'DG'] },
        finalReview: { count: 3, candidates: ['EH', 'FI', 'GJ'] },
        hired: { count: 2, candidates: ['KL', 'MN'] }
    };
    
    console.log('Pipeline data loaded:', pipelineData);
}

function showNotifications() {
    // Create notification dropdown
    const existingDropdown = document.querySelector('.notification-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }
    
    const dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown';
    dropdown.innerHTML = `
        <div class="notification-header">
            <h3>Notifications</h3>
            <button class="mark-all-read">Mark all as read</button>
        </div>
        <div class="notification-list">
            <div class="notification-item unread">
                <i class="fas fa-user-plus"></i>
                <div class="notification-content">
                    <p><strong>New application received</strong></p>
                    <span>Sarah Johnson applied for Frontend Developer</span>
                    <small>2 minutes ago</small>
                </div>
            </div>
            <div class="notification-item unread">
                <i class="fas fa-calendar"></i>
                <div class="notification-content">
                    <p><strong>Interview reminder</strong></p>
                    <span>Interview with Mike Chen in 30 minutes</span>
                    <small>5 minutes ago</small>
                </div>
            </div>
            <div class="notification-item">
                <i class="fas fa-check-circle"></i>
                <div class="notification-content">
                    <p><strong>Candidate hired</strong></p>
                    <span>Emily Davis accepted the offer</span>
                    <small>1 hour ago</small>
                </div>
            </div>
        </div>
        <div class="notification-footer">
            <a href="#" class="view-all-notifications">View all notifications</a>
        </div>
    `;
    
    // Add styles for notification dropdown
    const style = document.createElement('style');
    style.textContent = `
        .notification-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            width: 320px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 0.75rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            margin-top: 0.5rem;
        }
        
        .notification-header {
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-header h3 {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
        }
        
        .mark-all-read {
            background: none;
            border: none;
            color: #3b82f6;
            font-size: 0.75rem;
            cursor: pointer;
        }
        
        .notification-list {
            max-height: 300px;
            overflow-y: auto;
        }
        
        .notification-item {
            display: flex;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #f1f5f9;
            transition: background-color 0.2s;
        }
        
        .notification-item:hover {
            background: #f8fafc;
        }
        
        .notification-item.unread {
            background: rgba(59, 130, 246, 0.05);
        }
        
        .notification-item i {
            color: #64748b;
            margin-top: 0.25rem;
        }
        
        .notification-content {
            flex: 1;
        }
        
        .notification-content p {
            margin: 0 0 0.25rem 0;
            font-size: 0.875rem;
        }
        
        .notification-content span {
            color: #64748b;
            font-size: 0.75rem;
        }
        
        .notification-content small {
            color: #94a3b8;
            font-size: 0.625rem;
        }
        
        .notification-footer {
            padding: 0.75rem 1rem;
            border-top: 1px solid #e2e8f0;
            text-align: center;
        }
        
        .view-all-notifications {
            color: #3b82f6;
            text-decoration: none;
            font-size: 0.875rem;
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.style.position = 'relative';
    notificationBtn.appendChild(dropdown);
    
    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function(e) {
            if (!notificationBtn.contains(e.target)) {
                dropdown.remove();
            }
        }, { once: true });
    }, 100);
}

function filterPipelineData(event) {
    const selectedPosition = event.target.value;
    console.log('Filtering pipeline for:', selectedPosition);
    
    // Here you would filter the pipeline data based on selected position
    // For demo purposes, we'll just log it
}

function showJobDetails(jobTitle) {
    console.log('Showing details for job:', jobTitle);
    
    // Create a simple modal or redirect to jobs page
    const confirmed = confirm(`View details for "${jobTitle}"? This will redirect to the jobs page.`);
    if (confirmed) {
        window.location.href = 'jobs.html';
    }
}

function showInterviewDetails(candidateName) {
    console.log('Showing details for interview with:', candidateName);
    
    // Create a simple modal or redirect to interviews page
    const confirmed = confirm(`View interview details for "${candidateName}"? This will redirect to the interviews page.`);
    if (confirmed) {
        window.location.href = 'interviews.html';
    }
}

function startRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        updateStats();
        updateNotificationBadge();
    }, 30000);
}

function updateStats() {
    // Simulate updating stats with new data
    const statElements = document.querySelectorAll('.stat-content h3');
    
    statElements.forEach(element => {
        const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newValue = Math.max(0, currentValue + change);
        
        if (element.textContent.includes('%')) {
            element.textContent = newValue + '%';
        } else {
            element.textContent = newValue.toLocaleString();
        }
    });
    
    console.log('Stats updated');
}

function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        const currentCount = parseInt(badge.textContent);
        const newCount = Math.max(0, currentCount + Math.floor(Math.random() * 2));
        badge.textContent = newCount;
        
        if (newCount === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'block';
        }
    }
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(time) {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for potential use in other scripts
window.DashboardApp = {
    showJobDetails,
    showInterviewDetails,
    showNotifications,
    updateStats,
    formatDate,
    formatTime
};