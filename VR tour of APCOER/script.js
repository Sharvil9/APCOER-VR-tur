// Mobile Menu Toggle
function showMenu() {
    document.getElementById('navLinks').classList.add('active');
}

function hideMenu() {
    document.getElementById('navLinks').classList.remove('active');
}

// Hide header banner on scroll with Apple-like physics
document.addEventListener('DOMContentLoaded', function() {
    const collegeBanner = document.querySelector('.college-banner');
    let lastScrollTop = 0;
    let scrollThreshold = 10;
    let scrollTimer = null;
    let isAnimating = false;
    
    function toggleBanner(show) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        if (show) {
            collegeBanner.classList.remove('hidden');
            // Give time for the animation to complete
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        } else {
            collegeBanner.classList.add('hidden');
            // Give time for the animation to complete
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }
    }
    
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = Math.abs(scrollTop - lastScrollTop);
        
        // Don't process small scroll amounts (helps with iOS rubberbanding)
        if (scrollDelta < 5) return;
        
        // Show banner at top of page with a slight delay for rubber-banding
        if (scrollTop <= scrollThreshold) {
            scrollTimer = setTimeout(() => toggleBanner(true), 50);
        } 
        // Hide when scrolling down with a small threshold for intentional scrolls
        else if (scrollTop > lastScrollTop && scrollTop > 50) {
            toggleBanner(false);
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference only - ignore system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    } else {
        // Ensure light mode is explicitly set as default
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        darkModeToggle.checked = false;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            // Adding a subtle animation for theme change
            document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // Add loading animation to Launch VR button
    const launchButton = document.getElementById('launch-vr');
    
    if (launchButton) {
        launchButton.addEventListener('click', function(e) {
            // No need to prevent default or show loading animation
            // The link will open in a new tab automatically
        });
    }

    // Scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-children');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Once animated, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // relative to viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // slightly before element enters viewport
    });
    
    // Start observing elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }
    
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .cta-button, .submit-button');
    
    buttons.forEach(button => {
        button.classList.add('ripple-btn');
        
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600); // Match the animation duration
        });
    });
    
    // Form input animations and validation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Create validation status indicators
        if (input.type !== 'textarea') {
            const validStatus = document.createElement('span');
            validStatus.classList.add('input-status', 'valid');
            validStatus.innerHTML = '<i class="fas fa-check-circle"></i>';
            
            const invalidStatus = document.createElement('span');
            invalidStatus.classList.add('input-status', 'invalid');
            invalidStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            
            input.parentNode.appendChild(validStatus);
            input.parentNode.appendChild(invalidStatus);
        }
        
        // Autofocus animation
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
    
    // Animated counters
    const counters = document.querySelectorAll('.animated-counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = Math.floor(duration / countTo);
                    
                    const counterAnimation = setInterval(() => {
                        count++;
                        target.textContent = count;
                        
                        if (count >= countTo) {
                            clearInterval(counterAnimation);
                        }
                    }, interval);
                    
                    counterObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Swipe Gesture Gallery
    const swipeContainer = document.querySelector('.swipe-container');
    
    if (swipeContainer) {
        const swipeWrapper = swipeContainer.querySelector('.swipe-wrapper');
        const slides = swipeContainer.querySelectorAll('.swipe-slide');
        const indicators = swipeContainer.querySelectorAll('.swipe-indicators .indicator');
        
        let currentSlide = 0;
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        let slideWidth = slides[0].offsetWidth;
        let autoSlideInterval = null;
        let autoSlidePaused = false;
        let autoSlidePauseTimeout = null;
        
        // Update slide width on window resize
        window.addEventListener('resize', () => {
            slideWidth = slides[0].offsetWidth;
            goToSlide(currentSlide);
        });

        // Set initial slide position
        goToSlide(0);
        startAutoSlide();
        
        // Functions to handle touch and mouse events
        function handleStart(e) {
            startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            isDragging = true;
            swipeWrapper.style.transition = 'none';
            pauseAutoSlide();
        }
        
        function handleMove(e) {
            if (!isDragging) return;
            
            e.preventDefault();
            endX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const diff = endX - startX;
            
            // Calculate how far to translate based on drag distance
            const translateX = -currentSlide * slideWidth + diff;
            swipeWrapper.style.transform = `translateX(${translateX}px)`;
        }
        
        function handleEnd() {
            if (!isDragging) return;
            
            isDragging = false;
            swipeWrapper.style.transition = 'transform 0.3s ease';
            
            const diff = endX - startX;
            
            // Determine if we should change slides based on swipe distance
            if (diff < -50 && currentSlide < slides.length - 1) {
                currentSlide++;
            } else if (diff > 50 && currentSlide > 0) {
                currentSlide--;
            }
            goToSlide(currentSlide);
            pauseAutoSlide();
        }
        
        function goToSlide(index) {
            currentSlide = index;
            swipeWrapper.style.transition = 'transform 0.3s ease';
            swipeWrapper.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Click on indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                pauseAutoSlide();
            });
        });
        
        // Touch Events
        swipeContainer.addEventListener('touchstart', handleStart);
        swipeContainer.addEventListener('touchmove', handleMove, { passive: false });
        swipeContainer.addEventListener('touchend', handleEnd);
        
        // Mouse Events
        swipeContainer.addEventListener('mousedown', handleStart);
        swipeContainer.addEventListener('mousemove', handleMove);
        swipeContainer.addEventListener('mouseup', handleEnd);
        swipeContainer.addEventListener('mouseleave', handleEnd);

        // Auto-slide logic
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                goToSlide(currentSlide);
            }, 4000);
        }
        function pauseAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            if (autoSlidePauseTimeout) clearTimeout(autoSlidePauseTimeout);
            autoSlidePaused = true;
            autoSlidePauseTimeout = setTimeout(() => {
                autoSlidePaused = false;
                startAutoSlide();
            }, 8000);
        }
    }
});

