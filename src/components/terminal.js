import { personalInfo, projects, skillCategories, themesConfig } from '../data/portfolioData.js';
import { sound } from '../audio/audioFx.js';
import confetti from 'canvas-confetti';

export class TerminalController {
  constructor(terminalEl, sceneManager, onThemeChange) {
    this.el = terminalEl;
    this.sceneManager = sceneManager;
    this.onThemeChange = onThemeChange;
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
            (c) 2026 Tanmay Nilesh Shinde. All systems operational.<br/>
            Type <span class="term-cyan">help</span> to list commands or switch theme with <span class="term-yellow">theme &lt;redbull|cricket|gaming&gt;</span>.
          </div>
        </div>
        <div class="terminal-input-row">
          <span class="term-prompt">tanmay@core:~$</span>
          <input type="text" id="term-input" class="term-input" autocomplete="off" spellcheck="false" placeholder="Type a command (try 'help' or 'sudo hire')..."/>
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
    this.printLine(`<span class="term-prompt">tanmay@core:~$</span> ${escapeHtml(rawCmd)}`);
    const parts = rawCmd.toLowerCase().trim().split(/\s+/);
    const cmd = parts[0];
    const arg = parts[1];

    switch (cmd) {
      case 'help':
        this.printLine(`
          <div class="term-grid">
            <div><span class="term-cyan">about</span>       : Engineer bio, ethos & passions</div>
            <div><span class="term-cyan">projects</span>    : Verified live Vercel apps & GitHub repos</div>
            <div><span class="term-cyan">skills</span>      : Tech stack breakdown</div>
            <div><span class="term-cyan">theme &lt;name&gt;</span> : 'redbull', 'cricket', or 'gaming'</div>
            <div><span class="term-cyan">f1</span>          : Max Verstappen & Red Bull Racing telemetry</div>
            <div><span class="term-cyan">cricket</span>     : Match scoreboard & stadium stats</div>
            <div><span class="term-cyan">gaming</span>      : React Nexus 8-in-1 arcade stats</div>
            <div><span class="term-cyan">sudo hire</span>   : Priority hiring dispatch protocol 🎉</div>
            <div><span class="term-cyan">clear</span>       : Purge the terminal buffer</div>
          </div>
        `);
        break;

      case 'about':
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
        let projHtml = `<div class="term-box"><span class="term-accent font-bold">VERIFIED PRODUCTION SYSTEMS (10/10 LIVE):</span><br/><br/>`;
        projects.forEach(p => {
          projHtml += `• <a href="${p.liveUrl}" target="_blank" class="term-cyan underline font-bold">${p.title}</a> [${p.category}]<br/>`;
          projHtml += `  ↳ Live Vercel: <a href="${p.liveUrl}" target="_blank" class="term-green underline">${p.liveUrl}</a><br/>`;
          projHtml += `  ↳ GitHub: <a href="${p.githubUrl}" target="_blank" class="term-accent underline">${p.githubUrl}</a><br/><br/>`;
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

      case 'theme':
        const targetTheme = (arg === 'f1') ? 'redbull' : arg;
        if (targetTheme === 'redbull' || targetTheme === 'cricket' || targetTheme === 'gaming') {
          if (this.onThemeChange) {
            this.onThemeChange(targetTheme);
            this.printLine(`<span class="term-green">✓ Switched active theme to <strong>${themesConfig[targetTheme].name}</strong>!</span>`);
          }
        } else {
          this.printLine(`<span class="term-red">Usage: theme [redbull | cricket | gaming]</span>`);
        }
        break;

      case 'f1':
      case 'redbull':
      case 'max':
        sound.playRedBullF1();
        this.printLine(`
          <div class="term-f1-box">
            <span class="term-yellow font-bold text-base">🏎️ ORACLE RED BULL RACING // MAX VERSTAPPEN #1:</span><br/>
            [DRIVER]: <span class="term-green">Max Verstappen (Car #1)</span> | [TEAM]: Oracle Red Bull Racing<br/>
            [SPEED]: <span class="term-cyan">351.4 km/h</span> | [RPM]: 12,200 | [GEAR]: 8th [DRS ON]<br/>
            [HONDA RBPT]: V6 Turbo Hybrid delivering 1,000+ BHP<br/>
            [PIT WALL STRATEGY]: Box Lap 21 for Hard Compound (Delta: -0.192s PURPLE SECTOR)<br/>
            [SIMULATOR]: "Simply lovely!" 🦁
          </div>
        `);
        break;

      case 'cricket':
        sound.playCricket();
        this.printLine(`
          <div class="term-box">
            <span class="term-green font-bold text-base">🏏 FLOODLIT CRICKET STADIUM // MATCH RADAR:</span><br/>
            [MATCH]: T20 Championship Final (Wankhede Stadium, Mumbai)<br/>
            [CURRENT SCORE]: <span class="term-yellow font-bold">194/3 (17.4 Overs)</span><br/>
            [RUN RATE]: <span class="term-green">10.98 RPO</span> | [PROJECTED]: 228<br/>
            [BALL TELEMETRY]: 148.6 km/h Inswinging Yorker -> Dug out for a <span class="term-cyan font-bold">MONSTROUS SIX! 💥</span><br/>
            [ATMOSPHERE]: 45,000 cheering fans under stadium floodlights!
          </div>
        `);
        break;

      case 'gaming':
      case 'arcade':
        sound.playGaming();
        this.printLine(`
          <div class="term-box">
            <span class="term-accent font-bold text-base">🎮 REACT NEXUS // 8-IN-1 ARCADE HUB:</span><br/>
            [ENGINE]: Scalable React + Framer Motion + Web Audio API<br/>
            [GAMES]: Retro Space Defender, Pong 2026, Cyber Snake, Neon Runner...<br/>
            [HIGH SCORE]: <span class="term-yellow font-bold">999,420 PTS</span> [GLOBAL RANK #1]<br/>
            [FPS]: <span class="term-green">60 FPS Locked</span> | Latency: 0ms Input Lag<br/>
            Play live: <a href="https://reactnexus.vercel.app" target="_blank" class="term-cyan underline">reactnexus.vercel.app</a>
          </div>
        `);
        break;

      case 'sudo':
        if (arg === 'hire') {
          sound.playPulse();
          this.printLine(`
            <div class="term-hire-box">
              <span class="term-yellow font-bold text-lg">🎉 [OFFER PROTOCOL GRANTED] TANMAY NILESH SHINDE RECRUITED!</span><br/>
              Status: Excellent choice! High-impact engineering capacity unlocked.<br/>
              Direct Email: <a href="mailto:${personalInfo.email}" class="term-cyan underline">${personalInfo.email}</a><br/>
              Direct LinkedIn: <a href="${personalInfo.linkedin}" target="_blank" class="term-cyan underline">linkedin.com/in/tanmay-shinde</a>
            </div>
          `);
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ffc800', '#e10600', '#00f57a', '#ffffff']
          });
        } else {
          this.printLine(`<span class="term-yellow">sudo: did you mean 'sudo hire'?</span>`);
        }
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
