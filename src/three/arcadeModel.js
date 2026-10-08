import * as THREE from 'three';
import { sound } from '../audio/audioFx.js';

// Procedural 3D Cyber Arcade Cabinet (React Nexus 8-in-1 Game Hub)

export class ArcadeModel {
  constructor() {
    this.group = new THREE.Group();
    this.buttons = [];
    this.gems = [];

    this.buildCabinet();
    this.buildControls();
    this.buildScreen();
    this.buildPowerupGems();
  }

  buildCabinet() {
    const cabinetMat = new THREE.MeshStandardMaterial({
      color: 0x0f0b1e,
      roughness: 0.4,
      metalness: 0.8
    });

    const neonTrimMat = new THREE.MeshBasicMaterial({ color: 0xf72585 });
    const cyanTrimMat = new THREE.MeshBasicMaterial({ color: 0x4cc9f0 });

    // 1. Lower Pedestal / Base
    const baseGeo = new THREE.BoxGeometry(4.2, 3.8, 3.2);
    const base = new THREE.Mesh(baseGeo, cabinetMat);
    base.position.set(0, 1.9, 0);
    this.group.add(base);

    // Coin Door (Slanted Front Plate)
    const coinDoorGeo = new THREE.BoxGeometry(2.4, 2.2, 0.1);
    const coinDoorMat = new THREE.MeshStandardMaterial({ color: 0x1a1528, metalness: 0.9, roughness: 0.2 });
    const coinDoor = new THREE.Mesh(coinDoorGeo, coinDoorMat);
    coinDoor.position.set(0, 1.8, 1.62);
    this.group.add(coinDoor);

    // Glowing 25¢ Coin Slots
    [-0.5, 0.5].forEach(x => {
      const slotGeo = new THREE.BoxGeometry(0.3, 0.6, 0.12);
      const slotMat = new THREE.MeshBasicMaterial({ color: 0xffa000 });
      const slot = new THREE.Mesh(slotGeo, slotMat);
      slot.position.set(x, 2.1, 1.66);
      this.group.add(slot);
    });

    // 2. Angled Control Deck Platform
    const deckGeo = new THREE.BoxGeometry(4.4, 0.4, 2.2);
    const deck = new THREE.Mesh(deckGeo, cabinetMat);
    deck.position.set(0, 3.8, 1.4);
    deck.rotation.x = 0.25; // Angled towards player
    this.group.add(deck);

    // 3. Main Upper Cabinet / Screen Housing
    const upperGeo = new THREE.BoxGeometry(4.0, 4.8, 3.0);
    const upper = new THREE.Mesh(upperGeo, cabinetMat);
    upper.position.set(0, 5.8, -0.2);
    this.group.add(upper);

    // 4. Illuminated Marquee Header ("REACT NEXUS")
    const marqueeGeo = new THREE.BoxGeometry(3.9, 1.2, 0.8);
    const marqueeMat = new THREE.MeshStandardMaterial({
      color: 0x7209b7,
      emissive: 0xf72585,
      emissiveIntensity: 0.85
    });
    const marquee = new THREE.Mesh(marqueeGeo, marqueeMat);
    marquee.position.set(0, 8.2, 0.6);
    marquee.rotation.x = -0.15;
    this.group.add(marquee);

    // Neon Side T-Molding Edges
    [-2.12, 2.12].forEach(x => {
      const trimGeo = new THREE.BoxGeometry(0.12, 8.5, 0.15);
      const trim = new THREE.Mesh(trimGeo, neonTrimMat);
      trim.position.set(x, 4.3, 0.2);
      this.group.add(trim);
    });
  }

