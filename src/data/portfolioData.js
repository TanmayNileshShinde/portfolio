export const personalInfo = {
  name: "Tanmay Nilesh Shinde",
  title: "Full-Stack Architect & 3D Web Engineer",
  tagline: "Engineering hyper-scalable real-time architectures, distributed systems, and immersive WebGL experiences.",
  email: "tanmaynileshshinde@gmail.com",
  github: "https://github.com/TanmayNileshShinde",
  linkedin: "https://www.linkedin.com/in/tanmay-shinde-9b07753bb",
  location: "Mumbai, India",
  status: "Available for Elite Engineering Roles & High-Impact Contracts",
  bio: `I am Tanmay Nilesh Shinde, a Computer Engineering graduate and full-stack software engineer who bridges high-throughput backend infrastructure with cinematic, high-performance web experiences. Passionate about Formula 1 telemetry (die-hard Max Verstappen & Oracle Red Bull Racing fan inspired by the Special White Livery), competitive Cricket, and retro-modern Game Engineering, I build web systems that are lightning fast, scalable, and visually unforgettable.`,
  stats: [
    { label: "Verified Production Apps", value: "10+" },
    { label: "Live Vercel Deployments", value: "100%" },
    { label: "Average Mesh Latency", value: "<30ms" },
    { label: "WebGL FPS Target", value: "60 FPS" }
  ]
};

