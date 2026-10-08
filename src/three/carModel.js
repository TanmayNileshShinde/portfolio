import * as THREE from 'three';

// Ultra-Detailed Procedural 3D White Edition Oracle Red Bull Racing F1 Car
// Inspired by the iconic Honda Tribute White Livery (Max Verstappen #1)
// Featuring Pearl White bodywork, Crimson Charging Bull decals, Oracle sidepod downwash channels,
// Halo cockpit, detailed Pirelli P-Zero tires, DRS rear wing, and glowing FIA rain light.

export class F1CarModel {
  constructor() {
    this.group = new THREE.Group();
    this.wheels = [];
    this.isRevving = false;
    this.drsOpen = false;
    this.exhaustParticles = [];

    this.createDecalTextures();
    this.buildWhiteRedBull();
    this.setupFIAEmergencyRainLight();
    this.setupExhaustSystem();
  }

  // Generate crisp procedural canvas textures for the authentic White Red Bull livery
  createDecalTextures() {
    // 1. Engine Cover: Crimson Charging Bull Graphic + "Red Bull" cursive
    const bullCanvas = document.createElement('canvas');
    bullCanvas.width = 512;
    bullCanvas.height = 256;
    const bCtx = bullCanvas.getContext('2d');
    bCtx.clearRect(0, 0, 512, 256);

    // Draw stylized charging bull silhouette in Championship Crimson
    bCtx.fillStyle = '#e10600';
    bCtx.beginPath();
    // Bull body curve
    bCtx.moveTo(380, 110);
    bCtx.bezierCurveTo(340, 60, 270, 70, 230, 95);
    bCtx.bezierCurveTo(190, 80, 140, 110, 110, 150);
    bCtx.bezierCurveTo(150, 160, 200, 145, 240, 160);
    bCtx.bezierCurveTo(280, 180, 340, 185, 380, 140);
    bCtx.closePath();
    bCtx.fill();

    // Bull horns
    bCtx.beginPath();
    bCtx.moveTo(380, 105);
    bCtx.quadraticCurveTo(420, 80, 440, 60);
    bCtx.quadraticCurveTo(410, 85, 385, 100);
    bCtx.fill();

    // Bull legs forward charge
    bCtx.beginPath();
    bCtx.moveTo(250, 160);
    bCtx.lineTo(290, 210);
    bCtx.lineTo(310, 210);
    bCtx.lineTo(280, 160);
    bCtx.fill();

    bCtx.beginPath();
    bCtx.moveTo(140, 145);
    bCtx.lineTo(105, 195);
    bCtx.lineTo(125, 195);
    bCtx.lineTo(160, 145);
    bCtx.fill();

    // "Red Bull" text in red
    bCtx.fillStyle = '#e10600';
    bCtx.font = 'bold italic 38px "Space Grotesk", sans-serif';
    bCtx.fillText('Red Bull', 180, 235);

    this.bullTexture = new THREE.CanvasTexture(bullCanvas);

    // 2. Sidepod Undercut: Bold "ORACLE" typography + ROKT / VISA
    const oracleCanvas = document.createElement('canvas');
    oracleCanvas.width = 512;
    oracleCanvas.height = 128;
    const oCtx = oracleCanvas.getContext('2d');
    oCtx.clearRect(0, 0, 512, 128);
    oCtx.fillStyle = '#0f141f'; // Deep slate carbon text
    oCtx.font = '900 68px "Syne", sans-serif';
    oCtx.fillText('ORACLE', 30, 85);
    this.oracleTexture = new THREE.CanvasTexture(oracleCanvas);

    // 3. Sidepod Shoulder: ROKT & VISA (from photo)
    const roktCanvas = document.createElement('canvas');
    roktCanvas.width = 256;
    roktCanvas.height = 128;
    const rCtx = roktCanvas.getContext('2d');
    rCtx.clearRect(0, 0, 256, 128);
    rCtx.fillStyle = '#0f141f';
    rCtx.font = '900 32px "Syne", sans-serif';
    rCtx.fillText('ROKT', 20, 50);
    rCtx.fillStyle = '#1a237e'; // Visa Blue
    rCtx.font = 'bold 24px sans-serif';
    rCtx.fillText('VISA', 140, 50);
    this.roktTexture = new THREE.CanvasTexture(roktCanvas);

    // 4. Shark Fin: Red "#1" + "HONDA / HRC"
    const finCanvas = document.createElement('canvas');
    finCanvas.width = 256;
    finCanvas.height = 128;
    const fCtx = finCanvas.getContext('2d');
    fCtx.clearRect(0, 0, 256, 128);
    fCtx.fillStyle = '#e10600';
    fCtx.font = '900 70px "Syne", sans-serif';
    fCtx.fillText('1', 30, 80);
    fCtx.fillStyle = '#0f141f';
    fCtx.font = 'bold 24px monospace';
    fCtx.fillText('HONDA', 100, 60);
    fCtx.fillText('HRC', 100, 88);
    this.finTexture = new THREE.CanvasTexture(finCanvas);

    // 5. Rear Wing Endplate Decals (Mobil 1 / Honda / Tag)
    const wingCanvas = document.createElement('canvas');
    wingCanvas.width = 256;
    wingCanvas.height = 256;
    const wCtx = wingCanvas.getContext('2d');
    wCtx.clearRect(0, 0, 256, 256);
    wCtx.fillStyle = '#ffffff';
    wCtx.font = '900 32px sans-serif';
    wCtx.fillText('Mobil 1', 20, 60);
    wCtx.fillStyle = '#e10600';
    wCtx.font = 'bold 26px sans-serif';
    wCtx.fillText('HONDA', 20, 110);
    wCtx.fillStyle = '#00f57a';
    wCtx.font = 'bold 20px monospace';
    wCtx.fillText('Heineken 0.0', 20, 160);
    this.wingTexture = new THREE.CanvasTexture(wingCanvas);
  }

