// Candidates JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize candidates page
    initCandidatesPage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load candidates data
    loadCandidatesData();
});

// Sample candidates data
let candidatesData = [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        position: 'Frontend Developer',
        experience: 'Senior (5 years)',
        status: 'interview',
        appliedDate: '2024-03-15',
        rating: 4.5,
        avatar: 'SJ',
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'CSS'],
        summary: 'Experienced frontend developer with 5+ years of expertise in React, JavaScript, and modern web technologies. Passionate about creating user-friendly interfaces and optimizing performance.',
        workExperience: [
            {
                title: 'Senior Frontend Developer',
                company: 'TechCorp Inc.',
                duration: '2022 - Present',
                description: 'Lead frontend development for multiple web applications using React and TypeScript.'
            },
            {
                title: 'Frontend Developer',
                company: 'WebSolutions LLC',
                duration: '2020 - 2022',
                description: 'Developed responsive web interfaces and collaborated with design teams.'
            }
        ],
        education: [
            {
                degree: 'Bachelor of Computer Science',
                school: 'University of Technology',
                duration: '2016 - 2020',
                description: 'Graduated Magna Cum Laude with focus on web development and software engineering.'
            }
        ],
        notes: ''
    },
    {
        id: 2,
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '+1 (555) 234-5678',
        position: 'UX Designer',
        experience: 'Mid (4 years)',
        status: 'screening',
        appliedDate: '2024-03-12',
        rating: 4.2,
        avatar: 'MC',
        skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
        summary: 'Creative UX designer with 4 years of experience in creating intuitive user experiences. Expert in design systems and user-centered design principles.',
        workExperience: [
            {
                title: 'UX Designer',
                company: 'Design Studio Pro',
                duration: '2021 - Present',
                description: 'Design user interfaces and conduct user research for mobile and web applications.'
            }
        ],
        education: [
            {
                degree: 'Bachelor of Design',
                school: 'Art & Design Institute',
                duration: '2017 - 2021',
                description: 'Specialized in interaction design and visual communication.'
            }
        ],
        notes: ''
    },
    {
        id: 3,
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '+1 (555) 345-6789',
        position: 'Product Manager',
        experience: 'Senior (6 years)',
        status: 'final-review',
        appliedDate: '2024-03-10',
        rating: 4.8,
        avatar: 'ED',
        skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Leadership', 'Stakeholder Management'],
        summary: 'Strategic product manager with 6+ years of experience leading cross-functional teams and delivering successful products. Strong background in data-driven decision making.',
        workExperience: [
            {
                title: 'Senior Product Manager',
                company: 'Product Innovations Co.',
                duration: '2020 - Present',
                description: 'Lead product strategy and roadmap for B2B SaaS products serving 10k+ users.'
            }
        ],
        education: [
            {
                degree: 'MBA in Business Administration',
                school: 'Business School Elite',
                duration: '2016 - 2018',
                description: 'Focused on product management and business strategy.'
            }
        ],
        notes: ''
    },
    {
        id: 4,
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '+1 (555) 456-7890',
        position: 'Backend Developer',
        experience: 'Mid (3 years)',
        status: 'applied',
        appliedDate: '2024-03-14',
        rating: 4.0,
        avatar: 'DW',
        skills: ['Node.js', 'Python', 'AWS', 'Docker', 'MongoDB'],
        summary: 'Backend developer with 3 years of experience building scalable APIs and microservices. Passionate about clean code and system architecture.',
        workExperience: [
            {
                title: 'Backend Developer',
                company: 'API Solutions Inc.',
                duration: '2021 - Present',
                description: 'Develop and maintain REST APIs using Node.js and Python.'
            }
        ],
        education: [
            {
                degree: 'Bachelor of Software Engineering',
                school: 'Tech University',
                duration: '2018 - 2021',
                description: 'Specialized in backend systems and database design.'
            }
        ],
        notes: ''
    },
    {
        id: 5,
        name: 'Lisa Rodriguez',
        email: 'lisa.rodriguez@email.com',
        phone: '+1 (555) 567-8901',
        position: 'Marketing Specialist',
        experience: 'Junior (2 years)',
        status: 'hired',
        appliedDate: '2024-03-08',
        rating: 4.3,
        avatar: 'LR',
        skills: ['Digital Marketing', 'Content Creation', 'Social Media', 'Analytics', 'SEO'],
        summary: 'Creative marketing specialist with 2 years of experience in digital marketing and content creation. Proven track record in social media growth and lead generation.',
        workExperience: [
            {
                title: 'Marketing Coordinator',
                company: 'Marketing Pro Agency',
                duration: '2022 - Present',
                description: 'Manage social media campaigns and create marketing content.'
            }
        ],
        education: [
            {
                degree: 'Bachelor of Marketing',
                school: 'Business College',
                duration: '2019 - 2022',
                description: 'Focused on digital marketing and consumer behavior.'
            }
        ],
        notes: ''
    },
    {
        id: 6,
        name: 'James Thompson',
        email: 'james.thompson@email.com',
        phone: '+1 (555) 678-9012',
        position: 'Frontend Developer',
        experience: 'Junior (1 year)',
        status: 'rejected',
        appliedDate: '2024-03-06',
        rating: 3.5,
        avatar: 'JT',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
        summary: 'Junior frontend developer with 1 year of experience. Eager to learn and grow in a collaborative environment.',
        workExperience: [
            {
                title: 'Junior Developer',
                company: 'StartupTech',
                duration: '2023 - Present',
                description: 'Develop web interfaces and assist with frontend development tasks.'
            }
        ],
        education: [
            {
                degree: 'Certificate in Web Development',
                school: 'Coding Bootcamp',
                duration: '2022 - 2023',
                description: 'Intensive program covering full-stack web development.'
            }
        ],
        notes: ''
    }
];

