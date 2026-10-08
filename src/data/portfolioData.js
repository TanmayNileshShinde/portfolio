export const personalInfo = {
  name: "Tanmay Nilesh Shinde",
  title: "Full-Stack Architect & 3D Web Engineer",
  tagline: "Engineering hyper-scalable real-time architectures, distributed systems, and immersive WebGL experiences.",
  email: "tanmaynileshshinde@gmail.com",
  github: "https://github.com/TanmayNileshShinde",
  linkedin: "https://www.linkedin.com/in/tanmay-shinde-9b07753bb",
  location: "Mumbai, India",
  status: "Available for Elite Engineering Roles & High-Impact Projects",
  bio: `I am Tanmay Nilesh Shinde, a Computer Engineering graduate and full-stack software engineer who bridges high-throughput backend infrastructure with cinematic, high-performance web experiences. From orchestrating zero-latency WebRTC video meshes and telemetry stream servers to engineering full-scale game engines and 3D WebGL environments, I build systems that are robust, scalable, and visually unforgettable.`,
  stats: [
    { label: "Production Apps", value: "12+" },
    { label: "Live Users & Demos", value: "10K+" },
    { label: "Latency Target", value: "<30ms" },
    { label: "Code Quality", value: "100%" }
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
    description: "An arcade universe featuring eight custom-built interactive mini-games with dynamic physics, real-time cloud leaderboards, particle visualizers, and zero-latency state machines.",
    tech: ["React", "Firebase Realtime DB", "Framer Motion", "Vite", "Web Audio API"],
    liveUrl: "https://reactnexus.vercel.app",
    githubUrl: "https://github.com/TanmayNileshShinde/react-nexus",
    featured: true,
    metrics: {
      games: "8 Full Mini-Games",
      fps: "60 FPS Locked",
      sync: "Sub-second Cloud Sync"
    },
    highlights: [
      "Custom 2D collision detection and procedural physics engines",
      "Global real-time competitive leaderboard using atomic Firebase transactions",
      "Micro-animations and haptic sound synthesis via Framer Motion & Web Audio",
      "Instant responsive controls supporting keyboard, gamepad, and touch gestures"
    ],
    architecture: "Componentized State Machines + Atomic Cloud Leaderboards"
  },
  {
    id: "f1-telemetry",
    title: "F1 Race Engineer & Pit Wall",
    category: "Telemetry & IoT",
    tagline: "High-Throughput Formula 1 Telemetry & Race Strategy Engine",
    description: "A mission-critical Formula 1 pit wall telemetry dashboard. Ingests high-frequency real-time vehicle streams, computes tire degradation degradation curves, lap time delta radars, and runs algorithmic pit strategy simulations.",
    tech: ["React 19", "Socket.io", "Node.js", "Tailwind CSS v4", "Canvas Charts"],
    liveUrl: "https://github.com/TanmayNileshShinde/f1-race-engineer",
    githubUrl: "https://github.com/TanmayNileshShinde/f1-race-engineer",
    featured: true,
    metrics: {
      telemetryHz: "60Hz Live Stream",
      telemetryDelay: "12ms Latency",
      prediction: "Lap Delta < 0.05s"
    },
    highlights: [
      "Bi-directional WebSocket streaming supporting 60Hz telemetry packets",
      "Predictive tire degradation simulation modeling compound degradation",
      "Live sector time delta radar comparing fastest qualifying laps",
      "Pit stop window optimizer calculating traffic re-entry margins"
    ],
    architecture: "Pit Wall Node.js Ingestion Engine + Socket.io Binary Streamer"
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
    featured: true,
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
    id: "voice-notes-vault",
    title: "Voice Notes Vault",
    category: "Security & AI",
    tagline: "AI-Powered Real-Time Audio Transcription & Semantic Vault",
    description: "A responsive speech-to-text intelligence vault with real-time waveform visualization, automatic semantic categorization, and instantaneous cloud synchronization.",
    tech: ["React 19", "Firebase", "Web Speech API", "Tailwind CSS v4"],
    liveUrl: "https://github.com/TanmayNileshShinde/voice-notes-vault",
    githubUrl: "https://github.com/TanmayNileshShinde/voice-notes-vault",
    featured: false,
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
    description: "An IoT-connected wellness sentinel that monitors sleep cycles, correlates environmental sensory inputs, and triggers autonomous emergency dispatches via Twilio.",
    tech: ["React", "Firebase Admin", "Twilio API", "Node.js", "IoT Telemetry"],
    liveUrl: "https://github.com/TanmayNileshShinde/sleep-sentinel",
    githubUrl: "https://github.com/TanmayNileshShinde/sleep-sentinel",
    featured: false,
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
  }
];

