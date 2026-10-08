import { personalInfo, projects, skillCategories } from '../data/portfolioData.js';
import { sound } from '../audio/audioFx.js';
import confetti from 'canvas-confetti';

export class TerminalController {
  constructor(terminalEl, sceneManager) {
    this.el = terminalEl;
    this.sceneManager = sceneManager;
    this.history = [];
    this.historyIndex = -1;
    this.init();
  }

  init() {
    this.el.innerHTML = `
      <div class="terminal-window">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="terminal-title">tanmay-os // kernel v2.6.0-quantum (x86_64)</div>
          <div class="terminal-actions">
            <span class="terminal-status-pill">● LIVE CLUSTER</span>
          </div>
        </div>
        <div class="terminal-body" id="term-output">
          <div class="term-line welcome">
            <span class="term-accent">TANMAY-OS [Version 2.6.0.2026]</span><br/>
            (c) 2026 Tanmay Nilesh Shinde. All rights reserved.<br/>
            Type <span class="term-cyan">help</span> to list commands or try <span class="term-green">sudo hire</span>.
          </div>
        </div>
        <div class="terminal-input-row">
          <span class="term-prompt">tanmay@quantum-core:~$</span>
          <input type="text" id="term-input" class="term-input" autocomplete="off" spellcheck="false" placeholder="Type a command (try 'help')..."/>
        </div>
      </div>
    `;

    this.output = this.el.querySelector('#term-output');
    this.input = this.el.querySelector('#term-input');

    this.input.addEventListener('keydown', (e) => this.handleKey(e));
    this.el.addEventListener('click', () => this.input.focus());
  }