// Smooth Scrolling for Navigation Links with Apple-like physics
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Easing function similar to Apple's animations (cubic-bezier)
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    function smoothScroll(targetElement, duration) {
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 70;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeOutQuart(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if the link is pointing to an anchor on this page
            if (this.getAttribute('href').charAt(0) === '#') {
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {  // Skip if it's just '#'
                    e.preventDefault();
                    
                    // On mobile, close the menu after clicking a link
                    hideMenu();
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        smoothScroll(targetElement, 800); // Duration in ms (800ms is similar to Apple)
                    }
                }
            }
        });
    });
});

// Star Rating System
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.stars i');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            
            // Reset all stars
            stars.forEach(s => s.className = 'far fa-star');
            
            // Set active stars
            for(let i = 0; i < rating; i++) {
                stars[i].className = 'fas fa-star active';
            }
        });
    });
});

// Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const feedbackForm = document.getElementById('tour-feedback');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show a loading indicator on the submit button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<div class="loading-indicator"><div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div></div>';
            submitButton.disabled = true;
            
            // Simulate form submission (would be an AJAX call in production)
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            }, 1500);
        });
    }
    
    if(feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show a loading indicator on the submit button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<div class="loading-indicator"><div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div></div>';
            submitButton.disabled = true;
            
            // Simulate form submission (would be an AJAX call in production)
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                alert('Thank you for your feedback!');
                feedbackForm.reset();
                
                // Reset stars
                document.querySelectorAll('.stars i').forEach(star => {
                    star.className = 'far fa-star';
                });
            }, 1500);
        });
    }
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Load all images immediately
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Create folder structure for VR scenes (for demo purposes)
const vrScenes = [
    { id: 'entrance', name: 'Main Entrance', neighbors: ['lobby'] },
    { id: 'lobby', name: 'Main Lobby', neighbors: ['entrance', 'corridor1', 'auditorium'] },
    { id: 'corridor1', name: 'Main Corridor', neighbors: ['lobby', 'computerLab', 'library'] },
    { id: 'computerLab', name: 'Computer Laboratory', neighbors: ['corridor1'] },
    { id: 'library', name: 'Central Library', neighbors: ['corridor1'] },
    { id: 'auditorium', name: 'Auditorium', neighbors: ['lobby'] }
];

// VR Tour Configuration (would be used in the real implementation)
const vrTourConfig = {
    initialScene: 'entrance',
    scenes: vrScenes,
    defaultRotation: { x: 0, y: 0, z: 0 },
    defaultFov: 75,
    minFov: 50,
    maxFov: 90
};

// Export the configuration for use in the VR tour script
window.VR_TOUR_CONFIG = vrTourConfig;

// Banner Scroll Behavior
let lastScrollTop = 0;
const banner = document.querySelector('.college-banner');
const scrollThreshold = 50; // Reduced threshold for easier triggering

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingUp = currentScroll < lastScrollTop;
    
    if (isScrollingUp && currentScroll < scrollThreshold) {
        banner.classList.remove('hidden');
    } else if (!isScrollingUp && currentScroll > scrollThreshold) {
        banner.classList.add('hidden');
    }
    
    lastScrollTop = currentScroll;
});

// === Feedback Form Email Validation ===
document.addEventListener('DOMContentLoaded', function() {
  const emailInput = document.getElementById('feedback-email');
  const emailTick = document.getElementById('email-tick');
  const emailError = document.getElementById('feedback-email-error');

  if (emailInput) {
    emailInput.addEventListener('input', function() {
      const value = emailInput.value.trim();
      // Simple RFC 5322 email regex
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value && emailPattern.test(value)) {
        emailInput.classList.add('valid');
        emailInput.classList.remove('invalid');
        emailTick.style.display = 'inline-block';
        emailError.textContent = '';
      } else {
        emailInput.classList.remove('valid');
        emailInput.classList.add('invalid');
        emailTick.style.display = 'none';
        if (value.length > 0) {
          emailError.textContent = 'Please enter a valid email address.';
        } else {
          emailError.textContent = '';
        }
      }
    });
    // Hide tick and error on blur if empty
    emailInput.addEventListener('blur', function() {
      if (!emailInput.value.trim()) {
        emailInput.classList.remove('valid', 'invalid');
        emailTick.style.display = 'none';
        emailError.textContent = '';
      }
    });
  }
}); 