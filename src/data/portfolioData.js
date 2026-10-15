export const personalInfo = {
  name: "Tanmay Nilesh Shinde",
  firstName: "Tanmay",
  lastName: "Shinde",
  domain: "tanmay.dev",
  title: "Tanmay Nilesh Shinde – Full Stack Developer",
  role: "FULL_STACK_ENGINEER",
  roleDisplay: "Full Stack Developer",
  location: "Navi Mumbai, MH",
  locationFull: "Navi Mumbai, Maharashtra, India",
  timezone: "Asia/Kolkata (IST, UTC+5:30)",
  email: "tanmaynileshshinde@gmail.com",
  github: "https://github.com/TanmayNileshShinde",
  githubUsername: "TanmayNileshShinde",
  linkedin: "https://www.linkedin.com/in/tanmay-shinde-9b07753bb",
  linkedinUsername: "tanmay-shinde-9b07753bb",
  leetcode: "https://leetcode.com/u/tanmayshinde/",
  leetcodeUsername: "tanmayshinde",
  status: "ONLINE",
  buildVersion: "v2.5.0",
  availableForHire: true,
  bio: "I'm Tanmay Shinde, a Full Stack Developer based in Navi Mumbai, India. I build fast, reliable web applications, real-time collaboration engines, and interactive digital products with React, TypeScript, Node.js, WebRTC, and modern cloud databases.",
  identityText1: "I build modern software across the entire stack, from ultra-responsive user interfaces to resilient backend services, real-time communication pipelines, and cloud database architectures. Most of my work centers around React, modern JavaScript/TypeScript, Node.js, Express, and distributed real-time protocols like WebRTC and Socket.io.",
  identityText2: "I'm especially interested in interactive systems, multi-user real-time collaboration tools, state synchronization, and high-performance frontend engineering. I care deeply about clean architectures, sensible developer ergonomics, and solving real human problems with fast, scalable, and beautifully engineered software.",
  resumeUrl: "/Tanmay-Shinde-Resume.pdf"
};

export const navItems = [
  { id: "home", num: "01", label: "HOME", path: "/", icon: "House" },
  { id: "skills", num: "02", label: "TECH_STACK", path: "/skills", icon: "Terminal" },
  { id: "projects", num: "03", label: "REPOSITORIES", path: "/projects", icon: "FolderOpen" },
  { id: "archive", num: "04", label: "ARCHIVE", path: "/archive", icon: "Award" },
  { id: "activity", num: "05", label: "ACTIVITY_TELEMETRY", path: "/activity", icon: "Activity" },
  { id: "contact", num: "06", label: "INITIATE_CONTACT", path: "/contact", icon: "Mail" }
];

export const techStackCategories = [
  {
    num: "01",
    title: "Programming Languages",
    groups: [
      {
        label: "LANGUAGES_&_DEVELOPMENT",
        skills: ["JavaScript (ES6+)", "TypeScript", "Python", "Java"]
      },
      {
        label: "SYSTEMS_&_DB",
        skills: ["C", "C++", "SQL", "Bash / Shell"]
      },
      {
        label: "MARKUP_&_CONFIG",
        skills: ["HTML5", "CSS3", "JSON", "YAML", "Markdown"]
      }
    ]
  },
  {
    num: "02",
    title: "Frameworks & Libraries",
    groups: [
      {
        label: "FRONTEND_FRAMEWORKS_LIBRARIES",
        skills: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"]
      },
      {
        label: "BACKEND_&_REALTIME",
        skills: ["Node.js", "Express.js", "WebRTC", "Socket.io", "REST APIs"]
      },
      {
        label: "AUTHENTICATION_&_SECURITY",
        skills: ["Firebase Auth", "Supabase Auth", "JWT", "OAuth 2.0"]
      }
    ]
  },
  {
    num: "03",
    title: "Data & Storage",
    groups: [
      {
        label: "NOSQL_DATABASES",
        skills: ["MongoDB", "Firebase Firestore"]
      },
      {
        label: "SQL_DATABASES",
        skills: ["PostgreSQL", "MySQL", "Supabase"]
      },
      {
        label: "OBJECT_RELATION_MAPPING",
        skills: ["Mongoose", "Prisma", "Cloud Storage"]
      }
    ]
  },
  {
    num: "04",
    title: "Environment & Deployment",
    groups: [
      {
        label: "DEV_TOOLS",
        skills: ["Git", "GitHub", "Postman", "Chrome DevTools", "VS Code"]
      },
      {
        label: "DEPLOYMENT_PLATFORMS",
        skills: ["Vercel", "Render", "Firebase Hosting", "Netlify"]
      }
    ]
  },
  {
    num: "05",
    title: "Cloud & Systems",
    groups: [
      {
        label: "CONTAINERIZATION_&_CLOUD",
        skills: ["Docker", "AWS (S3, EC2)", "Google Cloud Platform"]
      },
      {
        label: "MESSAGING_&_PROTOCOLS",
        skills: ["WebSockets", "WebRTC Mesh", "HTTP/2", "Server-Sent Events"]
      }
    ]
  }
];

