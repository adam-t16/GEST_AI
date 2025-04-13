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
  
  export function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotQuestions = document.querySelector('.chatbot-questions');
  
    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
      chatbotContainer.classList.toggle('active');
      if (chatbotContainer.classList.contains('active')) {
        showQuestions();
      }
    });
  
    // Close chatbot
    chatbotClose.addEventListener('click', () => {
      chatbotContainer.classList.remove('active');
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
      // Add user question
      const userMessage = document.createElement('div');
      userMessage.className = 'chatbot-message user';
      userMessage.textContent = item.question;
      chatbotMessages.appendChild(userMessage);
  
      // Add bot answer with typing animation
      setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot';
        botMessage.textContent = item.answer;
        chatbotMessages.appendChild(botMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 500);
    }
  }