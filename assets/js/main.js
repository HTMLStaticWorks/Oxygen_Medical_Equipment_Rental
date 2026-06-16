/**
 * OXYGEN & MEDICAL EQUIPMENT RENTAL - CORE JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Functionality ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('dark-mode');
    updateThemeIcon(false);
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeToggleBtn) return;
    if (isDark) {
      themeToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      themeToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  // --- RTL Toggle Functionality ---
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  const currentDir = localStorage.getItem('dir') || 'ltr';
  
  if (currentDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    if (rtlToggleBtn) rtlToggleBtn.textContent = 'LTR';
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    if (rtlToggleBtn) rtlToggleBtn.textContent = 'RTL';
  }
  
  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
        rtlToggleBtn.textContent = 'RTL';
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
        rtlToggleBtn.textContent = 'LTR';
      }
    });
  }

  // --- Sticky Header Scroll Handler ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Hamburger Menu Logic ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    // Auto-close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });
  }

  // --- Active Navigation Link Indicator ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- Password Visibility Toggle ---
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const passwordInput = btn.previousElementSibling;
      if (passwordInput && (passwordInput.type === 'password' || passwordInput.type === 'text')) {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isDark = isPassword ? 'text' : 'password';
        btn.innerHTML = isPassword ? `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        ` : `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      }
    });
  });

  // --- Form Validation Framework ---
  
  // 1. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      let isValid = true;
      
      resetValidationErrors(contactForm);
      
      if (!firstName.value.trim()) {
        showError(firstName, 'First Name is required');
        isValid = false;
      }
      
      if (!lastName.value.trim()) {
        showError(lastName, 'Last Name is required');
        isValid = false;
      }
      
      if (!email.value.trim()) {
        showError(email, 'Email address is required');
        isValid = false;
      } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
      }
      
      if (isValid) {
        showSuccessMessage(contactForm, 'Thank you! Your inquiry has been sent successfully. We will call you back shortly.');
        contactForm.reset();
      }
    });
  }

  // 2. Login Form Validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      
      let isValid = true;
      
      resetValidationErrors(loginForm);
      
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }
      
      if (!password.value.trim()) {
        showError(password, 'Password is required');
        isValid = false;
      }
      
      if (isValid) {
        showSuccessMessage(loginForm, 'Sign in successful! (UI demonstration only)');
      }
    });
  }

  // 3. Register Form Validation
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      const terms = document.getElementById('terms');
      
      let isValid = true;
      
      resetValidationErrors(registerForm);
      
      if (!firstName.value.trim()) {
        showError(firstName, 'First Name is required');
        isValid = false;
      }
      
      if (!lastName.value.trim()) {
        showError(lastName, 'Last Name is required');
        isValid = false;
      }
      
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }
      
      if (!password.value.trim()) {
        showError(password, 'Password is required');
        isValid = false;
      } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters long');
        isValid = false;
      }
      
      if (!confirmPassword.value.trim()) {
        showError(confirmPassword, 'Confirm Password is required');
        isValid = false;
      } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
      }
      
      if (terms && !terms.checked) {
        showError(terms, 'You must agree to the Terms & Conditions');
        isValid = false;
      }
      
      if (isValid) {
        showSuccessMessage(registerForm, 'Registration successful! (UI demonstration only)');
        registerForm.reset();
      }
    });
  }

  // --- Helper Validation Functions ---
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(inputElement, message) {
    const group = inputElement.closest('.form-group') || inputElement.parentElement;
    if (group) {
      let feedback = group.querySelector('.form-feedback');
      if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'form-feedback error';
        group.appendChild(feedback);
      } else {
        feedback.className = 'form-feedback error';
      }
      feedback.textContent = message;
      inputElement.style.borderColor = 'var(--accent)';
    }
  }

  function resetValidationErrors(form) {
    form.querySelectorAll('.form-feedback').forEach(el => {
      el.textContent = '';
      el.className = 'form-feedback';
    });
    form.querySelectorAll('input, textarea, select').forEach(el => {
      el.style.borderColor = 'var(--border)';
    });
    const successMsg = form.querySelector('.form-success-banner');
    if (successMsg) successMsg.remove();
  }

  function showSuccessMessage(form, message) {
    const successBanner = document.createElement('div');
    successBanner.className = 'form-success-banner';
    successBanner.style.backgroundColor = 'rgba(var(--secondary-rgb), 0.1)';
    successBanner.style.color = 'var(--secondary)';
    successBanner.style.border = '1px solid var(--secondary)';
    successBanner.style.padding = '1rem';
    successBanner.style.borderRadius = 'var(--radius-md)';
    successBanner.style.marginBottom = '1.5rem';
    successBanner.style.fontWeight = '600';
    successBanner.style.textAlign = 'center';
    successBanner.textContent = message;
    
    form.insertBefore(successBanner, form.firstChild);
  }

  // --- Interactive Map Points Handler ---
  const mapPoints = document.querySelectorAll('.coverage-map-point');
  const coverageDetailsText = document.getElementById('coverage-details-text');
  
  if (mapPoints && coverageDetailsText) {
    mapPoints.forEach(point => {
      point.addEventListener('click', () => {
        // Reset sizes of all points
        mapPoints.forEach(p => p.setAttribute('r', '6'));
        
        // Emphasize current point
        point.setAttribute('r', '9');
        
        const city = point.getAttribute('data-city');
        const radius = point.getAttribute('data-radius');
        
        coverageDetailsText.innerHTML = `<strong>Selected Area:</strong> ${city} (${radius} Delivery Service Radius). Fast shipping & equipment setup within 2-4 hours available.`;
      });
    });
  }
});

// FAQ Accordion functionality (Home 2)
document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Check if current is open
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      // Close all others first (optional accordion behavior)
      faqQuestions.forEach(q => q.setAttribute('aria-expanded', 'false'));
      
      // Toggle current
      if (!isExpanded) {
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
