/* ═══════════════════════════════════════════════════════════
   CONVOY CHAT — Custom Premium Chatbot Widget
   Self-contained: HTML + CSS + JS in one file
   Connects to n8n webhook for AI responses
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── CONFIG ──────────────────────────────────────────────── */
  const CONFIG = {
    webhookUrl: 'https://n8n.srv1388391.hstgr.cloud/webhook/2fc1b31f-89bc-4152-b20a-2fe03fdb36ee/chat',
    companyName: 'Convoy Truck Repair',
    logoUrl: 'duck-crop.png',
    welcomeMessage: 'Hey there! Need help with truck repair, a quote, or scheduling service? Ask me anything.',
    placeholderText: 'Type your message...',
    primaryColor: '#F5A623',
    primaryGlow: 'rgba(245,166,35,0.3)',
    bgDark: '#0A0A0A',
    bgPanel: '#111111',
    bgCard: '#1A1A1A',
    border: '#2A2A2A',
    borderLight: '#3A3A3A',
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    fontBody: "'Inter', sans-serif",
    fontHeading: "'Barlow Condensed', sans-serif",
    borderRadius: '8px',
    windowWidth: '400px',
    windowHeight: '580px',
  };

  /* ── SESSION ID (persists per tab) ───────────────────────── */
  let sessionId = sessionStorage.getItem('convoy-chat-session');
  if (!sessionId) {
    sessionId = crypto.randomUUID ? crypto.randomUUID() : 'sess-' + Math.random().toString(36).slice(2);
    sessionStorage.setItem('convoy-chat-session', sessionId);
  }

  /* ── INJECT STYLES ───────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* === CONVOY CHAT WIDGET === */
    #convoy-chat *,#convoy-chat *::before,#convoy-chat *::after{box-sizing:border-box;margin:0;padding:0}

    /* Toggle button */
    #convoy-chat-toggle{
      position:fixed;bottom:24px;right:24px;z-index:9980;
      width:60px;height:60px;border-radius:8px;border:2px solid ${CONFIG.primaryColor};cursor:pointer;
      background:${CONFIG.primaryColor};
      box-shadow:0 4px 24px ${CONFIG.primaryGlow}, 0 0 0 0 ${CONFIG.primaryGlow};
      transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
      display:flex;align-items:center;justify-content:center;
      animation:convoy-pulse 3s ease-in-out infinite;
      overflow:hidden;
    }
    #convoy-chat-toggle::before{
      content:'';position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
      transform:translateX(-100%);transition:transform 0.5s;
    }
    #convoy-chat-toggle:hover::before{transform:translateX(100%)}
    #convoy-chat-toggle:hover{
      transform:scale(1.08);
      box-shadow:0 0 30px ${CONFIG.primaryGlow};
    }
    #convoy-chat-toggle svg{width:28px;height:28px;fill:${CONFIG.bgDark};transition:transform 0.3s;position:relative;z-index:1}
    #convoy-chat-toggle.open svg{transform:rotate(90deg)}
    @keyframes convoy-pulse{
      0%,100%{box-shadow:0 4px 24px ${CONFIG.primaryGlow}, 0 0 0 0 ${CONFIG.primaryGlow}}
      50%{box-shadow:0 4px 24px ${CONFIG.primaryGlow}, 0 0 0 8px rgba(245,166,35,0)}
    }

    /* Chat window */
    #convoy-chat-window{
      position:fixed;bottom:96px;right:24px;z-index:9981;
      width:${CONFIG.windowWidth};height:${CONFIG.windowHeight};max-height:calc(100vh - 120px);
      background:${CONFIG.bgPanel};
      border:1px solid ${CONFIG.border};
      border-radius:${CONFIG.borderRadius};
      box-shadow:0 24px 80px rgba(0,0,0,0.5), 0 0 30px ${CONFIG.primaryGlow};
      display:flex;flex-direction:column;
      opacity:0;visibility:hidden;
      transform:translateY(16px) scale(0.96);
      transition:all 0.35s cubic-bezier(0.16,1,0.3,1);
      overflow:hidden;
      font-family:${CONFIG.fontBody};
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }
    #convoy-chat-window.visible{
      opacity:1;visibility:visible;
      transform:translateY(0) scale(1);
    }

    /* Header */
    .convoy-chat-header{
      display:flex;align-items:center;gap:12px;
      padding:16px 18px;
      background:${CONFIG.bgDark};
      border-bottom:1px solid ${CONFIG.border};
      border-top:2px solid ${CONFIG.primaryColor};
      flex-shrink:0;
    }
    .convoy-chat-header-logo{
      width:36px;height:36px;border-radius:8px;object-fit:cover;
      border:2px solid ${CONFIG.primaryColor};
      box-shadow:0 0 12px ${CONFIG.primaryGlow};
    }
    .convoy-chat-header-info{display:flex;flex-direction:column}
    .convoy-chat-header-name{
      font-family:${CONFIG.fontHeading};
      font-size:16px;font-weight:700;letter-spacing:1px;
      color:${CONFIG.textPrimary};text-transform:uppercase;
    }
    .convoy-chat-header-status{
      font-size:11px;color:${CONFIG.primaryColor};
      display:flex;align-items:center;gap:5px;
    }
    .convoy-chat-header-status::before{
      content:'';width:6px;height:6px;border-radius:50%;
      background:#22c55e;
      box-shadow:0 0 6px rgba(34,197,94,0.6);
    }
    .convoy-chat-close{
      margin-left:auto;background:none;border:1px solid transparent;cursor:pointer;
      color:${CONFIG.textSecondary};transition:all 0.25s;
      display:flex;align-items:center;justify-content:center;
      width:32px;height:32px;border-radius:4px;
    }
    .convoy-chat-close:hover{color:${CONFIG.primaryColor};background:${CONFIG.bgCard};border-color:${CONFIG.border}}
    .convoy-chat-close svg{width:18px;height:18px}

    /* Messages area */
    .convoy-chat-messages{
      flex:1;overflow-y:auto;padding:16px 18px;
      display:flex;flex-direction:column;gap:12px;
      scrollbar-width:thin;
      scrollbar-color:${CONFIG.border} transparent;
    }
    .convoy-chat-messages::-webkit-scrollbar{width:5px}
    .convoy-chat-messages::-webkit-scrollbar-track{background:transparent}
    .convoy-chat-messages::-webkit-scrollbar-thumb{background:${CONFIG.border};border-radius:4px}
    .convoy-chat-messages::-webkit-scrollbar-thumb:hover{background:${CONFIG.primaryColor}}

    /* Message bubbles */
    .convoy-msg{
      max-width:82%;padding:12px 16px;
      font-size:14px;line-height:1.65;
      animation:convoy-msg-in 0.3s cubic-bezier(0.16,1,0.3,1);
      word-wrap:break-word;
    }
    @keyframes convoy-msg-in{
      from{opacity:0;transform:translateY(8px)}
      to{opacity:1;transform:translateY(0)}
    }
    .convoy-msg.bot{
      align-self:flex-start;
      background:${CONFIG.bgCard};
      color:${CONFIG.textSecondary};
      border:1px solid ${CONFIG.border};
      border-radius:2px 8px 8px 8px;
    }
    .convoy-msg.user{
      align-self:flex-end;
      background:${CONFIG.primaryColor};
      color:${CONFIG.bgDark};
      border-radius:8px 2px 8px 8px;
      font-weight:500;
    }
    .convoy-msg.bot a{color:${CONFIG.primaryColor};text-decoration:underline;text-underline-offset:2px}

    /* Welcome message */
    .convoy-welcome{
      display:flex;flex-direction:column;align-items:center;
      text-align:center;padding:20px 12px 8px;gap:10px;
    }
    .convoy-welcome-icon{
      width:48px;height:48px;border-radius:8px;
      background:${CONFIG.bgCard};border:1px solid ${CONFIG.border};
      display:flex;align-items:center;justify-content:center;
    }
    .convoy-welcome-icon img{width:32px;height:32px;border-radius:4px}
    .convoy-welcome-text{font-size:14px;line-height:1.65;color:${CONFIG.textSecondary};max-width:90%}

    /* Typing indicator */
    .convoy-typing{
      display:flex;align-items:center;gap:4px;
      align-self:flex-start;
      padding:14px 20px;
      background:${CONFIG.bgCard};
      border:1px solid ${CONFIG.border};
      border-radius:2px 8px 8px 8px;
    }
    .convoy-typing span{
      width:7px;height:7px;border-radius:50%;
      background:${CONFIG.textSecondary};
      animation:convoy-dot 1.4s ease-in-out infinite;
    }
    .convoy-typing span:nth-child(2){animation-delay:0.15s}
    .convoy-typing span:nth-child(3){animation-delay:0.3s}
    @keyframes convoy-dot{
      0%,60%,100%{transform:translateY(0);opacity:0.4}
      30%{transform:translateY(-6px);opacity:1;background:${CONFIG.primaryColor}}
    }

    /* Input area */
    .convoy-chat-input{
      display:flex;align-items:flex-end;gap:8px;
      padding:12px 16px;
      border-top:1px solid ${CONFIG.border};
      background:${CONFIG.bgDark};
      flex-shrink:0;
    }
    .convoy-chat-input textarea{
      flex:1;resize:none;border:none;outline:none;
      background:${CONFIG.bgCard};
      color:${CONFIG.textPrimary};
      font-family:${CONFIG.fontBody};
      font-size:14px;line-height:1.5;
      padding:10px 14px;
      border-radius:4px;
      border:1px solid ${CONFIG.border};
      max-height:100px;
      transition:border-color 0.2s, box-shadow 0.2s;
    }
    .convoy-chat-input textarea::placeholder{color:${CONFIG.textSecondary};opacity:0.6}
    .convoy-chat-input textarea:focus{
      border-color:${CONFIG.primaryColor};
      box-shadow:0 0 12px ${CONFIG.primaryGlow};
    }
    .convoy-chat-send{
      width:40px;height:40px;border-radius:4px;border:2px solid ${CONFIG.primaryColor};cursor:pointer;
      background:${CONFIG.primaryColor};
      display:flex;align-items:center;justify-content:center;
      transition:all 0.25s;flex-shrink:0;
      position:relative;overflow:hidden;
    }
    .convoy-chat-send::before{
      content:'';position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
      transform:translateX(-100%);transition:transform 0.5s;
    }
    .convoy-chat-send:hover::before{transform:translateX(100%)}
    .convoy-chat-send:hover{
      background:${CONFIG.textPrimary};
      box-shadow:0 0 30px ${CONFIG.primaryGlow};
    }
    .convoy-chat-send:disabled{opacity:0.4;cursor:not-allowed}
    .convoy-chat-send svg{width:18px;height:18px;fill:${CONFIG.bgDark}}

    /* Quick actions */
    .convoy-quick-actions{
      display:flex;flex-wrap:wrap;gap:6px;
      padding:0 18px 12px;
    }
    .convoy-quick-btn{
      background:${CONFIG.bgCard};color:${CONFIG.textSecondary};
      border:1px solid ${CONFIG.border};border-radius:4px;
      padding:6px 14px;font-size:12px;
      font-family:${CONFIG.fontHeading};font-weight:600;
      text-transform:uppercase;letter-spacing:0.5px;
      cursor:pointer;transition:all 0.25s;white-space:nowrap;
    }
    .convoy-quick-btn:hover{
      border-color:${CONFIG.primaryColor};color:${CONFIG.primaryColor};
      transform:translateY(-2px);
      box-shadow:0 4px 20px ${CONFIG.primaryGlow};
    }

    /* Powered by footer */
    .convoy-chat-footer{
      text-align:center;padding:6px;font-size:10px;
      font-family:${CONFIG.fontHeading};
      text-transform:uppercase;letter-spacing:1px;
      color:${CONFIG.textSecondary};opacity:0.4;
      border-top:1px solid ${CONFIG.border};
      background:${CONFIG.bgDark};flex-shrink:0;
    }

    /* Match site's custom cursor behavior */
    #convoy-chat button{cursor:none}
    @media(max-width:768px){#convoy-chat button{cursor:pointer}}

    /* Respect reduced motion preference */
    @media(prefers-reduced-motion:reduce){
      #convoy-chat-toggle{animation:none!important}
      #convoy-chat-window{transition:opacity 0.2s!important;transform:none!important}
      .convoy-msg{animation:none!important}
      .convoy-typing span{animation:none!important;opacity:0.6}
    }

    /* Mobile responsive — clear the fixed mobile CTA bar (56px) */
    @media(max-width:768px){
      #convoy-chat-toggle{bottom:72px;right:16px;width:54px;height:54px;border-radius:8px}
      #convoy-chat-window{
        bottom:56px;right:0;left:0;
        width:100%;height:calc(100vh - 56px);max-height:calc(100vh - 56px);
        border-radius:8px 8px 0 0;
      }
    }
  `;
  document.head.appendChild(style);

  /* ── BUILD DOM ───────────────────────────────────────────── */
  const root = document.createElement('div');
  root.id = 'convoy-chat';
  root.innerHTML = `
    <!-- Toggle Button -->
    <button id="convoy-chat-toggle" aria-label="Open chat">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
        <path d="M7 9h10v2H7zm0-3h10v2H7z"/>
      </svg>
    </button>

    <!-- Chat Window -->
    <div id="convoy-chat-window">
      <div class="convoy-chat-header">
        <img src="${CONFIG.logoUrl}" alt="${CONFIG.companyName}" class="convoy-chat-header-logo" />
        <div class="convoy-chat-header-info">
          <span class="convoy-chat-header-name">${CONFIG.companyName}</span>
          <span class="convoy-chat-header-status">Online</span>
        </div>
        <button class="convoy-chat-close" aria-label="Close chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="convoy-chat-messages" id="convoy-chat-messages">
        <div class="convoy-welcome">
          <div class="convoy-welcome-icon"><img src="${CONFIG.logoUrl}" alt="Logo" /></div>
          <div class="convoy-welcome-text">${CONFIG.welcomeMessage}</div>
        </div>
      </div>

      <div class="convoy-quick-actions" id="convoy-quick-actions">
        <button class="convoy-quick-btn" data-msg="What services do you offer?">Services</button>
        <button class="convoy-quick-btn" data-msg="I need a quote for truck repair">Get a Quote</button>
        <button class="convoy-quick-btn" data-msg="What are your business hours?">Hours</button>
        <button class="convoy-quick-btn" data-msg="I need roadside assistance now">Roadside Help</button>
      </div>

      <div class="convoy-chat-input">
        <textarea id="convoy-chat-textarea" rows="1" placeholder="${CONFIG.placeholderText}"></textarea>
        <button class="convoy-chat-send" id="convoy-chat-send" aria-label="Send message">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>

      <div class="convoy-chat-footer">Powered by Convoy AI</div>
    </div>
  `;
  document.body.appendChild(root);

  /* ── ELEMENTS ────────────────────────────────────────────── */
  const toggle = document.getElementById('convoy-chat-toggle');
  const chatWindow = document.getElementById('convoy-chat-window');
  const messagesEl = document.getElementById('convoy-chat-messages');
  const textarea = document.getElementById('convoy-chat-textarea');
  const sendBtn = document.getElementById('convoy-chat-send');
  const quickActions = document.getElementById('convoy-quick-actions');
  const closeBtn = root.querySelector('.convoy-chat-close');

  let isOpen = false;
  let isLoading = false;

  /* ── TOGGLE OPEN / CLOSE ────────────────────────────────── */
  function openChat() {
    isOpen = true;
    chatWindow.classList.add('visible');
    toggle.classList.add('open');
    toggle.style.animation = 'none';
    setTimeout(() => textarea.focus(), 350);
  }
  function closeChat() {
    isOpen = false;
    chatWindow.classList.remove('visible');
    toggle.classList.remove('open');
  }

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  /* ── AUTO-RESIZE TEXTAREA ────────────────────────────────── */
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
  });

  /* ── SCROLL TO BOTTOM ────────────────────────────────────── */
  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  /* ── ADD MESSAGE BUBBLE ──────────────────────────────────── */
  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = 'convoy-msg ' + sender;
    div.textContent = text;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  /* ── TYPING INDICATOR ────────────────────────────────────── */
  function showTyping() {
    const el = document.createElement('div');
    el.className = 'convoy-typing';
    el.id = 'convoy-typing-indicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    scrollToBottom();
  }
  function hideTyping() {
    const el = document.getElementById('convoy-typing-indicator');
    if (el) el.remove();
  }

  /* ── SEND MESSAGE TO N8N WEBHOOK ─────────────────────────── */
  async function sendMessage(text) {
    if (!text.trim() || isLoading) return;

    // Hide quick actions after first message
    if (quickActions) quickActions.style.display = 'none';

    addMessage(text.trim(), 'user');
    textarea.value = '';
    textarea.style.height = 'auto';

    isLoading = true;
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch(CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text.trim(),
          sessionId: sessionId,
        }),
      });

      if (!res.ok) throw new Error('Network error');

      const data = await res.json();

      hideTyping();

      // n8n returns response in output field
      const reply = data.output || data.text || data.response || data.message || 'Sorry, I could not process that. Please try again.';
      addMessage(reply, 'bot');
    } catch (err) {
      hideTyping();
      addMessage('Connection error. Please try calling us at (708) 907-9770.', 'bot');
    } finally {
      isLoading = false;
      sendBtn.disabled = false;
      textarea.focus();
    }
  }

  /* ── EVENT LISTENERS ────────────────────────────────────── */
  sendBtn.addEventListener('click', () => sendMessage(textarea.value));

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(textarea.value);
    }
  });

  // Quick action buttons
  quickActions.addEventListener('click', (e) => {
    const btn = e.target.closest('.convoy-quick-btn');
    if (btn) sendMessage(btn.dataset.msg);
  });

})();