  buildWhiteRedBull() {
    // Materials Palette matching the Special White Livery Image
    const pearlWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf6f7fa, // Pearl White body
      roughness: 0.18,
      metalness: 0.45
    });

    const crimsonMat = new THREE.MeshStandardMaterial({
      color: 0xe10600, // Championship Bull Crimson
      roughness: 0.25,
      metalness: 0.7
    });

    const carbonBlackMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e14, // Carbon fiber undertray & wings
      roughness: 0.65,
      metalness: 0.4
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xd8dde6,
      roughness: 0.3,
      metalness: 0.9
    });

    // 1. Long Aerodynamic Sculpted Nosecone
    const noseGeo = new THREE.ConeGeometry(0.85, 4.8, 20);
    noseGeo.rotateX(Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, pearlWhiteMat);
    nose.position.set(0, 0.48, 3.4);
    nose.scale.set(0.88, 0.48, 1.25);
    this.group.add(nose);

    // Front Nose Number 1 Badge
    const noseNumGeo = new THREE.BoxGeometry(0.35, 0.04, 0.45);
    const noseNum = new THREE.Mesh(noseNumGeo, crimsonMat);
    noseNum.position.set(0, 0.75, 4.4);
    this.group.add(noseNum);

    // Thin Crimson Pinstripe along the nose centerline
    const noseStripeGeo = new THREE.BoxGeometry(0.06, 0.05, 3.6);
    const noseStripe = new THREE.Mesh(noseStripeGeo, crimsonMat);
    noseStripe.position.set(0, 0.74, 3.0);
    this.group.add(noseStripe);

    // 2. Monocoque Chassis & Cockpit Surround
    const chassisGeo = new THREE.BoxGeometry(1.45, 0.76, 4.3);
    const chassis = new THREE.Mesh(chassisGeo, pearlWhiteMat);
    chassis.position.set(0, 0.56, 0.3);
    this.group.add(chassis);

    // 3. Sculpted Sidepods with Downwash "Waterslide" Channels
    // Left Sidepod
    const podGeo = new THREE.BoxGeometry(0.88, 0.7, 3.4);
    const leftPod = new THREE.Mesh(podGeo, pearlWhiteMat);
    leftPod.position.set(-1.12, 0.54, 0.3);
    leftPod.rotation.y = 0.07;
    this.group.add(leftPod);

    // Right Sidepod
    const rightPod = new THREE.Mesh(podGeo, pearlWhiteMat);
    rightPod.position.set(1.12, 0.54, 0.3);
    rightPod.rotation.y = -0.07;
    this.group.add(rightPod);

    // Radiator Triangular Air Intake Mouths
    const intakeGeo = new THREE.BoxGeometry(0.75, 0.5, 0.2);
    const intakeMat = new THREE.MeshBasicMaterial({ color: 0x05070a });
    const leftIntake = new THREE.Mesh(intakeGeo, intakeMat);
    leftIntake.position.set(-1.12, 0.58, 2.0);
    this.group.add(leftIntake);

    const rightIntake = new THREE.Mesh(intakeGeo, intakeMat);
    rightIntake.position.set(1.12, 0.58, 2.0);
    this.group.add(rightIntake);

    // Sidepod Decal Planes: Bold "ORACLE" branding (as seen in photo)
    const oraclePlaneGeo = new THREE.PlaneGeometry(2.6, 0.65);
    const oracleMat = new THREE.MeshBasicMaterial({
      map: this.oracleTexture,
      transparent: true,
      side: THREE.DoubleSide
    });

    const leftOracle = new THREE.Mesh(oraclePlaneGeo, oracleMat);
    leftOracle.position.set(-1.58, 0.56, 0.3);
    leftOracle.rotation.y = -Math.PI / 2 + 0.07;
    this.group.add(leftOracle);

    const rightOracle = new THREE.Mesh(oraclePlaneGeo, oracleMat);
    rightOracle.position.set(1.58, 0.56, 0.3);
    rightOracle.rotation.y = Math.PI / 2 - 0.07;
    this.group.add(rightOracle);

    // Sidepod Shoulder Decal: ROKT & VISA
    const roktPlaneGeo = new THREE.PlaneGeometry(1.6, 0.45);
    const roktMat = new THREE.MeshBasicMaterial({
      map: this.roktTexture,
      transparent: true,
      side: THREE.DoubleSide
    });

    const leftRokt = new THREE.Mesh(roktPlaneGeo, roktMat);
    leftRokt.position.set(-1.42, 0.88, 0.4);
    leftRokt.rotation.y = -Math.PI / 2 + 0.07;
    this.group.add(leftRokt);

    const rightRokt = new THREE.Mesh(roktPlaneGeo, roktMat);
    rightRokt.position.set(1.42, 0.88, 0.4);
    rightRokt.rotation.y = Math.PI / 2 - 0.07;
    this.group.add(rightRokt);

    // 4. Engine Cover with Massive Crimson Charging Bull Decals (From Photo!)
    const engineCoverGeo = new THREE.BoxGeometry(1.0, 1.1, 3.2);
    const engineCover = new THREE.Mesh(engineCoverGeo, pearlWhiteMat);
    engineCover.position.set(0, 1.1, -0.6);
    this.group.add(engineCover);

    // Left Charging Bull Decal Plane
    const bullPlaneGeo = new THREE.PlaneGeometry(2.8, 1.4);
    const bullMat = new THREE.MeshBasicMaterial({
      map: this.bullTexture,
      transparent: true,
      side: THREE.DoubleSide
    });

    const leftBull = new THREE.Mesh(bullPlaneGeo, bullMat);
    leftBull.position.set(-0.52, 1.15, -0.6);
    leftBull.rotation.y = -Math.PI / 2;
    this.group.add(leftBull);

    // Right Charging Bull Decal Plane
    const rightBull = new THREE.Mesh(bullPlaneGeo, bullMat);
    rightBull.position.set(0.52, 1.15, -0.6);
    rightBull.rotation.y = Math.PI / 2;
    this.group.add(rightBull);

    // 5. Shark Fin Stabilizer with Red #1 & HONDA / HRC (From Photo!)
    const sharkFinGeo = new THREE.BoxGeometry(0.06, 0.95, 2.4);
    const sharkFin = new THREE.Mesh(sharkFinGeo, pearlWhiteMat);
    sharkFin.position.set(0, 1.7, -0.9);
    this.group.add(sharkFin);

    // Shark Fin Decal (Red #1 & Honda)
    const finPlaneGeo = new THREE.PlaneGeometry(1.6, 0.8);
    const finMat = new THREE.MeshBasicMaterial({
      map: this.finTexture,
      transparent: true,
      side: THREE.DoubleSide
    });

    const leftFinDecal = new THREE.Mesh(finPlaneGeo, finMat);
    leftFinDecal.position.set(-0.04, 1.7, -0.9);
    leftFinDecal.rotation.y = -Math.PI / 2;
    this.group.add(leftFinDecal);

    const rightFinDecal = new THREE.Mesh(finPlaneGeo, finMat);
    rightFinDecal.position.set(0.04, 1.7, -0.9);
    rightFinDecal.rotation.y = Math.PI / 2;
    this.group.add(rightFinDecal);

    // Engine Airbox Intake (Above Driver Helmet)
    const airboxGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.9, 16);
    const airbox = new THREE.Mesh(airboxGeo, pearlWhiteMat);
    airbox.position.set(0, 1.45, 0.4);
    this.group.add(airbox);

    const airboxHoleGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.3, 16);
    airboxHoleGeo.rotateX(Math.PI / 2);
    const airboxHole = new THREE.Mesh(airboxHoleGeo, intakeMat);
    airboxHole.position.set(0, 1.6, 0.8);
    this.group.add(airboxHole);

    // 6. Pearl White Titanium Halo & Cockpit
    const haloGeo = new THREE.TorusGeometry(0.58, 0.07, 10, 24, Math.PI);
    haloGeo.rotateX(-Math.PI / 2);
    const halo = new THREE.Mesh(haloGeo, pearlWhiteMat);
    halo.position.set(0, 1.15, 0.85);
    this.group.add(halo);

    const haloPillarGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.72, 8);
    const haloPillar = new THREE.Mesh(haloPillarGeo, pearlWhiteMat);
    haloPillar.position.set(0, 0.9, 1.4);
    haloPillar.rotation.x = 0.35;
    this.group.add(haloPillar);

    // Black Aerodynamic Air Vane on Top of Halo
    const haloVaneGeo = new THREE.BoxGeometry(0.65, 0.03, 0.15);
    const haloVane = new THREE.Mesh(haloVaneGeo, carbonBlackMat);
    haloVane.position.set(0, 1.25, 0.85);
    this.group.add(haloVane);

    // Driver: Max Verstappen Helmet inside Cockpit
    const helmetGeo = new THREE.SphereGeometry(0.34, 16, 16);
    const helmetMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    helmet.position.set(0, 0.92, 0.7);
    this.group.add(helmet);

    // Championship Gold Visor
    const visorGeo = new THREE.BoxGeometry(0.38, 0.12, 0.24);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0xffc800,
      emissive: 0xffc800,
      emissiveIntensity: 0.8,
      metalness: 0.9
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.96, 0.86);
    this.group.add(visor);

    // F1 Steering Wheel with Digital Telemetry Display
    const wheelFrameGeo = new THREE.BoxGeometry(0.42, 0.28, 0.06);
    const wheelFrameMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const wheelFrame = new THREE.Mesh(wheelFrameGeo, wheelFrameMat);
    wheelFrame.position.set(0, 0.82, 1.1);
    wheelFrame.rotation.x = -0.3;
    this.group.add(wheelFrame);

    const lcdGeo = new THREE.BoxGeometry(0.24, 0.12, 0.02);
    const lcdMat = new THREE.MeshBasicMaterial({ color: 0x00f57a });
    const lcd = new THREE.Mesh(lcdGeo, lcdMat);
    lcd.position.set(0, 0.83, 1.13);
    lcd.rotation.x = -0.3;
    this.group.add(lcd);

    // 7. Aerodynamic Wing Mirrors on Sidepod Shoulders (From Photo!)
    [-1.0, 1.0].forEach(x => {
      const mirrorGroup = new THREE.Group();
      mirrorGroup.position.set(x, 1.02, 1.3);

      const stalkGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8);
      const stalk = new THREE.Mesh(stalkGeo, carbonBlackMat);
      stalk.rotation.z = x > 0 ? 0.3 : -0.3;
      mirrorGroup.add(stalk);

      const mirrorHousingGeo = new THREE.BoxGeometry(0.32, 0.16, 0.12);
      const mirrorHousing = new THREE.Mesh(mirrorHousingGeo, pearlWhiteMat);
      mirrorHousing.position.set(x > 0 ? 0.12 : -0.12, 0.18, 0);
      mirrorGroup.add(mirrorHousing);

      this.group.add(mirrorGroup);
    });

    // 8. Front Wing Assembly (Cascades, Carbon Flaps, Red Endplates)
    const fWingMainGeo = new THREE.BoxGeometry(3.8, 0.07, 1.0);
    const fWing = new THREE.Mesh(fWingMainGeo, carbonBlackMat);
    fWing.position.set(0, 0.18, 5.4);
    this.group.add(fWing);

    // Pearl White Front Wing Flap with Red Bull Red Accent
    const fFlapGeo = new THREE.BoxGeometry(3.6, 0.04, 0.45);
    const fFlap = new THREE.Mesh(fFlapGeo, pearlWhiteMat);
    fFlap.position.set(0, 0.28, 5.2);
    fFlap.rotation.x = -0.16;
    this.group.add(fFlap);

    // Front Wing Vertical Endplates
    [-1.9, 1.9].forEach(x => {
      const epGeo = new THREE.BoxGeometry(0.06, 0.48, 1.1);
      const ep = new THREE.Mesh(epGeo, crimsonMat);
      ep.position.set(x, 0.38, 5.4);
      this.group.add(ep);
    });

    // 9. Carbon Black Rear Wing with Operable DRS Flap
    // Pylons
    [-0.55, 0.55].forEach(x => {
      const pylonGeo = new THREE.BoxGeometry(0.06, 1.1, 0.45);
      const pylon = new THREE.Mesh(pylonGeo, carbonBlackMat);
      pylon.position.set(x, 1.25, -2.4);
      this.group.add(pylon);
    });

    // Main Carbon Rear Wing Plane
    const rWingGeo = new THREE.BoxGeometry(2.7, 0.08, 0.75);
    const rWing = new THREE.Mesh(rWingGeo, carbonBlackMat);
    rWing.position.set(0, 1.55, -2.5);
    this.group.add(rWing);

    // DRS Flap (Operable Pivot!)
    const drsGeo = new THREE.BoxGeometry(2.6, 0.05, 0.5);
    this.drsMesh = new THREE.Mesh(drsGeo, pearlWhiteMat);
    this.drsMesh.position.set(0, 1.76, -2.65);
    this.group.add(this.drsMesh);

    // Rear Wing Endplates with Red Accent & Sponsor Decals (Mobil 1 / Honda)
    const wingDecalMat = new THREE.MeshBasicMaterial({
      map: this.wingTexture,
      transparent: true,
      side: THREE.DoubleSide
    });
    const wingDecalGeo = new THREE.PlaneGeometry(0.85, 0.85);

    [-1.38, 1.38].forEach(x => {
      const repGeo = new THREE.BoxGeometry(0.06, 0.95, 0.95);
      const rep = new THREE.Mesh(repGeo, carbonBlackMat);
      rep.position.set(x, 1.52, -2.5);
      this.group.add(rep);

      // Outer endplate sponsor decal
      const decal = new THREE.Mesh(wingDecalGeo, wingDecalMat);
      decal.position.set(x > 0 ? (x + 0.035) : (x - 0.035), 1.52, -2.5);
      decal.rotation.y = x > 0 ? (Math.PI / 2) : (-Math.PI / 2);
      this.group.add(decal);
    });

    // 10. 4 Pirelli High-Performance 3D Wheels (P Zero Slick with Yellow Rim Stripe)
    const wheelConfigs = [
      { name: 'FL', x: -1.78, y: 0.48, z: 3.5, r: 0.55, width: 0.55 },
      { name: 'FR', x: 1.78, y: 0.48, z: 3.5, r: 0.55, width: 0.55 },
      { name: 'RL', x: -1.88, y: 0.56, z: -1.9, r: 0.64, width: 0.74 },
      { name: 'RR', x: 1.88, y: 0.56, z: -1.9, r: 0.64, width: 0.74 }
    ];

    wheelConfigs.forEach(cfg => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(cfg.x, cfg.y, cfg.z);

      // Deep Rubber Tire (P Zero Slick)
      const tireGeo = new THREE.CylinderGeometry(cfg.r, cfg.r, cfg.width, 24);
      tireGeo.rotateZ(Math.PI / 2);
      const tireMat = new THREE.MeshStandardMaterial({
        color: 0x14161c,
        roughness: 0.85,
        metalness: 0.15
      });
      const tire = new THREE.Mesh(tireGeo, tireMat);
      wheelGroup.add(tire);

      // Pirelli Yellow Compound Stripe Rim (From Photo!)
      const stripeTorus = new THREE.TorusGeometry(cfg.r * 0.78, 0.038, 8, 28);
      stripeTorus.rotateY(Math.PI / 2);
      const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffc800 });
      const stripe = new THREE.Mesh(stripeTorus, stripeMat);
      stripe.position.x = cfg.x > 0 ? (cfg.width / 2 + 0.01) : (-cfg.width / 2 - 0.01);
      wheelGroup.add(stripe);

      // Multi-spoke Aero Wheel Cover
      const rimGeo = new THREE.CylinderGeometry(cfg.r * 0.72, cfg.r * 0.72, 0.04, 16);
      rimGeo.rotateZ(Math.PI / 2);
      const rimCoverMat = new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.85 });
      const rim = new THREE.Mesh(rimGeo, rimCoverMat);
      rim.position.x = cfg.x > 0 ? (cfg.width / 2 + 0.005) : (-cfg.width / 2 - 0.005);
      wheelGroup.add(rim);

      // Center Wheel Nut (Red Bull Red)
      const nutGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 8);
      nutGeo.rotateZ(Math.PI / 2);
      const nutMat = new THREE.MeshStandardMaterial({ color: 0xe10600, metalness: 0.95 });
      const nut = new THREE.Mesh(nutGeo, nutMat);
      nut.position.x = cfg.x > 0 ? (cfg.width / 2 + 0.03) : (-cfg.width / 2 - 0.03);
      wheelGroup.add(nut);

      // Glowing Carbon Ceramic Brake Rotor (Inner Wheel Glow)
      const rotorGeo = new THREE.CylinderGeometry(cfg.r * 0.6, cfg.r * 0.6, 0.1, 16);
      rotorGeo.rotateZ(Math.PI / 2);
      const rotorMat = new THREE.MeshStandardMaterial({
        color: 0x330000,
        emissive: 0xff2200,
        emissiveIntensity: 0.4
      });
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.position.x = cfg.x > 0 ? 0.05 : -0.05;
      wheelGroup.add(rotor);

      // Carbon Suspension Wishbones
      const suspGeo = new THREE.CylinderGeometry(0.045, 0.045, Math.abs(cfg.x) - 0.7, 8);
      suspGeo.rotateZ(cfg.x > 0 ? -Math.PI / 2.3 : Math.PI / 2.3);
      const susp = new THREE.Mesh(suspGeo, carbonBlackMat);
      susp.position.set(cfg.x > 0 ? 1.05 : -1.05, 0.48, cfg.z);
      this.group.add(susp);

      this.group.add(wheelGroup);
      this.wheels.push(wheelGroup);
    });

    // 11. Carbon Undertray, Floor Edge Winglets & Rear Diffuser
    const floorGeo = new THREE.BoxGeometry(2.9, 0.06, 6.2);
    const floor = new THREE.Mesh(floorGeo, carbonBlackMat);
    floor.position.set(0, 0.14, 0.6);
    this.group.add(floor);

    // Floor Edge Curved Winglets (Managing Tyre Squirt Airflow)
    [-1.48, 1.48].forEach(x => {
      const edgeGeo = new THREE.BoxGeometry(0.06, 0.16, 3.8);
      const edge = new THREE.Mesh(edgeGeo, carbonBlackMat);
      edge.position.set(x, 0.22, 0.6);
      this.group.add(edge);
    });

    // Aggressive Rear Diffuser
    const diffuserGeo = new THREE.BoxGeometry(2.0, 0.45, 1.0);
    const diffuser = new THREE.Mesh(diffuserGeo, carbonBlackMat);
    diffuser.position.set(0, 0.32, -2.6);
    diffuser.rotation.x = -0.32;
    this.group.add(diffuser);

    // 4 Vertical Carbon Diffuser Strakes / Vortex Fences (from photo)
    [-0.7, -0.24, 0.24, 0.7].forEach(fx => {
      const strakeGeo = new THREE.BoxGeometry(0.04, 0.38, 0.95);
      const strake = new THREE.Mesh(strakeGeo, carbonBlackMat);
      strake.position.set(fx, 0.30, -2.6);
      strake.rotation.x = -0.32;
      this.group.add(strake);
    });

    // 12. Moody Studio Turntable Platform (Asphalt / Carbon Reflection from Image)
    const turntableGeo = new THREE.CylinderGeometry(7.2, 7.5, 0.25, 48);
    const turntableMat = new THREE.MeshStandardMaterial({
      color: 0x080b14,
      roughness: 0.35,
      metalness: 0.8
    });
    this.turntable = new THREE.Mesh(turntableGeo, turntableMat);
    this.turntable.position.set(0, -0.12, 0.8);
    this.group.add(this.turntable);

    // Glowing Subtle Ground Studio Ring
    const ringNeonGeo = new THREE.TorusGeometry(7.0, 0.05, 8, 64);
    ringNeonGeo.rotateX(Math.PI / 2);
    const ringNeonMat = new THREE.MeshBasicMaterial({ color: 0xe10600 });
    const ringNeon = new THREE.Mesh(ringNeonGeo, ringNeonMat);
    ringNeon.position.set(0, 0.02, 0.8);
    this.group.add(ringNeon);

    // 13. Crimson Ground Reflection Puddle (Exact Match to Photo's Red Ground Glow!)
    const puddleCanvas = document.createElement('canvas');
    puddleCanvas.width = 256;
    puddleCanvas.height = 256;
    const pCtx = puddleCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    pGrad.addColorStop(0, 'rgba(255, 0, 34, 0.95)');
    pGrad.addColorStop(0.3, 'rgba(255, 0, 34, 0.6)');
    pGrad.addColorStop(0.7, 'rgba(225, 6, 0, 0.2)');
    pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 256, 256);

    const puddleTex = new THREE.CanvasTexture(puddleCanvas);
    const puddleGeo = new THREE.PlaneGeometry(3.6, 3.6);
    puddleGeo.rotateX(-Math.PI / 2);
    this.puddleMat = new THREE.MeshBasicMaterial({
      map: puddleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.groundPuddle = new THREE.Mesh(puddleGeo, this.puddleMat);
    this.groundPuddle.position.set(0, 0.03, -3.2);
    this.group.add(this.groundPuddle);
  }

  // Intense Red FIA Rain Light on Rear Diffuser (Prominently featured in user's image!)
  setupFIAEmergencyRainLight() {
    this.rainLightGroup = new THREE.Group();
    this.rainLightGroup.position.set(0, 0.38, -2.7);

    // LED Housing
    const housingGeo = new THREE.BoxGeometry(0.36, 0.20, 0.08);
    const housingMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const housing = new THREE.Mesh(housingGeo, housingMat);
    this.rainLightGroup.add(housing);

    // 15-LED Matrix (3 Rows of 5 LEDs) matching authentic F1 specification
    this.ledMat = new THREE.MeshBasicMaterial({ color: 0xff0022 });
    for (let row = -1; row <= 1; row++) {
      for (let col = -2; col <= 2; col++) {
        const dotGeo = new THREE.BoxGeometry(0.045, 0.045, 0.02);
        const dot = new THREE.Mesh(dotGeo, this.ledMat);
        dot.position.set(col * 0.06, row * 0.055, -0.045);
        this.rainLightGroup.add(dot);
      }
    }

    // Point Light casting the vibrant red reflection on the ground (from the photo!)
    this.rainPointLight = new THREE.PointLight(0xff0022, 4.5, 12.0);
    this.rainPointLight.position.set(0, 0.2, -3.2);
    this.group.add(this.rainPointLight);

    this.group.add(this.rainLightGroup);
  }

  // Exhaust Particle System
  setupExhaustSystem() {
    this.particleCount = 70;
    const geo = new THREE.BufferGeometry();
    this.posArray = new Float32Array(this.particleCount * 3);
    this.colArray = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      this.posArray[i * 3] = (Math.random() - 0.5) * 0.3;
      this.posArray[i * 3 + 1] = 0.75 + (Math.random() - 0.5) * 0.15;
      this.posArray[i * 3 + 2] = -2.3 - Math.random() * 1.5;

      this.colArray[i * 3] = 1.0;
      this.colArray[i * 3 + 1] = Math.random() * 0.6;
      this.colArray[i * 3 + 2] = 0.0;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(this.posArray, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(this.colArray, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.38,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.0
    });

    this.exhaustSystem = new THREE.Points(geo, mat);
    this.group.add(this.exhaustSystem);
  }

  toggleDRS() {
    this.drsOpen = !this.drsOpen;
    if (this.drsMesh) {
      this.drsMesh.rotation.x = this.drsOpen ? -0.45 : 0;
      this.drsMesh.position.y = this.drsOpen ? 1.86 : 1.76;
    }
    return this.drsOpen;
  }

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

    // FIA Rain Light authentic pulse/blink
    const blink = (Math.sin(time * 14) > 0);
    if (this.ledMat) {
      this.ledMat.color.setHex(blink ? 0xff0022 : 0x440008);
    }
    if (this.rainPointLight) {
      this.rainPointLight.intensity = blink ? (this.isRevving ? 6.0 : 4.2) : 0.6;
    }
    if (this.puddleMat) {
      this.puddleMat.opacity = blink ? (this.isRevving ? 0.95 : 0.75) : 0.2;
    }

    // Exhaust particle animation
    if (this.isRevving && this.exhaustSystem) {
      const pos = this.exhaustSystem.geometry.attributes.position.array;
      for (let i = 0; i < this.particleCount; i++) {
        pos[i * 3 + 2] -= delta * 14.0;
        pos[i * 3 + 1] += (Math.random() - 0.45) * 0.06;
        pos[i * 3] += (Math.random() - 0.5) * 0.06;

        if (pos[i * 3 + 2] < -5.2) {
          pos[i * 3] = (Math.random() - 0.5) * 0.25;
          pos[i * 3 + 1] = 0.75 + (Math.random() - 0.5) * 0.1;
          pos[i * 3 + 2] = -2.3;
        }
      }
      this.exhaustSystem.geometry.attributes.position.needsUpdate = true;
    }
  }
}