let currentPage = 1;
const candidatesPerPage = 10;
let filteredCandidates = [...candidatesData];

function initCandidatesPage() {
    console.log('Candidates page initialized');
    renderCandidatesTable();
    setupPagination();
}

function setupEventListeners() {
    // Import candidates button
    const importBtn = document.getElementById('importCandidatesBtn');
    if (importBtn) {
        importBtn.addEventListener('click', handleImportCandidates);
    }
    
    // Search and filters
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const positionFilter = document.getElementById('positionFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', handleFilters);
    }
    
    if (positionFilter) {
        positionFilter.addEventListener('change', handleFilters);
    }
    
    if (experienceFilter) {
        experienceFilter.addEventListener('change', handleFilters);
    }
    
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', handleSelectAll);
    }
    
    // Pagination
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changePage(currentPage - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changePage(currentPage + 1));
    }
    
    // Modal close events
    const candidateModal = document.getElementById('candidateModal');
    const closeModal = document.getElementById('closeModal');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => closeCandidateModal());
    }
    
    if (candidateModal) {
        candidateModal.addEventListener('click', (e) => {
            if (e.target === candidateModal) {
                closeCandidateModal();
            }
        });
    }
    
    // Tab navigation in modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            handleTabSwitch(e);
        }
    });
}

function loadCandidatesData() {
    // Check for job filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const jobFilter = urlParams.get('job');
    
    if (jobFilter) {
        // Filter candidates by job if coming from jobs page
        console.log(`Filtering candidates for job: ${jobFilter}`);
    }
    
    console.log(`Loaded ${candidatesData.length} candidates`);
    applyFilters();
}

function renderCandidatesTable() {
    const tableBody = document.getElementById('candidatesTableBody');
    if (!tableBody) return;
    
    const startIndex = (currentPage - 1) * candidatesPerPage;
    const endIndex = startIndex + candidatesPerPage;
    const candidatesToShow = filteredCandidates.slice(startIndex, endIndex);
    
    if (candidatesToShow.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: #64748b;">
                    <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                    <strong>No candidates found</strong><br>
                    Try adjusting your filters or search terms.
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = candidatesToShow.map(candidate => createCandidateRow(candidate)).join('');
    
    // Add event listeners to action buttons
    document.querySelectorAll('.action-btn.view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const candidateId = parseInt(btn.dataset.candidateId);
            showCandidateProfile(candidateId);
        });
    });
    
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const candidateId = parseInt(btn.dataset.candidateId);
            editCandidate(candidateId);
        });
    });
    
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const candidateId = parseInt(btn.dataset.candidateId);
            deleteCandidate(candidateId);
        });
    });
}

