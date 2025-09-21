// Hunt Pup Tail - Main JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add floating animation to character cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Reveal using CSS classes so :hover transforms still apply
            entry.target.classList.remove('reveal-init');
            entry.target.classList.add('reveal-show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and features (use CSS classes instead of inline styles)
document.querySelectorAll('.character-card, .feature-card').forEach(card => {
    card.classList.add('reveal-init');
    observer.observe(card);
});

// Interactive hover effects for screenshots
document.querySelectorAll('.screenshot').forEach(screenshot => {
    screenshot.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
        this.style.zIndex = '10';
    });
    
    screenshot.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.zIndex = '1';
    });
});

// Add click animation to CTA buttons
document.querySelectorAll('.cta-button, .download-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.offsetX - 10) + 'px';
        ripple.style.top = (e.offsetY - 10) + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add the ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Dynamic background color changing
let colorIndex = 0;
const colors = [
    'linear-gradient(135deg, #87CEEB 0%, #98FB98 100%)',
    'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
    'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
    'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
    'linear-gradient(135deg, #00cec9 0%, #55efc4 100%)'
];

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const clouds = document.querySelectorAll('.cloud');
    
    clouds.forEach((cloud, index) => {
        const speed = 0.5 + (index * 0.1);
        cloud.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add sparkle effects on character hover
document.querySelectorAll('.character-image').forEach(image => {
    image.addEventListener('mouseenter', function() {
        createSparkles(this);
    });
});

function createSparkles(element) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = `sparkle 1s ease-out forwards`;
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent += `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Mobile menu toggle (for future mobile optimization)
let mobileMenuOpen = false;
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu button if screen is small
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav');
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '🍔';
        menuButton.style.background = 'none';
        menuButton.style.border = 'none';
        menuButton.style.fontSize = '2rem';
        menuButton.style.color = 'white';
        menuButton.style.cursor = 'pointer';
        
        nav.appendChild(menuButton);
        
        menuButton.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (mobileMenuOpen) {
                navLinks.style.display = 'none';
                mobileMenuOpen = false;
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(0,0,0,0.9)';
                navLinks.style.padding = '20px';
                mobileMenuOpen = true;
            }
        });
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code for special animation
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger special celebration animation
        document.body.style.animation = 'rainbow 0.5s linear infinite';
        
        // Create confetti effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.innerHTML = ['🎉', '🎊', '🌟', '✨', '🦆', '🐕'][Math.floor(Math.random() * 6)];
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-50px';
                confetti.style.fontSize = '2rem';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 5000);
            }, i * 100);
        }
        
        setTimeout(() => {
            document.body.style.animation = '';
            konamiCode = [];
        }, 5000);
    }
});

// Add fall animation for confetti
const confettiStyle = document.createElement('style');
confettiStyle.textContent += `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Performance optimization: Lazy loading for animations
const lazyAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    rootMargin: '50px'
});

// Observe elements that should animate on scroll
document.querySelectorAll('.hero-content, .section-title').forEach(el => {
    lazyAnimationObserver.observe(el);
});

console.log('🎮 Hunt Pup Tail website loaded! Try the Konami Code for a surprise! 🦆🐕');