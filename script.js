const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// Theme toggle functionality
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.85) {
            element.style.animationPlayState = 'running';
        }
    });
};
animateOnScroll();
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Skill bars functionality
document.querySelectorAll('.skill-item').forEach(item => {
    const decreaseBtn = item.querySelector('.skill-decrease');
    const increaseBtn = item.querySelector('.skill-increase');
    const valueDisplay = item.querySelector('.skill-value');
    const progressBar = item.querySelector('.skill-level');
    const slider = item.querySelector('.skill-slider');
    let value = parseInt(valueDisplay.textContent);
    function updateSkill() {
        valueDisplay.textContent = value + '%';
        progressBar.style.width = value + '%';
        slider.value = value;
        let colorRange;
        if (value <= 30) colorRange = '0-30';
        else if (value <= 60) colorRange = '31-60';
        else if (value <= 80) colorRange = '61-80';
        else colorRange = '81-100';
        progressBar.setAttribute('data-value', colorRange);
    }
    decreaseBtn.addEventListener('click', () => {
        if (value > 0) {
            value--;
            updateSkill();
        }
    });
    increaseBtn.addEventListener('click', () => {
        if (value < 100) {
            value++;
            updateSkill();
        }
    });
    slider.addEventListener('input', () => {
        value = parseInt(slider.value);
        updateSkill();
    });
    updateSkill();
});