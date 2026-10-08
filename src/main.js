import './style.css';
import { personalInfo, projects, skillCategories, experienceTimeline } from './data/portfolioData.js';
import { SceneManager } from './three/sceneManager.js';
import { sound } from './audio/audioFx.js';
import { TerminalController } from './components/terminal.js';
import { ProjectModalController } from './components/projectModal.js';
import { setupCardTilt } from './components/cardTilt.js';
import { CyberCursor } from './components/cyberCursor.js';
import confetti from 'canvas-confetti';

// 1. Initialize DOM Skeleton
const app = document.querySelector('#app');
app.innerHTML = `
  <!-- HUD Header -->
  <header class="hud-header">
    <a href="#hero" class="hud-logo">
      <span class="logo-badge">TS</span>
      <span>TANMAY // 2026</span>
    </a>

    <div class="hud-telemetry">
      <div class="telemetry-item">
        <span class="telemetry-dot"></span>
        <span id="live-ist-clock">IST --:--:--</span>
      </div>
      <div class="telemetry-item">
        <span>60 FPS</span>
      </div>
      <div class="telemetry-item">
        <span>WEBGL 2.0</span>
      </div>
    </div>

    <div class="hud-modes">
      <button class="mode-btn active" data-mode="quantum">⚛️ QUANTUM</button>
      <button class="mode-btn" data-mode="grid">🌐 GRID</button>
      <button class="mode-btn" data-mode="neural">🧠 NEURAL</button>
    </div>

    <div class="hud-actions">
      <button class="sound-toggle-btn" id="sound-toggle" title="Toggle Synthesized Audio FX">
        <div class="sound-bars">
          <span class="sound-bar"></span>
          <span class="sound-bar"></span>
          <span class="sound-bar"></span>
        </div>
        <span id="sound-label">SFX: OFF</span>
      </button>

      <a href="#contact" class="btn-nav-dispatch">CONNECT</a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-section" id="hero">
    <div class="hero-container">
      <div class="hero-left">
        <div class="status-pill">
          <span class="telemetry-dot"></span>
          <span>AVAILABLE FOR HIGH-IMPACT 2026 ROLES</span>
        </div>

        <h1 class="hero-title">
          Hi, I'm <br/>
          <span class="hero-gradient-text">Tanmay Shinde.</span>
        </h1>

        <p class="hero-subtitle">
          Full-Stack Architect & 3D Web Engineer
        </p>

        <p class="hero-description">
          ${personalInfo.bio}
        </p>

        <div class="hero-metrics-pill-bar">
          <div class="hero-metric-chip">⚡ &lt;35ms WebRTC Mesh</div>
          <div class="hero-metric-chip">🏎️ 60Hz Telemetry Stream</div>
          <div class="hero-metric-chip">🎮 8-in-1 Arcade Engine</div>
          <div class="hero-metric-chip">🛡️ AES-256 Ephemeral Crypto</div>
        </div>

        <div class="hero-actions">
          <a href="#projects" class="btn-primary">
            <span>Explore Systems</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </a>
          <a href="#terminal" class="btn-secondary">
            <span>Launch CLI Terminal</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          </a>
          <button class="btn-secondary" id="hero-pulse-btn">
            <span>Pulse 3D Core</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
          </button>
        </div>
      </div>

      <div class="hero-right">
        <div class="avatar-hologram-stage">
          <div class="avatar-glow-backdrop"></div>
          <div class="orbit-tag orbit-tag-1">⚡ WebRTC Mesh Stream</div>
          <div class="orbit-tag orbit-tag-2">🏎️ F1 Pit Telemetry</div>
          
          <div class="avatar-card">
            <div class="avatar-hologram-grid"></div>
            <img src="/tanmay-profile.png" alt="Tanmay Nilesh Shinde" />
            <div class="avatar-card-info">
              <div class="avatar-badge-live">● SYSTEM ACTIVE // CORE ONLINE</div>
              <div class="avatar-name">Tanmay Nilesh Shinde</div>
              <div class="avatar-role">Computer Engineering & Full-Stack Architect</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive F1 Telemetry Simulator Widget -->
  <section class="telemetry-simulator-section">
    <div class="f1-cockpit">
      <div class="f1-header">
        <div class="f1-title-group">
          <h3>🏎️ F1 RACE ENGINEER TELEMETRY ENGINE</h3>
          <p>Live Ingestion Simulation // High-Frequency Telemetry Ingestion Node</p>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-dot"></span>
          <span class="font-mono text-cyan">SOCKET STREAM: 60Hz P2P</span>
        </div>
      </div>

      <div class="f1-gauges-grid">
        <div class="gauge-card">
          <span class="gauge-label">VEHICLE VELOCITY</span>
          <span class="gauge-value" id="f1-speed">324 <small style="font-size: 1rem; color: #8d9bb0;">km/h</small></span>
          <span class="gauge-subtext">Peak Top Speed: 351.4 km/h</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">ENGINE REVS</span>
          <span class="gauge-value" id="f1-rpm">11,850 <small style="font-size: 1rem; color: #8d9bb0;">RPM</small></span>
          <span class="gauge-subtext">Redline Limit: 12,500 RPM</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">GEAR & DRS STATUS</span>
          <span class="gauge-value" id="f1-gear">8th <small style="font-size: 0.9rem; color: #00f5d4;">[DRS ON]</small></span>
          <span class="gauge-subtext">Aero Drag Reduced by 28%</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">SECTOR DELTA TO P1</span>
          <span class="gauge-value" style="color: #00f57a;" id="f1-delta">-0.192s</span>
          <span class="gauge-subtext">Personal Best Lap: 1:21.042</span>
        </div>
      </div>

      <div class="f1-controls-bar">
        <button class="btn-f1-test" id="f1-accel-btn">🔥 SIM ACCELERATION BURST</button>
        <button class="btn-f1-test" id="f1-pit-btn">⏱️ SIMULATE PIT STRATEGY</button>
        <span class="font-mono text-xs text-muted">Ingestion Engine: Node.js WebSocket + React 19 Streams</span>
      </div>
    </div>
  </section>

  <!-- Production Systems Showcase -->
  <section class="section-wrapper" id="projects">
    <div class="section-header">
      <div class="section-tag">// PRODUCTION DEPLOYMENTS</div>
      <h2 class="section-title">Engineered Systems & Flagships</h2>
      <p class="section-desc">
        Explore production-grade full-stack architectures, real-time collaboration engines, and interactive high-performance web systems.
      </p>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <button class="filter-chip active" data-category="all">All Systems (${projects.length})</button>
      <button class="filter-chip" data-category="Real-Time / WebSockets">Real-Time / WebSockets</button>
      <button class="filter-chip" data-category="Full-Stack Arcades">Full-Stack Arcades</button>
      <button class="filter-chip" data-category="Telemetry & IoT">Telemetry & IoT</button>
      <button class="filter-chip" data-category="Security & AI">Security & AI</button>
    </div>

    <!-- Projects Grid -->
    <div class="projects-grid" id="projects-container"></div>
  </section>

  <!-- Verified Skills & Architecture Matrix -->
  <section class="section-wrapper" id="skills">
    <div class="section-header">
      <div class="section-tag">// ARCHITECTURAL PROFICIENCY</div>
      <h2 class="section-title">Skills & Systems Orbit</h2>
      <p class="section-desc">
        Grounded in computer engineering fundamentals and honed through shipping production applications.
      </p>
    </div>

    <div class="skills-categories-grid" id="skills-container"></div>
  </section>

  <!-- Interactive Terminal Section -->
  <section class="section-wrapper terminal-section" id="terminal">
    <div class="section-header" style="text-align: center;">
      <div class="section-tag">// DIRECT COMMAND INTERFACE</div>
      <h2 class="section-title">TANMAY-OS v2.6 Shell</h2>
      <p class="section-desc" style="margin: 8px auto;">
        An interactive command-line interface directly communicating with the server core.
      </p>
    </div>

    <div id="terminal-mount"></div>

    <div class="terminal-quick-chips">
      <button class="quick-chip" data-cmd="help">help</button>
      <button class="quick-chip" data-cmd="about">about</button>
      <button class="quick-chip" data-cmd="projects">projects</button>
      <button class="quick-chip" data-cmd="skills">skills</button>
      <button class="quick-chip" data-cmd="f1">f1</button>
      <button class="quick-chip" data-cmd="stats">stats</button>
      <button class="quick-chip" data-cmd="sudo hire">sudo hire 🎉</button>
      <button class="quick-chip" data-cmd="clear">clear</button>
    </div>
  </section>

  <!-- The Engineer Journey & Philosophy -->
  <section class="section-wrapper" id="about">
    <div class="section-header">
      <div class="section-tag">// THE CRAFT & THE PHILOSOPHY</div>
      <h2 class="section-title">Behind the Engineering</h2>
    </div>

    <div class="about-grid">
      <div class="glass-panel about-card">
        <p class="about-text">
          My philosophy revolves around one core standard: <strong>software should feel alive, instantaneous, and structurally uncompromising.</strong>
        </p>
        <p class="about-text">
          Holding a rigorous foundation in Computer Engineering, I don't just glue third-party packages together. I analyze socket packet lifecycles, memory foot-prints, WebRTC mesh topologies, and browser render pipelines.
        </p>
        <p class="about-text">
          Whether orchestrating low-latency P2P video conferencing in <em>CollabClass</em>, streaming live telemetry in <em>F1 Race Engineer</em>, or creating immersive 3D WebGL worlds with Three.js, I bridge deep backend resilience with next-generation visual design.
        </p>
        <div class="hero-actions">
          <a href="${personalInfo.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary">
            <span>Explore GitHub Profile</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>

      <div class="about-image-card">
        <div class="about-image-overlay"></div>
        <img src="/workspace.jpg" alt="Tanmay Nilesh Shinde Engineering Setup" />
      </div>
    </div>
  </section>

  <!-- Contact Matrix & Priority Dispatch -->
  <section class="section-wrapper" id="contact">
    <div class="section-header">
      <div class="section-tag">// COMMUNICATION RADAR</div>
      <h2 class="section-title">Initiate Contact</h2>
      <p class="section-desc">
        Open for high-impact software engineering roles, full-stack architectural contracts, and collaborative breakthroughs.
      </p>
    </div>

    <div class="contact-grid">
      <!-- Left: Direct Verified Coordinates -->
      <div class="glass-panel contact-card">
        <h3 class="card-title">Verified Coordinates</h3>
        <p class="card-desc">Reach out directly via secure channels or schedule an engineering interview.</p>

        <div class="contact-links-list">
          <!-- Email with Copy Pill -->
          <div class="contact-item-row">
            <div class="contact-item-left">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="#00f5d4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <div>
                <div class="contact-item-title">Direct Email</div>
                <div class="contact-item-subtitle">${personalInfo.email}</div>
              </div>
            </div>
            <button class="btn-copy-email" id="btn-copy-email">Copy Email</button>
          </div>

          <!-- LinkedIn -->
          <a href="${personalInfo.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-item-row">
            <div class="contact-item-left">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="#0070f3"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <div>
                <div class="contact-item-title">LinkedIn Profile</div>
                <div class="contact-item-subtitle">linkedin.com/in/tanmay-shinde</div>
              </div>
            </div>
            <span>↗</span>
          </a>

          <!-- GitHub -->
          <a href="${personalInfo.github}" target="_blank" rel="noopener noreferrer" class="contact-item-row">
            <div class="contact-item-left">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="#fff"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <div>
                <div class="contact-item-title">GitHub Repositories</div>
                <div class="contact-item-subtitle">github.com/TanmayNileshShinde</div>
              </div>
            </div>
            <span>↗</span>
          </a>

          <!-- Location -->
          <div class="contact-item-row">
            <div class="contact-item-left">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="#7928ca"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <div class="contact-item-title">Location Radar</div>
                <div class="contact-item-subtitle">Mumbai, India (Open to Worldwide Remote & Relocation)</div>
              </div>
            </div>
            <span style="color: #00f57a; font-family: var(--font-mono); font-size: 0.8rem;">● ACTIVE</span>
          </div>
        </div>
      </div>

      <!-- Right: Interactive Dispatch Simulator -->
      <div class="glass-panel contact-card">
        <h3 class="card-title">Priority Message Transmitter</h3>
        <p class="card-desc">Send a transmission directly into the priority dispatch queue.</p>

        <form class="dispatch-form" id="dispatch-form">
          <div class="form-group">
            <label class="form-label" for="dispatch-name">TRANSMITTER IDENTITY / NAME</label>
            <input type="text" id="dispatch-name" class="form-input" placeholder="e.g. Elena Rostova" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="dispatch-email">RETURN FREQUENCY / EMAIL</label>
            <input type="email" id="dispatch-email" class="form-input" placeholder="e.g. elena@frontier-tech.io" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="dispatch-msg">PAYLOAD / MESSAGE</label>
            <textarea id="dispatch-msg" class="form-textarea" placeholder="Discussing role, architecture inquiry, or project proposal..." required></textarea>
          </div>

          <button type="submit" class="btn-primary" id="dispatch-submit">
            <span>Transmit Message</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
          <div id="dispatch-feedback" class="font-mono text-sm" style="display: none; margin-top: 8px;"></div>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer-section">
    <div class="footer-container">
      <div class="footer-social-row">
        <a href="${personalInfo.github}" target="_blank" rel="noopener noreferrer" class="footer-social-link">GitHub</a>
        <a href="${personalInfo.linkedin}" target="_blank" rel="noopener noreferrer" class="footer-social-link">LinkedIn</a>
        <a href="mailto:${personalInfo.email}" class="footer-social-link">Email</a>
        <a href="#hero" class="footer-social-link">Top ↑</a>
      </div>

      <div class="footer-copy">
        © ${new Date().getFullYear()} Tanmay Nilesh Shinde. Engineered with Three.js, WebGL & Vite. All systems nominal.
      </div>
    </div>
  </footer>
`;