  handleKey(e) {
    sound.playTerminalKey();

    if (e.key === 'Enter') {
      const cmd = this.input.value.trim();
      if (cmd) {
        this.history.push(cmd);
        this.historyIndex = this.history.length;
        this.executeCommand(cmd);
      }
      this.input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (this.history.length > 0 && this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
      e.preventDefault();
    }
  }

  printLine(content, className = '') {
    const div = document.createElement('div');
    div.className = `term-line ${className}`;
    div.innerHTML = content;
    this.output.appendChild(div);
    this.output.scrollTop = this.output.scrollHeight;
  }

  executeCommand(rawCmd) {
    this.printLine(`<span class="term-prompt">tanmay@quantum-core:~$</span> ${escapeHtml(rawCmd)}`);
    const parts = rawCmd.toLowerCase().trim().split(/\s+/);
    const cmd = parts[0];
    const arg = parts[1];

    switch (cmd) {
      case 'help':
        this.printLine(`
          <div class="term-grid">
            <div><span class="term-cyan">about</span>       : Engineer bio, ethos & specializations</div>
            <div><span class="term-cyan">projects</span>    : Flagship deployed production systems</div>
            <div><span class="term-cyan">skills</span>      : Verified tech stack breakdown</div>
            <div><span class="term-cyan">f1</span>          : Live F1 telemetry streaming burst</div>
            <div><span class="term-cyan">stats</span>       : Production metrics & architecture stats</div>
            <div><span class="term-cyan">theme &lt;mode&gt;</span> : 3D world: 'quantum', 'grid', 'neural'</div>
            <div><span class="term-cyan">contact</span>     : Direct communication coordinates</div>
            <div><span class="term-cyan">sudo hire</span>   : Initiate high-priority contract protocol 🎉</div>
            <div><span class="term-cyan">clear</span>       : Purge the terminal display buffer</div>
          </div>
        `);
        break;

      case 'about':
      case 'bio':
      case 'whoami':
        this.printLine(`
          <div class="term-box">
            <span class="term-green font-bold">${personalInfo.name}</span> // ${personalInfo.title}<br/>
            📍 ${personalInfo.location} | ⚡ ${personalInfo.status}<br/><br/>
            ${personalInfo.bio}
          </div>
        `);
        break;

      case 'projects':
        let projHtml = `<div class="term-box"><span class="term-accent font-bold">DEPLOYED PRODUCTION SYSTEMS:</span><br/>`;
        projects.forEach(p => {
          projHtml += `• <a href="${p.liveUrl}" target="_blank" class="term-cyan underline">${p.title}</a> [${p.category}] - ${p.tagline}<br/>`;
        });
        projHtml += `</div>`;
        this.printLine(projHtml);
        break;

      case 'skills':
        let skillHtml = `<div class="term-box">`;
        skillCategories.forEach(cat => {
          skillHtml += `<span style="color: ${cat.color}; font-weight: bold;">[${cat.name}]</span>: `;
          skillHtml += cat.skills.map(s => `${s.name} (${s.level}%)`).join(', ');
          skillHtml += `<br/><br/>`;
        });
        skillHtml += `</div>`;
        this.printLine(skillHtml);
        break;

      case 'f1':
      case 'telemetry':
        this.printLine(`
          <div class="term-f1-box">
            <span class="term-red font-bold">🏎️ F1 RACE ENGINEER TELEMETRY BURST // MONZA GP:</span><br/>
            [SPEED]: <span class="term-green">342.6 km/h</span> | [RPM]: 11,840 | [GEAR]: 8th<br/>
            [DRS]: <span class="term-cyan">ACTIVE (ZONE 2)</span> | [THROTTLE]: 100% | [BRAKE]: 0%<br/>
            [TIRE DEGRADATION]: Soft C5 (Lap 14/53) -> <span class="term-yellow">Wear: 24.3% | Grip: 94%</span><br/>
            [DELTA TO LEADER]: <span class="term-green">-0.184s (PURPLE SECTOR 2)</span><br/>
            [PIT STRATEGY]: Box Lap 21 for Hard Compound (Delta margin: +3.8s)
          </div>
        `);
        sound.playPulse();
        break;

      case 'stats':
        this.printLine(`
          <div class="term-box">
            <span class="term-accent font-bold">SYSTEM INTEGRITY & PRODUCTION TELEMETRY:</span><br/>
            • Active Projects: <span class="term-green">12 Systems</span><br/>
            • Global Uptime: <span class="term-green">99.99%</span><br/>
            • P2P WebRTC Latency: <span class="term-cyan">&lt; 35ms</span><br/>
            • Telemetry Frequency: <span class="term-cyan">60Hz Real-Time</span><br/>
            • 3D WebGL Engine: <span class="term-green">Active (60 FPS Locked)</span>
          </div>
        `);
        break;

      case 'theme':
        if (arg === 'quantum' || arg === 'grid' || arg === 'neural') {
          if (this.sceneManager) {
            this.sceneManager.setMode(arg);
            this.printLine(`<span class="term-green">3D Environment switched to '${arg.toUpperCase()} MODE'.</span>`);
            // Update UI buttons if present
            document.querySelectorAll('.mode-btn').forEach(b => {
              b.classList.toggle('active', b.dataset.mode === arg);
            });
          }
        } else {
          this.printLine(`<span class="term-red">Usage: theme [quantum | grid | neural]</span>`);
        }
        break;

      case 'sudo':
        if (arg === 'hire') {
          this.printLine(`
            <div class="term-hire-box">
              <span class="term-green font-bold text-lg">🎉 [PROTOCOL GRANTED] TANMAY NILESH SHINDE RECRUITED!</span><br/>
              Status: Excellent choice! High-impact engineering capacity unlocked.<br/>
              Connecting to priority dispatch: <a href="mailto:${personalInfo.email}" class="term-cyan underline">${personalInfo.email}</a><br/>
              Direct LinkedIn: <a href="${personalInfo.linkedin}" target="_blank" class="term-cyan underline">linkedin.com/in/tanmay-shinde</a>
            </div>
          `);
          sound.playPulse();
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#00f5d4', '#0070f3', '#7928ca', '#ffffff']
          });
        } else {
          this.printLine(`<span class="term-yellow">sudo: user 'guest' is not in the sudoers file. Did you mean 'sudo hire'?</span>`);
        }
        break;

      case 'contact':
        this.printLine(`
          <div class="term-box">
            <span class="term-accent font-bold">COMMUNICATION RADAR:</span><br/>
            📧 Email: <a href="mailto:${personalInfo.email}" class="term-cyan">${personalInfo.email}</a><br/>
            💼 LinkedIn: <a href="${personalInfo.linkedin}" target="_blank" class="term-cyan">${personalInfo.linkedin}</a><br/>
            🐙 GitHub: <a href="${personalInfo.github}" target="_blank" class="term-cyan">${personalInfo.github}</a><br/>
            📍 Location: ${personalInfo.location}
          </div>
        `);
        break;

      case 'clear':
        this.output.innerHTML = '';
        break;

      default:
        this.printLine(`<span class="term-red">Command not recognized: '${escapeHtml(cmd)}'. Type <span class="term-cyan">help</span> for directives.</span>`);
        break;
    }
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
