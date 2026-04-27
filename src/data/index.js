export const socialLinks = [
  { name: 'Instagram', url: '#', icon: 'FaInstagram' },
  { name: 'LinkedIn', url: '#', icon: 'FaLinkedin' },
  { name: 'GitHub', url: '#', icon: 'FaGithub' },
  { name: 'WhatsApp', url: '#', icon: 'FaWhatsapp' }
];

const buildProjectImage = (title, accent) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#111111" />
          <stop offset="100%" stop-color="#050505" />
        </linearGradient>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#ffb347" stop-opacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="800" height="520" rx="32" fill="url(#bg)" />
      <circle cx="620" cy="126" r="130" fill="url(#glow)" opacity="0.18" />
      <circle cx="210" cy="370" r="160" fill="${accent}" opacity="0.10" />
      <rect x="82" y="86" width="636" height="348" rx="24" fill="#0d0d0d" stroke="${accent}" stroke-opacity="0.35" />
      <rect x="110" y="116" width="146" height="20" rx="10" fill="${accent}" opacity="0.7" />
      <rect x="110" y="162" width="304" height="18" rx="9" fill="#ffffff" opacity="0.82" />
      <rect x="110" y="198" width="252" height="18" rx="9" fill="#ffffff" opacity="0.48" />
      <rect x="110" y="290" width="152" height="48" rx="14" fill="${accent}" />
      <text x="120" y="327" fill="#ffffff" font-family="Arial, sans-serif" font-size="21" font-weight="700">View Project</text>
      <rect x="444" y="134" width="210" height="196" rx="18" fill="#141414" stroke="#ffffff" stroke-opacity="0.08" />
      <rect x="474" y="168" width="148" height="18" rx="9" fill="#ffffff" opacity="0.9" />
      <rect x="474" y="204" width="112" height="14" rx="7" fill="#ffffff" opacity="0.45" />
      <rect x="474" y="240" width="156" height="14" rx="7" fill="#ffffff" opacity="0.28" />
      <rect x="474" y="276" width="96" height="14" rx="7" fill="#ffffff" opacity="0.18" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}`;
};

export const projectSections = [
  {
    id: 'html-css',
    label: 'HTML-CSS',
    eyebrow: '01 / Foundation builds',
    title: 'HTML-CSS',
    description: 'Semantic layouts, modern responsive UI, and polished CSS-only interactions.',
    accent: '#ff5a1f',
    summary: 'Static UI and layout experiments made with clean HTML and CSS.',
    projects: [
      {
        title: 'Orange Button Landing',
        description: 'A minimal landing section focused on strong contrast, hover states, and spacing.',
        image: buildProjectImage('Orange Button Landing', '#ff5a1f'),
        githubUrl: '#',
        liveUrl: '#',
      },
      {
        title: 'Glass Pricing Grid',
        description: 'A frosted pricing layout with layered cards and responsive breakpoint handling.',
        image: buildProjectImage('Glass Pricing Grid', '#ff7a3d'),
        githubUrl: '#',
        liveUrl: '#',
      },
    ],
  },
  {
    id: 'html-css-js',
    label: 'HTML-CSS-JS',
    eyebrow: '02 / Interactive builds',
    title: 'HTML-CSS-JS',
    description: 'Small JavaScript interactions layered over a dark UI system and animated states.',
    accent: '#ff6f00',
    summary: 'Interactive projects with vanilla JavaScript behavior.',
    projects: [
      {
        title: 'Interactive Message Board',
        description: 'A DOM-driven panel with live filtering, keyboard shortcuts, and toggle states.',
        image: buildProjectImage('Interactive Message Board', '#ff6f00'),
        githubUrl: '#',
        liveUrl: '#',
      },
      {
        title: 'Theme Switch Playground',
        description: 'A micro app demonstrating buttons, transitions, and state changes in JavaScript.',
        image: buildProjectImage('Theme Switch Playground', '#ff8a2a'),
        githubUrl: '#',
        liveUrl: '#',
      },
    ],
  },
  {
    id: 'react-js',
    label: 'React.js',
    eyebrow: '03 / Component systems',
    title: 'React.js',
    description: 'Reusable UI components, state-driven interactions, and clean component composition.',
    accent: '#ff7b3e',
    summary: 'Component-based projects built with React.',
    projects: [
      {
        title: 'Dashboard Shell',
        description: 'A modular dashboard with cards, metrics, and controlled view switching.',
        image: buildProjectImage('Dashboard Shell', '#ff7b3e'),
        githubUrl: '#',
        liveUrl: '#',
      },
      {
        title: 'Portfolio Widget Set',
        description: 'A reusable component group for hero actions, cards, and modal interactions.',
        image: buildProjectImage('Portfolio Widget Set', '#ff9b59'),
        githubUrl: '#',
        liveUrl: '#',
      },
    ],
  },
  {
    id: 'mern-stack',
    label: 'MERN Stack',
    eyebrow: '04 / Full stack apps',
    title: 'MERN Stack',
    description: 'End-to-end products with MongoDB, Express, React, and Node.js architecture.',
    accent: '#ff4f00',
    summary: 'Full stack application ideas and production-style dashboards.',
    projects: [
      {
        title: 'Task Manager Pro',
        description: 'A CRUD task manager concept with auth, filters, and live activity updates.',
        image: buildProjectImage('Task Manager Pro', '#ff4f00'),
        githubUrl: '#',
        liveUrl: '#',
      },
      {
        title: 'Commerce Control Panel',
        description: 'An admin experience for orders, inventory, and analytics across the stack.',
        image: buildProjectImage('Commerce Control Panel', '#ff7a18'),
        githubUrl: '#',
        liveUrl: '#',
      },
    ],
  },
];

export const siteMetadata = {
  title: 'PortFolio',
  author: 'Rahul Madeshiya',
  year: '2026'
};
