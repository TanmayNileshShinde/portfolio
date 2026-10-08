import { sound } from '../audio/audioFx.js';

export class F1SpecModalController {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.modal = null;
    this.createModal();
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'f1-spec-modal-backdrop';
    this.modal.id = 'f1-spec-modal';
    this.modal.style.display = 'none';

    this.modal.innerHTML = `
      <div class="f1-spec-modal-container glass-panel">
        <header class="f1-spec-modal-header">
          <div class="f1-spec-header-title">
            <span class="telemetry-dot" style="background: #e10600; box-shadow: 0 0 10px #e10600;"></span>
            <div>
              <h3>ORACLE RED BULL RACING // SPECIAL WHITE EDITION (RB20 / HONDA TRIBUTE)</h3>
              <p class="font-mono text-xs text-muted">FIA TECHNICAL PASSPORT & MAX VERSTAPPEN #1 SPECIFICATION</p>
            </div>
          </div>
          <button class="f1-spec-close-btn" id="f1-spec-close" title="Close Dossier">✕</button>
        </header>

        <div class="f1-spec-modal-body">
          <!-- Top Grid: Image + Core Telemetry -->
          <div class="f1-spec-top-grid">
            <div class="f1-spec-img-box">
              <img src="/redbull-white-edition.png" alt="Special White Edition Red Bull F1 Car" class="f1-spec-hero-img" />
              <div class="f1-spec-img-badge font-mono">WHITE HONDA TRIBUTE // CAR #1</div>
            </div>

            <div class="f1-spec-kpi-grid">
              <div class="f1-kpi-card">
                <span class="f1-kpi-label">PEAK POWER</span>
                <span class="f1-kpi-val text-red">1,020+ <small>BHP</small></span>
                <span class="f1-kpi-sub">ICE + MGU-K Hybrid</span>
              </div>
              <div class="f1-kpi-card">
                <span class="f1-kpi-label">TOP VELOCITY</span>
                <span class="f1-kpi-val text-cyan">351.4 <small>km/h</small></span>
                <span class="f1-kpi-sub">DRS Flap Deployed</span>
              </div>
              <div class="f1-kpi-card">
                <span class="f1-kpi-label">0 - 100 KM/H</span>
                <span class="f1-kpi-val text-gold">1.7 <small>sec</small></span>
                <span class="f1-kpi-sub">Pirelli P-Zero Slicks</span>
              </div>
              <div class="f1-kpi-card">
                <span class="f1-kpi-label">PEAK BRAKING</span>
                <span class="f1-kpi-val text-green">5.4 <small>G-Force</small></span>
                <span class="f1-kpi-sub">Carbon-Ceramic Rotors</span>
              </div>
            </div>
          </div>

          <!-- Quick 3D Camera Controls -->
          <div class="f1-spec-cam-toolbar">
            <span class="font-mono text-xs text-muted" style="margin-right: 8px;">3D CAMERA PRESETS:</span>
            <button class="f1-cam-pill" data-cam="photo">📸 STUDIO PHOTO ANGLE</button>
            <button class="f1-cam-pill" data-cam="cockpit">🏎️ COCKPIT POV</button>
            <button class="f1-cam-pill" data-cam="front">🏁 FRONT WING</button>
            <button class="f1-cam-pill" data-cam="side">🔍 SIDEPOD & ORACLE</button>
            <button class="f1-cam-pill" data-cam="diffuser">🔴 FIA RAIN LIGHT</button>
          </div>

          <!-- Deep Aero & Technical Breakdown Tabs -->
          <div class="f1-spec-details-grid">
            <div class="f1-detail-section glass-panel">
              <h4 class="f1-detail-title">🎨 Authentic White Livery & Decal Details</h4>
              <ul class="f1-spec-list">
                <li><strong>Chassis Finish:</strong> Pearl White satin-gloss coat inspired by the historic 1965 Honda RA272 victory livery and 2021 Turkish GP Special White Livery.</li>
                <li><strong>Engine Cover:</strong> Championship Crimson Charging Bull graphic with forward stance and italicized "Red Bull" typography.</li>
                <li><strong>Sidepods:</strong> Adrian Newey sculpted downwash waterslide channels emblazoned with high-contrast black <em>ORACLE</em> branding.</li>
                <li><strong>Upper Shoulder:</strong> Official <em>ROKT</em> and <em>VISA</em> partner insignias along the cockpit sidepods.</li>
                <li><strong>Shark Fin & Nose:</strong> Prominent championship red <strong>#1</strong> (Max Verstappen) and <em>HONDA / HRC</em> power unit badges.</li>
                <li><strong>Rear Wing Endplates:</strong> Carbon black plates featuring <em>Mobil 1</em>, <em>Honda</em>, and <em>Heineken 0.0</em>.</li>
              </ul>
            </div>

            <div class="f1-detail-section glass-panel">
              <h4 class="f1-detail-title">⚡ Aerodynamic & Chassis Engineering</h4>
              <ul class="f1-spec-list">
                <li><strong>Cockpit Safety:</strong> Pearl White Titanium Halo structure with aerodynamic trip vane and Max Verstappen helmet with championship gold visor.</li>
                <li><strong>Side Mirrors:</strong> Aerodynamic winglet mirrors on dual-element carbon stalks directing boundary layer airflow into sidepod radiators.</li>
                <li><strong>Rear Wing & DRS:</strong> High-downforce carbon wing with pneumatically actuated DRS flap reducing drag by 28% for overtaking.</li>
                <li><strong>Rear Diffuser:</strong> 3D sculpted carbon undertray with 4 vertical vortex strakes and ground-effect venturi channels.</li>
                <li><strong>FIA Rain Light:</strong> Pulsing 15-LED high-intensity emergency strobe casting a crimson reflection pool onto the wet studio floor.</li>
                <li><strong>Wheels & Tires:</strong> 18-inch BBS magnesium wheels wrapped in Pirelli P-Zero slick tires featuring signature Yellow Rim Stripes (C3 Hard compound).</li>
              </ul>
            </div>

            <div class="f1-detail-section glass-panel">
              <h4 class="f1-detail-title">🏎️ Honda RBPT Power Unit Architecture</h4>
              <ul class="f1-spec-list">
                <li><strong>Configuration:</strong> 1.6-litre, 90-degree V6 Single-Turbocharged Internal Combustion Engine (ICE).</li>
                <li><strong>Rev Limit:</strong> 15,000 RPM maximum FIA regulated redline.</li>
                <li><strong>Hybrid ERS:</strong> 120 kW (160 BHP) MGU-K (Kinetic) + MGU-H (Heat) with 4MJ/lap lithium-ion energy store.</li>
                <li><strong>Transmission:</strong> 8-speed seamless-shift sequential paddle-shift gearbox with reverse gear.</li>
                <li><strong>Total Vehicle Weight:</strong> 798 kg minimum FIA regulatory weight with driver.</li>
                <li><strong>Driver Championship:</strong> Max Verstappen — 4-time FIA Formula 1 World Drivers' Champion (2021, 2022, 2023, 2024).</li>
              </ul>
            </div>
          </div>
        </div>

        <footer class="f1-spec-modal-footer">
          <button class="btn-primary" id="f1-spec-action-btn">
            🔥 REV HONDA ENGINE & OPEN DRS
          </button>
          <button class="btn-secondary" id="f1-spec-close-secondary">
            Close Technical Sheet
          </button>
        </footer>
      </div>
    `;

    document.body.appendChild(this.modal);
    this.setupListeners();
  }

  setupListeners() {
    this.modal.querySelector('#f1-spec-close').addEventListener('click', () => this.close());
    this.modal.querySelector('#f1-spec-close-secondary').addEventListener('click', () => this.close());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Camera preset buttons
    this.modal.querySelectorAll('.f1-cam-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const cam = btn.dataset.cam;
        if (this.sceneManager) {
          this.sceneManager.setCameraPreset(cam);
        }
      });
    });

    // Rev & DRS button
    this.modal.querySelector('#f1-spec-action-btn').addEventListener('click', () => {
      sound.playRedBullF1();
      if (this.sceneManager && this.sceneManager.f1Car) {
        this.sceneManager.f1Car.triggerRev();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'flex') {
        this.close();
      }
    });
  }

  open() {
    sound.playClick();
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  close() {
    sound.playClick();
    this.modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}