function createCandidateRow(candidate) {
    const statusClass = getStatusClass(candidate.status);
    const rating = generateRatingStars(candidate.rating);
    
    return `
        <tr>
            <td>
                <input type="checkbox" class="candidate-checkbox" data-candidate-id="${candidate.id}">
            </td>
            <td>
                <div class="candidate-info">
                    <div class="candidate-avatar-sm">${candidate.avatar}</div>
                    <div>
                        <div class="candidate-name">${candidate.name}</div>
                        <div class="candidate-email">${candidate.email}</div>
                    </div>
                </div>
            </td>
            <td>${candidate.position}</td>
            <td>${candidate.experience}</td>
            <td>
                <span class="status-badge ${statusClass}">${capitalizeFirst(candidate.status.replace('-', ' '))}</span>
            </td>
            <td>${formatDate(candidate.appliedDate)}</td>
            <td>
                <div class="rating-stars">
                    ${rating}
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" data-candidate-id="${candidate.id}" title="View Profile">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" data-candidate-id="${candidate.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" data-candidate-id="${candidate.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function showCandidateProfile(candidateId) {
    const candidate = candidatesData.find(c => c.id === candidateId);
    if (!candidate) return;
    
    const modal = document.getElementById('candidateModal');
    
    // Populate modal with candidate data
    document.getElementById('candidateName').textContent = candidate.name;
    document.getElementById('profileAvatar').textContent = candidate.avatar;
    document.getElementById('profileName').textContent = candidate.name;
    document.getElementById('profilePosition').textContent = candidate.position;
    document.getElementById('profileEmail').textContent = candidate.email;
    document.getElementById('profilePhone').textContent = candidate.phone;
    
    // Skills
    const skillsContainer = document.getElementById('candidateSkills');
    skillsContainer.innerHTML = candidate.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    
    // Experience
    document.getElementById('candidateExperience').textContent = candidate.experience;
    
    // Rating
    const ratingContainer = document.getElementById('candidateRating');
    ratingContainer.innerHTML = generateRatingStars(candidate.rating);
    
    // Status select
    const statusSelect = document.getElementById('candidateStatusSelect');
    statusSelect.value = candidate.status;
    statusSelect.addEventListener('change', (e) => {
        updateCandidateStatus(candidateId, e.target.value);
    });
    
    // Summary
    document.getElementById('candidateSummary').textContent = candidate.summary;
    
    // Work Experience
    const workExperienceContainer = document.getElementById('candidateWorkExperience');
    workExperienceContainer.innerHTML = candidate.workExperience.map(exp => `
        <div class="experience-item">
            <div class="experience-title">${exp.title}</div>
            <div class="experience-company">${exp.company}</div>
            <div class="experience-duration">${exp.duration}</div>
            <p>${exp.description}</p>
        </div>
    `).join('');
    
    // Education
    const educationContainer = document.getElementById('candidateEducation');
    educationContainer.innerHTML = candidate.education.map(edu => `
        <div class="education-item">
            <div class="education-title">${edu.degree}</div>
            <div class="education-school">${edu.school}</div>
            <div class="education-duration">${edu.duration}</div>
            <p>${edu.description}</p>
        </div>
    `).join('');
    
    // Notes
    const notesTextarea = document.getElementById('candidateNotes');
    notesTextarea.value = candidate.notes;
    
    // Save notes button
    const saveNotesBtn = document.getElementById('saveNotesBtn');
    saveNotesBtn.onclick = () => saveCandidateNotes(candidateId, notesTextarea.value);
    
    // Schedule interview button
    const scheduleBtn = document.getElementById('scheduleInterviewBtn');
    scheduleBtn.onclick = () => scheduleInterview(candidateId);
    
    // Download resume button
    const downloadBtn = document.getElementById('downloadResumeBtn');
    downloadBtn.onclick = () => downloadResume(candidateId);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCandidateModal() {
    const modal = document.getElementById('candidateModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handleTabSwitch(e) {
    const targetTab = e.target.dataset.tab;
    if (!targetTab) return;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(targetTab).classList.add('active');
}

function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="fas fa-star star empty"></i>';
    }
    
    return stars;
}

function getStatusClass(status) {
    const statusMap = {
        'applied': 'active',
        'screening': 'warning',
        'interview': 'info',
        'final-review': 'warning',
        'hired': 'success',
        'rejected': 'danger'
    };
    return statusMap[status] || 'secondary';
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    applyFilters(searchTerm);
}

function handleFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    applyFilters(searchTerm);
}

function applyFilters(searchTerm = '') {
    const statusFilter = document.getElementById('statusFilter').value;
    const positionFilter = document.getElementById('positionFilter').value;
    const experienceFilter = document.getElementById('experienceFilter').value;
    
    filteredCandidates = candidatesData.filter(candidate => {
        const matchesSearch = !searchTerm || 
            candidate.name.toLowerCase().includes(searchTerm) ||
            candidate.email.toLowerCase().includes(searchTerm) ||
            candidate.position.toLowerCase().includes(searchTerm) ||
            candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm));
            
        const matchesStatus = !statusFilter || candidate.status === statusFilter;
        const matchesPosition = !positionFilter || candidate.position.toLowerCase().includes(positionFilter.replace('-', ' '));
        const matchesExperience = !experienceFilter || candidate.experience.toLowerCase().includes(experienceFilter);
        
        return matchesSearch && matchesStatus && matchesPosition && matchesExperience;
    });
    
    currentPage = 1;
    renderCandidatesTable();
    setupPagination();
}

function setupPagination() {
    const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
    const paginationNumbers = document.getElementById('paginationNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!paginationNumbers) return;
    
    // Update buttons state
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
    
    // Generate page numbers
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="page-number ${i === currentPage ? 'active' : ''}" 
                        onclick="changePage(${i})">${i}</button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<span class="page-ellipsis">...</span>';
        }
    }
    
    paginationNumbers.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderCandidatesTable();
    setupPagination();
    
    // Scroll to top of table
    document.querySelector('.candidates-table-section').scrollIntoView({ behavior: 'smooth' });
}

function handleSelectAll(e) {
    const checkboxes = document.querySelectorAll('.candidate-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = e.target.checked;
    });
}

function handleImportCandidates() {
    // Create file input for CSV import
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Importing candidates from file:', file.name);
            showToast('File upload functionality would be implemented here', 'info');
        }
    };
    input.click();
}

function updateCandidateStatus(candidateId, newStatus) {
    const candidate = candidatesData.find(c => c.id === candidateId);
    if (candidate) {
        candidate.status = newStatus;
        renderCandidatesTable();
        showToast(`Candidate status updated to ${capitalizeFirst(newStatus.replace('-', ' '))}`, 'success');
    }
}

function saveCandidateNotes(candidateId, notes) {
    const candidate = candidatesData.find(c => c.id === candidateId);
    if (candidate) {
        candidate.notes = notes;
        showToast('Notes saved successfully', 'success');
    }
}

function scheduleInterview(candidateId) {
    console.log('Scheduling interview for candidate:', candidateId);
    const confirmed = confirm('Schedule interview? This will redirect to the interviews page.');
    if (confirmed) {
        window.location.href = `interviews.html?candidate=${candidateId}`;
    }
}

function downloadResume(candidateId) {
    console.log('Downloading resume for candidate:', candidateId);
    showToast('Resume download functionality would be implemented here', 'info');
}

function editCandidate(candidateId) {
    console.log('Editing candidate:', candidateId);
    showToast('Edit candidate functionality would be implemented here', 'info');
}

function deleteCandidate(candidateId) {
    const candidate = candidatesData.find(c => c.id === candidateId);
    if (!candidate) return;
    
    const confirmed = confirm(`Are you sure you want to delete ${candidate.name}?`);
    if (confirmed) {
        candidatesData = candidatesData.filter(c => c.id !== candidateId);
        applyFilters();
        showToast('Candidate deleted successfully', 'success');
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
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
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

// Export for global access
window.CandidatesApp = {
    showCandidateProfile,
    editCandidate,
    deleteCandidate,
    changePage,
    scheduleInterview
};