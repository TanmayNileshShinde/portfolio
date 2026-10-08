// Elite Cyber Cursor with Smooth Lerp Physics & Magnetic Hover

export class CyberCursor {
  constructor() {
    // Only enable if pointer device supports hover
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.dot = document.createElement('div');
    this.dot.className = 'cyber-cursor-dot';

    this.ring = document.createElement('div');
    this.ring.className = 'cyber-cursor-ring';

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);

    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.isHovering = false;

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      this.dot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
    });

    window.addEventListener('mousedown', () => {
      this.ring.classList.add('cursor-click');
    });

    window.addEventListener('mouseup', () => {
      this.ring.classList.remove('cursor-click');
    });

    this.setupHoverTargets();
    this.animate();
  }

  setupHoverTargets() {
    const selector = 'a, button, input, .project-card, .mode-btn, .nav-link, .interactive-tag, .chip';
    
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(selector);
      if (target) {
        this.ring.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(selector);
      if (target) {
        this.ring.classList.remove('cursor-hover');
      }
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Lerp follow
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.15;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.15;

    this.ring.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0)`;
  }
}
