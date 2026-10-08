import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { F1CarModel } from './carModel.js';
import { CricketModel } from './cricketModel.js';
import { ArcadeModel } from './arcadeModel.js';
import { ProjectHoloCarousel } from './projectCarousel.js';
import { sound } from '../audio/audioFx.js';

export class SceneManager {
  constructor(canvasContainer, onSelectProject) {
    this.container = canvasContainer;
    this.onSelectProject = onSelectProject;
    this.currentTheme = 'redbull';
    this.clock = new THREE.Clock();
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2(-999, -999);
    this.autoRotate = true;
    this.isWireframe = false;

    this.init();
    this.setupPostProcessing();
    this.setupControls();
    this.createParticles();
    this.createModels();
    this.setupEvents();

    this.setTheme('redbull', false);
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x040817, 0.012);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(0, 4.5, 18);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.container.appendChild(this.renderer.domElement);

    // Dynamic Multi-Point Lighting
    this.ambientLight = new THREE.AmbientLight(0x0a142c, 2.8);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    this.dirLight.position.set(10, 20, 15);
    this.scene.add(this.dirLight);

    this.pointLightMain = new THREE.PointLight(0xffc800, 4.0, 50);
    this.pointLightMain.position.set(12, 10, 12);
    this.scene.add(this.pointLightMain);

    this.pointLightSec = new THREE.PointLight(0xe10600, 3.5, 50);
    this.pointLightSec.position.set(-12, -8, 10);
    this.scene.add(this.pointLightSec);

    this.cursorLight = new THREE.PointLight(0xff5500, 2.5, 30);
    this.scene.add(this.cursorLight);
  }

  setupPostProcessing() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // UnrealBloomPass for Cinematic Neon Glow & Exhaust Flames
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.65, // bloom strength
      0.4,  // radius
      0.82  // threshold
    );
    this.composer.addPass(this.bloomPass);
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 50;
    this.controls.minDistance = 6;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't flip under floor
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1.2;
    this.controls.enableZoom = false; // Keep scroll smooth for page
  }

  createParticles() {
    const particleCount = 2400;
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

  createModels() {
    // 1. Procedural 3D Red Bull F1 Car
    this.f1Car = new F1CarModel();
    this.scene.add(this.f1Car.group);

    // 2. Procedural 3D Cricket Stadium & Stumps
    this.cricket = new CricketModel();
    this.scene.add(this.cricket.group);
    this.cricket.group.visible = false;

    // 3. Procedural 3D Arcade Cabinet
    this.arcade = new ArcadeModel();
    this.scene.add(this.arcade.group);
    this.arcade.group.visible = false;

    // 4. 3D Spatial Holo-Carousel for All 10 Projects
    this.holoCarousel = new ProjectHoloCarousel(this.scene, (proj) => {
      if (this.onSelectProject) this.onSelectProject(proj);
    });
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

      // Dolly camera smoothly down towards project carousel on scroll
      if (scrollProgress > 0.3) {
        this.holoCarousel.group.position.y = -22 + (scrollProgress - 0.3) * 24;
      }
    });

    // Click Raycasting on 3D objects
    this.renderer.domElement.addEventListener('click', (e) => {
      this.raycaster.setFromCamera(this.mouseVector, this.camera);
      
      // Check 3D Carousel Cards first
      const hitProject = this.holoCarousel.checkRaycast(this.raycaster);
      if (hitProject) {
        if (this.onSelectProject) this.onSelectProject(hitProject);
        return;
      }

      // Check Active Theme 3D Model
      if (this.currentTheme === 'redbull') {
        this.f1Car.triggerRev();
        sound.playRedBullF1();
      } else if (this.currentTheme === 'cricket') {
        this.cricket.bowlDelivery();
      } else if (this.currentTheme === 'gaming') {
        this.arcade.pressButton();
      }
    });
  }

  onResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  }

  setTheme(theme, playSound = true) {
    this.currentTheme = theme;
    if (playSound) {
      if (theme === 'redbull') sound.playRedBullF1();
      else if (theme === 'cricket') sound.playCricket();
      else if (theme === 'gaming') sound.playGaming();
    }

    if (this.f1Car) this.f1Car.group.visible = (theme === 'redbull');
    if (this.cricket) this.cricket.group.visible = (theme === 'cricket');
    if (this.arcade) this.arcade.group.visible = (theme === 'gaming');

    // Lights & Fog
    if (theme === 'redbull') {
      this.scene.fog.color.setHex(0x040817);
      this.pointLightMain.color.setHex(0xffc800);
      this.pointLightSec.color.setHex(0xe10600);
      this.cursorLight.color.setHex(0xff5500);
      this.camera.position.set(0, 4.5, 18);
    } else if (theme === 'cricket') {
      this.scene.fog.color.setHex(0x031008);
      this.pointLightMain.color.setHex(0x00f57a);
      this.pointLightSec.color.setHex(0xffd700);
      this.cursorLight.color.setHex(0x0070f3);
      this.camera.position.set(0, 6.0, 22);
    } else if (theme === 'gaming') {
      this.scene.fog.color.setHex(0x090514);
      this.pointLightMain.color.setHex(0xf72585);
      this.pointLightSec.color.setHex(0x4cc9f0);
      this.cursorLight.color.setHex(0x7209b7);
      this.camera.position.set(0, 5.5, 16);
    }

    this.controls.target.set(0, 1.5, 0);
    this.updateParticleColors(theme);
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    this.controls.autoRotate = this.autoRotate;
    return this.autoRotate;
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    this.scene.traverse(child => {
      if (child.isMesh && child.material && !child.userData?.project) {
        child.material.wireframe = this.isWireframe;
      }
    });
    return this.isWireframe;
  }

  triggerCorePulse() {
    sound.playPulse();
    if (this.currentTheme === 'redbull') {
      this.f1Car.triggerRev();
    } else if (this.currentTheme === 'cricket') {
      this.cricket.bowlDelivery();
    } else if (this.currentTheme === 'gaming') {
      this.arcade.pressButton();
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.cursorLight.position.set(this.mouse.x * 25, this.mouse.y * 18, 12);

    // Update controls
    this.controls.update();

    // Starfield particles drift
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * (this.currentTheme === 'redbull' ? 0.03 : 0.015);
      this.particles.rotation.x = this.mouse.y * 0.1;
    }

    // Update active model animations
    if (this.currentTheme === 'redbull' && this.f1Car.group.visible) {
      this.f1Car.update(delta, elapsedTime);
    } else if (this.currentTheme === 'cricket' && this.cricket.group.visible) {
      this.cricket.update(delta, elapsedTime);
    } else if (this.currentTheme === 'gaming' && this.arcade.group.visible) {
      this.arcade.update(delta, elapsedTime);
    }

    // Update 3D Holo-Carousel
    if (this.holoCarousel) {
      this.holoCarousel.update(delta, elapsedTime);
    }

    this.composer.render();
  }
}
