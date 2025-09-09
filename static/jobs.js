// Jobs JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize jobs page
    initJobsPage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load jobs data
    loadJobsData();
});

// Sample jobs data
let jobsData = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        department: 'technology',
        location: 'remote',
        salary: '$90,000 - $130,000',
        status: 'active',
        description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user-facing features using React, TypeScript, and modern web technologies.',
        applicants: 12,
        postedDate: '2024-03-15',
        requirements: ['React', 'TypeScript', 'Node.js', 'GraphQL']
    },
    {
        id: 2,
        title: 'UX/UI Designer',
        department: 'design',
        location: 'hybrid',
        salary: '$70,000 - $100,000',
        status: 'active',
        description: 'Join our design team to create intuitive and beautiful user experiences. You will work closely with developers and product managers to deliver exceptional design solutions.',
        applicants: 8,
        postedDate: '2024-03-12',
        requirements: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping']
    },
    {
        id: 3,
        title: 'Product Manager',
        department: 'management',
        location: 'on-site',
        salary: '$100,000 - $150,000',
        status: 'paused',
        description: 'Lead product development from concept to launch. Define product roadmap, gather requirements, and coordinate with cross-functional teams.',
        applicants: 24,
        postedDate: '2024-03-10',
        requirements: ['Product Strategy', 'Agile', 'Data Analysis', 'Leadership']
    },
    {
        id: 4,
        title: 'Backend Developer',
        department: 'technology',
        location: 'remote',
        salary: '$85,000 - $125,000',
        status: 'active',
        description: 'Build and maintain scalable backend services using Node.js, Python, and cloud technologies. Work on APIs, databases, and microservices architecture.',
        applicants: 15,
        postedDate: '2024-03-08',
        requirements: ['Node.js', 'Python', 'AWS', 'Docker', 'MongoDB']
    },
    {
        id: 5,
        title: 'Marketing Specialist',
        department: 'marketing',
        location: 'hybrid',
        salary: '$55,000 - $75,000',
        status: 'active',
        description: 'Drive marketing campaigns and brand awareness. Manage social media, content creation, and lead generation initiatives.',
        applicants: 6,
        postedDate: '2024-03-14',
        requirements: ['Digital Marketing', 'Content Creation', 'Social Media', 'Analytics']
    },
    {
        id: 6,
        title: 'DevOps Engineer',
        department: 'technology',
        location: 'remote',
        salary: '$95,000 - $140,000',
        status: 'closed',
        description: 'Implement and maintain CI/CD pipelines, infrastructure automation, and monitoring systems. Ensure scalable and reliable deployments.',
        applicants: 18,
        postedDate: '2024-03-05',
        requirements: ['AWS/GCP', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins']
    }
];

let currentPage = 1;
const jobsPerPage = 9;
let filteredJobs = [...jobsData];

function initJobsPage() {
    console.log('Jobs page initialized');
    renderJobs();
    setupPagination();
}