export const projectCategories = [
  { id: "all", label: "ALL_PROJECTS" },
  { id: "personal", label: "01. PERSONAL PROJECTS" },
  { id: "internship", label: "02. INTERNSHIP & CLIENT" },
  { id: "hackathon", label: "03. HACKATHON & INNOVATION" }
];

export const projectsList = [
  {
    id: "collabclass",
    num: "01",
    category: "personal",
    categoryLabel: "PERSONAL PROJECTS",
    title: "CollabClass",
    badge: "FLAGSHIP",
    type: "Real-Time Collaboration",
    description: "A full-scale real-time collaboration ecosystem featuring multi-user peer-to-peer WebRTC video/audio conferencing and synchronized shared interactive workspaces with instant presence detection.",
    architecture: "Engineered on React and WebRTC mesh topology with Firebase signaling and Firestore real-time state listeners. Capable of bi-directional low-latency canvas synchronization with optimistic client updates.",
    features: [
      "Peer-to-peer WebRTC video & audio communication channels",
      "Real-time synchronized canvas & interactive collaborative whiteboard",
      "Instant multi-user presence detection and dynamic room session management",
      "Sub-50ms state synchronization powered by Firebase real-time listeners",
      "Fluid responsive dark mode interface designed for high focus"
    ],
    tech: ["React", "WebRTC", "Firebase", "Tailwind CSS", "Vite", "Socket.io"],
    github: "https://github.com/TanmayNileshShinde/collabnclass",
    live: "https://collabnclass.vercel.app",
    featured: true
  },
  {
    id: "reactnexus",
    num: "02",
    category: "personal",
    categoryLabel: "PERSONAL PROJECTS",
    title: "React Nexus",
    badge: "FEATURED",
    type: "Interactive Web Platform",
    description: "A comprehensive gaming and interactive computing hub featuring eight distinct mini-games built from the ground up, highlighting complex React state machines, physics game loops, and persistent cloud leaderboards.",
    architecture: "Custom physics-based animation loops running at a locked 60FPS using requestAnimationFrame and Framer Motion spring physics. Backed by Firebase for global leaderboards and player statistics.",
    features: [
      "8 complete interactive games including Memory Matrix, Cyber Snake, Tetris Core, and Speed Typist",
      "Global persistent cloud leaderboards with millisecond-precision timing",
      "Modular state machine architecture preventing unnecessary re-renders",
      "Framer Motion micro-interactions, sound synthesis, and high-DPI canvas rendering"
    ],
    tech: ["React", "Firebase", "Framer Motion", "Tailwind CSS", "Vite"],
    github: "https://github.com/TanmayNileshShinde/react-nexus",
    live: "https://reactnexus.vercel.app",
    featured: true
  },
  {
    id: "cts71",
    num: "01",
    category: "internship",
    categoryLabel: "INTERNSHIP & CLIENT",
    title: "Combat Training Systems (CTS-71)",
    badge: "DEFENSE TECH",
    type: "Situational Telemetry & Simulation",
    description: "Real-time tactical training simulator and telemetry dashboard developed for complex multi-node scenarios, delivering situational spatial telemetry, weapon system diagnostics, and instructor controls.",
    architecture: "High-density data streaming UI built with React and Node.js. Optimized for low cognitive load during high-pressure training operations with zero-dropped packet telemetry monitors.",
    features: [
      "Real-time spatial tracking and dynamic mission waypoint plotting",
      "Sub-system fault telemetry and automated diagnostics monitoring",
      "Multi-participant tactical session synchronization with instructor overrides",
      "Strict data sanitization, cryptographic log signing, and audit tracking"
    ],
    tech: ["React", "Node.js", "WebSockets", "Express", "Tailwind CSS"],
    github: "https://github.com/TanmayNileshShinde",
    live: "https://github.com/TanmayNileshShinde",
    featured: true
  },
  {
    id: "vanishchat",
    num: "03",
    category: "personal",
    categoryLabel: "PERSONAL PROJECTS",
    title: "Vanish Chat",
    badge: "SECURITY",
    type: "Ephemeral Communications",
    description: "A privacy-first, ephemeral messaging application featuring automated message self-destruction timers, end-to-end memory disposal, and zero-persistence room handshakes.",
    architecture: "Bi-directional WebSocket streaming architecture with Node.js and Socket.io. Server memory handles active room buffers that systematically purge upon timer countdown expiration.",
    features: [
      "Bi-directional WebSocket communications with Socket.io",
      "Client-configurable self-destructing message countdown timers",
      "End-to-end session isolation with disposable ephemeral room tokens",
      "Minimalist cyberpunk dark interface with active typing signals"
    ],
    tech: ["React", "Socket.io", "Express.js", "Node.js", "MongoDB"],
    github: "https://github.com/TanmayNileshShinde/vanish-chat",
    live: "https://vanishthechat.vercel.app",
    featured: false
  },
  {
    id: "swasthya",
    num: "01",
    category: "hackathon",
    categoryLabel: "HACKATHON & INNOVATION",
    title: "Swasthya Health Telemetry",
    badge: "HACKATHON WINNER",
    type: "AI & Telehealth Platform",
    description: "Award-winning telehealth and physical rehabilitation platform incorporating real-time computer vision pose tracking to guide patients through physiotherapy exercises remotely.",
    architecture: "Client-side MediaPipe landmark estimation integrated into WebRTC video feeds, calculating joint angles and repetition compliance without transmitting raw video to servers for privacy.",
    features: [
      "Real-time client-side skeletal pose tracking via MediaPipe",
      "Automated repetition counters and angle accuracy scoring algorithms",
      "Secure doctor-patient live video consultation room",
      "Interactive recovery milestone dashboard with analytics export"
    ],
    tech: ["React", "MediaPipe", "WebRTC", "Node.js", "Tailwind CSS"],
    github: "https://github.com/TanmayNileshShinde",
    live: "https://github.com/TanmayNileshShinde",
    featured: false
  },
  {
    id: "onewordaday",
    num: "04",
    category: "personal",
    categoryLabel: "PERSONAL PROJECTS",
    title: "One-Word-A-Day",
    badge: "UTILITY",
    type: "SaaS & Productivity",
    description: "A distraction-free habit formation platform delivering curated daily vocabulary with cloud-synchronized user streaks and strict database locking mechanisms.",
    architecture: "Full-stack integration with Supabase PostgreSQL, employing row-level security (RLS) policies and unique daily date constraints to guarantee streak integrity.",
    features: [
      "Automated daily word delivery pipeline with pronunciation audio",
      "Cloud streak tracking engine with anti-cheat timezone synchronization",
      "Database row-level security (RLS) preventing multiple daily logs",
      "Clean monospaced minimalist UI designed for rapid daily check-in"
    ],
    tech: ["React", "Supabase", "PostgreSQL", "Node.js", "Tailwind CSS"],
    github: "https://github.com/TanmayNileshShinde/one-word-a-day",
    live: "https://newdaynewword.vercel.app",
    featured: false
  }
];

