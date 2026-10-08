import * as THREE from 'three';
import { sound } from '../audio/audioFx.js';

// Procedural 3D Cricket Stadium Scene with Realistic Ball, Stumps & Physics Bails Smash

export class CricketModel {
  constructor() {
    this.group = new THREE.Group();
    this.bails = [];
    this.stumps = [];
    this.ballState = 'idle'; // 'idle' | 'bowling' | 'hit'
    this.bailPhysics = [];

    this.buildStadium();
    this.buildPitchAndCrease();
    this.buildWicketsAndBails();
    this.buildBat();
    this.buildBall();
  }

  buildStadium() {
    // Stadium Outfield Grass Ring
    const turfGeo = new THREE.CylinderGeometry(8.5, 8.8, 0.2, 48);
    const turfMat = new THREE.MeshStandardMaterial({
      color: 0x09281a,
      roughness: 0.85,
      metalness: 0.1
    });
    const turf = new THREE.Mesh(turfGeo, turfMat);
    turf.position.set(0, -0.1, 0);
    this.group.add(turf);

    // Glowing Stadium Boundary Rope
    const ropeGeo = new THREE.TorusGeometry(8.2, 0.08, 12, 64);
    ropeGeo.rotateX(Math.PI / 2);
    const ropeMat = new THREE.MeshBasicMaterial({ color: 0x00f57a });
    const rope = new THREE.Mesh(ropeGeo, ropeMat);
    rope.position.set(0, 0.04, 0);
    this.group.add(rope);

    // 4 Stadium Floodlight Towers
    const floodlightPositions = [
      { x: -9, z: -9 }, { x: 9, z: -9 },
      { x: -9, z: 9 },  { x: 9, z: 9 }
    ];

    floodlightPositions.forEach(pos => {
      const pGroup = new THREE.Group();
      pGroup.position.set(pos.x, 0, pos.z);

      // Lattice Tower Pylon
      const pylonGeo = new THREE.CylinderGeometry(0.12, 0.25, 12, 8);
      const pylonMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
      const pylon = new THREE.Mesh(pylonGeo, pylonMat);
      pylon.position.y = 6;
      pGroup.add(pylon);

      // Light Bank Frame
      const bankGeo = new THREE.BoxGeometry(1.6, 1.0, 0.3);
      const bankMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const bank = new THREE.Mesh(bankGeo, bankMat);
      bank.position.set(0, 12, 0);
      bank.lookAt(0, 0, 0);
      pGroup.add(bank);

      this.group.add(pGroup);
    });
  }

  buildPitchAndCrease() {
    // 22-Yard Turf Pitch Strip
    const pitchGeo = new THREE.BoxGeometry(2.6, 0.05, 14.0);
    const pitchMat = new THREE.MeshStandardMaterial({
      color: 0x2a3d24, // Worn Clay-Grass Pitch
      roughness: 0.9,
      metalness: 0.05
    });
    const pitch = new THREE.Mesh(pitchGeo, pitchMat);
    pitch.position.set(0, 0.02, 0);
    this.group.add(pitch);

    // White Crease Lines (Popping Crease & Bowling Crease)
    const creaseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    // Popping Crease
    const popGeo = new THREE.BoxGeometry(2.4, 0.06, 0.08);
    const popCrease = new THREE.Mesh(popGeo, creaseMat);
    popCrease.position.set(0, 0.03, -1.8);
    this.group.add(popCrease);

    // Bowling Crease
    const bowlGeo = new THREE.BoxGeometry(2.0, 0.06, 0.08);
    const bowlCrease = new THREE.Mesh(bowlGeo, creaseMat);
    bowlCrease.position.set(0, 0.03, -3.2);
    this.group.add(bowlCrease);
  }

