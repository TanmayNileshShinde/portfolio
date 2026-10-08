import * as THREE from 'three';
import { sound } from '../audio/audioFx.js';

export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.currentTheme = 'redbull'; // 'redbull' | 'cricket' | 'gaming'
    this.clock = new THREE.Clock();
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2(-999, -999);

    this.init();
    this.setupEvents();
    this.createParticles();
    this.createRedBullF1Scene();
    this.createCricketScene();
    this.createGamingScene();

    this.setTheme('redbull', false);
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x040714, 0.015);

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
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // Dynamic Lighting
    this.ambientLight = new THREE.AmbientLight(0x0a142c, 2.5);
    this.scene.add(this.ambientLight);

    this.pointLightMain = new THREE.PointLight(0xffc800, 4.5, 70);
    this.pointLightMain.position.set(16, 12, 16);
    this.scene.add(this.pointLightMain);

    this.pointLightSec = new THREE.PointLight(0xe10600, 3.5, 60);
    this.pointLightSec.position.set(-16, -10, 14);
    this.scene.add(this.pointLightSec);

    this.cursorLight = new THREE.PointLight(0xff5500, 2.5, 45);
    this.scene.add(this.cursorLight);
  }

  setupEvents() {
    window.addEventListener('resize', () => this.onResize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      this.mouseVector.x = this.mouse.targetX;
      this.mouseVector.y = this.mouse.targetY;
    });

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;
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

  // Particle Starfield with dynamic theme palette
  createParticles() {
    const particleCount = 2200;
    this.particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    this.particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }

    this.particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particleGeo.setAttribute('color', new THREE.BufferAttribute(this.particleColors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,200,0,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    this.particleMat = new THREE.PointsMaterial({
      size: 0.9,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(this.particleGeo, this.particleMat);
    this.scene.add(this.particles);

    this.updateParticleColors('redbull');
  }

  updateParticleColors(theme) {
    let palette;
    if (theme === 'redbull') {
      palette = [new THREE.Color(0xffc800), new THREE.Color(0xe10600), new THREE.Color(0xff5500), new THREE.Color(0x0070f3)];
    } else if (theme === 'cricket') {
      palette = [new THREE.Color(0x00f57a), new THREE.Color(0xffd700), new THREE.Color(0xffffff), new THREE.Color(0x0070f3)];
    } else {
      palette = [new THREE.Color(0xf72585), new THREE.Color(0x4cc9f0), new THREE.Color(0x7209b7), new THREE.Color(0x00ff66)];
    }

    const count = this.particleColors.length / 3;
    for (let i = 0; i < count; i++) {
      const col = palette[Math.floor(Math.random() * palette.length)];
      this.particleColors[i * 3] = col.r;
      this.particleColors[i * 3 + 1] = col.g;
      this.particleColors[i * 3 + 2] = col.b;
    }
    this.particleGeo.attributes.color.needsUpdate = true;
  }

  // ==========================================
  // THEME 1: 🏎️ F1 / Max Verstappen Red Bull Core
  // ==========================================
  createRedBullF1Scene() {
    this.f1Group = new THREE.Group();

    // Central Bull Core Sphere (Pulsating Racing Gold)
    const coreGeo = new THREE.SphereGeometry(3.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffc800,
      emissive: 0xff5500,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.9
    });
    this.f1Core = new THREE.Mesh(coreGeo, coreMat);
    this.f1Group.add(this.f1Core);

    // Crystalline Aerodynamic Wing Cage
    const cageGeo = new THREE.IcosahedronGeometry(6.4, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xffc800,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    this.f1Cage = new THREE.Mesh(cageGeo, cageMat);
    this.f1Group.add(this.f1Cage);

    // 3 Concentric High-Speed Aero Vortex Rings
    this.f1Rings = [];
    const ringConfigs = [
      { r: 10.5, tube: 0.08, col: 0xffc800, speedX: 0.02, speedY: 0.03 },
      { r: 13.0, tube: 0.07, col: 0xe10600, speedX: -0.025, speedY: 0.015 },
      { r: 15.5, tube: 0.06, col: 0x0070f3, speedX: 0.015, speedY: -0.02 }
    ];

    ringConfigs.forEach(cfg => {
      const ringGeo = new THREE.TorusGeometry(cfg.r, cfg.tube, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: cfg.col, transparent: true, opacity: 0.8 });
      const mesh = new THREE.Mesh(ringGeo, ringMat);
      mesh.rotation.x = Math.random() * Math.PI;
      this.f1Group.add(mesh);
      this.f1Rings.push({ mesh, ...cfg });
    });

    // Orbiting Max Verstappen #1 Satellite Node
    const mvSatGeo = new THREE.OctahedronGeometry(1.2, 0);
    const mvSatMat = new THREE.MeshStandardMaterial({
      color: 0xffc800,
      emissive: 0xff5500,
      emissiveIntensity: 0.9,
      wireframe: true
    });
    this.mvSat = new THREE.Mesh(mvSatGeo, mvSatMat);
    this.f1Group.add(this.mvSat);

    this.scene.add(this.f1Group);
  }

  // ==========================================
  // THEME 2: 🏏 Cricket Champions / Stadium Core
  // ==========================================
  createCricketScene() {
    this.cricketGroup = new THREE.Group();

    // 3D Leather Cricket Ball (Deep Crimson with White Seam)
    const ballGeo = new THREE.SphereGeometry(3.6, 32, 32);
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xa8111b, // Cherry Red Leather
      emissive: 0x550009,
      emissiveIntensity: 0.4,
      roughness: 0.35,
      metalness: 0.4
    });
    this.cricketBall = new THREE.Mesh(ballGeo, ballMat);
    this.cricketGroup.add(this.cricketBall);

    // Raised White Seam Stitches Ring
    const seamGeo = new THREE.TorusGeometry(3.64, 0.12, 16, 120);
    const seamMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    this.cricketSeam = new THREE.Mesh(seamGeo, seamMat);
    this.cricketGroup.add(this.cricketSeam);

    // Stadium Floodlit Boundary Rings
    this.cricketRings = [];
    const boundConfigs = [
      { r: 10.0, col: 0x00f57a, speed: 0.015 },
      { r: 13.5, col: 0xffd700, speed: -0.012 },
      { r: 16.5, col: 0x0070f3, speed: 0.018 }
    ];

    boundConfigs.forEach(cfg => {
      const geo = new THREE.TorusGeometry(cfg.r, 0.07, 16, 100);
      const mat = new THREE.MeshBasicMaterial({ color: cfg.col, transparent: true, opacity: 0.75 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = Math.PI / 2.4;
      this.cricketGroup.add(mesh);
      this.cricketRings.push({ mesh, ...cfg });
    });

    // Orbiting Golden 6-Run Boundary Satellite
    const sixGeo = new THREE.DodecahedronGeometry(0.9, 0);
    const sixMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 0.9,
      wireframe: true
    });
    this.sixSat = new THREE.Mesh(sixGeo, sixMat);
    this.cricketGroup.add(this.sixSat);

    this.scene.add(this.cricketGroup);
    this.cricketGroup.visible = false;
  }

  // ==========================================
  // THEME 3: 🎮 Cyber Gaming Arcade / Nexus Core
  // ==========================================
  createGamingScene() {
    this.gamingGroup = new THREE.Group();

    // Floating Arcade Hyper-Cube
    const cubeGeo = new THREE.BoxGeometry(4.5, 4.5, 4.5);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0xf72585,
      emissive: 0x7209b7,
      emissiveIntensity: 0.7,
      wireframe: true
    });
    this.gamingCube = new THREE.Mesh(cubeGeo, cubeMat);
    this.gamingGroup.add(this.gamingCube);

    // Inner Glowing Shield Sphere
    const shieldGeo = new THREE.SphereGeometry(2.4, 24, 24);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x4cc9f0,
      emissive: 0x4cc9f0,
      emissiveIntensity: 0.8
    });
    this.gamingShield = new THREE.Mesh(shieldGeo, shieldMat);
    this.gamingGroup.add(this.gamingShield);

    // Synthwave Undulating Grid Floor
    const gridGeo = new THREE.PlaneGeometry(100, 100, 50, 50);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x4cc9f0,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.gamingGrid = new THREE.Mesh(gridGeo, gridMat);
    this.gamingGrid.position.set(0, -14, -10);
    this.gamingGrid.rotation.x = -Math.PI / 2.3;
    this.gamingGroup.add(this.gamingGrid);

    // Concentric Neon Arcade Rings
    this.gamingRings = [];
    const ringCfg = [
      { r: 10.5, col: 0xf72585, speed: 0.02 },
      { r: 13.5, col: 0x4cc9f0, speed: -0.015 }
    ];
    ringCfg.forEach(cfg => {
      const geo = new THREE.TorusGeometry(cfg.r, 0.08, 16, 90);
      const mat = new THREE.MeshBasicMaterial({ color: cfg.col, transparent: true, opacity: 0.75 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = Math.random() * Math.PI;
      this.gamingGroup.add(mesh);
      this.gamingRings.push({ mesh, ...cfg });
    });

    this.scene.add(this.gamingGroup);
    this.gamingGroup.visible = false;
  }

  // Switch Active Theme
  setTheme(theme, playSound = true) {
    this.currentTheme = theme;
    if (playSound) {
      if (theme === 'redbull') sound.playRedBullF1();
      else if (theme === 'cricket') sound.playCricket();
      else if (theme === 'gaming') sound.playGaming();
    }

    if (this.f1Group) this.f1Group.visible = (theme === 'redbull');
    if (this.cricketGroup) this.cricketGroup.visible = (theme === 'cricket');
    if (this.gamingGroup) this.gamingGroup.visible = (theme === 'gaming');

    // Update lights
    if (theme === 'redbull') {
      this.scene.fog.color.setHex(0x040714);
      this.pointLightMain.color.setHex(0xffc800);
      this.pointLightSec.color.setHex(0xe10600);
      this.cursorLight.color.setHex(0xff5500);
    } else if (theme === 'cricket') {
      this.scene.fog.color.setHex(0x031008);
      this.pointLightMain.color.setHex(0x00f57a);
      this.pointLightSec.color.setHex(0xffd700);
      this.cursorLight.color.setHex(0x0070f3);
    } else if (theme === 'gaming') {
      this.scene.fog.color.setHex(0x090514);
      this.pointLightMain.color.setHex(0xf72585);
      this.pointLightSec.color.setHex(0x4cc9f0);
      this.cursorLight.color.setHex(0x7209b7);
    }

    this.updateParticleColors(theme);
  }

  triggerCorePulse() {
    sound.playPulse();
    if (this.currentTheme === 'redbull' && this.f1Cage) {
      this.f1Cage.scale.set(1.4, 1.4, 1.4);
      setTimeout(() => this.f1Cage && this.f1Cage.scale.set(1, 1, 1), 300);
    } else if (this.currentTheme === 'cricket' && this.cricketBall) {
      this.cricketBall.scale.set(1.3, 1.3, 1.3);
      setTimeout(() => this.cricketBall && this.cricketBall.scale.set(1, 1, 1), 300);
    } else if (this.currentTheme === 'gaming' && this.gamingCube) {
      this.gamingCube.scale.set(1.4, 1.4, 1.4);
      setTimeout(() => this.gamingCube && this.gamingCube.scale.set(1, 1, 1), 300);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.cursorLight.position.set(this.mouse.x * 25, this.mouse.y * 18, 12);

    // Particles Drift
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * (this.currentTheme === 'redbull' ? 0.04 : 0.02);
      this.particles.rotation.x = this.mouse.y * 0.15;
    }

    // THEME 1: F1 Red Bull Animations
    if (this.currentTheme === 'redbull' && this.f1Group.visible) {
      this.f1Group.rotation.y = elapsedTime * 0.25 + this.mouse.x * 0.8;
      this.f1Group.rotation.x = this.mouse.y * 0.5;

      const pScale = 1 + Math.sin(elapsedTime * 4) * 0.08;
      this.f1Core.scale.set(pScale, pScale, pScale);

      this.f1Cage.rotation.x = -elapsedTime * 0.3;
      this.f1Cage.rotation.z = elapsedTime * 0.35;

      this.f1Rings.forEach(r => {
        r.mesh.rotation.x += r.speedX;
        r.mesh.rotation.y += r.speedY;
      });

      // Max Verstappen Satellite Orbit
      const satAngle = elapsedTime * 1.5;
      this.mvSat.position.set(Math.cos(satAngle) * 17, Math.sin(satAngle * 2) * 3, Math.sin(satAngle) * 17);
      this.mvSat.rotation.x += 0.03;
      this.mvSat.rotation.y += 0.04;
    }

    // THEME 2: Cricket Ball Seam & Boundary Rotation
    if (this.currentTheme === 'cricket' && this.cricketGroup.visible) {
      // Fast Seam Spin like an express 150 km/h outswinger!
      this.cricketGroup.rotation.y = elapsedTime * 1.8 + this.mouse.x * 0.4;
      this.cricketGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.35;
      this.cricketGroup.rotation.x = this.mouse.y * 0.4;

      this.cricketRings.forEach(r => {
        r.mesh.rotation.z += r.speed;
      });

      const sixAngle = elapsedTime * 0.9;
      this.sixSat.position.set(Math.cos(sixAngle) * 16, Math.sin(elapsedTime * 2) * 4, Math.sin(sixAngle) * 16);
      this.sixSat.rotation.y += 0.03;
    }

    // THEME 3: Gaming Hyper-Cube & Floor
    if (this.currentTheme === 'gaming' && this.gamingGroup.visible) {
      this.gamingGroup.rotation.y = elapsedTime * 0.3 + this.mouse.x * 0.6;
      this.gamingGroup.rotation.x = this.mouse.y * 0.4;

      this.gamingCube.rotation.x += 0.02;
      this.gamingCube.rotation.y += 0.025;

      const sScale = 1 + Math.sin(elapsedTime * 3) * 0.1;
      this.gamingShield.scale.set(sScale, sScale, sScale);

      this.gamingRings.forEach(r => {
        r.mesh.rotation.x += r.speed;
        r.mesh.rotation.y += r.speed;
      });
    }

    this.renderer.render(this.scene, this.camera);
  }
}