// 2. Initialize Three.js 3D Engine
const canvasContainer = document.querySelector('#three-canvas-container');
const sceneManager = new SceneManager(canvasContainer);

// 3. Initialize Cyber Cursor
new CyberCursor();

// 4. Initialize Project Modal Controller
const projectModal = new ProjectModalController();

// 5. Initialize Interactive Terminal
const terminalMount = document.querySelector('#terminal-mount');
new TerminalController(terminalMount, sceneManager);

// 6. Live Clock (Mumbai / IST UTC+5:30)
function updateClock() {
  const clockEl = document.querySelector('#live-ist-clock');
  if (clockEl) {
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    clockEl.textContent = `IST ${now.toLocaleTimeString('en-GB', options)}`;
  }
}
setInterval(updateClock, 1000);
updateClock();

// 7. 3D Mode Switcher Controls
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.mode;
    sceneManager.setMode(mode);
  });
});

// 8. Sound Toggle Controller
const soundBtn = document.querySelector('#sound-toggle');
const soundLabel = document.querySelector('#sound-label');
soundBtn.addEventListener('click', () => {
  const unmuted = sound.toggleMute();
  if (unmuted) {
    soundBtn.classList.add('sound-on');
    soundLabel.textContent = 'SFX: ON';
  } else {
    soundBtn.classList.remove('sound-on');
    soundLabel.textContent = 'SFX: OFF';
  }
});

