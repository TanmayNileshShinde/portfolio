import * as THREE from 'three';
import { sound } from '../audio/audioFx.js';

export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.currentMode = 'quantum'; // 'quantum' | 'grid' | 'neural'
    this.clock = new THREE.Clock();
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2(-999, -999);
    this.hoveredObject = null;

    this.init();
    this.setupEvents();
    this.createParticles();
    this.createQuantumCore();
    this.createCyberGrid();
    this.createNeuralNetwork();

    this.setMode('quantum');
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060913, 0.015);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 32);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // Dynamic Lighting
    this.ambientLight = new THREE.AmbientLight(0x0a192f, 2.5);
    this.scene.add(this.ambientLight);

    this.pointLightCyan = new THREE.PointLight(0x00f5d4, 4, 60);
    this.pointLightCyan.position.set(15, 10, 15);
    this.scene.add(this.pointLightCyan);

    this.pointLightPurple = new THREE.PointLight(0x7928ca, 4, 60);
    this.pointLightPurple.position.set(-15, -10, 15);
    this.scene.add(this.pointLightPurple);

    this.cursorLight = new THREE.PointLight(0x0070f3, 2, 40);
    this.scene.add(this.cursorLight);
  }

  setupEvents() {
    window.addEventListener('resize', () => this.onResize());

    window.addEventListener('mousemove', (e) => {
      // Normalized device coordinates (-1 to +1)
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;
      
      // Dynamic camera travel along Z & rotation with scroll
      this.camera.position.y = -scrollProgress * 12;
      this.camera.position.z = 32 + Math.sin(scrollProgress * Math.PI) * 6;
    });

    this.container.addEventListener('click', () => {
      this.triggerCorePulse();
    });
  }

  onResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // 1. Background Particle Starfield & Nebula
  createParticles() {
    const particleCount = 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const palette = [
      new THREE.Color(0x00f5d4), // Cyan
      new THREE.Color(0x0070f3), // Electric Blue
      new THREE.Color(0x7928ca), // Violet
      new THREE.Color(0xffffff)  // Diamond White
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      scales[i] = Math.random() * 2.0 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Canvas Circular Dot Texture for crisp glow
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,245,212,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.85,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  // 2. Quantum Core: 3D Holographic Polyhedron with Gyroscopic Orbital Rings
  createQuantumCore() {
    this.quantumGroup = new THREE.Group();
    this.quantumGroup.position.set(0, 0, 0);

    // Inner pulsating core
    const coreGeo = new THREE.SphereGeometry(3.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false
    });
    this.coreSphere = new THREE.Mesh(coreGeo, coreMat);
    this.quantumGroup.add(this.coreSphere);

    // Outer crystalline wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(6.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    this.outerIco = new THREE.Mesh(icoGeo, icoMat);
    this.quantumGroup.add(this.outerIco);

    // Second geodesic cage
    const cageGeo = new THREE.DodecahedronGeometry(8.2, 0);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    this.outerCage = new THREE.Mesh(cageGeo, cageMat);
    this.quantumGroup.add(this.outerCage);

    // 3 Concentric Gyroscopic Rings
    this.rings = [];
    const ringConfigs = [
      { radius: 10.5, tube: 0.08, color: 0x00f5d4, speedX: 0.008, speedY: 0.015, speedZ: 0.005 },
      { radius: 12.5, tube: 0.07, color: 0x0070f3, speedX: -0.012, speedY: 0.006, speedZ: 0.01 },
      { radius: 14.5, tube: 0.06, color: 0x7928ca, speedX: 0.005, speedY: -0.01, speedZ: 0.012 }
    ];

    ringConfigs.forEach((cfg) => {
      const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.7
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.random() * Math.PI;
      ringMesh.rotation.y = Math.random() * Math.PI;
      this.rings.push({ mesh: ringMesh, ...cfg });
      this.quantumGroup.add(ringMesh);
    });

    // Orbiting Satellite Nodes (Holographic Tech Anchors)
    this.satellites = [];
    const satData = [
      { name: 'WebRTC Mesh', color: 0x00f5d4, orbitR: 16, speed: 0.6, yOffset: 2 },
      { name: 'Real-Time Telemetry', color: 0xff007f, orbitR: 18, speed: 0.45, yOffset: -3 },
      { name: '3D WebGL Engines', color: 0x0070f3, orbitR: 19.5, speed: 0.55, yOffset: 4 },
      { name: 'Distributed Cloud', color: 0x7928ca, orbitR: 17, speed: 0.7, yOffset: -2 }
    ];

    satData.forEach((data, idx) => {
      const satGroup = new THREE.Group();
      const satGeo = new THREE.OctahedronGeometry(0.8, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 0.9,
        wireframe: true
      });
      const mesh = new THREE.Mesh(satGeo, satMat);
      satGroup.add(mesh);

      // Mini glow sphere inside
      const glowGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      satGroup.add(glow);

      this.quantumGroup.add(satGroup);
      this.satellites.push({ group: satGroup, mesh, ...data, angle: (idx / satData.length) * Math.PI * 2 });
    });

    this.scene.add(this.quantumGroup);
  }

  // 3. Cyber Grid Horizon Mode: Neon Wireframe Topography Grid
  createCyberGrid() {
    this.gridGroup = new THREE.Group();
    this.gridGroup.position.set(0, -12, -10);
    this.gridGroup.rotation.x = -Math.PI / 2.3;

    const size = 120;
    const segments = 60;
    this.gridGeometry = new THREE.PlaneGeometry(size, size, segments, segments);
    this.gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    this.gridMesh = new THREE.Mesh(this.gridGeometry, this.gridMaterial);
    this.gridGroup.add(this.gridMesh);

    // Floating Cyber Obelisks
    this.obelisks = [];
    for (let i = 0; i < 12; i++) {
      const h = 4 + Math.random() * 8;
      const geo = new THREE.BoxGeometry(1.5, h, 1.5);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x7928ca,
        emissive: 0x0070f3,
        emissiveIntensity: 0.4,
        wireframe: true
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        h / 2
      );
      this.gridGroup.add(mesh);
      this.obelisks.push(mesh);
    }

    this.scene.add(this.gridGroup);
    this.gridGroup.visible = false;
  }

  // 4. Neural Constellation Mode: Interconnected Synaptic Brain Network
  createNeuralNetwork() {
    this.neuralGroup = new THREE.Group();
    const nodeCount = 75;
    this.neuralNodes = [];

    const nodeGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.8
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat.clone());
      node.position.set(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 24
      );
      node.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04
      );
      this.neuralGroup.add(node);
      this.neuralNodes.push(node);
    }

    // Dynamic Line Connections
    this.lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0070f3,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    this.neuralLines = new THREE.Group();
    this.neuralGroup.add(this.neuralLines);

    this.scene.add(this.neuralGroup);
    this.neuralGroup.visible = false;
  }

  setMode(mode) {
    this.currentMode = mode;
    sound.playModeSwitch();

    if (this.quantumGroup) this.quantumGroup.visible = (mode === 'quantum');
    if (this.gridGroup) this.gridGroup.visible = (mode === 'grid');
    if (this.neuralGroup) this.neuralGroup.visible = (mode === 'neural');
  }

  triggerCorePulse() {
    sound.playPulse();
    if (this.outerIco) {
      this.outerIco.scale.set(1.4, 1.4, 1.4);
      setTimeout(() => {
        if (this.outerIco) this.outerIco.scale.set(1, 1, 1);
      }, 350);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth Lerp Mouse Movement
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Light follows mouse
    this.cursorLight.position.set(this.mouse.x * 25, this.mouse.y * 18, 12);

    // Dynamic Particle Starfield Motion
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.02;
      this.particles.rotation.x = this.mouse.y * 0.15;
      this.particles.rotation.z = this.mouse.x * 0.15;
    }

    // Mode 1: Quantum Core Animations
    if (this.currentMode === 'quantum' && this.quantumGroup.visible) {
      // Parallax Tilt
      this.quantumGroup.rotation.y = elapsedTime * 0.15 + this.mouse.x * 0.8;
      this.quantumGroup.rotation.x = this.mouse.y * 0.5;

      // Inner Core Pulse
      const pulseScale = 1 + Math.sin(elapsedTime * 3) * 0.08;
      this.coreSphere.scale.set(pulseScale, pulseScale, pulseScale);

      // Crystalline counter-rotations
      this.outerIco.rotation.x = -elapsedTime * 0.2;
      this.outerIco.rotation.z = elapsedTime * 0.25;

      this.outerCage.rotation.y = -elapsedTime * 0.15;
      this.outerCage.rotation.x = elapsedTime * 0.1;

      // Concentric Rings
      this.rings.forEach((r) => {
        r.mesh.rotation.x += r.speedX;
        r.mesh.rotation.y += r.speedY;
        r.mesh.rotation.z += r.speedZ;
      });

      // Orbiting Satellites
      this.satellites.forEach((sat) => {
        sat.angle += sat.speed * delta;
        sat.group.position.x = Math.cos(sat.angle) * sat.orbitR;
        sat.group.position.z = Math.sin(sat.angle) * sat.orbitR;
        sat.group.position.y = Math.sin(elapsedTime * 2 + sat.angle) * 3 + sat.yOffset;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Raycast Hover check on outerIco
      this.raycaster.setFromCamera(this.mouseVector, this.camera);
      const intersects = this.raycaster.intersectObjects([this.outerIco, ...this.satellites.map(s => s.mesh)]);

      if (intersects.length > 0) {
        if (!this.hoveredObject) {
          this.hoveredObject = intersects[0].object;
          document.body.style.cursor = 'pointer';
          sound.playHover();
        }
      } else {
        if (this.hoveredObject) {
          this.hoveredObject = null;
          document.body.style.cursor = 'default';
        }
      }
    }

    // Mode 2: Cyber Grid Undulation
    if (this.currentMode === 'grid' && this.gridGroup.visible) {
      const pos = this.gridGeometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const wave = Math.sin(u * 0.15 + elapsedTime * 2) * Math.cos(v * 0.15 + elapsedTime * 2) * 2.2;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;
      this.gridGroup.rotation.z = this.mouse.x * 0.2;
    }

    // Mode 3: Neural Constellation Synapses
    if (this.currentMode === 'neural' && this.neuralGroup.visible) {
      this.neuralNodes.forEach((node) => {
        node.position.add(node.velocity);
        if (Math.abs(node.position.x) > 18) node.velocity.x *= -1;
        if (Math.abs(node.position.y) > 12) node.velocity.y *= -1;
        if (Math.abs(node.position.z) > 12) node.velocity.z *= -1;
      });

      // Update connecting line geometry
      while (this.neuralLines.children.length > 0) {
        const obj = this.neuralLines.children[0];
        this.neuralLines.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
      }

      const linePoints = [];
      for (let i = 0; i < this.neuralNodes.length; i++) {
        for (let j = i + 1; j < this.neuralNodes.length; j++) {
          const dist = this.neuralNodes[i].position.distanceTo(this.neuralNodes[j].position);
          if (dist < 7.5) {
            linePoints.push(this.neuralNodes[i].position.clone());
            linePoints.push(this.neuralNodes[j].position.clone());
          }
        }
      }

      if (linePoints.length > 0) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
        const lineSegments = new THREE.LineSegments(lineGeo, this.lineMaterial);
        this.neuralLines.add(lineSegments);
      }

      this.neuralGroup.rotation.y = elapsedTime * 0.08 + this.mouse.x * 0.5;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
