import * as THREE from 'three';

// Procedural 3D Red Bull Racing F1 Car (Max Verstappen #1)
// Ultra-detailed procedural geometry: Aerodynamic chassis, Halo, Front/Rear wings with DRS,
// 4 Pirelli wheels with tire compound stripes, dual exhaust flames, and aerodynamic floor.

export class F1CarModel {
  constructor() {
    this.group = new THREE.Group();
    this.wheels = [];
    this.exhaustParticles = [];
    this.isRevving = false;
    this.drsOpen = false;
    this.speed = 0;

    this.buildCar();
    this.setupExhaustSystem();
  }

  buildCar() {
    // Livery Colors (Oracle Red Bull Racing)
    const navyMat = new THREE.MeshStandardMaterial({
      color: 0x061026,
      roughness: 0.25,
      metalness: 0.85
    });

    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xffc800, // Bull Yellow
      emissive: 0xffa000,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.7
    });

    const redMat = new THREE.MeshStandardMaterial({
      color: 0xe10600, // Red Bull Red
      emissive: 0x990000,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.8
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.6,
      metalness: 0.5,
      wireframe: false
    });

    // 1. Main Monocoque / Nose Cone (Sculpted Long Nose)
    const noseGeo = new THREE.ConeGeometry(0.85, 4.5, 16);
    noseGeo.rotateX(Math.PI / 2);
    const noseMesh = new THREE.Mesh(noseGeo, navyMat);
    noseMesh.position.set(0, 0.45, 3.2);
    noseMesh.scale.set(0.9, 0.5, 1.2);
    this.group.add(noseMesh);

    // Nose Yellow Bull Accent Stripe
    const stripeGeo = new THREE.BoxGeometry(0.35, 0.08, 3.2);
    const stripeMesh = new THREE.Mesh(stripeGeo, yellowMat);
    stripeMesh.position.set(0, 0.72, 3.0);
    this.group.add(stripeMesh);

    // Red Bull #1 Nose Number Plate
    const plateGeo = new THREE.BoxGeometry(0.4, 0.05, 0.5);
    const plateMesh = new THREE.Mesh(plateGeo, redMat);
    plateMesh.position.set(0, 0.74, 4.2);
    this.group.add(plateMesh);

    // 2. Cockpit & Monocoque Body
    const bodyGeo = new THREE.BoxGeometry(1.5, 0.75, 4.2);
    const bodyMesh = new THREE.Mesh(bodyGeo, navyMat);
    bodyMesh.position.set(0, 0.55, 0.2);
    this.group.add(bodyMesh);

    // 3. Sidepods (Air Intakes & Undercut Venturi Channels)
    const sidepodGeo = new THREE.BoxGeometry(0.85, 0.65, 3.0);
    
    // Left Sidepod
    const leftPod = new THREE.Mesh(sidepodGeo, navyMat);
    leftPod.position.set(-1.1, 0.52, 0.2);
    leftPod.rotation.y = 0.08;
    this.group.add(leftPod);

    // Right Sidepod
    const rightPod = new THREE.Mesh(sidepodGeo, navyMat);
    rightPod.position.set(1.1, 0.52, 0.2);
    rightPod.rotation.y = -0.08;
    this.group.add(rightPod);

    // Red Bull Sidepod Accents
    const podAccentGeo = new THREE.BoxGeometry(0.86, 0.12, 2.6);
    const leftAccent = new THREE.Mesh(podAccentGeo, redMat);
    leftAccent.position.set(-1.12, 0.75, 0.2);
    this.group.add(leftAccent);

    const rightAccent = new THREE.Mesh(podAccentGeo, redMat);
    rightAccent.position.set(1.12, 0.75, 0.2);
    this.group.add(rightAccent);

    // 4. Engine Air Intake / Shark Fin
    const sharkFinGeo = new THREE.BoxGeometry(0.08, 0.9, 2.2);
    const sharkFin = new THREE.Mesh(sharkFinGeo, yellowMat);
    sharkFin.position.set(0, 1.25, -0.6);
    this.group.add(sharkFin);

    // Engine Airbox Intake Scoop
    const airboxGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.8, 16);
    const airbox = new THREE.Mesh(airboxGeo, navyMat);
    airbox.position.set(0, 1.15, 0.2);
    this.group.add(airbox);

    // 5. Titanium Halo Structure (Driver Protection)
    const haloLoopGeo = new THREE.TorusGeometry(0.55, 0.06, 8, 24, Math.PI);
    haloLoopGeo.rotateX(-Math.PI / 2);
    const haloMat = new THREE.MeshStandardMaterial({ color: 0x222630, metalness: 0.9, roughness: 0.2 });
    const haloLoop = new THREE.Mesh(haloLoopGeo, haloMat);
    haloLoop.position.set(0, 1.05, 0.7);
    this.group.add(haloLoop);

    const haloPillarGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.65, 8);
    const haloPillar = new THREE.Mesh(haloPillarGeo, haloMat);
    haloPillar.position.set(0, 0.85, 1.25);
    haloPillar.rotation.x = 0.35;
    this.group.add(haloPillar);

    // Max Verstappen Driver Helmet (Championship Gold Visor)
    const helmetGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const helmetMat = new THREE.MeshStandardMaterial({
      color: 0x061026,
      roughness: 0.3
    });
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    helmet.position.set(0, 0.85, 0.6);
    this.group.add(helmet);

    const visorGeo = new THREE.BoxGeometry(0.36, 0.12, 0.22);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0xffc800,
      emissive: 0xffc800,
      emissiveIntensity: 0.7,
      metalness: 0.9,
      roughness: 0.1
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.88, 0.75);
    this.group.add(visor);

    // 6. Front Wing (Multi-tier Aerodynamic Wings with Endplates)
    const fWingMainGeo = new THREE.BoxGeometry(3.6, 0.06, 0.9);
    const fWing = new THREE.Mesh(fWingMainGeo, carbonMat);
    fWing.position.set(0, 0.18, 5.2);
    this.group.add(fWing);

    const fWingFlapGeo = new THREE.BoxGeometry(3.4, 0.04, 0.4);
    const fWingFlap = new THREE.Mesh(fWingFlapGeo, yellowMat);
    fWingFlap.position.set(0, 0.26, 5.0);
    fWingFlap.rotation.x = -0.15;
    this.group.add(fWingFlap);

    // Front Wing Endplates
    const endplateGeo = new THREE.BoxGeometry(0.06, 0.45, 1.0);
    const leftEndplate = new THREE.Mesh(endplateGeo, redMat);
    leftEndplate.position.set(-1.8, 0.35, 5.2);
    this.group.add(leftEndplate);

    const rightEndplate = new THREE.Mesh(endplateGeo, redMat);
    rightEndplate.position.set(1.8, 0.35, 5.2);
    this.group.add(rightEndplate);

    // 7. Rear Wing Assembly with Operable DRS Flap
    const rPillarGeo = new THREE.BoxGeometry(0.08, 0.9, 0.4);
    const leftRPillar = new THREE.Mesh(rPillarGeo, carbonMat);
    leftRPillar.position.set(-0.6, 1.1, -2.1);
    this.group.add(leftRPillar);

    const rightRPillar = new THREE.Mesh(rPillarGeo, carbonMat);
    rightRPillar.position.set(0.6, 1.1, -2.1);
    this.group.add(rightRPillar);

    // Rear Wing Main Plane
    const rWingMainGeo = new THREE.BoxGeometry(2.6, 0.08, 0.65);
    const rWingMain = new THREE.Mesh(rWingMainGeo, navyMat);
    rWingMain.position.set(0, 1.45, -2.2);
    this.group.add(rWingMain);

    // DRS Flap (Animatable Pivot Flap!)
    const drsFlapGeo = new THREE.BoxGeometry(2.5, 0.05, 0.45);
    this.drsMesh = new THREE.Mesh(drsFlapGeo, yellowMat);
    this.drsMesh.position.set(0, 1.62, -2.35);
    this.group.add(this.drsMesh);

    // Rear Wing Endplates
    const rEndplateGeo = new THREE.BoxGeometry(0.06, 0.85, 0.9);
    const leftREndplate = new THREE.Mesh(rEndplateGeo, redMat);
    leftREndplate.position.set(-1.3, 1.4, -2.2);
    this.group.add(leftREndplate);

    const rightREndplate = new THREE.Mesh(rEndplateGeo, redMat);
    rightREndplate.position.set(1.3, 1.4, -2.2);
    this.group.add(rightREndplate);

    // 8. 4 Pirelli High-Performance 3D Wheels
    const wheelConfigs = [
      { name: 'FL', x: -1.75, y: 0.48, z: 3.4, r: 0.55, width: 0.55 },
      { name: 'FR', x: 1.75, y: 0.48, z: 3.4, r: 0.55, width: 0.55 },
      { name: 'RL', x: -1.85, y: 0.55, z: -1.8, r: 0.62, width: 0.72 },
      { name: 'RR', x: 1.85, y: 0.55, z: -1.8, r: 0.62, width: 0.72 }
    ];

    wheelConfigs.forEach(cfg => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(cfg.x, cfg.y, cfg.z);

      // Rubber Tire
      const tireGeo = new THREE.CylinderGeometry(cfg.r, cfg.r, cfg.width, 24);
      tireGeo.rotateZ(Math.PI / 2);
      const tireMat = new THREE.MeshStandardMaterial({
        color: 0x181a20,
        roughness: 0.8,
        metalness: 0.2
      });
      const tireMesh = new THREE.Mesh(tireGeo, tireMat);
      wheelGroup.add(tireMesh);

      // Pirelli Yellow Compound Stripe Rim
      const stripeTorus = new THREE.TorusGeometry(cfg.r * 0.75, 0.035, 8, 24);
      stripeTorus.rotateY(Math.PI / 2);
      const stripeRimMat = new THREE.MeshBasicMaterial({ color: 0xffc800 });
      const stripeRim = new THREE.Mesh(stripeTorus, stripeRimMat);
      stripeRim.position.x = cfg.x > 0 ? (cfg.width / 2 + 0.01) : (-cfg.width / 2 - 0.01);
      wheelGroup.add(stripeRim);

      // Center Wheel Nut
      const nutGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 8);
      nutGeo.rotateZ(Math.PI / 2);
      const nutMat = new THREE.MeshStandardMaterial({ color: 0xe10600, metalness: 0.9 });
      const nut = new THREE.Mesh(nutGeo, nutMat);
      nut.position.x = cfg.x > 0 ? (cfg.width / 2 + 0.02) : (-cfg.width / 2 - 0.02);
      wheelGroup.add(nut);

      // Suspension Wishbones
      const suspGeo = new THREE.CylinderGeometry(0.04, 0.04, Math.abs(cfg.x) - 0.7, 8);
      suspGeo.rotateZ(cfg.x > 0 ? -Math.PI / 2.3 : Math.PI / 2.3);
      const suspMesh = new THREE.Mesh(suspGeo, carbonMat);
      suspMesh.position.set(cfg.x > 0 ? 1.0 : -1.0, 0.45, cfg.z);
      this.group.add(suspMesh);

      this.group.add(wheelGroup);
      this.wheels.push(wheelGroup);
    });

    // 9. Aerodynamic Floor / Venturi Undertray & Rear Diffuser
    const floorGeo = new THREE.BoxGeometry(2.8, 0.06, 5.8);
    const floor = new THREE.Mesh(floorGeo, carbonMat);
    floor.position.set(0, 0.15, 0.6);
    this.group.add(floor);

    // Rear Diffuser strakes
    const diffuserGeo = new THREE.BoxGeometry(1.8, 0.35, 0.8);
    const diffuser = new THREE.Mesh(diffuserGeo, carbonMat);
    diffuser.position.set(0, 0.28, -2.4);
    diffuser.rotation.x = -0.3;
    this.group.add(diffuser);

    // 10. Dual Titanium Exhaust Pipes
    const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x444855, metalness: 0.95, roughness: 0.1 });
    const exGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 16);
    exGeo.rotateX(Math.PI / 2);
    
    const exLeft = new THREE.Mesh(exGeo, exhaustMat);
    exLeft.position.set(-0.16, 0.7, -2.1);
    this.group.add(exLeft);

    const exRight = new THREE.Mesh(exGeo, exhaustMat);
    exRight.position.set(0.16, 0.7, -2.1);
    this.group.add(exRight);

    // Red Bull Showroom Turntable Base
    const turntableGeo = new THREE.CylinderGeometry(6.2, 6.4, 0.2, 48);
    const turntableMat = new THREE.MeshStandardMaterial({
      color: 0x050a18,
      roughness: 0.3,
      metalness: 0.9
    });
    this.turntable = new THREE.Mesh(turntableGeo, turntableMat);
    this.turntable.position.set(0, -0.1, 0.8);
    this.group.add(this.turntable);

    // Glowing Neon Ring on Turntable
    const ringNeonGeo = new THREE.TorusGeometry(6.0, 0.06, 8, 64);
    ringNeonGeo.rotateX(Math.PI / 2);
    const ringNeonMat = new THREE.MeshBasicMaterial({ color: 0xffc800 });
    const ringNeon = new THREE.Mesh(ringNeonGeo, ringNeonMat);
    ringNeon.position.set(0, 0.01, 0.8);
    this.group.add(ringNeon);
  }

  // Exhaust Particle System (Flame & Sparks)
  setupExhaustSystem() {
    this.particleCount = 60;
    const geo = new THREE.BufferGeometry();
    this.posArray = new Float32Array(this.particleCount * 3);
    this.colArray = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      this.posArray[i * 3] = (Math.random() - 0.5) * 0.3;
      this.posArray[i * 3 + 1] = 0.7 + (Math.random() - 0.5) * 0.15;
      this.posArray[i * 3 + 2] = -2.2 - Math.random() * 1.5;

      this.colArray[i * 3] = 1.0;
      this.colArray[i * 3 + 1] = Math.random() * 0.8;
      this.colArray[i * 3 + 2] = 0.0;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(this.posArray, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.colArray, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.35,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.0
    });

    this.exhaustSystem = new THREE.Points(geo, mat);
    this.group.add(this.exhaustSystem);
  }

  // Toggle DRS (Drag Reduction System)
  toggleDRS() {
    this.drsOpen = !this.drsOpen;
    if (this.drsMesh) {
      this.drsMesh.rotation.x = this.drsOpen ? -0.45 : 0;
      this.drsMesh.position.y = this.drsOpen ? 1.72 : 1.62;
    }
    return this.drsOpen;
  }

  // Trigger Full Throttle Rev Burst
  triggerRev() {
    this.isRevving = true;
    this.toggleDRS();
    if (this.exhaustSystem) {
      this.exhaustSystem.material.opacity = 1.0;
    }

    setTimeout(() => {
      this.isRevving = false;
      if (this.drsOpen) this.toggleDRS();
      if (this.exhaustSystem) {
        this.exhaustSystem.material.opacity = 0.0;
      }
    }, 2400);
  }

  update(delta, time) {
    // Wheels rotation
    const spinSpeed = this.isRevving ? 32.0 : 4.0;
    this.wheels.forEach(w => {
      w.rotation.x -= spinSpeed * delta;
    });

    // Exhaust particle animation
    if (this.isRevving && this.exhaustSystem) {
      const pos = this.exhaustSystem.geometry.attributes.position.array;
      for (let i = 0; i < this.particleCount; i++) {
        pos[i * 3 + 2] -= delta * 12.0; // Shoot backward
        pos[i * 3 + 1] += (Math.random() - 0.45) * 0.05;
        pos[i * 3] += (Math.random() - 0.5) * 0.05;

        // Reset particle
        if (pos[i * 3 + 2] < -4.8) {
          pos[i * 3] = (Math.random() - 0.5) * 0.25;
          pos[i * 3 + 1] = 0.7 + (Math.random() - 0.5) * 0.1;
          pos[i * 3 + 2] = -2.2;
        }
      }
      this.exhaustSystem.geometry.attributes.position.needsUpdate = true;
    }
  }
}