// 9. Hero Pulse Core Button
document.querySelector('#hero-pulse-btn').addEventListener('click', () => {
  sceneManager.triggerCorePulse();
});

// 10. Render Projects with 3D Tilt Cards
const projectsContainer = document.querySelector('#projects-container');

function renderProjects(filter = 'all') {
  projectsContainer.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="card-top">
        <div class="card-category-row">
          <span class="card-category-pill">${p.category}</span>
          ${p.featured ? '<span class="card-featured-tag">★ FLAGSHIP</span>' : ''}
        </div>
        
        <h3 class="card-title">${p.title}</h3>
        <p class="card-tagline">${p.tagline}</p>
        <p class="card-desc">${p.description}</p>

        <div class="card-metrics-box">
          ${Object.entries(p.metrics || {}).map(([k, v]) => `
            <div class="card-metric-item">
              <span class="card-metric-label">${k}</span>
              <span class="card-metric-val">${v}</span>
            </div>
          `).join('')}
        </div>

        <div class="card-tech-row">
          ${p.tech.map(t => `<span class="card-tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="card-bottom-actions">
        <button class="card-btn-inspect" data-id="${p.id}">
          <span>Architecture</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-btn-live">
          <span>Live App</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    `;

    // Attach 3D Perspective Tilt Physics
    setupCardTilt(card);

    // Modal inspect listener
    const inspectBtn = card.querySelector('.card-btn-inspect');
    inspectBtn.addEventListener('click', () => {
      projectModal.open(p.id);
    });

    projectsContainer.appendChild(card);
  });
}