export const archiveRecords = [
  {
    id: "rec-1",
    num: "01",
    title: "Internal Hackathon 2025 – Winner & Best Innovation",
    issuer: "DBIT ACM Student Chapter",
    date: "2025",
    category: "HACKATHON",
    description: "Awarded 1st place for architecting an intelligent real-time collaboration system with peer-to-peer data synchronization.",
    link: "https://github.com/TanmayNileshShinde"
  },
  {
    id: "rec-2",
    num: "02",
    title: "Combat Management & Training Systems Research Publication",
    issuer: "International Journal of Engineering Research & Technology",
    date: "2025",
    category: "PUBLICATION",
    description: "Co-authored research on low-latency state distribution in simulated tactical combat training environments.",
    link: "https://github.com/TanmayNileshShinde"
  },
  {
    id: "rec-3",
    num: "03",
    title: "Full-Stack Web Development Specialization",
    issuer: "Meta / Coursera",
    date: "2024",
    category: "CERTIFICATE",
    description: "Comprehensive credential covering advanced React patterns, component lifecycle, API integration, and database management.",
    link: "https://coursera.org"
  },
  {
    id: "rec-4",
    num: "04",
    title: "Best UI/UX Architecture Award – Technathon 2026",
    issuer: "Technathon Engineering Conclave",
    date: "2026",
    category: "HACKATHON",
    description: "Recognized for superior ergonomic design, accessible color contrast, and 60FPS fluid micro-interactions.",
    link: "https://github.com/TanmayNileshShinde"
  },
  {
    id: "rec-5",
    num: "05",
    title: "WebRTC & Real-Time Distributed Communication",
    issuer: "Frontend Masters",
    date: "2024",
    category: "CERTIFICATE",
    description: "Mastery of SDP negotiations, ICE candidates, STUN/TURN traversal, and WebRTC data channels.",
    link: "https://frontendmasters.com"
  },
  {
    id: "rec-6",
    num: "06",
    title: "Cloud Databases & Reactive State — Supabase & Firebase",
    issuer: "Cloud Computing Academy",
    date: "2024",
    category: "CERTIFICATE",
    description: "Hands-on implementation of reactive document stores, PostgreSQL RLS policies, and real-time CDC streams.",
    link: "https://supabase.com"
  },
  {
    id: "rec-7",
    num: "07",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    category: "CERTIFICATE",
    description: "Demonstrated proficiency in algorithmic problem solving, graph traversal, dynamic programming, and ES6+ standards.",
    link: "https://freecodecamp.org"
  },
  {
    id: "rec-8",
    num: "08",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "2024",
    category: "CERTIFICATE",
    description: "Certified proficiency in API design, automated test scripts, mock servers, and webhook ingestion.",
    link: "https://postman.com"
  }
];

