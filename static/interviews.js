// Interviews JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize interviews page
    initInterviewsPage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load interviews data
    loadInterviewsData();
});

// Sample interviews data
let interviewsData = [
    {
        id: 1,
        candidateId: 1,
        candidateName: 'Sarah Johnson',
        candidateAvatar: 'SJ',
        candidateEmail: 'sarah.johnson@email.com',
        candidatePhone: '+1 (555) 123-4567',
        position: 'Frontend Developer',
        date: '2024-03-20',
        time: '14:00',
        type: 'video',
        interviewer: 'John Doe',
        status: 'scheduled',
        notes: '',
        duration: 60
    },
    {
        id: 2,
        candidateId: 2,
        candidateName: 'Mike Chen',
        candidateAvatar: 'MC',
        candidateEmail: 'mike.chen@email.com',
        candidatePhone: '+1 (555) 234-5678',
        position: 'UX Designer',
        date: '2024-03-20',
        time: '16:30',
        type: 'in-person',
        interviewer: 'Jane Smith',
        status: 'scheduled',
        notes: '',
        duration: 45
    },
    {
        id: 3,
        candidateId: 3,
        candidateName: 'Emily Davis',
        candidateAvatar: 'ED',
        candidateEmail: 'emily.davis@email.com',
        candidatePhone: '+1 (555) 345-6789',
        position: 'Product Manager',
        date: '2024-03-21',
        time: '11:00',
        type: 'video',
        interviewer: 'Bob Johnson',
        status: 'scheduled',
        notes: '',
        duration: 60
    },
    {
        id: 4,
        candidateId: 4,
        candidateName: 'David Wilson',
        candidateAvatar: 'DW',
        candidateEmail: 'david.wilson@email.com',
        candidatePhone: '+1 (555) 456-7890',
        position: 'Backend Developer',
        date: '2024-03-19',
        time: '10:00',
        type: 'phone',
        interviewer: 'John Doe',
        status: 'completed',
        notes: 'Great technical skills, good communication. Recommend for next round.',
        duration: 45
    },
    {
        id: 5,
        candidateId: 5,
        candidateName: 'Lisa Rodriguez',
        candidateAvatar: 'LR',
        candidateEmail: 'lisa.rodriguez@email.com',
        candidatePhone: '+1 (555) 567-8901',
        position: 'Marketing Specialist',
        date: '2024-03-18',
        time: '15:00',
        type: 'video',
        interviewer: 'Jane Smith',
        status: 'completed',
        notes: 'Excellent presentation skills and creative thinking. Strong candidate.',
        duration: 30
    },
    {
        id: 6,
        candidateId: 6,
        candidateName: 'James Thompson',
        candidateAvatar: 'JT',
        candidateEmail: 'james.thompson@email.com',
        candidatePhone: '+1 (555) 678-9012',
        position: 'Frontend Developer',
        date: '2024-03-17',
        time: '13:30',
        type: 'video',
        interviewer: 'John Doe',
        status: 'cancelled',
        notes: 'Candidate requested to reschedule but did not follow up.',
        duration: 0
    }
];

let currentView = 'calendar';
let currentWeek = new Date();

function initInterviewsPage() {
    console.log('Interviews page initialized');
    
    // Check for candidate filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const candidateFilter = urlParams.get('candidate');
    
    if (candidateFilter) {
        console.log(`Filtering interviews for candidate: ${candidateFilter}`);
    }
    
    updateCurrentWeekDisplay();
    renderCurrentView();
}

function setupEventListeners() {
    // View toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.closest('.view-btn').dataset.view;
            switchView(view);
        });
    });
    
    // Date navigation
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    const todayBtn = document.getElementById('todayBtn');
    
    if (prevWeekBtn) {
        prevWeekBtn.addEventListener('click', () => navigateWeek(-1));
    }
    
    if (nextWeekBtn) {
        nextWeekBtn.addEventListener('click', () => navigateWeek(1));
    }
    
    if (todayBtn) {
        todayBtn.addEventListener('click', () => goToToday());
    }
    
    // Schedule interview modal
    const scheduleBtn = document.getElementById('scheduleInterviewBtn');
    const scheduleModal = document.getElementById('scheduleModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const scheduleForm = document.getElementById('scheduleForm');
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', () => openModal(scheduleModal));
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => closeModal(scheduleModal));
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeModal(scheduleModal));
    }
    
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', handleScheduleInterview);
    }
    
    // Interview details modal
    const detailsModal = document.getElementById('interviewDetailsModal');
    const closeDetailsModal = document.getElementById('closeDetailsModal');
    
    if (closeDetailsModal) {
        closeDetailsModal.addEventListener('click', () => closeModal(detailsModal));
    }
    
    // Filters for list view
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', renderCurrentView);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', renderCurrentView);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