  buildControls() {
    this.controlsGroup = new THREE.Group();
    this.controlsGroup.position.set(0, 3.9, 1.4);
    this.controlsGroup.rotation.x = 0.25;

    // 3D Ball-top Joystick
    const stickBaseGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.1, 16);
    const stickBaseMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9 });
    const stickBase = new THREE.Mesh(stickBaseGeo, stickBaseMat);
    stickBase.position.set(-1.1, 0.25, 0);
    this.controlsGroup.add(stickBase);

    // Shaft & Ball
    this.stickGroup = new THREE.Group();
    this.stickGroup.position.set(-1.1, 0.3, 0);

    const shaftGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 12);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.95 });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.y = 0.45;
    this.stickGroup.add(shaft);

    const ballGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xe10600,
      emissive: 0xe10600,
      emissiveIntensity: 0.4
    });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.position.y = 0.95;
    this.stickGroup.add(ball);

    this.controlsGroup.add(this.stickGroup);

    // 6 Arcade Push-Buttons (2 Rows of 3)
    const buttonColors = [0xf72585, 0x4cc9f0, 0x00f57a, 0xffd700, 0x7209b7, 0xff5500];
    const buttonOffsets = [
      { x: 0.2, z: -0.25 }, { x: 0.8, z: -0.25 }, { x: 1.4, z: -0.25 },
      { x: 0.2, z: 0.35 },  { x: 0.8, z: 0.35 },  { x: 1.4, z: 0.35 }
    ];

    buttonOffsets.forEach((pos, idx) => {
      const btnGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.16, 16);
      const btnMat = new THREE.MeshStandardMaterial({
        color: buttonColors[idx],
        emissive: buttonColors[idx],
        emissiveIntensity: 0.6
      });
      const btn = new THREE.Mesh(btnGeo, btnMat);
      btn.position.set(pos.x, 0.26, pos.z);
      this.controlsGroup.add(btn);
      this.buttons.push(btn);
    });

    this.group.add(this.controlsGroup);
  }

  buildScreen() {
    // Curved Recessed CRT Screen
    const screenGeo = new THREE.BoxGeometry(3.2, 2.6, 0.2);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0a142c,
      emissive: 0x4cc9f0,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.9
    });
    this.screenMesh = new THREE.Mesh(screenGeo, screenMat);
    this.screenMesh.position.set(0, 5.8, 1.15);
    this.screenMesh.rotation.x = -0.25; // Tilted backwards
    this.group.add(this.screenMesh);

    // Bezel
    const bezelGeo = new THREE.BoxGeometry(3.5, 2.9, 0.25);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x05070e, roughness: 0.6 });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    bezel.position.set(0, 5.8, 1.1);
    bezel.rotation.x = -0.25;
    this.group.add(bezel);
  }

  buildPowerupGems() {
    this.gemsGroup = new THREE.Group();
    const gemGeo = new THREE.OctahedronGeometry(0.35, 0);

    const colors = [0xf72585, 0x4cc9f0, 0x00f57a, 0xffd700];
    for (let i = 0; i < 4; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.85,
        wireframe: true
      });
      const gem = new THREE.Mesh(gemGeo, mat);
      this.gemsGroup.add(gem);
      this.gems.push({ mesh: gem, angle: (i / 4) * Math.PI * 2, yBase: 4.5 + i * 0.8 });
    }

    this.group.add(this.gemsGroup);
  }

  pressButton() {
    sound.playGaming();
    const randomBtn = this.buttons[Math.floor(Math.random() * this.buttons.length)];
    if (randomBtn) {
      randomBtn.position.y -= 0.1;
      setTimeout(() => {
        randomBtn.position.y += 0.1;
      }, 180);
    }

    // Joystick tilt
    if (this.stickGroup) {
      this.stickGroup.rotation.z = (Math.random() - 0.5) * 0.4;
      this.stickGroup.rotation.x = (Math.random() - 0.5) * 0.4;
      setTimeout(() => {
        this.stickGroup.rotation.set(0, 0, 0);
      }, 250);
    }
  }

  update(delta, time) {
    // Screen subtle scanline pulse
    if (this.screenMesh) {
      this.screenMesh.material.emissiveIntensity = 0.45 + Math.sin(time * 6) * 0.08;
    }

    // Orbiting power-up gems
    this.gems.forEach(g => {
      g.angle += delta * 1.5;
      g.mesh.position.x = Math.cos(g.angle) * 3.4;
      g.mesh.position.z = Math.sin(g.angle) * 3.4;
      g.mesh.position.y = g.yBase + Math.sin(time * 2 + g.angle) * 0.4;
      g.mesh.rotation.x += 0.03;
      g.mesh.rotation.y += 0.04;
    });
  }
}
