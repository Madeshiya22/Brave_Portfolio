export const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/rahul851r?igsh=dGJnMDBkdHNza3hj', icon: 'FaInstagram' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rahul-madeshiya-245950299?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: 'FaLinkedin' },
  { name: 'GitHub', url: 'https://github.com/Madeshiya22', icon: 'FaGithub' },
  { name: 'WhatsApp', url: 'https://wa.me/917307179159', icon: 'FaWhatsapp' }
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
        title: 'ALICE',
        description: 'A responsive business consulting website built with HTML and CSS, featuring services, testimonials, portfolio, blog, and modern landing page sections.',
        image: buildProjectImage('ALICE', '#ff5a1f'),
        githubUrl: 'https://github.com/Madeshiya22/koder3/tree/master/Practice-1',
        liveUrl: 'https://koder3.vercel.app/',
      },
      {
        title: 'DVSY',
        description: 'A modern fashion landing page built with HTML and CSS, featuring a bold hero design, designer-focused sections, brand stats, about content, and creative image grids.',
        image: buildProjectImage('DVSY', '#ff5a1f'),
        githubUrl: 'https://github.com/Madeshiya22/koder3/blob/master/Practice-2/index.html',
        liveUrl: 'https://koder3-vbtv.vercel.app/',
      },
      {
        title: 'NEONIX',
        description: 'A futuristic neon-themed landing page built with HTML and CSS, featuring a bold hero section, navigation, call-to-action buttons, trailer section, and social links.',
        image: buildProjectImage('NEONIX', '#ff5a1f'),
        githubUrl: 'https://github.com/Madeshiya22/koder3/tree/master/Practise-3',
        liveUrl: 'https://koder3-fpqg.vercel.app/',
      },
      {
        title: 'NFT',
        description: 'A futuristic NFT and digital fashion landing page built with HTML and CSS, featuring a bold hero section, neon product artwork, prompt tags, CTA buttons, and circular subscribe text.',
        image: buildProjectImage('NFT', '#ff5a1f'),
        githubUrl: 'https://github.com/Madeshiya22/koder3/tree/master/Practise-4',
        liveUrl: 'https://koder3-skjs.vercel.app/',
      },
      {
        title: 'OSOA',
        description: 'A fashion brand landing page built with HTML, CSS, and SCSS, featuring new collections, latest news, image galleries, collaborations, newsletter signup, and a modern visual layout.',
        image: buildProjectImage('OSOA', '#ff5a1f'),
        githubUrl: 'https://github.com/Madeshiya22/koder3/tree/master/Practise-6',
        liveUrl: 'https://koder3-2p5w.vercel.app',
      },
      {
        title: 'EnDasmu',
        description: 'A modern NFT marketplace landing page built with HTML, CSS, and SCSS, featuring digital art collections, NFT stats, trending items, top artists, newsletter subscription, and a polished visual layout.',
        image: buildProjectImage('EnDasmu', '#ff5a1f'),
        githubUrl: 'https://github.com/Madeshiya22/koder3/tree/master/Practise-7',
        liveUrl: 'https://koder3-hl5q.vercel.app/',
      },
      {
        title: 'Microsoft Clone',
        description: 'A fully responsive Microsoft clone website built with HTML, CSS, SCSS, and media queries, featuring hero sections, product cards, business sections, social links, and a complete responsive footer.',
        image: buildProjectImage('Microsoft Clone', '#ff5a1f'),
        githubUrl: 'https://github.com/Madeshiya22/koder3/tree/master/responive',
        liveUrl: 'https://koder3-4dye.vercel.app/',
      },
      {
        title: 'Slack Clone',
        description: 'A fully responsive Slack clone website built with HTML, CSS, SCSS, and media queries, featuring hero content, videos, feature sections, stats, resource cards, CTA blocks, and a complete responsive footer.',
        image: buildProjectImage('Slack Clone', '#ff5a1f'),
        githubUrl: 'https://github.com/Madeshiya22/Slack',
        liveUrl: 'https://madeshiya22.github.io/Slack/',
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
        title: 'DOT-GAME',
        description: 'A JavaScript DOM mini game where users click a randomly moving dot to score points before the timer ends, featuring start/restart controls, live score, timer, and game-over state.',
        image: buildProjectImage('DOT-GAME', '#ff6f00'),
        githubUrl: 'https://github.com/Madeshiya22/Dotgame',
        liveUrl: 'https://madeshiya22.github.io/Dotgame/',
      },
      {
        title: 'MEMORY-GAME',
        description: 'A JavaScript memory matching game where users flip shuffled cards to find matching pairs, with live score tracking, game-over screen, and restart functionality.',
        image: buildProjectImage('MEMORY-GAME', '#ff6f00'),
        githubUrl: 'https://github.com/Madeshiya22/Memory-game',
        liveUrl: 'https://madeshiya22.github.io/Memory-game/',
      },
      {
        title: 'FLAPPY-BIRD',
        description: 'A JavaScript Flappy Bird style game where the player clicks to keep the bird flying, avoids moving pipes, earns score by passing obstacles, and gets a game-over alert on collision.',
        image: buildProjectImage('FLAPPY-BIRD', '#ff6f00'),
        githubUrl: 'https://github.com/Madeshiya22/FLAPPY-BIRD',
        liveUrl: 'https://madeshiya22.github.io/FLAPPY-BIRD/',
      },
      {
        title: 'BATMAN',
        description: 'A single-page, scroll-driven landing page themed around Batman, built as a GSAP animation practice project.',
        image: buildProjectImage('BATMAN', '#ff6f00'),
        githubUrl: 'https://github.com/Madeshiya22/GSAP/tree/master/practise_3',
        liveUrl: 'https://gsap-khaki-five.vercel.app/',
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
        title: 'PIXAR',
        description: 'Movie Explorer App is a React + Redux based movie browsing app powered by TMDB API. Users can view trending movies, search movies, open movie details, and add/remove movies from their favourites list. The app now includes proper API error handling, timeout handling, and a retry option when TMDB data fails to load.',
        image: buildProjectImage('PIXAR', '#ff7b3e'),
        githubUrl: 'https://github.com/Madeshiya22/movie',
        liveUrl: 'https://movie-iow7.vercel.app/',
      },
      {
        title: 'FLORA',
        description: 'Flora is a modern, visually immersive fashion/floral brand website built with React and Vite. It features smooth scroll-driven animations powered by GSAP and Locomotive Scroll, with a bold typographic aesthetic inspired by Vogue magazine styling.',
        image: buildProjectImage('FLORA', '#ff9b59'),
        githubUrl: 'https://github.com/Madeshiya22?tab=repositories',
        liveUrl: 'https://flora-3zv9.vercel.app/',
      },
      {
        title: 'MEDIA_SEARCH',
        description: 'This project is built using React.js and Redux Toolkit to demonstrate efficient global state management. It centralizes application data in a Redux store, allowing multiple components to access and update shared data without excessive prop drilling. The project showcases concepts such as Redux store, slices, actions, and reducers, making the application more scalable, maintainable, and easier to manage.',
        image: buildProjectImage('MEDIA_SEARCH', '#ff7b3e'),
        githubUrl: 'https://github.com/Madeshiya22/ReduxProject',
        liveUrl: 'https://redux-project-psi.vercel.app/',
      },
      {
        title: 'DEV-GEAR',
        description: 'Dev Gear is a React-based e-commerce application designed for developers to buy premium gadgets and workspace accessories. Built with React 19, Vite 7, Tailwind CSS, and SCSS, it features product browsing, product details, cart and wishlist management, protected routes, and localStorage-based data persistence using custom hooks. The application is fully frontend-based and deployed using GitHub Pages.',
        image: buildProjectImage('DEV-GEAR', '#ff9b59'),
        githubUrl: 'https://github.com/Madeshiya22/Dev_Gear',
        liveUrl: 'https://dev-gear-fawn.vercel.app/',
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
        title: 'MENTO AI',
        description: 'Technologies Used: The project was built using React 19 and Vite for creating a fast and responsive frontend, while Redux Toolkit was used for efficient state management and React Router v7 for client-side routing. Framer Motion and SCSS were used to create smooth animations and an interactive user interface. On the backend, Node.js and Express.js were used to develop REST APIs and handle real-time communication. MongoDB with Mongoose was used for storing user, chat, and document data. For authentication, Passport.js, Google OAuth, and JWT with httpOnly cookies were implemented to ensure secure user access. The AI layer was powered by LangChain and LangGraph to orchestrate intelligent workflows, while Mistral AI was used as the Large Language Model for generating responses. Pinecone served as the vector database for Retrieval-Augmented Generation (RAG), enabling users to ask questions from uploaded PDF documents. Tavily API was integrated to provide real-time web search capabilities. Additionally, Server-Sent Events (SSE) were used to stream AI responses in real-time, creating a ChatGPT-like user experience. The application was deployed using Vercel, and Docker was used for containerized local development.',
        image: buildProjectImage('MENTO AI', '#ff4f00'),
        githubUrl: 'https://github.com/Madeshiya22/GENAI',
        liveUrl: 'https://genai-hazel-zeta.vercel.app/',
      },
      {
        title: 'WEATHER-ADMIN',
        description: 'WeatherGuard is a full-stack weather alert platform that combines secure social authentication, admin-controlled access management, and Telegram-based weather notifications. Users can sign in using Google or GitHub OAuth and request access to the platform. New users are initially marked as pending and can only access the system after being approved by an administrator through a dedicated admin dashboard. Once approved, users can link their Telegram account to receive automated weather alerts. The system uses NestJS for the backend, React with TypeScript for the frontend, MongoDB for data storage, and Telegraf for Telegram bot integration. Automated weather updates are delivered only to approved users, ensuring secure and controlled access while demonstrating seamless integration between multiple systems.',
        image: buildProjectImage('WEATHER-ADMIN', '#ff7a18'),
        githubUrl: 'https://github.com/Madeshiya22/weatherguard',
        liveUrl: 'https://weatherguard-gamma.vercel.app/',
      },
      {
        title: 'NOTES.pro',
        description: 'Redux Minor P is a smart notes workspace app where users can securely create, organize, search, and manage text notes, code files, and drawings in one place.',
        image: buildProjectImage('NOTES.pro', '#ff9b59'),
        githubUrl: 'https://github.com/Madeshiya22/NOtes.pro',
        liveUrl: 'https://redux-by-ritik-b.vercel.app/',
      },
    ],
  },
];

export const siteMetadata = {
  title: 'PortFolio',
  author: 'Rahul Madeshiya',
  year: '2026'
};