function loadInterviewsData() {
    console.log(`Loaded ${interviewsData.length} interviews`);
}

function switchView(view) {
    currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide views
    const calendarView = document.getElementById('calendarView');
    const listView = document.getElementById('listView');
    
    if (view === 'calendar') {
        calendarView.classList.remove('hidden');
        listView.classList.add('hidden');
    } else {
        calendarView.classList.add('hidden');
        listView.classList.remove('hidden');
    }
    
    renderCurrentView();
}

function renderCurrentView() {
    if (currentView === 'calendar') {
        renderCalendarView();
    } else {
        renderListView();
    }
}

function renderCalendarView() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    // Clear existing content
    calendarGrid.innerHTML = '';
    
    // Generate time slots (9 AM to 6 PM)
    const timeSlots = [];
    for (let hour = 9; hour <= 18; hour++) {
        timeSlots.push(`${hour}:00`);
    }
    
    // Get week dates
    const weekDates = getWeekDates(currentWeek);
    
    // Create calendar grid
    timeSlots.forEach((time, timeIndex) => {
        // Time column
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = formatTime24to12(time);
        calendarGrid.appendChild(timeSlot);
        
        // Day columns
        weekDates.forEach((date, dayIndex) => {
            const daySlot = document.createElement('div');
            daySlot.className = 'day-slot';
            daySlot.dataset.date = formatDateISO(date);
            daySlot.dataset.time = time;
            
            // Find interviews for this slot
            const interviews = getInterviewsForSlot(date, time);
            interviews.forEach(interview => {
                const eventElement = createCalendarEvent(interview);
                daySlot.appendChild(eventElement);
            });
            
            calendarGrid.appendChild(daySlot);
        });
    });
    
    // Update calendar header dates
    updateCalendarHeader(weekDates);
}

function renderListView() {
    const interviewsList = document.getElementById('interviewsList');
    if (!interviewsList) return;
    
    // Apply filters
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    
    let filteredInterviews = interviewsData.filter(interview => {
        const matchesStatus = !statusFilter || interview.status === statusFilter;
        const matchesType = !typeFilter || interview.type === typeFilter;
        return matchesStatus && matchesType;
    });
    
    // Sort by date and time
    filteredInterviews.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });
    
    if (filteredInterviews.length === 0) {
        interviewsList.innerHTML = `
            <div class="no-interviews">
                <i class="fas fa-calendar-alt" style="font-size: 3rem; color: #d1d5db; margin-bottom: 1rem;"></i>
                <h3>No interviews found</h3>
                <p>Try adjusting your filters or schedule a new interview.</p>
            </div>
        `;
        return;
    }
    
    interviewsList.innerHTML = filteredInterviews.map(interview => createInterviewCard(interview)).join('');
    
    // Add click events to interview cards
    document.querySelectorAll('.interview-card').forEach(card => {
        card.addEventListener('click', () => {
            const interviewId = parseInt(card.dataset.interviewId);
            showInterviewDetails(interviewId);
        });
    });
}

function createCalendarEvent(interview) {
    const event = document.createElement('div');
    event.className = `calendar-event ${interview.status}`;
    event.innerHTML = `
        <div class="event-time">${formatTime24to12(interview.time)}</div>
        <div class="event-title">${interview.candidateName}</div>
        <div class="event-position">${interview.position}</div>
    `;
    
    event.addEventListener('click', (e) => {
        e.stopPropagation();
        showInterviewDetails(interview.id);
    });
    
    return event;
}

