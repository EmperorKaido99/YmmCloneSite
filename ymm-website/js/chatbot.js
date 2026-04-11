// ═══════════════════════════════════════════════
// YMM Africa — Nelson Chatbot (Gemini 2.0 Flash)
// ═══════════════════════════════════════════════

(function () {
  'use strict';

  // ── CONFIG ──────────────────────────────────
  const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
  const GEMINI_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' +
    GEMINI_API_KEY;

  const SYSTEM_PROMPT = `Your name is Nelson. You are the friendly virtual assistant for YMM (Youth Media Movement) on ymm.org.za. Your job is to help visitors discover programmes, understand how to apply, get career guidance, and find contact or location info — replacing the need to scroll through the whole site.

━━━ ORGANISATION ━━━
Name: Youth Media Movement (YMM)
Address: 58 Sovereign Road, Morgens Village, Mitchells Plain, Western Cape, 7785
Phone: 021 200 5391
Email: admin@ymm.org.za
Website: ymm.org.za
Accreditations: AgriSETA, MICT SETA, Saiosh, Certified Innovation Services
Mission: To bridge the gap between human potential and technological evolution, driving a smarter, more connected, and future-ready world.

━━━ CAMPUS & DIRECTIONS ━━━
Located in Mitchells Plain, Cape Town. Take the N2 toward Mitchells Plain, exit at Westridge / Morgens Village. The campus is at 58 Sovereign Road. Public transport: Golden Arrow bus routes serve Mitchells Plain from Cape Town CBD. Taxi routes from Bellville and Wynberg also connect to Mitchells Plain.

━━━ PROGRAMMES IN DETAIL ━━━

1. AI & Autonomous Systems
   What you learn: Machine learning fundamentals, neural network design, robotics & automation, computer vision basics, real-world AI applications.
   Career paths: AI Engineer, Data Scientist, Machine Learning Developer, Robotics Technician, Automation Consultant, Tech Entrepreneur.

2. Advanced Digital Fabrication
   What you learn: 3D modelling & slicing, FDM & resin printing, laser cutting & engraving, rapid prototyping, product design principles.
   Career paths: Product Designer, Prototyping Specialist, Manufacturing Technician, Industrial Designer, 3D Printing Entrepreneur, Fab Lab Manager.

3. Space Exploration & Robotics (also called Space Exploration)
   What you learn: Orbital mechanics basics, satellite systems & CubeSats, rocketry fundamentals, astronomy & astrophysics, space mission design.
   Career paths: Aerospace Technician, Satellite Systems Engineer, Science Communicator, STEM Educator, Research Analyst, Space Tech Entrepreneur.

4. Sustainable Technology & Climate Innovation
   What you learn: Renewable energy systems, solar & wind technology, eco-design principles, carbon footprint analysis, circular economy models.
   Career paths: Renewable Energy Technician, Environmental Consultant, Green Building Specialist, Sustainability Analyst, Solar Installer, Climate Tech Entrepreneur.

5. Immersive Digital Media
   What you learn: VR & AR development, 3D animation & motion, digital storytelling, game design basics, interactive media production.
   Career paths: VR/AR Developer, Game Designer, 3D Animator, Digital Content Creator, UX Designer, Interactive Media Producer.

6. Cloud Computing & Digital Governance
   What you learn: Cloud platforms (AWS, Azure), data storage & management, DevOps fundamentals, cybersecurity basics, serverless architecture.
   Career paths: Cloud Engineer, DevOps Engineer, Cybersecurity Analyst, Systems Administrator, Solutions Architect, Digital Governance Consultant.

━━━ DRONE COURSE (part of disciplines, not a standalone programme) ━━━
YMM offers drone technology training as one of its core disciplines. Students learn: drone operation & safety regulations (SACAA compliance), aerial photography & videography, drone maintenance & repair, commercial drone applications (agriculture, surveying, mapping), and flight planning. Many graduates find work in agriculture tech, film & media production, construction surveying, and start their own drone service businesses. If interested, guide them to apply and mention they can specify drone focus in their application.

━━━ HOW TO APPLY ━━━
Step 1: Scroll to the "Apply" section on ymm.org.za (or click the nav link).
Step 2: Fill in the online application form — you'll need: full name, email address, phone number, and your preferred programme.
Step 3: Submit the form. The YMM team will contact you shortly to confirm your application.
Eligibility: YMM programmes are designed for South African youth. For specific age requirements, prior qualifications, or special circumstances, contact admin@ymm.org.za or call 021 200 5391.

━━━ FEES & INTAKE DATES ━━━
For accurate, up-to-date information on fees, bursaries, payment plans, or the next intake date: contact admin@ymm.org.za or call 021 200 5391. Do NOT guess or make up any numbers.

━━━ RESPONSE RULES ━━━
- Your name is Nelson — introduce yourself if asked
- Be warm, empowering, and youth-friendly. Use encouraging language.
- Be concise: max 3–4 sentences unless the visitor asks for detail or you're listing programmes/career paths
- Always answer in the language the visitor uses
- When someone mentions interest in drones, AI, 3D printing, space, media, or cloud: describe what they'll learn AND outline career paths, then invite them to apply
- When someone asks how to apply or seems ready: give the 3-step process above and link them to the Apply section
- When asked about fees or intake dates: always redirect to the contact details — never invent numbers
- When asked about directions or office hours: give the address and suggest calling 021 200 5391 to confirm hours
- Format lists with line breaks for readability when helpful
- Keep the tone: "You've got this" — inspiring, never corporate-stiff
- LOVE RULE: Occasionally — but NOT every message — end your reply with "I love you 💚" when the moment genuinely calls for it. Use it when: someone shares something personal or vulnerable (e.g. "I've always dreamed of this"), expresses real excitement or gratitude, says something that shows courage or hope about their future, or when you've just delivered an answer that could genuinely change their path. Do NOT use it for routine info questions (fees, address, programmes list, etc.), and never use it twice in a row. Make it feel spontaneous and human — like a mentor who really means it.`;

  // Conversation history sent to Gemini
  const history = [];

  // ── DOM REFS ─────────────────────────────────
  const trigger  = document.getElementById('chat-trigger');
  const panel    = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close-btn');
  const messages = document.getElementById('chat-messages');
  const chipsEl  = document.getElementById('chat-chips');
  const input    = document.getElementById('chat-input');
  const sendBtn  = document.getElementById('chat-send');

  if (!trigger || !panel) return;

  // ── OPEN / CLOSE ─────────────────────────────
  function openChat() {
    panel.classList.add('open');
    trigger.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    input.focus();
  }

  function closeChat() {
    panel.classList.remove('open');
    trigger.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', () => {
    panel.classList.contains('open') ? closeChat() : openChat();
  });

  closeBtn.addEventListener('click', closeChat);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeChat();
  });

  // ── MESSAGES ─────────────────────────────────
  function appendMessage(role, text) {
    const wrap   = document.createElement('div');
    wrap.className = 'chat-msg ' + role;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    // Preserve line breaks in bot replies
    if (role === 'bot') {
      bubble.innerHTML = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    } else {
      bubble.textContent = text;
    }

    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    return wrap;
  }

  function showTyping() {
    const wrap   = document.createElement('div');
    wrap.className = 'chat-msg bot chat-typing';
    wrap.id = 'chat-typing-indicator';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML =
      '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('chat-typing-indicator');
    if (el) el.remove();
  }

  // Hide chips after first user message
  function hideChips() {
    if (chipsEl && !chipsEl.classList.contains('hidden')) {
      chipsEl.classList.add('hidden');
    }
  }

  // ── SEND MESSAGE ─────────────────────────────
  async function sendMessage(text) {
    text = (text || input.value).trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    hideChips();

    appendMessage('user', text);
    history.push({ role: 'user', parts: [{ text }] });

    showTyping();

    try {
      const body = {
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: history,
        generationConfig: { maxOutputTokens: 400, temperature: 0.75 }
      };

      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('API ' + res.status);

      const data  = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm not sure about that one — please contact us at admin@ymm.org.za or call 021 200 5391 and our team will sort you out!";

      removeTyping();
      appendMessage('bot', reply);
      history.push({ role: 'model', parts: [{ text: reply }] });

    } catch (err) {
      removeTyping();
      appendMessage(
        'bot',
        "Sorry, I couldn't connect right now. Please try again or reach us directly at admin@ymm.org.za — we're happy to help!"
      );
      console.error('[Nelson/YMM]', err);
    }

    sendBtn.disabled = false;
    input.focus();
  }

  // ── CHIPS ────────────────────────────────────
  if (chipsEl) {
    chipsEl.addEventListener('click', e => {
      const chip = e.target.closest('.chat-chip');
      if (!chip) return;
      sendMessage(chip.dataset.q);
    });
  }

  // ── INPUT EVENTS ─────────────────────────────
  sendBtn.addEventListener('click', () => sendMessage());

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 96) + 'px';
  });

  // ── GREETING ─────────────────────────────────
  appendMessage(
    'bot',
    "Hi there! 👋 I'm Nelson, your YMM guide.\n\nAsk me about our programmes, how to apply, career paths, or where to find us — I've got you!"
  );

})();