export const skillCategories = [
  {
    name: "Frontend & 3D Web",
    color: "#00f5d4",
    skills: [
      { name: "React 19 / 18", level: 98, icon: "react" },
      { name: "Three.js / WebGL", level: 92, icon: "three" },
      { name: "JavaScript (ESNext)", level: 98, icon: "js" },
      { name: "Tailwind CSS v4", level: 95, icon: "tailwind" },
      { name: "Vite / Modern Bundlers", level: 94, icon: "vite" },
      { name: "HTML5 Canvas API", level: 90, icon: "canvas" }
    ]
  },
  {
    name: "Backend & Real-Time",
    color: "#0070f3",
    skills: [
      { name: "WebSockets & Socket.io", level: 96, icon: "socket" },
      { name: "WebRTC Audio/Video", level: 90, icon: "webrtc" },
      { name: "Node.js & Express", level: 94, icon: "node" },
      { name: "Firebase (Realtime/Firestore)", level: 96, icon: "firebase" },
      { name: "Supabase & PostgreSQL", level: 91, icon: "supabase" },
      { name: "MongoDB & Mongoose", level: 88, icon: "mongo" }
    ]
  },
  {
    name: "Systems & Languages",
    color: "#7928ca",
    skills: [
      { name: "Computer Engineering Core", level: 95, icon: "cpu" },
      { name: "Python / Data Scripts", level: 88, icon: "python" },
      { name: "Java / Android Native", level: 85, icon: "java" },
      { name: "C / C++ Fundamentals", level: 86, icon: "cpp" },
      { name: "Git & Version Control", level: 96, icon: "git" },
      { name: "Distributed Systems", level: 90, icon: "network" }
    ]
  },
  {
    name: "Architecture & DevOps",
    color: "#f72585",
    skills: [
      { name: "Vercel / Cloud Edge", level: 96, icon: "vercel" },
      { name: "REST & RPC APIs", level: 95, icon: "api" },
      { name: "Twilio Telephony & IoT", level: 89, icon: "iot" },
      { name: "Performance Optimization", level: 96, icon: "bolt" },
      { name: "UI/UX & Glassmorphism", level: 98, icon: "sparkle" },
      { name: "Web Audio Synthesis", level: 92, icon: "audio" }
    ]
  }
];

export const experienceTimeline = [
  {
    year: "2026",
    role: "Full-Stack & 3D Web Architect",
    company: "Independent Engineering & Systems Development",
    description: "Building production-grade real-time web applications, Formula 1 telemetry analytics, WebRTC mesh platforms, and 3D WebGL experiences. Pushing modern browser boundaries with React 19, Three.js, and distributed cloud backends."
  },
  {
    year: "2025 - 2026",
    role: "Computer Engineering & Core Software Development",
    company: "Engineering Academia & Full-Stack Projects",
    description: "Mastered low-level algorithms, data structures, network protocols, operating systems, and computer architecture. Applied theoretical principles directly into scalable projects like CollabClass and React Nexus."
  },
  {
    year: "2024 - 2025",
    role: "Frontend Engineer & Interactive Game Developer",
    company: "Open Source & Client Projects",
    description: "Constructed dynamic multi-game web applications, bespoke UI design systems, real-time messaging sockets, and cloud database integrations across Firebase and Supabase."
  }
];