function createInterviewCard(interview) {
    const statusClass = getStatusClass(interview.status);
    const typeIcon = getTypeIcon(interview.type);
    
    return `
        <div class="interview-card" data-interview-id="${interview.id}">
            <div class="interview-card-header">
                <div>
                    <div class="interview-candidate">${interview.candidateName}</div>
                    <div class="interview-position">${interview.position}</div>
                </div>
                <div class="interview-datetime">
                    ${formatDate(interview.date)} at ${formatTime24to12(interview.time)}
                </div>
            </div>
            
            <div class="interview-details">
                <span><i class="fas fa-${typeIcon}"></i> ${capitalizeFirst(interview.type.replace('-', ' '))}</span>
                <span><i class="fas fa-user"></i> ${interview.interviewer}</span>
                <span class="status-badge ${statusClass}">${capitalizeFirst(interview.status)}</span>
            </div>
            
            <div class="interview-actions">
                <button class="btn btn-sm btn-secondary" onclick="editInterview(${interview.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="showInterviewDetails(${interview.id})" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
}

function showInterviewDetails(interviewId) {
    const interview = interviewsData.find(i => i.id === interviewId);
    if (!interview) return;
    
    const modal = document.getElementById('interviewDetailsModal');
    
    // Populate modal with interview data
    document.getElementById('interviewTitle').textContent = `Interview with ${interview.candidateName}`;
    document.getElementById('detailsAvatar').textContent = interview.candidateAvatar;
    document.getElementById('detailsCandidateName').textContent = interview.candidateName;
    document.getElementById('detailsPosition').textContent = interview.position;
    document.getElementById('detailsEmail').textContent = interview.candidateEmail;
    document.getElementById('detailsPhone').textContent = interview.candidatePhone;
    
    document.getElementById('detailsDateTime').textContent = 
        `${formatDate(interview.date)} at ${formatTime24to12(interview.time)}`;
    document.getElementById('detailsType').textContent = capitalizeFirst(interview.type.replace('-', ' '));
    document.getElementById('detailsInterviewer').textContent = interview.interviewer;
    
    const statusBadge = document.getElementById('detailsStatus');
    statusBadge.textContent = capitalizeFirst(interview.status);
    statusBadge.className = `status-badge ${getStatusClass(interview.status)}`;
    
    const notesTextarea = document.getElementById('detailsNotes');
    notesTextarea.value = interview.notes;
    
    // Setup action buttons
    document.getElementById('cancelInterviewBtn').onclick = () => cancelInterview(interviewId);
    document.getElementById('rescheduleBtn').onclick = () => rescheduleInterview(interviewId);
    document.getElementById('saveNotesBtn').onclick = () => saveInterviewNotes(interviewId, notesTextarea.value);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function navigateWeek(direction) {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    currentWeek = newDate;
    
    updateCurrentWeekDisplay();
    if (currentView === 'calendar') {
        renderCalendarView();
    }
}

function goToToday() {
    currentWeek = new Date();
    updateCurrentWeekDisplay();
    if (currentView === 'calendar') {
        renderCalendarView();
    }
}

function updateCurrentWeekDisplay() {
    const currentWeekElement = document.getElementById('currentWeek');
    if (currentWeekElement) {
        const weekStart = getWeekStart(currentWeek);
        currentWeekElement.textContent = `Week of ${formatDate(weekStart)}`;
    }
}

function updateCalendarHeader(weekDates) {
    const dayColumns = document.querySelectorAll('.day-column');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    dayColumns.forEach((column, index) => {
        if (index > 0) { // Skip the first column (Time)
            const date = weekDates[index - 1];
            const dayName = days[index - 1];
            const dayNumber = date.getDate();
            
            column.innerHTML = `${dayName}<br><span class="date">${dayNumber}</span>`;
        }
    });
}

function getWeekDates(date) {
    const weekStart = getWeekStart(date);
    const dates = [];
    
    for (let i = 0; i < 5; i++) { // Monday to Friday
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        dates.push(day);
    }
    
    return dates;
}

function getWeekStart(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(date.setDate(diff));
}

function getInterviewsForSlot(date, time) {
    const dateString = formatDateISO(date);
    const timeString = time.padStart(5, '0');
    
    return interviewsData.filter(interview => 
        interview.date === dateString && 
        interview.time === timeString &&
        interview.status === 'scheduled'
    );
}

function handleScheduleInterview(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const interviewData = {
        id: Date.now(),
        candidateId: parseInt(formData.get('candidateSelect') || document.getElementById('candidateSelect').value),
        candidateName: getCandidateName(formData.get('candidateSelect') || document.getElementById('candidateSelect').value),
        candidateAvatar: getCandidateAvatar(formData.get('candidateSelect') || document.getElementById('candidateSelect').value),
        candidateEmail: getCandidateEmail(formData.get('candidateSelect') || document.getElementById('candidateSelect').value),
        candidatePhone: getCandidatePhone(formData.get('candidateSelect') || document.getElementById('candidateSelect').value),
        position: formData.get('positionSelect') || document.getElementById('positionSelect').value,
        date: formData.get('interviewDate') || document.getElementById('interviewDate').value,
        time: formData.get('interviewTime') || document.getElementById('interviewTime').value,
        type: formData.get('interviewType') || document.getElementById('interviewType').value,
        interviewer: getInterviewerName(formData.get('interviewerSelect') || document.getElementById('interviewerSelect').value),
        status: 'scheduled',
        notes: formData.get('interviewNotes') || document.getElementById('interviewNotes').value,
        duration: 60
    };
    
    // Add to interviews data
    interviewsData.push(interviewData);
    
    // Reset form and close modal
    e.target.reset();
    closeModal(document.getElementById('scheduleModal'));
    
    // Refresh view
    renderCurrentView();
    
    // Show success message
    showToast('Interview scheduled successfully!', 'success');
}

function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function editInterview(interviewId) {
    console.log('Editing interview:', interviewId);
    showToast('Edit interview functionality would be implemented here', 'info');
}

function cancelInterview(interviewId) {
    const interview = interviewsData.find(i => i.id === interviewId);
    if (!interview) return;
    
    const confirmed = confirm(`Are you sure you want to cancel the interview with ${interview.candidateName}?`);
    if (confirmed) {
        interview.status = 'cancelled';
        renderCurrentView();
        closeModal(document.getElementById('interviewDetailsModal'));
        showToast('Interview cancelled successfully', 'success');
    }
}

function rescheduleInterview(interviewId) {
    console.log('Rescheduling interview:', interviewId);
    showToast('Reschedule functionality would be implemented here', 'info');
}

function saveInterviewNotes(interviewId, notes) {
    const interview = interviewsData.find(i => i.id === interviewId);
    if (interview) {
        interview.notes = notes;
        showToast('Notes saved successfully', 'success');
    }
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
            
            .no-interviews {
                grid-column: 1 / -1;
                text-align: center;
                padding: 3rem;
                color: #64748b;
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

// Utility functions
function formatTime24to12(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

function formatDateISO(date) {
    return date.toISOString().split('T')[0];
}

function formatDate(dateString) {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getStatusClass(status) {
    const statusMap = {
        'scheduled': 'scheduled',
        'completed': 'success',
        'cancelled': 'danger'
    };
    return statusMap[status] || 'secondary';
}

function getTypeIcon(type) {
    const typeMap = {
        'video': 'video',
        'phone': 'phone',
        'in-person': 'handshake'
    };
    return typeMap[type] || 'calendar';
}

// Mock functions for candidate data
function getCandidateName(candidateId) {
    const candidates = {
        'sarah-johnson': 'Sarah Johnson',
        'mike-chen': 'Mike Chen',
        'emily-davis': 'Emily Davis',
        'david-wilson': 'David Wilson'
    };
    return candidates[candidateId] || 'Unknown Candidate';
}

function getCandidateAvatar(candidateId) {
    const avatars = {
        'sarah-johnson': 'SJ',
        'mike-chen': 'MC',
        'emily-davis': 'ED',
        'david-wilson': 'DW'
    };
    return avatars[candidateId] || 'XX';
}

function getCandidateEmail(candidateId) {
    const emails = {
        'sarah-johnson': 'sarah.johnson@email.com',
        'mike-chen': 'mike.chen@email.com',
        'emily-davis': 'emily.davis@email.com',
        'david-wilson': 'david.wilson@email.com'
    };
    return emails[candidateId] || 'unknown@email.com';
}

function getCandidatePhone(candidateId) {
    const phones = {
        'sarah-johnson': '+1 (555) 123-4567',
        'mike-chen': '+1 (555) 234-5678',
        'emily-davis': '+1 (555) 345-6789',
        'david-wilson': '+1 (555) 456-7890'
    };
    return phones[candidateId] || '+1 (555) 000-0000';
}

function getInterviewerName(interviewerId) {
    const interviewers = {
        'john-doe': 'John Doe',
        'jane-smith': 'Jane Smith',
        'bob-johnson': 'Bob Johnson'
    };
    return interviewers[interviewerId] || 'Unknown Interviewer';
}

// Export for global access
window.InterviewsApp = {
    showInterviewDetails,
    editInterview,
    cancelInterview,
    rescheduleInterview,
    switchView
};