export const telemetryData = {
  github: {
    username: "TanmayNileshShinde",
    yearCommits: 528,
    activeDays: 118,
    currentStreak: 5,
    maxStreak: 31,
    cacheNotice: "Server Cached: 1 hr ISR",
    months: ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"]
  },
  leetcode: {
    username: "tanmayshinde",
    totalSolved: 215,
    totalQuestions: 3340,
    easy: 92,
    easyTotal: 840,
    medium: 108,
    mediumTotal: 1750,
    hard: 15,
    hardTotal: 750,
    acceptanceRate: "68.4%",
    ranking: "Top 12%",
    streak: "14 Days",
    badges: ["50 Days Badge 2025", "Problem Solving Core", "Binary Search Specialist"]
  }
};

export const networkStatus = {
  operationalState: "OPTIMAL",
  responseLatency: "< 24 HOURS",
  preferredComms: "ASYNCHRONOUS",
  transmissionProtocol: "TLS_1.3_ENCRYPTED",
  availability: "ACCEPTING_NEW_OPPORTUNITIES"
};

export const education = {
  degree: "Bachelor of Engineering in Computer Engineering",
  institution: "Don Bosco Institute of Technology (DBIT), Mumbai",
  period: "2022 — 2026",
  location: "Mumbai, Maharashtra",
  status: "Undergraduate (Final Year)",
  focus: "Full-Stack Systems, Real-Time Architecture, Distributed Systems, Database Design",
  coursework: [
    "Data Structures & Algorithms",
    "Client-Side Scripting & Web Engineering",
    "Operating Systems & Linux Kernel Concepts",
    "Database Management Systems & Distributed Databases",
    "Computer Networks & Socket Architectures",
    "Software Engineering & Agile Methodologies"
  ],
  achievements: [
    "Published research on low-latency simulation in defense computing",
    "Winner of Internal Hackathon 2025 for real-time collaboration tooling",
    "Spearheaded technical development for flagship student projects"
  ]
};
