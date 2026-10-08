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
    this.autoRotate = false; // default false so user enjoys the studio photo perspective
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
    // Dark atmospheric studio haze matching the photo
    this.scene.fog = new THREE.FogExp2(0x060810, 0.015);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    
    // Set initial camera to the exact dramatic rear three-quarter view from the photo!
    this.camera.position.set(-8.5, 6.5, -11.5);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.container.appendChild(this.renderer.domElement);

    // Studio Lighting matching the photo
    this.ambientLight = new THREE.AmbientLight(0x0e1424, 2.6);
    this.scene.add(this.ambientLight);

    // Overhead Key Studio Spotlight (Cool white illuminating pearl white chassis)
    this.dirLight = new THREE.DirectionalLight(0xf2f6ff, 3.2);
    this.dirLight.position.set(-10, 18, -6);
    this.scene.add(this.dirLight);

    // Subtle Cyan Fill Light
    this.pointLightMain = new THREE.PointLight(0x4cc9f0, 2.5, 45);
    this.pointLightMain.position.set(12, 10, 12);
    this.scene.add(this.pointLightMain);

    // Intense Red Reflection Light matching the ground red pool behind rear diffuser
    this.pointLightSec = new THREE.PointLight(0xff0022, 4.5, 30);
    this.pointLightSec.position.set(-2, 0.4, -4.5);
    this.scene.add(this.pointLightSec);

    this.cursorLight = new THREE.PointLight(0xffffff, 1.8, 25);
    this.scene.add(this.cursorLight);
  }

  setupPostProcessing() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // UnrealBloomPass for glowing red FIA rain light and pearl sheen
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.75, // bloom strength
      0.45, // radius
      0.80  // threshold
    );
    this.composer.addPass(this.bloomPass);
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 45;
    this.controls.minDistance = 5;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.05;
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = 1.0;
    this.controls.enableZoom = false; // Smooth page scrolling
    this.controls.target.set(0, 0.8, 0.5);
  }

  createParticles() {
    const particleCount = 2000;
    this.particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    this.particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = Math.random() * 20 - 2; // Ground smoke haze
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
    }

    this.particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particleGeo.setAttribute('color', new THREE.BufferAttribute(this.particleColors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.4)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    this.particleMat = new THREE.PointsMaterial({
      size: 0.8,
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
      palette = [new THREE.Color(0xffffff), new THREE.Color(0xff0022), new THREE.Color(0xffc800), new THREE.Color(0x8892b0)];
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
    // 1. Procedural 3D White Edition Red Bull F1 Car
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

    this.renderer.domElement.addEventListener('click', () => {
      this.raycaster.setFromCamera(this.mouseVector, this.camera);
      
      const hitProject = this.holoCarousel.checkRaycast(this.raycaster);
      if (hitProject) {
        if (this.onSelectProject) this.onSelectProject(hitProject);
        return;
      }

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

    if (theme === 'redbull') {
      this.scene.fog.color.setHex(0x060810);
      this.dirLight.color.setHex(0xf2f6ff);
      this.pointLightMain.color.setHex(0x4cc9f0);
      this.pointLightSec.color.setHex(0xff0022);
      this.camera.position.set(-8.5, 6.5, -11.5); // Rear 3/4 photo angle!
      this.controls.target.set(0, 0.8, 0.5);
    } else if (theme === 'cricket') {
      this.scene.fog.color.setHex(0x031008);
      this.pointLightMain.color.setHex(0x00f57a);
      this.pointLightSec.color.setHex(0xffd700);
      this.camera.position.set(0, 6.0, 22);
      this.controls.target.set(0, 1.2, 0);
    } else if (theme === 'gaming') {
      this.scene.fog.color.setHex(0x090514);
      this.pointLightMain.color.setHex(0xf72585);
      this.pointLightSec.color.setHex(0x4cc9f0);
      this.camera.position.set(0, 5.5, 16);
      this.controls.target.set(0, 4.0, 0);
    }

    this.updateParticleColors(theme);
  }

  // Preset: Reset to the iconic rear 3/4 photo angle
  setPhotoAngle() {
    this.setCameraPreset('photo');
  }

  setCameraPreset(preset) {
    sound.playClick();
    if (this.currentTheme === 'redbull') {
      if (preset === 'photo') {
        this.camera.position.set(-8.5, 6.5, -11.5);
        this.controls.target.set(0, 0.8, 0.5);
      } else if (preset === 'cockpit') {
        this.camera.position.set(0, 1.45, 0.95);
        this.controls.target.set(0, 0.7, 4.5);
      } else if (preset === 'front') {
        this.camera.position.set(0, 2.2, 9.5);
        this.controls.target.set(0, 0.6, 1.5);
      } else if (preset === 'side') {
        this.camera.position.set(-11.0, 2.5, 0.5);
        this.controls.target.set(0, 0.8, 0.5);
      } else if (preset === 'diffuser') {
        this.camera.position.set(0, 1.6, -7.5);
        this.controls.target.set(0, 0.5, -1.0);
      }
    } else if (this.currentTheme === 'cricket') {
      this.camera.position.set(0, 6.0, 22);
      this.controls.target.set(0, 1.2, 0);
    } else {
      this.camera.position.set(0, 5.5, 16);
      this.controls.target.set(0, 4.0, 0);
    }
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

    this.controls.update();

    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.015;
    }

    if (this.currentTheme === 'redbull' && this.f1Car.group.visible) {
      this.f1Car.update(delta, elapsedTime);
    } else if (this.currentTheme === 'cricket' && this.cricket.group.visible) {
      this.cricket.update(delta, elapsedTime);
    } else if (this.currentTheme === 'gaming' && this.arcade.group.visible) {
      this.arcade.update(delta, elapsedTime);
    }

    if (this.holoCarousel) {
      this.holoCarousel.update(delta, elapsedTime);
    }

    this.composer.render();
  }
}
