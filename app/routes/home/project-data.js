import bugattiVideo from '~/assets/bugatti-Trim.mp4';
import bugattiPoster from '~/assets/bugatti.png';
import epicScreenOne from '~/assets/gta.jpg';
import epicScreenTwo from '~/assets/epic-3.jpeg';
import fuelGuardScreen from '~/assets/FuelGaurd.png';
import knowledgeTwinScreenOne from '~/assets/Mobile-knowleadge.png';
import knowledgeTwinScreenTwo from '~/assets/Mobile-knowleadge2.png';
import studentProfileScreen from '~/assets/StudentProfile.png';

// Project details are taken from each project's repository (README, routes
// and package.json), so keep them in sync when a project changes.
export const projects = [
  {
    slug: 'bugatti-clone',
    title: 'Bugatti – Luxury Automotive Website Clone',
    shortTitle: 'Bugatti Clone',
    type: 'Frontend clone',
    description:
      'A premium website clone inspired by Bugatti’s official platform, focusing on luxury branding, smooth transitions, and modern web aesthetics.',
    overview: [
      'A responsive clone of the Bugatti website built with React, Vite and Tailwind CSS. It recreates the luxurious design and feel of Bugatti’s web presence, with showcase pages for two of its most iconic models.',
      'Pages share a reusable navbar and footer, and client-side routing keeps navigation between the showcases instant.',
    ],
    features: [
      {
        group: 'Pages',
        items: [
          { title: 'Home', text: 'Landing page with an overview of the Bugatti brand.' },
          { title: 'Chiron', text: 'Dedicated showcase page for the Bugatti Chiron.' },
          { title: 'Bolide', text: 'Dedicated showcase page for the Bugatti Bolide.' },
        ],
      },
      {
        group: 'Build',
        items: [
          { title: 'Responsive design', text: 'Layouts that adapt across desktop, tablet and mobile.' },
          { title: 'Client-side routing', text: 'React Router for smooth navigation between pages.' },
          { title: 'Reusable components', text: 'Shared Navbar and Footer for a consistent layout.' },
        ],
      },
    ],
    stack: [
      { group: 'Frontend', items: ['React 19', 'Vite', 'React Router', 'Tailwind CSS 4'] },
      { group: 'Tooling', items: ['ESLint', 'Vercel'] },
    ],
    liveLink: 'https://bugatti-clone-dev.vercel.app/',
    sourceCodeLink: 'https://github.com/hanumanraj07/Bugatti-Clone',
    videoLink: 'https://youtu.be/__XCbRVxfyI?si=Tq2HNrMkrf9NHijL',
    gallery: [
      {
        kind: 'video',
        src: bugattiVideo,
        poster: bugattiPoster,
        width: 1024,
        height: 548,
        alt: 'Screen recording of the Bugatti website clone',
      },
    ],
    model: {
      type: 'laptop',
      alt: 'Bugatti luxury automotive website clone shown on a laptop',
      textures: [
        {
          srcSet: `${bugattiVideo} 1280w, ${bugattiVideo} 2560w`,
          placeholder: bugattiPoster,
        },
      ],
    },
  },
  {
    slug: 'epic-games-clone',
    title: 'Epic Games Digital Storefront – App Clone',
    shortTitle: 'Epic Games Clone',
    type: 'Frontend clone',
    description:
      'A modern mobile clone of the Epic Games Store featuring game browsing, genres, and a premium dark UI experience.',
    overview: [
      'An educational, UI-only clone of the Epic Games Store built with React and Vite to practise real-world gaming marketplace design: cinematic hero banners, promotional sections and a dark, premium interface.',
      'Everything is static or simulated. There is no backend, authentication or real purchasing, and the project is not affiliated with Epic Games.',
    ],
    features: [
      {
        group: 'Pages',
        items: [
          { title: 'Home', text: 'Featured hero banner plus Games On Sale and Free Games rows.' },
          { title: 'Support', text: 'A “How can we help?” centre with topics to explore.' },
          { title: 'Distribute', text: 'Pitch to PC developers and publishers, with an FAQ.' },
          { title: 'Sign in', text: 'Login-style screen with no real accounts behind it.' },
        ],
      },
      {
        group: 'Build',
        items: [
          { title: 'Responsive layout', text: 'Works from large desktop screens down to mobile.' },
          { title: 'Hover and motion', text: 'Smooth animations and hover effects across the store.' },
          { title: 'Client-side routing', text: 'React Router powers navigation between pages.' },
        ],
      },
    ],
    stack: [
      { group: 'Frontend', items: ['React 19', 'Vite', 'React Router', 'JavaScript', 'CSS'] },
      { group: 'Tooling', items: ['ESLint', 'Vercel'] },
    ],
    liveLink: 'https://epic-games-clone-dev.vercel.app/',
    sourceCodeLink: 'https://github.com/hanumanraj07/Epic-Games-Clone',
    videoLink: 'https://www.youtube.com/watch?v=Bae7hhBmTBI',
    gallery: [
      {
        kind: 'image',
        src: epicScreenOne,
        width: 472,
        height: 712,
        alt: 'Epic Games Store clone home screen on mobile',
      },
      {
        kind: 'image',
        src: epicScreenTwo,
        width: 685,
        height: 1280,
        alt: 'Epic Games Store clone promotional screen on mobile',
      },
    ],
    model: {
      type: 'phone',
      alt: 'Epic Games Store mobile app clone screens',
      textures: [
        { srcSet: `${epicScreenOne} 375w, ${epicScreenOne} 750w`, placeholder: epicScreenOne },
        {
          srcSet: `${epicScreenTwo} 375w, ${epicScreenTwo} 750w`,
          placeholder: epicScreenTwo,
          fit: 'cover',
        },
      ],
    },
  },
  {
    slug: 'fuelguard',
    title: 'FuelGuard - AI-Powered Fuel Fraud Detection',
    shortTitle: 'FuelGuard',
    type: 'Hackathon build',
    tagline: 'Don’t get cheated at the pump.',
    description:
      'FuelGuard is a full-stack web app that uses AI to detect fuel pump fraud from uploaded videos, generate legal PDF reports, and map fraudulent pumps in real time.',
    overview: [
      'FuelGuard uses computer vision to catch fuel pump fraud. You upload a video of your fueling session, the AI service reads the meter frame by frame, and the app tells you if something is wrong.',
      'Every analysis can become a PDF evidence report and a point on an interactive fraud heatmap. Dedicated portals give fleet operators and government inspectors their own view of the same data.',
    ],
    features: [
      {
        group: 'For drivers',
        items: [
          { title: 'Video analysis', text: 'Upload a fueling video for AI fraud detection.' },
          { title: 'PDF evidence reports', text: 'Generate evidence documents from an analysis.' },
          { title: 'Fraud heatmap', text: 'See fraud hotspots across cities on an interactive map.' },
          { title: 'Pump reports and reviews', text: 'Browse fraud scores and community ratings for pumps.' },
          { title: 'English and Hindi', text: 'Multi-language support for a wider audience.' },
        ],
      },
      {
        group: 'Fleet management',
        items: [
          { title: 'Vehicle tracking', text: 'Monitor fuel consumption across a fleet.' },
          { title: 'Fill history', text: 'Every fill logged with its location.' },
          { title: 'Fraud flagging', text: 'Suspicious fills are flagged automatically.' },
          { title: 'Monthly reports', text: 'PDF reports covering fleet expenses and fraud.' },
        ],
      },
      {
        group: 'Government portal',
        items: [
          { title: 'Live dashboard', text: 'Overview of fraud reports and inspections.' },
          { title: 'City analytics', text: 'Fraud broken down by city and fuel company.' },
          { title: 'Priority alerts', text: 'Flags pumps with high fraud rates for inspection.' },
        ],
      },
    ],
    architecture: [
      { label: 'React + TypeScript app', detail: 'Uploads, reports, heatmap and portals' },
      { label: 'Express API', detail: 'Auth, payments and PDF generation' },
      { label: 'FastAPI + OpenCV', detail: 'Reads the meter frame by frame' },
      { label: 'MongoDB + Cloudinary', detail: 'Records and video storage' },
    ],
    stack: [
      {
        group: 'Frontend',
        items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Leaflet'],
      },
      {
        group: 'Backend',
        items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Cloudinary', 'Razorpay', 'PDFKit', 'Ethers.js'],
      },
      { group: 'AI service', items: ['Python', 'FastAPI', 'OpenCV'] },
    ],
    liveLink: 'https://fuel-guard-dev.vercel.app/',
    sourceCodeLink: 'https://github.com/hanumanraj07/FuelGuard',
    videoLink: 'https://www.youtube.com/@hanumanraj07',
    hackathonId: 2,
    gallery: [
      {
        kind: 'image',
        src: fuelGuardScreen,
        width: 1437,
        height: 764,
        alt: 'FuelGuard landing page with the “Don’t get cheated at the pump” hero',
      },
    ],
    model: {
      type: 'laptop',
      alt: 'FuelGuard AI fuel fraud detection dashboard',
      textures: [
        {
          srcSet: `${fuelGuardScreen} 800w, ${fuelGuardScreen} 1920w`,
          placeholder: fuelGuardScreen,
        },
      ],
    },
  },
  {
    slug: 'knowledge-twin',
    title: 'Knowledge Twin - AI Powered Chat Bot',
    shortTitle: 'Knowledge Twin',
    type: 'Hackathon build',
    tagline: 'Documents, images, video and memory in one console.',
    description:
      'Knowledge Twin is a powerful RAG-driven AI built to act like a world-class knowledge expert—able to read documents, understand images and videos, and remember conversations with exceptional accuracy.',
    overview: [
      'Knowledge Twin is a retrieval-augmented generation (RAG) assistant. It reads documents, understands images, watches short videos and remembers the conversation, then answers from the material you gave it.',
      'Uploaded documents are split into chunks and embedded as vectors, so a question finds the right context even when the wording differs. Answers are grounded in your own data rather than guessed.',
    ],
    features: [
      {
        group: 'Multimodal',
        items: [
          { title: 'Image understanding', text: 'Explains photos and diagrams, including text inside images.' },
          { title: 'Video understanding', text: 'Summarises MP4 clips and answers questions about them.' },
          { title: 'Media in chat', text: 'Video player and image previews inside the conversation.' },
        ],
      },
      {
        group: 'Retrieval (RAG)',
        items: [
          { title: 'Semantic search', text: 'Vector search over document chunks finds the exact context.' },
          { title: 'PDF summaries', text: 'Distils long PDFs into short, high-impact bullet points.' },
          { title: 'Grounded answers', text: 'Responses are built from your uploaded data.' },
        ],
      },
      {
        group: 'Memory and resilience',
        items: [
          { title: 'Conversation memory', text: 'Keeps recent messages so follow-up questions just work.' },
          { title: 'Automatic retries', text: 'Backs off and retries when the AI API is rate-limited.' },
          { title: 'Model fallback', text: 'Discovers available Gemini models and falls back through them.' },
        ],
      },
    ],
    architecture: [
      { label: 'React frontend', detail: 'Chat, documents, media and analytics' },
      { label: 'Express API', detail: 'Uploads, queries and dashboard routes' },
      { label: 'RAG + memory', detail: 'Chunking, retrieval and chat history' },
      { label: 'Gemini + MongoDB', detail: 'Generation and vector storage' },
    ],
    stack: [
      {
        group: 'Frontend',
        items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'React Markdown', 'Axios'],
      },
      { group: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Multer', 'pdf-parse'] },
      { group: 'AI', items: ['Google Gemini API', 'Vector embeddings'] },
    ],
    liveLink: 'https://knowledgetwin.netlify.app/',
    sourceCodeLink: 'https://github.com/hanumanraj07/knowledge-twin',
    videoLink: 'https://www.youtube.com/@hanumanraj07',
    hackathonId: 1,
    gallery: [
      {
        kind: 'image',
        src: knowledgeTwinScreenTwo,
        width: 499,
        height: 734,
        alt: 'Knowledge Twin chat conversation on mobile',
      },
      {
        kind: 'image',
        src: knowledgeTwinScreenOne,
        width: 492,
        height: 728,
        alt: 'Knowledge Twin chat interface with a document question',
      },
    ],
    model: {
      type: 'phone',
      alt: 'Knowledge Twin AI chatbot mobile interface',
      textures: [
        {
          srcSet: `${knowledgeTwinScreenTwo} 375w, ${knowledgeTwinScreenTwo} 750w`,
          placeholder: knowledgeTwinScreenTwo,
        },
        {
          srcSet: `${knowledgeTwinScreenOne} 375w, ${knowledgeTwinScreenOne} 750w`,
          placeholder: knowledgeTwinScreenOne,
        },
      ],
    },
  },
  {
    slug: 'student-profile-aggregator',
    title: 'Students Profile Aggregator',
    shortTitle: 'Profile Aggregator',
    type: 'Full-stack app',
    tagline: 'Every coding profile, one dashboard.',
    description:
      'Full-stack platform to aggregate students stats from GitHub, LeetCode, YouTube and Sololearn in one dashboard.',
    overview: [
      'A MERN platform that brings a student’s developer profiles together. It verifies and pulls stats from GitHub, LeetCode and YouTube, links their Sololearn profile, and shows everything on a single dashboard.',
      'Students are ranked on a shared leaderboard by a Dev Score, while admins manage profiles from their own panel.',
    ],
    features: [
      {
        group: 'Students',
        items: [
          { title: 'Verify profile', text: 'Fetches live stats from GitHub, LeetCode and YouTube.' },
          { title: 'Unified dashboard', text: 'All linked platforms in one view.' },
          { title: 'Public dashboards', text: 'Shareable profile pages for each student.' },
          { title: 'Self-service editing', text: 'Students keep their own profile up to date.' },
        ],
      },
      {
        group: 'Ranking',
        items: [
          { title: 'Leaderboard', text: 'Ranked developer cards across all students.' },
          {
            title: 'Dev Score',
            text: 'GitHub repos × 2 + LeetCode problems solved × 3 + YouTube videos × 1.',
          },
        ],
      },
      {
        group: 'Admin',
        items: [
          { title: 'Role-based access', text: 'Separate student and admin roles with JWT auth.' },
          { title: 'Profile management', text: 'Create, edit and delete student profiles.' },
        ],
      },
    ],
    architecture: [
      { label: 'React dashboard', detail: 'Profiles, leaderboard and admin panel' },
      { label: 'Express API', detail: 'JWT auth with student and admin roles' },
      { label: 'Stat services', detail: 'GitHub, LeetCode and YouTube lookups' },
      { label: 'MongoDB', detail: 'Profiles and cached stats' },
    ],
    stack: [
      { group: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Axios'] },
      { group: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt'] },
      { group: 'APIs', items: ['GitHub API', 'LeetCode', 'YouTube Data API'] },
    ],
    liveLink: 'https://profilestack.netlify.app/',
    sourceCodeLink: 'https://github.com/hanumanraj07/profile_aggregator',
    videoLink: 'https://youtu.be/zGbbXOJ6Xpw?si=U0AwU9FtCwziTvvD',
    gallery: [
      {
        kind: 'image',
        src: studentProfileScreen,
        width: 1437,
        height: 758,
        alt: 'Students Profile Aggregator dashboard',
      },
    ],
    model: {
      type: 'laptop',
      alt: 'Students Profile Aggregator dashboard',
      textures: [
        {
          srcSet: `${studentProfileScreen} 800w, ${studentProfileScreen} 1920w`,
          placeholder: studentProfileScreen,
        },
      ],
    },
  },
];

export function getProject(slug) {
  return projects.find(project => project.slug === slug);
}

export function projectPath(project) {
  return `/projects/${project.slug}`;
}

/**
 * Specific video links get a "Watch" action; a channel link is labelled as such
 */
export function getVideoLink(project) {
  if (!project.videoLink) return null;
  const isChannel = project.videoLink.includes('/@');
  return {
    href: project.videoLink,
    label: isChannel ? 'YouTube channel' : 'Watch the video',
  };
}
