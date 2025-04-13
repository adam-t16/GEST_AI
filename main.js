import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { initChatbot } from './chatbot.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>

  <!-- Chatbot Widget -->
  <div class="chatbot-widget">
    <button class="chatbot-toggle">
      <span class="chatbot-toggle-icon">💬</span>
    </button>
    <div class="chatbot-container">
      <div class="chatbot-header">
        <h3>Comment puis-je vous aider?</h3>
        <button class="chatbot-close">×</button>
      </div>
      <div class="chatbot-messages"></div>
      <div class="chatbot-questions"></div>
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))
initChatbot()