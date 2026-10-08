import * as THREE from 'three';
import { projects } from '../data/portfolioData.js';
import { sound } from '../audio/audioFx.js';

// Interactive 3D Spatial Holo-Carousel for All 10 Production Projects

export class ProjectHoloCarousel {
  constructor(scene, onSelectProject) {
    this.scene = scene;
    this.onSelectProject = onSelectProject;
    this.group = new THREE.Group();
    this.cards = [];
    this.radius = 16.0;
    this.rotationVelocity = 0.003;
    this.isDragging = false;
    this.prevPointerX = 0;

    this.buildCarousel();
    this.setupInteractions();
    this.scene.add(this.group);

    // Initial position in 3D world (stationed at scroll depth)
    this.group.position.set(0, -22, -8);
  }

  buildCarousel() {
    const cardWidth = 4.8;
    const cardHeight = 3.0;
    const count = projects.length;

    projects.forEach((proj, idx) => {
      const angle = (idx / count) * Math.PI * 2;
      const cardGroup = new THREE.Group();

      // Dynamic Canvas Texture for crisp holographic UI
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 320;
      const ctx = canvas.getContext('2d');

      // Background Card Gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 320);
      grad.addColorStop(0, '#0c152e');
      grad.addColorStop(1, '#050a18');
      ctx.fillStyle = grad;
      ctx.roundRect(10, 10, 492, 300, 24);
      ctx.fill();

      // Border Glow
      ctx.lineWidth = 4;
      ctx.strokeStyle = proj.featured ? '#ffc800' : '#00f5d4';
      ctx.stroke();

      // Status Pill
      ctx.fillStyle = proj.featured ? '#ffc800' : '#00f57a';
      ctx.font = 'bold 20px monospace';
      ctx.fillText(proj.featured ? '★ FLAGSHIP LIVE' : '● VERCEL VERIFIED', 40, 55);

      // Project Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(proj.title, 40, 110);

      // Category
      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px sans-serif';
      ctx.fillText(proj.category, 40, 145);

      // Tech Badges
      ctx.fillStyle = '#00f5d4';
      ctx.font = '18px monospace';
      const techStr = proj.tech.slice(0, 3).join(' • ');
      ctx.fillText(techStr, 40, 205);

      // CTA Prompt
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('CLICK TO INSPECT ARCHITECTURE ↗', 40, 275);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;

      // Card Geometry & Material
      const cardGeo = new THREE.PlaneGeometry(cardWidth, cardHeight);
      const cardMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);

      // Position along 3D cylinder circle
      const x = Math.sin(angle) * this.radius;
      const z = Math.cos(angle) * this.radius;

      cardGroup.position.set(x, 0, z);
      cardGroup.lookAt(0, 0, 0); // Face inward/outward
      cardGroup.rotateY(Math.PI); // Orient towards camera

      cardMesh.userData = { project: proj, id: proj.id };
      cardGroup.add(cardMesh);

      // Glowing Glass Rim Border
      const rimGeo = new THREE.BoxGeometry(cardWidth + 0.1, cardHeight + 0.1, 0.05);
      const rimMat = new THREE.MeshBasicMaterial({
        color: proj.featured ? 0xffc800 : 0x00f5d4,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      cardGroup.add(rim);

      this.group.add(cardGroup);
      this.cards.push({ group: cardGroup, mesh: cardMesh, angle, ...proj });
    });
  }

  setupInteractions() {
    window.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.prevPointerX = e.clientX;
    });

    window.addEventListener('pointermove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.prevPointerX;
        this.group.rotation.y += deltaX * 0.005;
        this.prevPointerX = e.clientX;
      }
    });

    window.addEventListener('pointerup', () => {
      this.isDragging = false;
    });
  }

  checkRaycast(raycaster) {
    const meshes = this.cards.map(c => c.mesh);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      document.body.style.cursor = 'pointer';
      return hit.userData.project;
    }
    return null;
  }

  update(delta, time) {
    if (!this.isDragging) {
      this.group.rotation.y += this.rotationVelocity;
    }

    // Gentle floating undulation
    this.cards.forEach((c, idx) => {
      c.group.position.y = Math.sin(time * 2 + idx) * 0.35;
    });
  }
}