  buildWicketsAndBails() {
    this.wicketsGroup = new THREE.Group();
    this.wicketsGroup.position.set(0, 0, -3.2);

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0xd4a373, // English Ash Wood
      roughness: 0.4,
      metalness: 0.1
    });

    // 3 Stumps (Off, Middle, Leg)
    const stumpGeo = new THREE.CylinderGeometry(0.065, 0.065, 2.4, 16);
    const stumpSpacing = 0.28;

    [-stumpSpacing, 0, stumpSpacing].forEach((xOffset, idx) => {
      const stump = new THREE.Mesh(stumpGeo, woodMat.clone());
      stump.position.set(xOffset, 1.2, 0);
      this.wicketsGroup.add(stump);
      this.stumps.push({ mesh: stump, originX: xOffset, originY: 1.2, originRotX: 0 });
    });

    // 2 Bails Resting on Top Grooves
    const bailGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.32, 12);
    bailGeo.rotateZ(Math.PI / 2);

    const bailOffsets = [-stumpSpacing / 2, stumpSpacing / 2];
    bailOffsets.forEach((xOffset, idx) => {
      const bail = new THREE.Mesh(bailGeo, woodMat.clone());
      bail.position.set(xOffset, 2.44, 0);
      this.wicketsGroup.add(bail);
      this.bails.push({ mesh: bail, originX: xOffset, originY: 2.44, originZ: 0 });
    });

    this.group.add(this.wicketsGroup);
  }

  buildBat() {
    this.batGroup = new THREE.Group();
    this.batGroup.position.set(0.65, 0, -1.6);
    this.batGroup.rotation.y = -0.3;
    this.batGroup.rotation.z = -0.15;

    // Willow Blade
    const bladeGeo = new THREE.BoxGeometry(0.38, 2.2, 0.14);
    const willowMat = new THREE.MeshStandardMaterial({
      color: 0xe2ba8a,
      roughness: 0.5,
      metalness: 0.1
    });
    const blade = new THREE.Mesh(bladeGeo, willowMat);
    blade.position.set(0, 1.1, 0);
    this.batGroup.add(blade);

    // Rubber Cane Grip Handle
    const handleGeo = new THREE.CylinderGeometry(0.07, 0.07, 1.1, 16);
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
    const handle = new THREE.Mesh(handleGeo, gripMat);
    handle.position.set(0, 2.75, 0);
    this.batGroup.add(handle);

    this.group.add(this.batGroup);
  }

  buildBall() {
    this.ballGroup = new THREE.Group();
    this.ballOrigin = new THREE.Vector3(0, 1.8, 6.0);
    this.ballGroup.position.copy(this.ballOrigin);

    // 2-Piece Leather Cricket Ball (Cherry Crimson)
    const ballGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0xa8111b,
      roughness: 0.35,
      metalness: 0.3
    });
    this.ballMesh = new THREE.Mesh(ballGeo, leatherMat);
    this.ballGroup.add(this.ballMesh);

    // Raised Stitched Seam
    const seamGeo = new THREE.TorusGeometry(0.324, 0.02, 12, 48);
    const seamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const seam = new THREE.Mesh(seamGeo, seamMat);
    this.ballGroup.add(seam);

    this.group.add(this.ballGroup);
  }

  // 150 km/h Inswinging Delivery that Smashes Off-Stump
  bowlDelivery() {
    if (this.ballState === 'bowling') return;
    this.ballState = 'bowling';
    sound.playCricket();

    let progress = 0;
    const duration = 1.1; // 1.1 seconds rapid delivery
    const startTime = performance.now();

    const animateBowl = () => {
      const now = performance.now();
      progress = (now - startTime) / (duration * 1000);

      if (progress < 1.0) {
        // Curve trajectory (150 km/h outswinger curve)
        const z = THREE.MathUtils.lerp(6.0, -3.2, progress);
        const y = Math.sin(progress * Math.PI) * 1.2 + 0.3 + (1 - progress) * 1.5;
        const x = Math.sin(progress * Math.PI * 1.5) * 0.4 - 0.28; // Cuts back to hit off-stump!

        this.ballGroup.position.set(x, y, z);
        this.ballGroup.rotation.y += 0.3;
        requestAnimationFrame(animateBowl);
      } else {
        // IMPACT! SMASHES INTO STUMPS!
        this.triggerStumpSmash();
      }
    };

    animateBowl();
  }

  triggerStumpSmash() {
    sound.playPulse();

    // Tilt off-stump back
    const offStump = this.stumps[0].mesh;
    offStump.rotation.x = -0.55;
    offStump.rotation.z = -0.3;

    // Initialize ballistic physics for bails
    this.bailPhysics = [
      {
        mesh: this.bails[0].mesh,
        vx: -0.06 - Math.random() * 0.05,
        vy: 0.18 + Math.random() * 0.08,
        vz: -0.15 - Math.random() * 0.1,
        rx: 0.2, ry: 0.3
      },
      {
        mesh: this.bails[1].mesh,
        vx: 0.08 + Math.random() * 0.05,
        vy: 0.22 + Math.random() * 0.08,
        vz: -0.12 - Math.random() * 0.1,
        rx: -0.25, ry: 0.2
      }
    ];

    setTimeout(() => {
      this.resetStumps();
    }, 4500);
  }

  // Hit Towering 108m Six
  hitSix() {
    if (this.ballState === 'bowling') return;
    this.ballState = 'hit';
    sound.playCricket();

    // Bat swing animation
    this.batGroup.rotation.x = -0.8;
    setTimeout(() => {
      this.batGroup.rotation.x = 0;
    }, 400);

    // Ball rockets into stadium sky
    let step = 0;
    const interval = setInterval(() => {
      step++;
      this.ballGroup.position.y += 0.6;
      this.ballGroup.position.z += 0.4;
      this.ballGroup.position.x += 0.2;

      if (step >= 24) {
        clearInterval(interval);
        setTimeout(() => {
          this.ballGroup.position.copy(this.ballOrigin);
          this.ballState = 'idle';
        }, 1500);
      }
    }, 40);
  }

  resetStumps() {
    this.ballGroup.position.copy(this.ballOrigin);
    this.ballState = 'idle';

    this.stumps.forEach(s => {
      s.mesh.rotation.x = 0;
      s.mesh.rotation.z = 0;
      s.mesh.position.set(s.originX, s.originY, 0);
    });

    this.bails.forEach(b => {
      b.mesh.position.set(b.originX, b.originY, b.originZ);
      b.mesh.rotation.set(0, 0, Math.PI / 2);
    });

    this.bailPhysics = [];
  }

  update(delta, time) {
    // Dynamic bail gravity physics after stump smash
    if (this.bailPhysics.length > 0) {
      this.bailPhysics.forEach(bp => {
        bp.mesh.position.x += bp.vx;
        bp.mesh.position.y += bp.vy;
        bp.mesh.position.z += bp.vz;

        bp.vy -= 0.008; // Gravity

        bp.mesh.rotation.x += bp.rx;
        bp.mesh.rotation.y += bp.ry;

        // Ground bounce clamp
        if (bp.mesh.position.y < 0.1) {
          bp.mesh.position.y = 0.1;
          bp.vy *= -0.3;
          bp.vx *= 0.7;
          bp.vz *= 0.7;
        }
      });
    }

    // Ball seam rotation when idle
    if (this.ballState === 'idle') {
      this.ballGroup.rotation.y += 0.02;
    }
  }
}
