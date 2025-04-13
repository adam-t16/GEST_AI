// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    });
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks?.classList.remove('active');
            menuToggle?.classList.remove('active');
        }
    });
});

// Service Modal Functionality
const serviceDetails = {
    'IA Finances': {
        title: 'IA Finances',
        description: `Notre solution IA Finances révolutionne la gestion financière de votre entreprise. 
        Grâce à des algorithmes avancés, nous automatisons le suivi de vos revenus et dépenses, 
        générons des prévisions budgétaires précises, et vous alertons des tendances importantes.`,
        features: [
            'Analyse en temps réel des flux financiers',
            'Prévisions budgétaires basées sur l’IA',
            'Détection automatique des anomalies',
            'Rapports personnalisés et tableaux de bord',
            'Intégration avec vos outils existants'
        ],
        price: '299 DH/mois'
    },
    'IA RH': {
        title: 'IA RH',
        description: `Optimisez la gestion de vos ressources humaines avec notre solution IA RH. 
        Notre système intelligent facilite le recrutement, l'évaluation et le suivi de vos employés, 
        tout en améliorant l'engagement et la satisfaction au travail.`,
        features: [
            'Analyse prédictive des besoins en recrutement',
            'Évaluation objective des candidatures',
            'Suivi automatisé des performances',
            'Analyse du climat social',
            'Gestion intelligente des congés et absences'
        ],
        price: '249 DH/mois'
    },
    'IA Business Flow': {
        title: 'IA Business Flow',
        description: `Automatisez et optimisez vos processus d'entreprise avec IA Business Flow. 
        Notre solution identifie les goulots d'étranglement, suggère des améliorations 
        et automatise les tâches répétitives pour une efficacité maximale.`,
        features: [
            'Cartographie intelligente des processus',
            'Automatisation des tâches répétitives',
            'Optimisation continue des workflows',
            'Analyses prédictives des performances',
            'Intégration multi-services'
        ],
        price: '399 DH/mois'
    },
    'Pack Entreprise': {
        title: 'Pack Entreprise',
        description: `Notre offre la plus complète pour une transformation digitale totale. 
        Le Pack Entreprise combine toutes nos solutions IA avec un support dédié 
        et une personnalisation avancée selon vos besoins spécifiques.`,
        features: [
            'Accès à toutes les fonctionnalités IA',
            'Support prioritaire 24/7',
            'Personnalisation sur mesure',
            'Formation et accompagnement',
            'Analyses et rapports avancés'
        ],
        price: '799 DH/mois'
    }
};

document.querySelectorAll('.service-cta').forEach(button => {
    button.addEventListener('click', () => {
        const serviceCard = button.closest('.service-card');
        const serviceTitle = serviceCard.querySelector('h3')?.textContent.trim();
        const details = serviceDetails[serviceTitle];
        if (details) showServiceModal(details);
    });
});

function showServiceModal(details) {
    const modal = document.createElement('div');
    modal.className = 'service-modal';

    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${details.title}</h2>
            <p class="modal-price">${details.price}</p>
            <p class="modal-description">${details.description}</p>
            <h3>Fonctionnalités principales:</h3>
            <ul>
                ${details.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="modal-cta">Commencer maintenant</button>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = ''; // ✅ Fix: restore scroll
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = ''; // ✅ Fix: restore scroll
        }
    });

    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        let isValid = true;

        if (name.value.trim() === '') {
            showError(name, 'Le nom est requis');
            isValid = false;
        } else removeError(name);

        if (email.value.trim() === '') {
            showError(email, 'L\'email est requis');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Email invalide');
            isValid = false;
        } else removeError(email);

        if (message.value.trim() === '') {
            showError(message, 'Le message est requis');
            isValid = false;
        } else removeError(message);

        if (isValid) {
            alert('Message envoyé avec succès!');
            contactForm.reset();
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    let error = formGroup.querySelector('.error-message');
    if (!error) {
        error = document.createElement('div');
        error.className = 'error-message';
        formGroup.appendChild(error);
    }
    error.textContent = message;
    error.style.color = '#e53e3e';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    input.style.borderColor = '#e53e3e';
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) formGroup.removeChild(error);
    input.style.borderColor = '';
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Chatbot functionality
const predefinedQuestions = [
    {
        question: "Quels sont vos services?",
        answer: "Nous proposons des solutions d'IA pour la finance, les RH, et l'optimisation des processus d'entreprise."
    },
    {
        question: "Comment démarrer avec vos services?",
        answer: "Vous pouvez commencer en cliquant sur 'Demander une démo' pour planifier une consultation gratuite."
    },
    {
        question: "Quels sont vos tarifs?",
        answer: "Nos tarifs commencent à 249 DH/mois. Nous proposons différents forfaits adaptés à vos besoins."
    },
    {
        question: "Puis-je essayer gratuitement?",
        answer: "Oui! Nous offrons une démo gratuite pour vous permettre de tester nos services."
    }
];

function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotQuestions = document.querySelector('.chatbot-questions');

    chatbotToggle?.addEventListener('click', () => {
        chatbotContainer?.classList.toggle('active');
        if (chatbotContainer?.classList.contains('active')) {
            showQuestions();
        }
    });

    chatbotClose?.addEventListener('click', () => {
        chatbotContainer?.classList.remove('active');
    });

    function showQuestions() {
        chatbotQuestions.innerHTML = '';
        predefinedQuestions.forEach(item => {
            const button = document.createElement('button');
            button.className = 'chatbot-question-btn';
            button.textContent = item.question;
            button.addEventListener('click', () => showAnswer(item));
            chatbotQuestions.appendChild(button);
        });
    }

    function showAnswer(item) {
        const userMessage = document.createElement('div');
        userMessage.className = 'chatbot-message user';
        userMessage.textContent = item.question;
        chatbotMessages.appendChild(userMessage);

        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot';
            botMessage.textContent = item.answer;
            chatbotMessages.appendChild(botMessage);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 500);
    }
}

initChatbot();
