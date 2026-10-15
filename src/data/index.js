export const personalInfo = {
  name: "Tanmay Nilesh Shinde",
  shortName: "Tanmay",
  role: "Full-Stack Software Developer",
  tagline: "Building high-performance web applications, scalable backends, and intuitive user experiences.",
  email: "tanmaynileshshinde@gmail.com",
  github: "https://github.com/TanmayNileshShinde",
  linkedin: "https://www.linkedin.com/in/tanmay-shinde-9b07753bb",
  location: "Maharashtra, India",
  availableForHire: true,
  summary: "Software Developer with a strong foundation in Computer Engineering. Specializing in React, real-time architectures (WebRTC, Socket.io), and cloud databases (Firebase, Supabase). Passionate about turning complex systems into clean, responsive, and delightful web experiences."
};

export const skillsCategories = [
  {
    category: "Frontend Engineering",
    icon: "code",
    skills: ["React.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 & CSS3", "Vite", "Responsive Design"]
  },
  {
    category: "Backend & Real-Time",
    icon: "server",
    skills: ["Node.js", "Express.js", "WebRTC", "Socket.io", "RESTful APIs", "Authentication", "Cloud Functions"]
  },
  {
    category: "Databases & Cloud",
    icon: "database",
    skills: ["Firebase Firestore", "Supabase", "MongoDB", "PostgreSQL", "Cloud Storage", "Vercel"]
  },
  {
    category: "Languages & Mobile",
    icon: "terminal",
    skills: ["JavaScript", "Python", "Java (Android)", "XML", "Git & GitHub", "Linux / CLI"]
  }
];

export const stats = [
  { value: "4+", label: "Production Deployments" },
  { value: "8+", label: "Interactive Games & Apps" },
  { value: "100%", label: "Responsive & Modern" },
  { value: "Real-Time", label: "Architecture Focus" }
];

export const projects = [
  {
    id: 'collabclass',
    title: 'CollabClass',
    tag: 'Flagship Platform',
    category: 'Real-Time Collaboration',
    description: 'A flagship real-time collaboration platform featuring live multi-user video conferencing and synchronized shared interactive workspaces. Engineered to handle low-latency, synchronous data pipelines.',
    features: [
      'Peer-to-peer WebRTC video & audio communication',
      'Real-time synchronized canvas & collaborative document editing',
      'Instant presence detection and dynamic room management',
      'Zero-lag state synchronization powered by Firebase'
    ],
    tech: ['React', 'WebRTC', 'Firebase', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/TanmayNileshShinde/collabnclass',
    live: 'https://collabnclass.vercel.app',
    featured: true,
    accent: 'cyan'
  },
  {
    id: 'reactnexus',
    title: 'React Nexus',
    tag: 'Full-Stack Hub',
    category: 'Interactive Web Platform',
    description: 'A comprehensive full-stack arcade hub featuring eight distinct mini-games built from the ground up. Demonstrates intense React state management, fluid 60FPS animations, and cloud leaderboard integration.',
    features: [
      '8 complete interactive games with custom physics and game loops',
      'Global persistent leaderboards and user statistics',
      'Optimized component rendering for silky 60FPS micro-interactions',
      'Modular component architecture with Framer Motion transitions'
    ],
    tech: ['React', 'Firebase', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/TanmayNileshShinde/react-nexus',
    live: 'https://reactnexus.vercel.app',
    featured: true,
    accent: 'blue'
  },
  {
    id: 'vanishchat',
    title: 'Vanish Chat',
    tag: 'Security & Real-Time',
    category: 'Ephemeral Communications',
    description: 'A privacy-first, ephemeral messaging application showcasing secure, real-time communications and encrypted data handling with automated message self-destruction.',
    features: [
      'Bi-directional WebSocket communications with Socket.io',
      'Self-destructing ephemeral message timers and memory cleanup',
      'End-to-end session isolation and secure room handshakes',
      'Modern sleek dark glassmorphic chat interface'
    ],
    tech: ['React', 'Socket.io', 'Express.js', 'Node.js', 'MongoDB'],
    github: 'https://github.com/TanmayNileshShinde/vanish-chat',
    live: 'https://vanishthechat.vercel.app',
    featured: false,
    accent: 'indigo'
  },
  {
    id: 'onewordaday',
    title: 'One-Word-A-Day',
    tag: 'Cloud Utility',
    category: 'SaaS & Productivity',
    description: 'A practical utility for daily vocabulary tracking with cloud-synchronized user streaks. Implements strict backend user management and database locking mechanisms.',
    features: [
      'Automated daily word delivery with definition APIs',
      'Cloud streak tracking and progress analytics with Supabase',
      'Strict database locking preventing duplicate daily entries',
      'Responsive, distraction-free minimalist user experience'
    ],
    tech: ['React', 'Supabase', 'Node.js', 'Tailwind CSS', 'REST API'],
    github: 'https://github.com/TanmayNileshShinde/one-word-a-day',
    live: 'https://newdaynewword.vercel.app',
    featured: false,
    accent: 'sky'
  }
];

export const education = {
  degree: "Bachelor of Engineering in Computer Engineering",
  focus: "Full-Stack Development, Data Structures & Algorithms, Real-Time Systems, Database Architecture",
  period: "Undergraduate Studies",
  highlights: [
    "Specialized in modern client-side scripting and modern web frameworks",
    "Developed multiple deployed web applications tackling real-time collaboration and cloud persistence",
    "Hands-on architectural experience with WebRTC, WebSockets, and Cloud Infrastructure"
  ]
};