renderProjects();

// Filter buttons listener
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    sound.playClick();
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderProjects(chip.dataset.category);
  });
});

// 11. Render Skills Matrix
const skillsContainer = document.querySelector('#skills-container');
skillCategories.forEach(cat => {
  const card = document.createElement('div');
  card.className = 'skill-cat-card';
  card.innerHTML = `
    <div class="skill-cat-header">
      <span class="skill-cat-bullet" style="background-color: ${cat.color};"></span>
      <h3 class="skill-cat-title">${cat.name}</h3>
    </div>
    <div class="skill-items-list">
      ${cat.skills.map(s => `
        <div class="skill-item-row">
          <div class="skill-meta">
            <span style="color: #e2e8f0;">${s.name}</span>
            <span style="font-family: var(--font-mono); color: ${cat.color};">${s.level}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width: ${s.level}%; background: linear-gradient(90deg, ${cat.color}, #0070f3);"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  skillsContainer.appendChild(card);
});

// 12. Terminal Quick Chips
document.querySelectorAll('.quick-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const cmd = btn.dataset.cmd;
    const termInput = document.querySelector('#term-input');
    if (termInput) {
      termInput.value = cmd;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      termInput.dispatchEvent(enterEvent);
    }
  });
});

// 13. Interactive F1 Simulator Logic
const f1SpeedEl = document.querySelector('#f1-speed');
const f1RpmEl = document.querySelector('#f1-rpm');
const f1GearEl = document.querySelector('#f1-gear');
const f1DeltaEl = document.querySelector('#f1-delta');

