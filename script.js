document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dark Mode Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // 2. Typewriter Effect
    const textElement = document.getElementById('typewriter');
    const words = ["Data Analyst", "Python Developer", "Software Engineer", "Tech Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type(); // Start the loop

    // 3. Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // 4. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
    // 5. Auto-Rotating Carousel
    const carousel = document.getElementById('certCarousel');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    const carouselWrapper = document.querySelector('.cert-carousel-wrapper');

    // Scroll settings
    const scrollAmount = 320; // Width of card + gap
    const autoScrollDelay = 3000; // 3 seconds
    let autoScrollTimer;

    // Function to scroll right automatically
    const autoScroll = () => {
        // Check if we are near the end
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        // If we are at the end, scroll back to start
        if (carousel.scrollLeft >= maxScroll - 10) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Otherwise, scroll right
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Start the timer
    autoScrollTimer = setInterval(autoScroll, autoScrollDelay);

    // PAUSE on hover (so users can read)
    carouselWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoScrollTimer);
    });

    // RESUME on mouse leave
    carouselWrapper.addEventListener('mouseleave', () => {
        autoScrollTimer = setInterval(autoScroll, autoScrollDelay);
    });

    // Manual Buttons (keep these working)
    scrollLeftBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        // Reset timer to avoid immediate auto-scroll after click
        clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(autoScroll, autoScrollDelay);
    });

    scrollRightBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        // Reset timer
        clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(autoScroll, autoScrollDelay);
    });
 
});