export const projects = [
  {
    id: "collabclass",
    title: "CollabClass",
    category: "Real-Time / WebSockets",
    tagline: "Real-Time Video Conferencing & Synchronized EdTech Canvas",
    description: "A flagship collaborative platform combining peer-to-peer WebRTC video rooms with zero-latency synchronized whiteboard canvases and distributed code collaboration. Engineered with resilient state synchronization across distributed clients.",
    tech: ["React", "WebRTC", "Firebase", "Tailwind CSS", "Canvas API"],
    liveUrl: "https://collabnclass.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/collabnclass",
    featured: true,
    metrics: {
      latency: "< 45ms P2P Mesh",
      resolution: "1080p 60FPS Stream",
      concurrency: "Multi-Peer Sync"
    },
    highlights: [
      "Peer-to-peer WebRTC mesh network with dynamic STUN/TURN fallback",
      "Vector-based collaborative canvas with multi-user cursor tracking",
      "Integrated live code editor with synchronized syntax highlighting",
      "Ephemeral room state management backed by Firebase Realtime DB"
    ],
    architecture: "WebRTC Mesh Architecture + Firebase Presence & Signal Broker"
  },
  {
    id: "reactnexus",
    title: "React Nexus",
    category: "Full-Stack Arcades",
    tagline: "8-in-1 Retro-Modern Arcade Portal & High-Speed Game Engine",
    description: "An interactive arcade universe featuring eight custom-built playable mini-games with dynamic collision physics, global real-time cloud leaderboards, particle visualizers, and zero-latency state machines.",
    tech: ["React", "Firebase Realtime DB", "Framer Motion", "Vite", "Web Audio API"],
    liveUrl: "https://reactnexus.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/react-nexus",
    featured: true,
    metrics: {
      games: "8 Full Mini-Games",
      fps: "60 FPS Locked",
      sync: "Atomic Cloud Sync"
    },
    highlights: [
      "Custom 2D collision detection and procedural arcade physics engines",
      "Global real-time competitive leaderboard using atomic Firebase transactions",
      "Micro-animations and haptic sound synthesis via Framer Motion & Web Audio",
      "Instant responsive controls supporting keyboard, gamepad, and touch gestures"
    ],
    architecture: "Componentized State Machines + Atomic Cloud Leaderboards"
  },
  {
    id: "voice-notes-vault",
    title: "Voice Notes Vault",
    category: "Security & AI",
    tagline: "AI-Powered Real-Time Audio Transcription & Semantic Cloud Vault",
    description: "A responsive speech-to-text intelligence vault with real-time waveform visualization, automatic semantic categorization, and instantaneous cloud synchronization.",
    tech: ["React 19", "Firebase", "Web Speech API", "Tailwind CSS v4"],
    liveUrl: "https://voice-notes-vault.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/voice-notes-vault",
    featured: true,
    metrics: {
      recognition: "98% Speech Accuracy",
      audioBuffer: "Real-time FFT",
      sync: "Instant Cloud Firestore"
    },
    highlights: [
      "Live canvas audio spectrum analyzer powered by Web Audio AnalyserNode",
      "Continuous asynchronous speech transcription with smart punctuation",
      "Semantic tagging engine categorizing notes into searchable domains",
      "Offline-first caching with automatic background synchronization"
    ],
    architecture: "Web Audio FFT Pipeline + Cloud Firestore Realtime Store"
  },
  {
    id: "sleep-sentinel",
    title: "Sleep Sentinel Cloud",
    category: "Telemetry & IoT",
    tagline: "Biometric Circadian Telemetry & Emergency Alert Dispatch",
    description: "An IoT-connected wellness sentinel that monitors sleep cycles, correlates environmental sensory inputs, and triggers autonomous emergency dispatches via Twilio and Firebase.",
    tech: ["React", "Firebase Admin", "Twilio API", "Node.js", "IoT Telemetry"],
    liveUrl: "https://sleep-sentinel-cloud.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/sleep-sentinel-cloud",
    featured: true,
    metrics: {
      alertLatency: "< 2s SMS/Call",
      samplingRate: "Continuous Sensor Log",
      uptime: "99.9% Cloud Watchdog"
    },
    highlights: [
      "Integration with automated Twilio telephony dispatch for urgent anomalies",
      "Deep circadian trend analysis visualizer with threshold-based triggers",
      "Serverless cloud cron jobs analyzing sleep quality degradation",
      "Secure webhook architecture with HMAC signature validation"
    ],
    architecture: "Firebase Cloud Functions + Twilio Telephony Pipeline"
  },
  {
    id: "clipsync",
    title: "ClipSync Pro",
    category: "Real-Time / WebSockets",
    tagline: "Instant Multi-Device Cloud Clipboard with QR & Code Sync",
    description: "A lightning-fast cross-device clipboard synchronization utility. Enables seamless peer-to-peer snippet sharing across desktops, phones, and tablets with zero friction, temporary room codes, and QR pairing.",
    tech: ["React", "Vite", "Tailwind CSS", "Serverless API", "Vercel Edge"],
    liveUrl: "https://clip-sync-pro.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/clip-sync-pro",
    featured: true,
    metrics: {
      syncSpeed: "< 15ms Transfer",
      pairing: "6-Digit Pin / QR",
      retention: "Ephemeral Wiping"
    },
    highlights: [
      "One-click text and code snippet synchronization across any mobile or desktop browser",
      "Instant 6-digit room code and dynamic QR code generation for rapid pairing",
      "Optimized Edge API proxy headers preventing CORS limitations",
      "Zero account registration required — anonymous, instant, and secure"
    ],
    architecture: "Vercel Edge API Rewrites + In-Memory Code Buffer"
  },
  {
    id: "vanishchat",
    title: "Vanish Chat",
    category: "Security & AI",
    tagline: "Zero-Knowledge Ephemeral Messaging & Self-Destructing Rooms",
    description: "A cybersecurity-focused encrypted messaging application engineered with auto-wiping memory buffers, end-to-end encrypted packet delivery, and self-destructing ephemeral rooms.",
    tech: ["React", "Socket.io", "Express", "MongoDB", "Web Crypto API"],
    liveUrl: "https://vanishthechat.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/vanish-chat",
    featured: false,
    metrics: {
      encryption: "AES-GCM 256-bit",
      dataRetention: "0s After Burn",
      payload: "Ephemeral RAM Only"
    },
    highlights: [
      "In-memory socket buffers with zero long-term persistent footprint",
      "Custom configurable self-destruct timers with animated burn UI",
      "Strict tamper-proof message digests and client-side key generation",
      "Anti-screen capture notifications and anonymous disposable sessions"
    ],
    architecture: "RAM-Bound Ephemeral Sockets + Client-Side WebCrypto"
  },
  {
    id: "onewordaday",
    title: "One-Word-A-Day",
    category: "Full-Stack Arcades",
    tagline: "Daily Cognitive Vocabulary Engine & Cloud Streak Locker",
    description: "An intentional daily linguistic training tool featuring spaced-repetition cognitive reinforcement, anti-cheat atomic database locks, and persistent cloud streak mechanics.",
    tech: ["React", "Supabase", "Node.js", "CSS Modules", "PostgreSQL"],
    liveUrl: "https://newdaynewword.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/one-word-a-day",
    featured: false,
    metrics: {
      database: "Supabase Postgres",
      integrity: "Atomic Date Locks",
      sync: "Instant Row-Level Security"
    },
    highlights: [
      "Strict server-side calendar validation preventing timezone clock manipulation",
      "Automated spaced-repetition review quizzes and phonetic pronunciations",
      "Supabase Row Level Security (RLS) policies protecting user telemetry",
      "Minimalist distraction-free typography crafted for daily habit retention"
    ],
    architecture: "Supabase Relational Cloud + Automated Timezone Verification"
  },
  {
    id: "ledgerflow",
    title: "Ledger Flow",
    category: "Telemetry & IoT",
    tagline: "High-Precision Financial Analytics & Cashflow Projection Engine",
    description: "A comprehensive personal finance and corporate ledger application with interactive charting, categorisation matrices, compounding projections, and instant data persistence.",
    tech: ["React", "Tailwind CSS", "Chart.js", "Local Vault Storage"],
    liveUrl: "https://ledger-flow.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/ledger-flow",
    featured: false,
    metrics: {
      analytics: "Dynamic Cashflow",
      calcSpeed: "< 1ms Formula Exec",
      privacy: "100% Client-Side"
    },
    highlights: [
      "Compound interest models with dynamic tax bracket adjustments",
      "Interactive SVG balance graphs visualizing monthly burn and savings velocity",
      "Category distribution breakdown with predictive budget runway",
      "Exportable JSON/CSV audit reports for tax preparation"
    ],
    architecture: "Client-Side Reactive Math Engine + Responsive Visualizers"
  },
  {
    id: "enclavestorage",
    title: "Enclave Storage Gallery",
    category: "Security & AI",
    tagline: "Secure Private Cloud Media Gallery & Asset Vault",
    description: "A sleek, encrypted private media vault designed for high-resolution visual collections with responsive grid layouts, smart filters, and fast lazy-loaded caching.",
    tech: ["React", "Firebase Storage", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://enclave-storage.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/enclave-storage",
    featured: false,
    metrics: {
      mediaLoading: "WebP Optimized",
      caching: "Edge CDN",
      security: "Token Authentication"
    },
    highlights: [
      "Full-screen cinematic lightbox viewer with gesture navigation",
      "Smart metadata tagging and visual album categorisation",
      "Asynchronous background image compression reducing bandwidth by 70%",
      "Client-side authenticated access tokens guarding private galleries"
    ],
    architecture: "Firebase Cloud Storage Buckets + Edge CDN Distribution"
  },
  {
    id: "mcqprep",
    title: "MCQ Prep & Quiz Hub",
    category: "Full-Stack Arcades",
    tagline: "Interactive Competitive Exam Quiz Portal with Live Timers",
    description: "An intensive timed examination quiz engine with randomized question sets, instant scoring rubrics, detailed answer explanations, and performance tracking.",
    tech: ["React", "Vite", "Tailwind CSS", "Vercel"],
    liveUrl: "https://mcq-prep-app.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/mcq-prep-app",
    featured: false,
    metrics: {
      questions: "Dynamic Bank",
      scoring: "Instant Real-Time",
      feedback: "Answer Deep-Dives"
    },
    highlights: [
      "Randomized question sequence with countdown timer enforcement",
      "Detailed category-wise analytics pinpointing subject weaknesses",
      "Interactive review mode displaying step-by-step solutions",
      "Local progress tracking keeping historical score improvements"
    ],
    architecture: "Vite Single Page Architecture + Vercel Static Edge"
  }
];

export const themesConfig = {
  redbull: {
    id: "redbull",
    name: "🏎️ WHITE RED BULL / F1",
    subtitle: "Special White Edition // Max Verstappen #1 Tribute Livery",
    primary: "#ffffff",     // Pearl Matte White
    secondary: "#e10600",   // Championship Crimson Bull
    accent: "#ffc800",      // Pirelli Yellow Rim Stripe
    bgDeep: "#060810",      // Dark Studio Asphalt
    bgCard: "rgba(10, 14, 26, 0.75)",
    glow: "rgba(225, 6, 0, 0.45)",
    badge: "WHITE EDITION RED BULL // MAX VERSTAPPEN #1"
  },
  cricket: {
    id: "cricket",
    name: "🏏 CRICKET STADIUM",
    subtitle: "Floodlit Stadium // Boundary Mastery & Seam Action",
    primary: "#00f57a",     // Turf Green
    secondary: "#ffd700",   // Pitch Gold
    accent: "#0070f3",      // Royal Blue
    bgDeep: "#031008",      // Deep Stadium Night
    bgCard: "rgba(6, 28, 16, 0.75)",
    glow: "rgba(0, 245, 122, 0.4)",
    badge: "FLOODLIT STADIUM // POWERPLAY ACTIVE"
  },
  gaming: {
    id: "gaming",
    name: "🎮 CYBER GAMING",
    subtitle: "Arcade Nexus // 8-in-1 Game Engine Hub",
    primary: "#f72585",     // Cyber Pink
    secondary: "#4cc9f0",   // Neon Cyan
    accent: "#7209b7",      // Hyper Violet
    bgDeep: "#090514",      // Synthwave Void
    bgCard: "rgba(25, 11, 46, 0.75)",
    glow: "rgba(247, 37, 133, 0.4)",
    badge: "ARCADE NEXUS // LEVEL 99 DEV ACTIVE"
  }
};

export const skillCategories = [
  {
    name: "Frontend & 3D Web",
    color: "#00f5d4",
    skills: [
      { name: "React 19 / 18", level: 98 },
      { name: "Three.js / WebGL", level: 92 },
      { name: "JavaScript (ESNext)", level: 98 },
      { name: "Tailwind CSS v4", level: 95 },
      { name: "Vite / Modern Bundlers", level: 94 },
      { name: "HTML5 Canvas API", level: 90 }
    ]
  },
  {
    name: "Backend & Real-Time",
    color: "#0070f3",
    skills: [
      { name: "WebSockets & Socket.io", level: 96 },
      { name: "WebRTC Audio/Video", level: 90 },
      { name: "Node.js & Express", level: 94 },
      { name: "Firebase (Realtime/Firestore)", level: 96 },
      { name: "Supabase & PostgreSQL", level: 91 },
      { name: "MongoDB & Mongoose", level: 88 }
    ]
  },
  {
    name: "Systems & Languages",
    color: "#7928ca",
    skills: [
      { name: "Computer Engineering Core", level: 95 },
      { name: "Python / Data Scripts", level: 88 },
      { name: "Java / Android Native", level: 85 },
      { name: "C / C++ Fundamentals", level: 86 },
      { name: "Git & Version Control", level: 96 },
      { name: "Distributed Systems", level: 90 }
    ]
  },
  {
    name: "Architecture & DevOps",
    color: "#f72585",
    skills: [
      { name: "Vercel / Cloud Edge", level: 96 },
      { name: "REST & RPC APIs", level: 95 },
      { name: "Twilio Telephony & IoT", level: 89 },
      { name: "Performance Optimization", level: 96 },
      { name: "UI/UX & Glassmorphism", level: 98 },
      { name: "Web Audio Synthesis", level: 92 }
    ]
  }
];
