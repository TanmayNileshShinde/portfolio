import { projects } from '../data/portfolioData.js';
import { sound } from '../audio/audioFx.js';

export class ProjectModalController {
  constructor() {
    this.modalEl = null;
    this.createModalDOM();
  }

  createModalDOM() {
    const modal = document.createElement('div');
    modal.className = 'project-modal-backdrop hidden';
    modal.id = 'project-modal';
    modal.innerHTML = `
      <div class="project-modal-content glass-panel-glow">
        <div class="project-modal-header">
          <div class="modal-badge-group">
            <span class="modal-tag" id="modal-category">CATEGORY</span>
            <span class="modal-status-live">● SYSTEM ACTIVE</span>
          </div>
          <button class="modal-close-btn" id="modal-close" aria-label="Close modal">✕</button>
        </div>
        
        <div class="project-modal-body">
          <h2 class="modal-title" id="modal-title">Project Title</h2>
          <p class="modal-tagline" id="modal-tagline">Tagline goes here</p>
          
          <div class="modal-metrics-grid" id="modal-metrics"></div>

          <div class="modal-section">
            <h4 class="modal-section-title">ENGINEERING OVERVIEW</h4>
            <p class="modal-description" id="modal-description"></p>
          </div>

          <div class="modal-section">
            <h4 class="modal-section-title">SYSTEM ARCHITECTURE</h4>
            <div class="modal-architecture-box" id="modal-architecture"></div>
          </div>

          <div class="modal-section">
            <h4 class="modal-section-title">CORE HIGHLIGHTS</h4>
            <ul class="modal-highlights-list" id="modal-highlights"></ul>
          </div>

          <div class="modal-section">
            <h4 class="modal-section-title">TECHNOLOGY STACK</h4>
            <div class="modal-tech-pills" id="modal-tech"></div>
          </div>
        </div>

        <div class="project-modal-footer">
          <a href="#" target="_blank" rel="noopener noreferrer" class="btn-primary" id="modal-live-link">
            <span>Launch Live Deployment</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" class="btn-secondary" id="modal-github-link">
            <span>Inspect GitHub Repository</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;

    const closeBtn = modal.querySelector('#modal-close');
    closeBtn.addEventListener('click', () => this.close());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modalEl.classList.contains('hidden')) {
        this.close();
      }
    });
  }

  open(projectId) {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    sound.playClick();

    this.modalEl.querySelector('#modal-category').textContent = proj.category;
    this.modalEl.querySelector('#modal-title').textContent = proj.title;
    this.modalEl.querySelector('#modal-tagline').textContent = proj.tagline;
    this.modalEl.querySelector('#modal-description').textContent = proj.description;
    this.modalEl.querySelector('#modal-architecture').textContent = proj.architecture;

    // Metrics
    const metricsContainer = this.modalEl.querySelector('#modal-metrics');
    metricsContainer.innerHTML = '';
    if (proj.metrics) {
      Object.entries(proj.metrics).forEach(([key, val]) => {
        const item = document.createElement('div');
        item.className = 'metric-card';
        item.innerHTML = `
          <div class="metric-key">${key.toUpperCase()}</div>
          <div class="metric-val">${val}</div>
        `;
        metricsContainer.appendChild(item);
      });
    }

    // Highlights
    const hlContainer = this.modalEl.querySelector('#modal-highlights');
    hlContainer.innerHTML = '';
    proj.highlights.forEach(hl => {
      const li = document.createElement('li');
      li.textContent = hl;
      hlContainer.appendChild(li);
    });

    // Tech
    const techContainer = this.modalEl.querySelector('#modal-tech');
    techContainer.innerHTML = '';
    proj.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-pill';
      span.textContent = t;
      techContainer.appendChild(span);
    });

    // Links
    const liveLink = this.modalEl.querySelector('#modal-live-link');
    liveLink.href = proj.liveUrl;
    
    const ghLink = this.modalEl.querySelector('#modal-github-link');
    ghLink.href = proj.githubUrl;

    this.modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  close() {
    sound.playClick();
    this.modalEl.classList.add('hidden');
    document.body.style.overflow = '';
  }
}
