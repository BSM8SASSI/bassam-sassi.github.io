/* ============================================
   Bassam Sassi - Portfolio Website
   JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Scroll Animations (Fade In)
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                animateCounter(entry.target, target, suffix);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(num => counterObserver.observe(num));

    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }

    // Gallery Lightbox (Simple)
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-overlay"></div>
                    <img src="${img.src}" alt="${img.alt}" class="lightbox-img">
                    <button class="lightbox-close">&times;</button>
                `;

                // Add lightbox styles
                const style = document.createElement('style');
                style.textContent = `
                    .lightbox {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 9999;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .lightbox-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(10, 10, 15, 0.95);
                        cursor: pointer;
                    }
                    .lightbox-img {
                        position: relative;
                        max-width: 90%;
                        max-height: 90vh;
                        object-fit: contain;
                        border-radius: 8px;
                        z-index: 1;
                        animation: fadeInUp 0.3s ease;
                    }
                    .lightbox-close {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: none;
                        border: none;
                        color: #fff;
                        font-size: 2.5rem;
                        cursor: pointer;
                        z-index: 2;
                        transition: color 0.3s;
                    }
                    .lightbox-close:hover {
                        color: var(--accent-cyan, #00d4ff);
                    }
                `;
                document.head.appendChild(style);
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';

                // Close lightbox
                const closeLightbox = () => {
                    lightbox.remove();
                    style.remove();
                    document.body.style.overflow = '';
                };

                lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
                lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') closeLightbox();
                }, { once: true });
            }
        });
    });

    // Typing Effect for Hero (Optional)
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        let index = 0;

        function type() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }

        setTimeout(type, 1000);
    }

    // Parallax Effect for Hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            hero.style.backgroundPositionY = rate + 'px';
        });
    }

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Console Easter Egg
    console.log('%c Bassam Sassi ', 'background: linear-gradient(135deg, #00d4ff, #ff6b35); color: #0a0a0f; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Underwater Robotics Engineer | Mechatronics Specialist ', 'color: #00d4ff; font-size: 14px;');
    console.log('%c DeepLook ROV Project ', 'color: #ff6b35; font-size: 12px;');
});
