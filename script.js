document.addEventListener('DOMContentLoaded', () => {
            // Smooth Scroll for Navigation
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const offsetPosition = targetElement.offsetTop - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                });
            });

            // Navbar Scroll Effect
            window.addEventListener('scroll', () => {
                const nav = document.querySelector('nav');
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });

            // Intersection Observer for Scroll Animations
            const elements = document.querySelectorAll('.hero-image, .profile-name, .hero-content h1, .hero-content p, .social-links, .section-title, .project-card, .skill-card, footer p');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // observer.unobserve(entry.target); // Uncomment to play animation only once
                    }
                });
            }, { threshold: 0.1 });

            elements.forEach(element => {
                observer.observe(element);
            });

            // Scroll Buttons Functionality
            const scrollButtons = document.querySelectorAll('.scroll-button');
            scrollButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetClass = button.getAttribute('data-target');
                    const grid = document.querySelector(`.${targetClass}`);
                    const isLeft = button.classList.contains('left');
                    const cardWidth = targetClass === 'skills-grid' ? 75 : 280; // Card width
                    const gap = targetClass === 'skills-grid' ? 15 : 20; // Gap between cards
                    const scrollAmount = cardWidth + gap;
                    const scrollOptions = {
                        left: isLeft ? -scrollAmount : scrollAmount,
                        behavior: 'smooth'
                    };
                    grid.scrollBy(scrollOptions);
                });
            });

            // Update Button States
            const updateButtonStates = () => {
                const grids = [
                    { grid: document.querySelector('.skills-grid'), leftBtn: document.querySelector('.scroll-button.left[data-target="skills-grid"]'), rightBtn: document.querySelector('.scroll-button.right[data-target="skills-grid"]') },
                    { grid: document.querySelector('.project-grid'), leftBtn: document.querySelector('.scroll-button.left[data-target="project-grid"]'), rightBtn: document.querySelector('.scroll-button.right[data-target="project-grid"]') }
                ];

                grids.forEach(({ grid, leftBtn, rightBtn }) => {
                    if (!grid || !leftBtn || !rightBtn) return;
                    const maxScroll = grid.scrollWidth - grid.clientWidth;
                    leftBtn.disabled = grid.scrollLeft <= 0;
                    rightBtn.disabled = grid.scrollLeft >= maxScroll - 1; // Small buffer for rounding
                });
            };

            const grids = document.querySelectorAll('.skills-grid, .project-grid');
            grids.forEach(grid => {
                grid.scrollLeft = 0; 
                grid.addEventListener('scroll', updateButtonStates);
            });

            updateButtonStates();
        });
