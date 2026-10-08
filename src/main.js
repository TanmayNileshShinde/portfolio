import './style.css';
import { personalInfo, projects, skillCategories, themesConfig } from './data/portfolioData.js';
import { SceneManager } from './three/sceneManager.js';
import { sound } from './audio/audioFx.js';
import { TerminalController } from './components/terminal.js';
import { ProjectModalController } from './components/projectModal.js';
import { setupCardTilt } from './components/cardTilt.js';
import { CyberCursor } from './components/cyberCursor.js';
import confetti from 'canvas-confetti';

// 1. Initialize Active Theme State (default: 'redbull')
const savedTheme = localStorage.getItem('tanmay_portfolio_theme') || 'redbull';
document.documentElement.setAttribute('data-theme', savedTheme);

// 2. Build DOM Layout
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
        <span>WEBGL 2.0 BLOOM</span>
      </div>
    </div>

    <!-- 3 Bespoke Themes Switcher -->
    <div class="hud-modes">
      <button class="mode-btn ${savedTheme === 'redbull' ? 'active' : ''}" data-theme="redbull">🏎️ RED BULL / F1</button>
      <button class="mode-btn ${savedTheme === 'cricket' ? 'active' : ''}" data-theme="cricket">🏏 CRICKET</button>
      <button class="mode-btn ${savedTheme === 'gaming' ? 'active' : ''}" data-theme="gaming">🎮 GAMING</button>
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

  <!-- Hero Section with Ultra 3D Interactive Lab Toolbar -->
  <section class="hero-section" id="hero">
    <div class="hero-container">
      <div class="hero-left">
        <div class="status-pill" id="hero-status-pill">
          <span class="telemetry-dot"></span>
          <span id="hero-status-text">${themesConfig[savedTheme].badge}</span>
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
          <div class="hero-metric-chip">🏎️ 350+ km/h F1 Telemetry</div>
          <div class="hero-metric-chip">🏏 150 km/h Fast Ball Seam</div>
          <div class="hero-metric-chip">🎮 8-in-1 Arcade Engine</div>
        </div>

        <div class="hero-actions">
          <a href="#projects" class="btn-primary">
            <span>Explore 10 Systems</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </a>
          <a href="#terminal" class="btn-secondary">
            <span>Launch CLI Shell</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          </a>
        </div>

        <!-- 3D Interactive Sandbox Controller Pill -->
        <div class="sandbox-toolbar glass-panel">
          <span class="font-mono text-xs text-muted">3D LAB TOOLS:</span>
          <button class="sandbox-btn" id="btn-3d-action">🔥 TRIGGER 3D ACTION</button>
          <button class="sandbox-btn" id="btn-3d-wireframe">📐 WIREFRAME</button>
          <button class="sandbox-btn" id="btn-3d-turntable">🔄 TURNTABLE</button>
          <span class="font-mono text-xs text-cyan" style="margin-left: auto;">💡 CLICK & DRAG 3D MODEL</span>
        </div>
      </div>

      <div class="hero-right">
        <div class="avatar-hologram-stage">
          <div class="avatar-glow-backdrop"></div>
          <div class="orbit-tag orbit-tag-1" id="avatar-tag-1">🏎️ Verstappen #1</div>
          <div class="orbit-tag orbit-tag-2" id="avatar-tag-2">🏏 Stadium Powerplay</div>
          
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

  <!-- Interactive Dynamic Thematic Cockpit Widget -->
  <section class="telemetry-simulator-section">
    <div class="f1-cockpit" id="thematic-cockpit">
      <div id="cockpit-content"></div>
    </div>
  </section>

  <!-- Production Systems Showcase (10/10 Verified) -->
  <section class="section-wrapper" id="projects">
    <div class="section-header">
      <div class="section-tag">// 3D SPATIAL HOLO-CAROUSEL & PRODUCTION DEPLOYMENTS</div>
      <h2 class="section-title">Engineered Systems & Flagships</h2>
      <p class="section-desc">
        Drag to spin the 3D WebGL Cylinder Ring above, or explore each verified card below. All 10 projects are 100% live on Vercel and public on GitHub.
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
      <div class="section-tag">// ARCHITECTURAL MASTERY</div>
      <h2 class="section-title">Skills & Systems Orbit</h2>
      <p class="section-desc">
        Honed through Computer Engineering rigour, low-latency socket networking, and shipping high-throughput apps.
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
        Interactive terminal communicating directly with the core. Try 'help', 'f1', 'cricket', 'gaming', or 'sudo hire'.
      </p>
    </div>

    <div id="terminal-mount"></div>

    <div class="terminal-quick-chips">
      <button class="quick-chip" data-cmd="help">help</button>
      <button class="quick-chip" data-cmd="projects">projects</button>
      <button class="quick-chip" data-cmd="f1">f1 (redbull)</button>
      <button class="quick-chip" data-cmd="cricket">cricket</button>
      <button class="quick-chip" data-cmd="gaming">gaming</button>
      <button class="quick-chip" data-cmd="skills">skills</button>
      <button class="quick-chip" data-cmd="sudo hire">sudo hire 🎉</button>
      <button class="quick-chip" data-cmd="clear">clear</button>
    </div>
  </section>

  <!-- The Engineer Story & Passions (About Section) -->
  <section class="section-wrapper" id="about">
    <div class="section-header">
      <div class="section-tag">// PASSION, PERFORMANCE & ARCHITECTURE</div>
      <h2 class="section-title">Behind the Engineering</h2>
    </div>

    <div class="about-grid">
      <div class="glass-panel about-card">
        <p class="about-text">
          I am a software architect driven by relentless speed and precision. Inspired by <strong>Max Verstappen's clinical racecraft and Oracle Red Bull Racing's engineering perfection</strong>, I approach code with the same obsession: zero wasted latency, pinpoint execution, and relentless pursuit of performance.
        </p>
        <p class="about-text">
          My love for <strong>Cricket</strong> informs my teamwork and clutch problem solving under high pressure, while my passion for <strong>Retro-Modern Gaming</strong> drives my love for fluid state machines, 60 FPS physics engines, and cinematic interactive WebGL interfaces.
        </p>
        <p class="about-text">
          With a formal foundation in Computer Engineering, I don't settle for sluggish abstractions. I build high-concurrency WebRTC video meshes, lightning-fast cloud clipboards, and 3D web engines that make a lasting impression.
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
      <div class="section-tag">// PRIORITY DISPATCH RADAR</div>
      <h2 class="section-title">Initiate Contact</h2>
      <p class="section-desc">
        Open for elite software engineering roles, high-impact distributed architecture contracts, and technical co-founding opportunities.
      </p>
    </div>

    <div class="contact-grid">
      <!-- Left: Direct Verified Coordinates -->
      <div class="glass-panel contact-card">
        <h3 class="card-title">Verified Coordinates</h3>
        <p class="card-desc">Reach out directly via verified channels or copy my email address.</p>

        <div class="contact-links-list">
          <div class="contact-item-row">
            <div class="contact-item-left">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <div>
                <div class="contact-item-title">Direct Email</div>
                <div class="contact-item-subtitle">${personalInfo.email}</div>
              </div>
            </div>
            <button class="btn-copy-email" id="btn-copy-email">Copy Email</button>
          </div>

          <a href="${personalInfo.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-item-row">
            <div class="contact-item-left">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <div>
                <div class="contact-item-title">LinkedIn Profile</div>
                <div class="contact-item-subtitle">linkedin.com/in/tanmay-shinde</div>
              </div>
            </div>
            <span>↗</span>
          </a>

          <a href="${personalInfo.github}" target="_blank" rel="noopener noreferrer" class="contact-item-row">
            <div class="contact-item-left">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              <div>
                <div class="contact-item-title">GitHub Profile</div>
                <div class="contact-item-subtitle">github.com/TanmayNileshShinde</div>
              </div>
            </div>
            <span>↗</span>
          </a>

          <div class="contact-item-row">
            <div class="contact-item-left">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <div class="contact-item-title">Base Coordinates</div>
                <div class="contact-item-subtitle">Mumbai, India (Open to Global Remote & Relocation)</div>
              </div>
            </div>
            <span style="color: var(--primary); font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700;">● ONLINE</span>
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
            <input type="text" id="dispatch-name" class="form-input" placeholder="e.g. Christian Horner" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="dispatch-email">RETURN FREQUENCY / EMAIL</label>
            <input type="email" id="dispatch-email" class="form-input" placeholder="e.g. team@redbullracing.com" required />
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
        © ${new Date().getFullYear()} Tanmay Nilesh Shinde. Ultra Pro Max 3D WebGL Engine. F1 Red Bull • Cricket • Gaming. All systems operational.
      </div>
    </div>
  </footer>
