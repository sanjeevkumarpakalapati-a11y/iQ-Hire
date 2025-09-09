document.addEventListener('DOMContentLoaded', function () {
    // ===== STATE =====
    let currentRole = 'employee';
    let isLoading = false;

    // ===== DOM ELEMENTS =====
    const tabTriggers       = document.querySelectorAll('.tab-trigger');
    const tabContents       = document.querySelectorAll('.tab-content');
    const loginButton       = document.getElementById('loginButton');
    const loginForm         = document.getElementById('loginForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput     = document.getElementById('password');
    const emailInput        = document.getElementById('email');
    const rememberMeInput   = document.getElementById('rememberMe');
    const buttonText        = loginButton ? loginButton.querySelector('.button-text') : null;
    const loadingSpinner    = loginButton ? loginButton.querySelector('.loading-spinner') : null;

    // ===== FUNCTIONS =====
    function updateButtonText() {
        if (buttonText) {
            const roleText = currentRole === 'admin' ? 'Admin' : 'Employee';
            buttonText.textContent = `Sign In as ${roleText}`;
        }
    }

    function switchRole(role) {
        currentRole = role;

        // Update tabs
        tabTriggers.forEach(trigger => {
            trigger.classList.remove('active', 'admin');
            if (trigger.dataset.role === role) {
                trigger.classList.add('active');
                if (role === 'admin') trigger.classList.add('admin');
            }
        });

        // Update content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.dataset.content === role) {
                content.classList.add('active');
            }
        });

        // Update button color
        if (loginButton) {
            loginButton.classList.remove('employee', 'admin');
            loginButton.classList.add(role);
        }

        updateButtonText();
    }

    function togglePasswordVisibility() {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';

        const eyeIcon = document.getElementById('eyeIcon');
        if (isPassword) {
            // Eye-off icon
            eyeIcon.innerHTML = `
                <path d="M2 2l20 20"/>
                <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24"/>
                <path d="M16.88 16.88A10.94 10.94 0 0 1 12 19c-7 0-10-7-10-7a21.82 21.82 0 0 1 5.17-5.94"/>
            `;
        } else {
            // Eye icon
            eyeIcon.innerHTML = `
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
            `;
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        if (isLoading) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validation
        if (!email || !password) {
            showToast('Login Failed', 'Please enter both email and password', 'error');
            return;
        }
        if (!isValidEmail(email)) {
            showToast('Login Failed', 'Please enter a valid email address', 'error');
            return;
        }

        // TODO: Add your backend login logic here
        console.log(`Logging in as ${currentRole} with email: ${email}`);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ===== EVENT LISTENERS =====
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const role = trigger.dataset.role;
            switchRole(role);
        });
    });

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Initialize with default role
    switchRole(currentRole);
});