function setupEventListeners() {
    // Create job modal
    const createJobBtn = document.getElementById('createJobBtn');
    const createJobModal = document.getElementById('createJobModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const createJobForm = document.getElementById('createJobForm');
    
    if (createJobBtn) {
        createJobBtn.addEventListener('click', () => openModal(createJobModal));
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => closeModal(createJobModal));
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeModal(createJobModal));
    }
    
    if (createJobForm) {
        createJobForm.addEventListener('submit', handleCreateJob);
    }
    
    // Search and filters
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const departmentFilter = document.getElementById('departmentFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', handleFilters);
    }
    
    if (departmentFilter) {
        departmentFilter.addEventListener('change', handleFilters);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', handleFilters);
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
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

function loadJobsData() {
    // Simulate loading jobs from API
    console.log(`Loaded ${jobsData.length} jobs`);
    applyFilters();
}

function renderJobs() {
    const jobsGrid = document.getElementById('jobsGrid');
    if (!jobsGrid) return;
    
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToShow = filteredJobs.slice(startIndex, endIndex);
    
    if (jobsToShow.length === 0) {
        jobsGrid.innerHTML = `
            <div class="no-jobs">
                <i class="fas fa-briefcase" style="font-size: 3rem; color: #d1d5db; margin-bottom: 1rem;"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    jobsGrid.innerHTML = jobsToShow.map(job => createJobCard(job)).join('');
    
    // Add click events to job cards
    document.querySelectorAll('.job-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.job-card-footer')) {
                const jobId = parseInt(card.dataset.jobId);
                showJobDetails(jobId);
            }
        });
    });
}

function createJobCard(job) {
    const statusClass = job.status === 'active' ? 'active' : 
                       job.status === 'paused' ? 'paused' : 'closed';
                       
    return `
        <div class="job-card" data-job-id="${job.id}">
            <div class="job-card-header">
                <div>
                    <h3 class="job-card-title">${job.title}</h3>
                    <div class="job-card-meta">
                        <span><i class="fas fa-building"></i> ${capitalizeFirst(job.department)}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${capitalizeFirst(job.location)}</span>
                        <span><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
                    </div>
                </div>
                <span class="status-badge ${statusClass}">${capitalizeFirst(job.status)}</span>
            </div>
            
            <p class="job-card-description">${truncateText(job.description, 120)}</p>
            
            <div class="job-card-requirements">
                ${job.requirements.slice(0, 3).map(req => `<span class="skill-tag">${req}</span>`).join('')}
                ${job.requirements.length > 3 ? `<span class="skill-tag">+${job.requirements.length - 3} more</span>` : ''}
            </div>
            
            <div class="job-card-footer">
                <span class="job-card-applicants">
                    <i class="fas fa-users"></i>
                    ${job.applicants} applicant${job.applicants !== 1 ? 's' : ''}
                </span>
                <span class="job-posted-date">
                    Posted ${getRelativeTime(job.postedDate)}
                </span>
            </div>
        </div>
    `;
}

function showJobDetails(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    // Create job details modal
    const modal = document.createElement('div');
    modal.className = 'modal large active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${job.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body job-details">
                <div class="job-details-header">
                    <div class="job-meta-grid">
                        <div class="meta-item">
                            <label>Department</label>
                            <span>${capitalizeFirst(job.department)}</span>
                        </div>
                        <div class="meta-item">
                            <label>Location</label>
                            <span>${capitalizeFirst(job.location)}</span>
                        </div>
                        <div class="meta-item">
                            <label>Salary</label>
                            <span>${job.salary}</span>
                        </div>
                        <div class="meta-item">
                            <label>Status</label>
                            <span class="status-badge ${job.status}">${capitalizeFirst(job.status)}</span>
                        </div>
                        <div class="meta-item">
                            <label>Applicants</label>
                            <span>${job.applicants} candidates</span>
                        </div>
                        <div class="meta-item">
                            <label>Posted</label>
                            <span>${formatDate(job.postedDate)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="job-details-content">
                    <h3>Job Description</h3>
                    <p>${job.description}</p>
                    
                    <h3>Required Skills</h3>
                    <div class="skills-list">
                        ${job.requirements.map(req => `<span class="skill-tag">${req}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="editJob(${job.id})">
                        <i class="fas fa-edit"></i>
                        Edit Job
                    </button>
                    <button class="btn btn-primary" onclick="viewApplicants(${job.id})">
                        <i class="fas fa-users"></i>
                        View Applicants (${job.applicants})
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for job details
    const style = document.createElement('style');
    style.textContent = `
        .job-details-header {
            background: #f8fafc;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .job-meta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .meta-item label {
            display: block;
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }
        
        .meta-item span {
            font-weight: 600;
            color: #1e293b;
        }
        
        .job-details-content h3 {
            margin: 2rem 0 1rem 0;
            color: #1e293b;
        }
        
        .job-details-content p {
            line-height: 1.6;
            color: #64748b;
        }
        
        .no-jobs {
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem;
            color: #64748b;
        }
    `;
    
    if (!document.querySelector('#job-details-styles')) {
        style.id = 'job-details-styles';
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
    const departmentFilter = document.getElementById('departmentFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    
    filteredJobs = jobsData.filter(job => {
        const matchesSearch = !searchTerm || 
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.requirements.some(req => req.toLowerCase().includes(searchTerm));
            
        const matchesStatus = !statusFilter || job.status === statusFilter;
        const matchesDepartment = !departmentFilter || job.department === departmentFilter;
        const matchesLocation = !locationFilter || job.location === locationFilter;
        
        return matchesSearch && matchesStatus && matchesDepartment && matchesLocation;
    });
    
    currentPage = 1;
    renderJobs();
    setupPagination();
}

function setupPagination() {
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
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
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderJobs();
    setupPagination();
    
    // Scroll to top of jobs grid
    document.getElementById('jobsGrid').scrollIntoView({ behavior: 'smooth' });
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

function handleCreateJob(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const jobData = {
        id: Date.now(), // Simple ID generation
        title: formData.get('jobTitle') || document.getElementById('jobTitle').value,
        department: formData.get('jobDepartment') || document.getElementById('jobDepartment').value,
        location: formData.get('jobLocation') || document.getElementById('jobLocation').value,
        salary: formData.get('jobSalary') || document.getElementById('jobSalary').value,
        description: formData.get('jobDescription') || document.getElementById('jobDescription').value,
        status: 'active',
        applicants: 0,
        postedDate: new Date().toISOString().split('T')[0],
        requirements: ['New Position', 'Great Opportunity']
    };
    
    // Add to jobs data
    jobsData.unshift(jobData);
    
    // Reset form and close modal
    e.target.reset();
    closeModal(document.getElementById('createJobModal'));
    
    // Refresh jobs display
    applyFilters();
    
    // Show success message
    showToast('Job created successfully!', 'success');
}

function editJob(jobId) {
    console.log('Editing job:', jobId);
    showToast('Edit job functionality would be implemented here', 'info');
}

function viewApplicants(jobId) {
    console.log('Viewing applicants for job:', jobId);
    const confirmed = confirm('View applicants? This will redirect to the candidates page.');
    if (confirmed) {
        window.location.href = `candidates.html?job=${jobId}`;
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
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
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
window.JobsApp = {
    editJob,
    viewApplicants,
    changePage,
    showJobDetails
};