`;

// 3. Initialize Project Modal Controller first
const projectModal = new ProjectModalController();

// 4. Initialize Three.js 3D WebGL Scene with Project Modal integration
const canvasContainer = document.querySelector('#three-canvas-container');
const sceneManager = new SceneManager(canvasContainer, (project) => {
  projectModal.open(project.id);
});
sceneManager.setTheme(savedTheme, false);

// 5. Initialize Cyber Cursor
new CyberCursor();

// 6. Theme Switching Logic
function applyTheme(themeId) {
  if (!themesConfig[themeId]) return;
  localStorage.setItem('tanmay_portfolio_theme', themeId);
  document.documentElement.setAttribute('data-theme', themeId);

  // Update Buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === themeId);
  });

  // Update Hero Badges
  const statusText = document.querySelector('#hero-status-text');
  if (statusText) statusText.textContent = themesConfig[themeId].badge;

  const tag1 = document.querySelector('#avatar-tag-1');
  const tag2 = document.querySelector('#avatar-tag-2');
  if (themeId === 'redbull') {
    if (tag1) tag1.textContent = '🏎️ Verstappen #1';
    if (tag2) tag2.textContent = '🏁 Oracle Red Bull F1';
  } else if (themeId === 'cricket') {
    if (tag1) tag1.textContent = '🏏 152 km/h Yorker';
    if (tag2) tag2.textContent = '🏟️ Stadium Floodlights';
  } else {
    if (tag1) tag1.textContent = '🎮 React Nexus Arcade';
    if (tag2) tag2.textContent = '👾 8 Mini-Games';
  }

  // Update Cockpit widget
  renderThematicCockpit(themeId);

  // Update 3D Scene
  sceneManager.setTheme(themeId, true);
}

// 7. Render Thematic Cockpit based on Active Theme
function renderThematicCockpit(themeId) {
  const container = document.querySelector('#cockpit-content');
  if (!container) return;

  if (themeId === 'redbull') {
    container.innerHTML = `
      <div class="f1-header">
        <div class="f1-title-group">
          <h3>🏎️ ORACLE RED BULL RACING // MAX VERSTAPPEN #1 COCKPIT</h3>
          <p>Live Ingestion Simulation // High-Frequency Telemetry Ingestion Node</p>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-dot"></span>
          <span class="font-mono text-cyan">TELEMETRY STREAM: 60Hz P2P</span>
        </div>
      </div>

      <div class="f1-gauges-grid">
        <div class="gauge-card">
          <span class="gauge-label">VEHICLE VELOCITY</span>
          <span class="gauge-value" id="f1-speed">342.6 <small style="font-size: 1rem; color: #8d9bb0;">km/h</small></span>
          <span class="gauge-subtext">Peak Top Speed: 351.4 km/h</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">HONDA RBPT REVS</span>
          <span class="gauge-value" id="f1-rpm">12,180 <small style="font-size: 1rem; color: #8d9bb0;">RPM</small></span>
          <span class="gauge-subtext">Redline Limit: 12,500 RPM</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">GEAR & DRS STATUS</span>
          <span class="gauge-value" id="f1-gear">8th <small style="font-size: 0.9rem; color: #ffc800;">[DRS ACTIVE]</small></span>
          <span class="gauge-subtext">Aero Drag Reduced by 28%</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">DELTA TO P1</span>
          <span class="gauge-value" style="color: #00f57a;" id="f1-delta">-0.192s</span>
          <span class="gauge-subtext">Monza Qualifying Lap: 1:20.104</span>
        </div>
      </div>

      <div class="f1-controls-bar">
        <button class="btn-f1-test" id="f1-accel-btn">🔥 MAX ACCELERATION BURST</button>
        <button class="btn-f1-test" id="f1-pit-btn">⏱️ SIMULATE PIT STRATEGY</button>
        <button class="btn-f1-test" id="f1-drs-btn">⚡ TOGGLE DRS FLAP</button>
        <span class="font-mono text-xs text-muted">Red Bull Racing Tech Stack: React 19 + Three.js + Socket.io</span>
      </div>
    `;

    const f1SpeedEl = document.querySelector('#f1-speed');
    const f1RpmEl = document.querySelector('#f1-rpm');
    const f1GearEl = document.querySelector('#f1-gear');
    const f1DeltaEl = document.querySelector('#f1-delta');

    let currentSpeed = 342;
    let currentRpm = 12180;

    document.querySelector('#f1-accel-btn')?.addEventListener('click', () => {
      sound.playRedBullF1();
      sceneManager.f1Car.triggerRev();
      let step = 0;
      const interval = setInterval(() => {
        step++;
        currentSpeed = Math.min(354, currentSpeed + 3);
        currentRpm = Math.min(12480, currentRpm + 80);
        if (f1SpeedEl) f1SpeedEl.innerHTML = `${currentSpeed} <small style="font-size: 1rem; color: #8d9bb0;">km/h</small>`;
        if (f1RpmEl) f1RpmEl.innerHTML = `${currentRpm.toLocaleString()} <small style="font-size: 1rem; color: #8d9bb0;">RPM</small>`;
        if (f1DeltaEl) f1DeltaEl.textContent = `-${(0.192 + step * 0.04).toFixed(3)}s`;

        if (step >= 6) {
          clearInterval(interval);
          setTimeout(() => {
            currentSpeed = 342;
            currentRpm = 12180;
            if (f1SpeedEl) f1SpeedEl.innerHTML = `342.6 <small style="font-size: 1rem; color: #8d9bb0;">km/h</small>`;
            if (f1RpmEl) f1RpmEl.innerHTML = `12,180 <small style="font-size: 1rem; color: #8d9bb0;">RPM</small>`;
          }, 2000);
        }
      }, 120);
    });

    document.querySelector('#f1-pit-btn')?.addEventListener('click', () => {
      sound.playClick();
      if (f1GearEl) f1GearEl.innerHTML = `BOX <small style="font-size: 0.9rem; color: #ff5500;">[2.1s STOP]</small>`;
      if (f1SpeedEl) f1SpeedEl.innerHTML = `80 <small style="font-size: 1rem; color: #8d9bb0;">km/h</small>`;
      setTimeout(() => {
        sound.playRedBullF1();
        if (f1GearEl) f1GearEl.innerHTML = `8th <small style="font-size: 0.9rem; color: #ffc800;">[DRS ACTIVE]</small>`;
        if (f1SpeedEl) f1SpeedEl.innerHTML = `342.6 <small style="font-size: 1rem; color: #8d9bb0;">km/h</small>`;
      }, 2100);
    });

    document.querySelector('#f1-drs-btn')?.addEventListener('click', () => {
      sound.playClick();
      const isOpen = sceneManager.f1Car.toggleDRS();
      if (f1GearEl) {
        f1GearEl.innerHTML = isOpen ? `8th <small style="font-size: 0.9rem; color: #00f57a;">[DRS OPEN]</small>` : `8th <small style="font-size: 0.9rem; color: #8d9bb0;">[DRS CLOSED]</small>`;
      }
    });

  } else if (themeId === 'cricket') {
    container.innerHTML = `
      <div class="f1-header">
        <div class="f1-title-group">
          <h3>🏏 FLOODLIT CRICKET STADIUM // MATCH RADAR</h3>
          <p>Live Match Telemetry // Powerplay Tracking & Speed Gun Radar</p>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-dot"></span>
          <span class="font-mono text-cyan">WANKHEDE STADIUM: FLOODLIGHTS ON</span>
        </div>
      </div>

      <div class="f1-gauges-grid">
        <div class="gauge-card">
          <span class="gauge-label">SPEED GUN VELOCITY</span>
          <span class="gauge-value" id="cricket-speed">152.4 <small style="font-size: 1rem; color: #8d9bb0;">km/h</small></span>
          <span class="gauge-subtext">Express Inswinging Yorker</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">SCORE & OVERS</span>
          <span class="gauge-value" id="cricket-score">198/3 <small style="font-size: 1rem; color: #8d9bb0;">(18.2 ov)</small></span>
          <span class="gauge-subtext">Run Rate: 10.8 RPO</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">BAT EXIT VELOCITY</span>
          <span class="gauge-value" id="cricket-exit">168 <small style="font-size: 0.9rem; color: #00f57a;">km/h [SIX!]</small></span>
          <span class="gauge-subtext">Distance: 108 Meters</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">PROJECTED TOTAL</span>
          <span class="gauge-value" style="color: #ffd700;" id="cricket-proj">224</span>
          <span class="gauge-subtext">Win Probability: 88.5%</span>
        </div>
      </div>

      <div class="f1-controls-bar">
        <button class="btn-f1-test" id="cricket-bowl-btn">⚡ BOWL 150 KM/H OUTSWINGER (STUMP SMASH)</button>
        <button class="btn-f1-test" id="cricket-six-btn">💥 HIT MONSTER MAXIMUM (6)</button>
        <span class="font-mono text-xs text-muted">Stadium Analytics Engine: Live Algorithmic Telemetry</span>
      </div>
    `;

    document.querySelector('#cricket-bowl-btn')?.addEventListener('click', () => {
      sceneManager.cricket.bowlDelivery();
    });

    document.querySelector('#cricket-six-btn')?.addEventListener('click', () => {
      sceneManager.cricket.hitSix();
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 }, colors: ['#00f57a', '#ffd700', '#ffffff'] });
      const scoreEl = document.querySelector('#cricket-score');
      if (scoreEl) scoreEl.innerHTML = `204/3 <small style="font-size: 1rem; color: #8d9bb0;">(18.3 ov)</small>`;
    });

  } else if (themeId === 'gaming') {
    container.innerHTML = `
      <div class="f1-header">
        <div class="f1-title-group">
          <h3>🎮 REACT NEXUS // 8-IN-1 RETRO-MODERN ARCADE HUB</h3>
          <p>Full-Stack Interactive Game Engine // 60 FPS Locked // Cloud Leaderboard</p>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-dot"></span>
          <span class="font-mono text-cyan">ARCADE CLUSTER: READY TO PLAY</span>
        </div>
      </div>

      <div class="f1-gauges-grid">
        <div class="gauge-card">
          <span class="gauge-label">GLOBAL HIGH SCORE</span>
          <span class="gauge-value" id="game-score">999,420 <small style="font-size: 1rem; color: #8d9bb0;">PTS</small></span>
          <span class="gauge-subtext">Player: TanmayShinde [RANK 1]</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">ENGINE FRAME RATE</span>
          <span class="gauge-value">60.0 <small style="font-size: 1rem; color: #4cc9f0;">FPS LOCKED</small></span>
          <span class="gauge-subtext">Zero Stutter Physics</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">COMBO MULTIPLIER</span>
          <span class="gauge-value" id="game-combo">16x <small style="font-size: 0.9rem; color: #f72585;">[ULTRA]</small></span>
          <span class="gauge-subtext">Arcade Score Surge</span>
        </div>
        <div class="gauge-card">
          <span class="gauge-label">AVAILABLE GAMES</span>
          <span class="gauge-value" style="color: #00ff66;">8 GAMES</span>
          <span class="gauge-subtext">Space, Snake, Pong, Runner...</span>
        </div>
      </div>

      <div class="f1-controls-bar">
        <button class="btn-f1-test" id="game-boost-btn">🪙 ARCADE POWER-UP COIN</button>
        <a href="https://reactnexus.vercel.app" target="_blank" rel="noopener noreferrer" class="btn-f1-test" style="text-decoration: none;">🕹️ LAUNCH REACT NEXUS ARCADE ↗</a>
        <span class="font-mono text-xs text-muted">React + Firebase RTDB + Framer Motion Engine</span>
      </div>
    `;

    document.querySelector('#game-boost-btn')?.addEventListener('click', () => {
      sound.playGaming();
      sceneManager.arcade.pressButton();
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#f72585', '#4cc9f0', '#7209b7'] });
      const comboEl = document.querySelector('#game-combo');
      if (comboEl) {
        comboEl.innerHTML = `32x <small style="font-size: 0.9rem; color: #00ff66;">[MAX COMBO]</small>`;
        setTimeout(() => {
          comboEl.innerHTML = `16x <small style="font-size: 0.9rem; color: #f72585;">[ULTRA]</small>`;
        }, 2200);
      }
    });
  }
}

renderThematicCockpit(savedTheme);

// 8. 3D Sandbox Toolbar Buttons
document.querySelector('#btn-3d-action')?.addEventListener('click', () => {
  sceneManager.triggerCorePulse();
});

document.querySelector('#btn-3d-wireframe')?.addEventListener('click', (e) => {
  sound.playClick();
  const isWire = sceneManager.toggleWireframe();
  e.target.textContent = isWire ? '✨ SHADED' : '📐 WIREFRAME';
});

document.querySelector('#btn-3d-turntable')?.addEventListener('click', (e) => {
  sound.playClick();
  const isRotating = sceneManager.toggleAutoRotate();
  e.target.textContent = isRotating ? '⏸️ PAUSE ORBIT' : '🔄 AUTO-ORBIT';
});

// 9. Bind Theme Button Clicks in HUD
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTheme = btn.dataset.theme;
    applyTheme(targetTheme);
  });
});

// 10. Initialize Interactive Terminal
const terminalMount = document.querySelector('#terminal-mount');
new TerminalController(terminalMount, sceneManager, (theme) => applyTheme(theme));

// 11. Live Clock (Mumbai / IST UTC+5:30)
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

// 12. Sound Toggle Controller
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

// 13. Render All 10 Projects with 3D Tilt Cards & Direct Verified Links
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
        <button class="card-btn-inspect" data-id="${p.id}" title="Inspect System Architecture">
          <span>Inspect</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>

        <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-btn-gh" title="View Source on GitHub">
          <span>GitHub</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        </a>

        <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-btn-live" title="Visit Live Production App">
          <span>Live App</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    `;

    // 3D Perspective Tilt Physics
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

// 14. Render Skills Matrix
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
            <span style="font-family: var(--font-mono); color: var(--primary);">${s.level}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width: ${s.level}%; background: linear-gradient(90deg, var(--primary), var(--secondary));"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  skillsContainer.appendChild(card);
});

// 15. Terminal Quick Chips
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

// 16. Copy Email Button with Confetti
document.querySelector('#btn-copy-email').addEventListener('click', (e) => {
  sound.playClick();
  navigator.clipboard.writeText(personalInfo.email).then(() => {
    e.target.textContent = 'Copied! ✓';
    e.target.style.background = 'var(--primary)';
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

// 17. Priority Message Transmitter Form
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
