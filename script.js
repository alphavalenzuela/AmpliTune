// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Handle scroll events to change navbar appearance
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for navbar height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form validation
    const form = document.getElementById('signup-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name (at least 2 characters)
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                isValid = false;
            } else {
                nameError.textContent = '';
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            } else {
                emailError.textContent = '';
            }
            
            // Validate password (at least 8 characters)
            const passwordInput = document.getElementById('password');
            const passwordError = document.getElementById('password-error');
            if (passwordInput.value.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters';
                isValid = false;
            } else {
                passwordError.textContent = '';
            }
            
            // Validate terms checkbox
            const termsInput = document.getElementById('terms');
            const termsError = document.getElementById('terms-error');
            if (!termsInput.checked) {
                termsError.textContent = 'You must agree to the terms and conditions';
                isValid = false;
            } else {
                termsError.textContent = '';
            }
            
            // If form is valid, submit
            if (isValid) {
                // In a real app, this would submit to a server
                // For demonstration, we'll show a success message
                const submitButton = document.getElementById('submit-button');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Creating Account...';
                
                // Simulate server request
                setTimeout(() => {
                    // Reset form
                    form.reset();
                    
                    // Show success message
                    alert('Account created successfully! Welcome to AmpliTune!');
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 1500);
            }
        });
        
        // Real-time validation feedback
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // Clear error message when user starts typing
                const errorElement = document.getElementById(`${input.id}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });
    }
    
    // Add simple animation to features on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Simple function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        featureCards.forEach((card, index) => {
            if (isInViewport(card)) {
                // Add a delay based on the index
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
    
    // Initialize feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Trigger once on page load to animate elements already in view
    handleScrollAnimations();
});