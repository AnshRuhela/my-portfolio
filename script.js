// Smooth Scroll
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