let currentSpeed = 324;
let currentRpm = 11850;

document.querySelector('#f1-accel-btn').addEventListener('click', () => {
  sound.playPulse();
  let step = 0;
  const interval = setInterval(() => {
    step++;
    currentSpeed = Math.min(352, currentSpeed + 4);
    currentRpm = Math.min(12400, currentRpm + 100);
    f1SpeedEl.innerHTML = `${currentSpeed} <small style="font-size: 1rem; color: #8d9bb0;">km/h</small>`;
    f1RpmEl.innerHTML = `${currentRpm.toLocaleString()} <small style="font-size: 1rem; color: #8d9bb0;">RPM</small>`;
    f1DeltaEl.textContent = `-${(0.192 + step * 0.04).toFixed(3)}s`;

    if (step >= 7) {
      clearInterval(interval);
      setTimeout(() => {
        currentSpeed = 324;
        currentRpm = 11850;
        f1SpeedEl.innerHTML = `324 <small style="font-size: 1rem; color: #8d9bb0;">km/h</small>`;
        f1RpmEl.innerHTML = `11,850 <small style="font-size: 1rem; color: #8d9bb0;">RPM</small>`;
      }, 2000);
    }
  }, 120);
});

document.querySelector('#f1-pit-btn').addEventListener('click', () => {
  sound.playClick();
  f1GearEl.innerHTML = `PIT <small style="font-size: 0.9rem; color: #ffd166;">[BOX BOX]</small>`;
  f1SpeedEl.innerHTML = `80 <small style="font-size: 1rem; color: #8d9bb0;">km/h</small>`;
  setTimeout(() => {
    sound.playPulse();
    f1GearEl.innerHTML = `8th <small style="font-size: 0.9rem; color: #00f5d4;">[DRS ON]</small>`;
    f1SpeedEl.innerHTML = `324 <small style="font-size: 1rem; color: #8d9bb0;">km/h</small>`;
  }, 2200);
});

// 14. Copy Email Button
document.querySelector('#btn-copy-email').addEventListener('click', (e) => {
  sound.playClick();
  navigator.clipboard.writeText(personalInfo.email).then(() => {
    e.target.textContent = 'Copied! ✓';
    e.target.style.background = '#00f5d4';
    e.target.style.color = '#000';
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => {
      e.target.textContent = 'Copy Email';
      e.target.style.background = '';
      e.target.style.color = '';
    }, 2500);
  });
});

// 15. Priority Message Transmitter Form
const dispatchForm = document.querySelector('#dispatch-form');
const dispatchFeedback = document.querySelector('#dispatch-feedback');

dispatchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sound.playPulse();

  const submitBtn = document.querySelector('#dispatch-submit');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Encrypting & Routing...</span>`;

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.7 }
    });
    submitBtn.innerHTML = `<span>Payload Transmitted ✓</span>`;
    dispatchFeedback.style.display = 'block';
    dispatchFeedback.style.color = '#00f57a';
    dispatchFeedback.innerHTML = `Transmission received! Direct alert dispatched to Tanmay Nilesh Shinde.`;
    dispatchForm.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Transmit Message</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      `;
    }, 4000);
  }, 1200);
});
