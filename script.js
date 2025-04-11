// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
}
// Service details content
const serviceDetails = {
    finance: {
        title: "IA Finances - Détails du Service",
        content: `
            <div class="service-details">
                <h3>Transformez votre gestion financière</h3>
                <p>Notre solution IA Finances révolutionne la gestion financière de votre entreprise avec des fonctionnalités avancées :</p>
                <ul>
                    <li>Analyse prédictive des flux de trésorerie</li>
                    <li>Détection automatique des anomalies financières</li>
                    <li>Tableaux de bord personnalisables en temps réel</li>
                    <li>Recommandations d'optimisation budgétaire</li>
                    <li>Intégration avec vos outils comptables existants</li>
                </ul>
                <p class="price">299 DH/mois</p>
            </div>
        `
    },
    hr: {
        title: "IA RH - Détails du Service",
        content: `
            <div class="service-details">
                <h3>Optimisez votre gestion RH</h3>
                <p>Notre solution IA RH simplifie et améliore tous vos processus RH :</p>
                <ul>
                    <li>Analyse prédictive des besoins en recrutement</li>
                    <li>Évaluation automatisée des candidatures</li>
                    <li>Suivi personnalisé du développement des employés</li>
                    <li>Analyse du climat social en temps réel</li>
                    <li>Gestion intelligente des congés et absences</li>
                </ul>
                <p class="price">249 DH/mois</p>
            </div>
        `
    },
    flow: {
        title: "IA Business Flow - Détails du Service",
        content: `
            <div class="service-details">
                <h3>Automatisez vos processus métier</h3>
                <p>Optimisez l'ensemble de vos opérations avec IA Business Flow :</p>
                <ul>
                    <li>Automatisation intelligente des tâches répétitives</li>
                    <li>Optimisation des processus basée sur l'IA</li>
                    <li>Analyse prédictive des goulots d'étranglement</li>
                    <li>Tableaux de bord de performance en temps réel</li>
                    <li>Intégration avec vos outils existants</li>
                </ul>
                <p class="price">399 DH/mois</p>
            </div>
        `
    },
    enterprise: {
        title: "Pack Entreprise - Détails du Service",
        content: `
            <div class="service-details">
                <h3>Solution complète pour votre entreprise</h3>
                <p>Notre pack entreprise offre une solution complète et intégrée :</p>
                <ul>
                    <li>Accès à toutes nos solutions IA</li>
                    <li>Support dédié 24/7</li>
                    <li>Personnalisation avancée selon vos besoins</li>
                    <li>Formation complète de vos équipes</li>
                    <li>Tableau de bord unifié pour toutes les solutions</li>
                </ul>
                <p class="price">799 DH/mois</p>
            </div>
        `
    }
};

// Modal functionality
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

// Service details modal
document.querySelectorAll('.service-cta').forEach(button => {
    button.addEventListener('click', () => {
        const service = button.getAttribute('data-service');
        const details = serviceDetails[service];
        
        document.getElementById('modalTitle').textContent = details.title;
        document.getElementById('modalContent').innerHTML = details.content;
        showModal('serviceDetailsModal');
    });
});

// Close buttons
document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        hideModal(modal.id);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target.id);
    }
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Votre message a été envoyé avec succès! Nous vous contacterons bientôt.');
    e.target.reset();
});

// Demo form submission
document.getElementById('demoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Votre demande de démo a été envoyée avec succès! Nous vous contacterons bientôt.');
    e.target.reset();
    hideModal('demoFormModal');
});

// Smooth scroll for navigation links
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
// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Simple validation
    if (name.value.trim() === '') {
        showError(name, 'Le nom est requis');
        isValid = false;
    } else {
        removeError(name);
    }
    
    if (email.value.trim() === '') {
        showError(email, 'L\'email est requis');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Email invalide');
        isValid = false;
    } else {
        removeError(email);
    }
    
    if (message.value.trim() === '') {
        showError(message, 'Le message est requis');
        isValid = false;
    } else {
        removeError(message);
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Message envoyé avec succès!');
        contactForm.reset();
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#e53e3e';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.style.borderColor = '#e53e3e';
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        formGroup.removeChild(error);
    }
    input.style.borderColor = '';
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
