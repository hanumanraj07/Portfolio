import bugattiVideo from '~/assets/bugatti-Trim.mp4';
import bugattiPoster from '~/assets/bugatti.png';
import epicScreenOne from '~/assets/gta.jpg';
import epicScreenTwo from '~/assets/epic-3.jpeg';
import fuelGuardScreen from '~/assets/FuelGaurd.png';
import knowledgeTwinScreenOne from '~/assets/Mobile-knowleadge.png';
import knowledgeTwinScreenTwo from '~/assets/Mobile-knowleadge2.png';
import studentProfileScreen from '~/assets/StudentProfile.png';
import chessDashboard from '~/assets/moreProjectsImages/chess-insight-dashboard.jpg';
import chessAnalytics from '~/assets/moreProjectsImages/chess-insight-analytics.jpg';
import chessPlay from '~/assets/moreProjectsImages/chess-insight-play.jpg';
import chessLeaderboards from '~/assets/moreProjectsImages/chess-insight-leaderboards.jpg';
import chessOpenings from '~/assets/moreProjectsImages/chess-insight-openings.jpg';
import chessScreen from '~/assets/moreProjectsImages/chess-insight-screen.jpg';
import homecomingWelcome from '~/assets/moreProjectsImages/homecoming-welcome.jpg';
import homecomingHome from '~/assets/moreProjectsImages/homecoming-home.jpg';
import homecomingDestination from '~/assets/moreProjectsImages/homecoming-destination.jpg';
import homecomingJourney from '~/assets/moreProjectsImages/homecoming-journey.jpg';
import homecomingSafety from '~/assets/moreProjectsImages/homecoming-safety.jpg';
import obsidianDashboard from '~/assets/moreProjectsImages/obsidian-dashboard.jpg';
import obsidianAnalytics from '~/assets/moreProjectsImages/obsidian-analytics.jpg';
import obsidianHealth from '~/assets/moreProjectsImages/obsidian-health.jpg';
import obsidianScreen from '~/assets/moreProjectsImages/obsidian-screen.jpg';
import nexhoodHome from '~/assets/moreProjectsImages/nexhood-home.jpg';
import nexhoodOps from '~/assets/moreProjectsImages/nexhood-ops.jpg';
import nexhoodLab from '~/assets/moreProjectsImages/nexhood-lab.jpg';
import nexhoodParking from '~/assets/moreProjectsImages/nexhood-parking.jpg';
import nexhoodScreen from '~/assets/moreProjectsImages/nexhood-screen.jpg';
import championsPos from '~/assets/moreProjectsImages/champions-club-pos.jpg';
import championsHome from '~/assets/moreProjectsImages/champions-club-home.jpg';
import championsPlans from '~/assets/moreProjectsImages/champions-club-plans.jpg';
import championsProducts from '~/assets/moreProjectsImages/champions-club-products.jpg';
import championsScreen from '~/assets/moreProjectsImages/champions-club-screen.jpg';

/**
 * Media for a project. Featured projects describe theirs with `gallery` and
 * `model`; newer projects use an `assets` block, read through getProjectMedia().
 * Until a project has a cover, its card and page show a designed placeholder
 * built from `placeholder` ({ frame: 'browser' | 'phone', monogram, hue }).
 * Project cards list `badges`, a few key technologies, falling back to `stack`.
 * `layout` sets the card's shape in the full index: 'feature', 'tall', 'standard' or 'row'.
 *
 * @typedef {{ src: string, width: number, height: number, alt: string }} ProjectImage
 * @typedef {{ src: string, poster: string, width: number, height: number, alt: string }} ProjectVideo
 * @typedef {{ type: 'laptop' | 'phone', alt: string, textures: Array<{ srcSet: string, placeholder: string, fit?: 'cover' }> }} ProjectModel
 * @typedef {{
 *   cover: ProjectImage | null,
 *   screenshots: ProjectImage[],
 *   video: ProjectVideo | null,
 *   model: ProjectModel | null,
 *   illustrations: Array<ProjectImage & { caption?: string }>,
 * }} ProjectAssets
 */

// Project details are taken from each project's repository (README, routes
// and package.json), so keep them in sync when a project changes.
export const projects = [
  {
    slug: 'bugatti-clone',
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
  {
    slug: 'chess-insight',
    title: 'Chess Insight AI – Chess Analytics and Live Play',
    shortTitle: 'Chess Insight',
    type: 'Full-stack app',
    categories: ['web'],
    layout: 'feature',
    tagline: 'Chess data, an engine and live games in one app.',
    description:
      'A full-stack chess platform that turns a match dataset into analytics dashboards, with live multiplayer games and a Stockfish opponent that runs in the browser.',
    problem:
      'A chess dataset is just a long list of games. It doesn’t show which openings win, how ratings move or how two players compare, and studying a position usually means switching to separate analysis and play tools.',
    solution:
      'Chess Insight loads the match data into MongoDB and answers those questions with aggregation pipelines behind interactive dashboards. In the same app you can replay any game, evaluate positions with Stockfish, and play live against another person or the engine.',
    features: [
      {
        group: 'Analytics',
        items: [
          { title: 'Analytics dashboard', text: 'Openings, win conditions and rating trends, charted from server-side aggregations.' },
          { title: 'Opening explorer', text: 'Browse openings and see how often each one wins.' },
          { title: 'Players and leaderboards', text: 'Profiles, rankings and side-by-side player comparison.' },
          { title: 'Match replay', text: 'Step through any recorded game move by move.' },
        ],
      },
      {
        group: 'Play',
        items: [
          { title: 'Play the engine', text: 'Stockfish runs in a Web Worker, with a live evaluation of the position.' },
          { title: 'Live multiplayer', text: 'Real-time rooms with draw offers, resignation and chat.' },
          { title: 'Matchmaking', text: 'A queue pairs you with a random opponent.' },
        ],
      },
      {
        group: 'Accounts',
        items: [
          { title: 'Sign-in', text: 'Email and password with JWT, or Google sign-in.' },
          { title: 'Admin dashboard', text: 'User management for administrators.' },
        ],
      },
    ],
    technicalHighlights: [
      {
        title: 'Server-authoritative games',
        text: 'Every move in a live room is replayed through chess.js on the server, so illegal and out-of-turn moves are rejected before the opponent sees them.',
      },
      {
        title: 'Built to scale out',
        text: 'Socket.IO runs on a Redis adapter and the matchmaking queue lives in a Redis sorted set, so players on different server instances can still be paired.',
      },
      {
        title: 'An engine without a server',
        text: 'Stockfish speaks UCI from a Web Worker, so analysis never blocks the interface or costs server time.',
      },
      {
        title: 'Analytics in the database',
        text: 'Stats are computed with MongoDB $match, $group and $bucket stages rather than in application code.',
      },
      {
        title: 'Production basics',
        text: 'Rate limiting, request validation and Swagger docs on the API, with CI building both apps on Node 20 and 22.',
      },
    ],
    architecture: [
      { label: 'React + Redux app', detail: 'Dashboards, board, replay and play' },
      { label: 'Express API', detail: 'Auth, analytics, search and admin' },
      { label: 'Socket.IO + Redis', detail: 'Live rooms and matchmaking' },
      { label: 'MongoDB', detail: 'Matches, players and users' },
    ],
    badges: ['React', 'Redux Toolkit', 'Socket.IO', 'Redis', 'MongoDB', 'Stockfish'],
    stack: [
      {
        group: 'Frontend',
        items: ['React', 'Vite', 'Redux Toolkit', 'Material UI', 'Recharts', 'react-chessboard', 'chess.js'],
      },
      {
        group: 'Backend',
        items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Socket.IO', 'Redis', 'JWT', 'Swagger'],
      },
      { group: 'Engine and DevOps', items: ['Stockfish', 'Docker', 'GitHub Actions', 'Vercel', 'Render'] },
    ],
    team: 'Solo project',
    liveLink: 'https://chess-insight-ai.vercel.app/',
    sourceCodeLink: 'https://github.com/hanumanraj07/chessInsight',
    placeholder: { frame: 'browser', monogram: 'Ci', hue: 75 },
    assets: {
      cover: { src: chessDashboard, width: 1600, height: 1000, alt: 'Chess Insight dashboard with match, player and opening totals and charts' },
      screenshots: [
        { src: chessDashboard, width: 1600, height: 1000, alt: 'Chess Insight dashboard with match, player and opening totals and charts' },
        { src: chessAnalytics, width: 1600, height: 1000, alt: 'Chess Insight analytics: match outcomes and opening success rates' },
        { src: chessPlay, width: 1600, height: 1000, alt: 'Chess Insight play against the engine, with match settings and difficulty' },
        { src: chessLeaderboards, width: 1600, height: 1000, alt: 'Chess Insight global leaderboards: highest rated, most active and giant slayers' },
        { src: chessOpenings, width: 1600, height: 1000, alt: 'Chess Insight openings ranked by game count, with win rates' },
      ],
      video: null,
      model: {
        type: 'laptop',
        alt: 'Chess Insight analytics dashboard on a laptop',
        textures: [{ srcSet: `${chessScreen} 1440w`, placeholder: chessScreen }],
      },
      illustrations: [],
    },
  },
  {
    slug: 'homecoming',
    title: 'Homecoming – Personal Safety Journeys',
    shortTitle: 'Homecoming',
    type: 'Mobile app',
    categories: ['mobile'],
    layout: 'tall',
    tagline: 'A safety net for the trip home.',
    description:
      'A React Native safety app for travelling alone. Plan a route, share the journey with trusted contacts and check in on the way. Miss a check-in and it prepares an SOS message with your location.',
    problem:
      'Sharing a live location shows where someone is, not whether they are okay. Someone walking home alone at night has no simple way to confirm they arrived, or to raise the alarm when they stop responding.',
    solution:
      'Homecoming turns a trip into a timed safety journey. You choose a destination, a route and trusted contacts, and the app asks you to check in at an interval sized to the trip. If you miss one, a countdown starts and then an emergency message with your location is prepared for your contacts.',
    features: [
      {
        group: 'Journeys',
        items: [
          { title: 'Route planning', text: 'Search a destination and compare routes for walking, cycling, driving or bus.' },
          { title: 'Timed check-ins', text: 'The check-in interval is sized from the route’s duration.' },
          { title: 'Missed check-in alerts', text: 'A countdown after the grace period, then an SOS message with your location.' },
          { title: 'Background tracking', text: 'Location keeps updating while the app is in the background.' },
        ],
      },
      {
        group: 'Safety tools',
        items: [
          { title: 'SOS button', text: 'One tap prepares a message with your location for every trusted contact.' },
          { title: 'Fake call', text: 'A realistic incoming-call screen for a quick way out.' },
          { title: 'Low-battery warning', text: 'Offers to tell your contacts before tracking might stop.' },
        ],
      },
      {
        group: 'Your data',
        items: [
          { title: 'Trusted contacts', text: 'Import contacts straight from the phone.' },
          { title: 'Templates and favourites', text: 'Save regular journeys and places.' },
          { title: 'Insights', text: 'Journeys taken, minutes travelled and alerts sent.' },
        ],
      },
    ],
    technicalHighlights: [
      {
        title: 'Missed check-in detection',
        text: 'A 15-second check compares the clock with the last check-in plus the interval and grace period, and re-arms on every new check-in so an alert never fires twice.',
      },
      {
        title: 'Background location',
        text: 'A TaskManager task posts location updates to the API while the app is backgrounded, and is skipped in Expo Go, which lacks the native permissions it needs.',
      },
      {
        title: 'Open map services with fallbacks',
        text: 'Places come from Nominatim and Overpass, tried across mirrors, and routes from OSRM with a straight-line estimate if routing fails.',
      },
      {
        title: 'Honest alerts',
        text: 'Expo can’t send texts silently, so alerts open a pre-filled message and the app tells you to tap Send rather than implying it already went.',
      },
    ],
    architecture: [
      { label: 'Expo Router app', detail: 'Journey wizard, live journey and safety tools' },
      { label: 'Express API', detail: 'Auth, journeys, check-ins and contacts' },
      { label: 'MongoDB', detail: 'Journeys with check-in and location history' },
      { label: 'OpenStreetMap services', detail: 'Search, routing and nearby places' },
    ],
    badges: ['React Native', 'Expo', 'TypeScript', 'Express 5', 'MongoDB'],
    stack: [
      {
        group: 'Mobile',
        items: ['React Native', 'Expo', 'Expo Router', 'TypeScript', 'React Native Maps', 'Reanimated'],
      },
      {
        group: 'Device APIs',
        items: ['Expo Location', 'Task Manager', 'Expo Contacts', 'Expo SMS', 'Expo Battery', 'Secure Store'],
      },
      { group: 'Backend', items: ['Node.js', 'Express 5', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt'] },
      { group: 'Maps', items: ['Nominatim', 'OSRM', 'Overpass'] },
    ],
    team: 'Solo project',
    liveLink: null,
    sourceCodeLink: 'https://github.com/hanumanraj07/Homecoming',
    placeholder: { frame: 'phone', monogram: 'Hc', hue: 28 },
    assets: {
      cover: { src: homecomingJourney, width: 591, height: 1280, alt: 'Homecoming active journey: the route on a map with an I’m safe check-in button' },
      screenshots: [
        { src: homecomingWelcome, width: 591, height: 1280, alt: 'Homecoming welcome screen' },
        { src: homecomingHome, width: 591, height: 1280, alt: 'Homecoming home screen with journey status and quick actions' },
        { src: homecomingDestination, width: 591, height: 1280, alt: 'Homecoming journey wizard asking where you are headed' },
        { src: homecomingJourney, width: 591, height: 1280, alt: 'Homecoming active journey: the route on a map with an I’m safe check-in button' },
        { src: homecomingSafety, width: 591, height: 1280, alt: 'Homecoming Safety Center with the SOS button and a readiness check' },
      ],
      video: null,
      model: {
        type: 'phone',
        alt: 'Homecoming safety app screens on two phones',
        textures: [
          { srcSet: `${homecomingJourney} 591w`, placeholder: homecomingJourney, fit: 'cover' },
          { srcSet: `${homecomingHome} 591w`, placeholder: homecomingHome, fit: 'cover' },
        ],
      },
      illustrations: [],
    },
  },
  {
    slug: 'obsidian',
    title: 'Obsidian – AI Governance and Audit Platform',
    shortTitle: 'Obsidian',
    type: 'Hackathon build',
    categories: ['ai', 'web', 'hackathon'],
    layout: 'standard',
    tagline: 'Every LLM call, audited and on budget.',
    description:
      'A governance layer for LLM apps. Each query is screened for personal data and prompt injection, kept within its agent’s budget, routed to a suitable model and logged with a trust score.',
    problem:
      'Teams adding LLM features rarely see what each call costs, which model answered or whether a prompt leaked personal data. Budgets overrun quietly, and there is no record to show a reviewer.',
    solution:
      'Obsidian sits between the application and the model. It screens each query, enforces a per-agent budget, switches to a cheaper model when costs climb, and records every decision in an audit log that the dashboard turns into spend, latency and trust metrics.',
    features: [
      {
        group: 'Governance',
        items: [
          { title: 'Policy checks', text: 'Flags card numbers, SSNs and emails, and blocks known prompt-injection phrases.' },
          { title: 'Budget caps', text: 'Hard limits per agent; queries stop when the budget runs out.' },
          { title: 'Auto-remediation', text: 'Moves a category to a cheaper model when costs escalate.' },
          { title: 'Agent isolation', text: 'Separate budgets, logs and scores for each agent.' },
        ],
      },
      {
        group: 'Visibility',
        items: [
          { title: 'Audit trail', text: 'Model, cost, latency and action for every query.' },
          { title: 'Trust score', text: 'Compliance 40%, cost efficiency 30% and recall 30%, shown with its formula.' },
          { title: 'ROI view', text: 'Actual spend against a worst-case baseline.' },
          { title: 'Slack alerts', text: 'Admins hear about compliance stops and low budgets.' },
        ],
      },
      {
        group: 'Integration',
        items: [
          { title: 'OpenAI-compatible gateway', text: 'A /v1/chat/completions endpoint behind an API key.' },
          { title: 'Terminal dashboard', text: 'A CLI with a live cost chart and event log.' },
          { title: 'Ask Obsidian', text: 'Try a query and watch the policy decide.' },
        ],
      },
    ],
    technicalHighlights: [
      {
        title: 'Budget checked before the call',
        text: 'Built on the cascadeflow harness, which checks the budget before each model call, so a query that would overspend never reaches the model.',
      },
      {
        title: 'Cost-aware routing',
        text: 'Queries are classified by category and routed between a default model and a cheaper fallback on Groq (Llama 3.3 70B and 3.1 8B out of the box), and every automatic switch is logged.',
      },
      {
        title: 'Drop-in adoption',
        text: 'Because the gateway speaks the OpenAI chat API, an existing client can route through Obsidian by changing its base URL.',
      },
      {
        title: 'Explainable scoring',
        text: 'The trust score is shown with its weighted formula and recall checks instead of as an opaque number.',
      },
    ],
    architecture: [
      { label: 'Next.js dashboard', detail: 'Overview, events, analytics and trust score' },
      { label: 'API proxy route', detail: 'Forwards dashboard calls to the backend' },
      { label: 'FastAPI + cascadeflow', detail: 'Policy, budget and routing decisions' },
      { label: 'Groq models', detail: 'Configurable default and fallback models' },
    ],
    badges: ['Next.js 15', 'TypeScript', 'FastAPI', 'cascadeflow', 'Groq API'],
    stack: [
      {
        group: 'Frontend',
        items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
      },
      { group: 'Backend', items: ['Python', 'FastAPI', 'Pydantic', 'cascadeflow', 'Groq API'] },
      { group: 'Tooling', items: ['Node.js CLI', 'blessed-contrib', 'Slack webhooks', 'Vercel'] },
    ],
    team: 'Team of 4',
    contribution:
      'I built the Ask Obsidian query page, the dark dashboard redesign with its Platform and Health topology pages, and the terminal CLI. On the backend I added the OpenAI-compatible gateway and the admin endpoints, and fixed PII and jailbreak blocking.',
    liveLink: 'https://frontend-gamma-fawn-77.vercel.app/',
    sourceCodeLink: 'https://github.com/hanumanraj07/Obsidian',
    placeholder: { frame: 'browser', monogram: 'Ob', hue: 293 },
    assets: {
      cover: { src: obsidianDashboard, width: 1600, height: 973, alt: 'Obsidian command center with budget, spend, latency and the cost curve' },
      screenshots: [
        { src: obsidianDashboard, width: 1600, height: 973, alt: 'Obsidian command center with budget, spend, latency and the cost curve' },
        { src: obsidianAnalytics, width: 1600, height: 947, alt: 'Obsidian analytics: cost by category, model distribution and latency' },
        { src: obsidianHealth, width: 1600, height: 1000, alt: 'Obsidian system topology with live infrastructure logs' },
      ],
      video: null,
      model: {
        type: 'laptop',
        alt: 'Obsidian AI governance dashboard on a laptop',
        textures: [{ srcSet: `${obsidianScreen} 1440w`, placeholder: obsidianScreen }],
      },
      illustrations: [],
    },
  },
  {
    slug: 'nexhood',
    title: 'NexHood – Neighbourhood Intelligence and Smart Visitor Parking',
    shortTitle: 'NexHood',
    type: 'Full-stack app',
    categories: ['web'],
    layout: 'standard',
    tagline: 'Know your neighborhood. Own your space.',
    description:
      'A real estate intelligence platform that scores neighbourhoods out of 100, maps nearby amenities with live air quality, and runs QR visitor passes for apartment parking.',
    problem:
      'Homebuyers judge a neighbourhood from brochures, brokers and scattered reviews. In apartment societies, visitor parking runs on paper logbooks, so guards can’t tell who is allowed in or which guest slot is free.',
    solution:
      'NexHood gathers neighbourhood data into one profile with a NexScore and side-by-side comparison, and replaces the parking logbook with time-bound QR passes that residents issue and guards scan at the gate. Scores use seeded sample data today, while nearby places and air quality are fetched live.',
    features: [
      {
        group: 'Neighbourhoods',
        items: [
          { title: 'NexScore', text: 'A 0–100 score built from six sub-scores, from education and safety to growth.' },
          { title: 'Compare areas', text: 'Side-by-side comparison across every metric.' },
          { title: 'Location explorer', text: 'Search a place to map nearby amenities and properties.' },
          { title: 'Live air quality', text: 'AQI readings from OpenAQ.' },
          { title: 'Intelligence Lab', text: 'Lifestyle match scores, a future risk radar and an investment simulator.' },
        ],
      },
      {
        group: 'Visitor parking',
        items: [
          { title: 'QR passes', text: 'Residents issue time-bound passes that reserve a guest slot.' },
          { title: 'Gate scanner', text: 'Guards scan passes with the device camera.' },
          { title: 'Automatic release', text: 'Exits and expired passes free the slot.' },
          { title: 'Slot board', text: 'Free and occupied guest slots at a glance.' },
        ],
      },
      {
        group: 'Access',
        items: [
          { title: 'Roles', text: 'Resident, guard and admin, each with its own permissions.' },
          { title: 'Google sign-in', text: 'Or email and password with JWT.' },
        ],
      },
    ],
    technicalHighlights: [
      {
        title: 'Role-guarded API',
        text: 'Only residents and admins can issue passes and only guards and admins can verify them, enforced by middleware on each route.',
      },
      {
        title: 'QR scanning in the browser',
        text: 'The guard view reads the camera stream with jsQR, which loads only when the scanner opens.',
      },
      {
        title: 'Slots that free themselves',
        text: 'Every parking request sweeps expired passes before reading slot state, so a guest who overstays never holds a slot for good.',
      },
      {
        title: 'Live data where it counts',
        text: 'Nearby amenities and properties come from Google Places and air quality from OpenAQ, layered over the seeded neighbourhood scores.',
      },
    ],
    architecture: [
      { label: 'React app', detail: 'Explorer, dashboards, parking and guard views' },
      { label: 'Express API', detail: 'Auth, neighbourhoods, parking and admin' },
      { label: 'MongoDB', detail: 'Users, passes and neighbourhood data' },
      { label: 'Data APIs', detail: 'Google Places and OpenAQ' },
    ],
    badges: ['React', 'Tailwind CSS', 'Express', 'MongoDB', 'React Leaflet'],
    stack: [
      {
        group: 'Frontend',
        items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Leaflet', 'Recharts', 'jsQR'],
      },
      { group: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt', 'qrcode'] },
      { group: 'Data APIs', items: ['Google Places', 'OpenAQ', 'Google Sign-In'] },
    ],
    team: 'Solo project',
    liveLink: 'https://nexhood.vercel.app/',
    sourceCodeLink: 'https://github.com/hanumanraj07/nexhood',
    placeholder: { frame: 'browser', monogram: 'Nh', hue: 178 },
    assets: {
      cover: { src: nexhoodOps, width: 1600, height: 1000, alt: 'NexHood Ops Center with the smart parking command center and society operations score' },
      screenshots: [
        { src: nexhoodOps, width: 1600, height: 1000, alt: 'NexHood Ops Center with the smart parking command center and society operations score' },
        { src: nexhoodParking, width: 1600, height: 578, alt: 'NexHood visitor parking: generate a visitor pass and see the guest slot map' },
        { src: nexhoodLab, width: 1600, height: 1000, alt: 'NexHood Intelligence Lab with lifestyle match scores and a future risk radar' },
        { src: nexhoodHome, width: 1600, height: 1000, alt: 'NexHood public landing page with the neighbourhood search' },
      ],
      video: null,
      model: {
        type: 'laptop',
        alt: 'NexHood Ops Center dashboard on a laptop',
        textures: [{ srcSet: `${nexhoodScreen} 1440w`, placeholder: nexhoodScreen }],
      },
      illustrations: [],
    },
  },
  {
    slug: 'champions-club',
    title: 'Champions Club – Sports Club Management on Odoo',
    shortTitle: 'Champions Club',
    type: 'Hackathon build',
    categories: ['web', 'hackathon'],
    layout: 'row',
    event: 'Odoo Hackathon 2026',
    tagline: 'One member record sets the price everywhere.',
    description:
      'A sports club operating system on Odoo 17 for court bookings, memberships, a pro shop and a bar POS, where a member’s tier sets the price everywhere and website enquiries flow into a CRM pipeline.',
    problem:
      'Racket clubs run on spreadsheets, WhatsApp groups and paper. Courts get double-booked, member discounts are applied from memory, and enquiries from the website get lost.',
    solution:
      'Champions Club runs the whole club on Odoo. Bookings, shop and bar orders, invoices and the public website share one database, prices always come from the member’s tier pricelist on the server, and enquiries move through a CRM pipeline from lead to quote to member.',
    features: [
      {
        group: 'Courts and members',
        items: [
          { title: 'Booking grid', text: 'Live availability in 30-minute slots, one-hour sessions and two bookings a day.' },
          { title: 'Memberships', text: 'Gold, Silver and Junior plans with member IDs, QR cards and automatic lapse.' },
          { title: 'Reschedule and cancel', text: 'Every change re-runs the booking rules.' },
          { title: 'Friday social play', text: 'Shared courts with a player capacity per slot.' },
        ],
      },
      {
        group: 'Shop and bar',
        items: [
          { title: 'Pro shop', text: 'Catalogue, cart and checkout against live stock.' },
          { title: 'Bar POS', text: 'Tables, open tabs and cash, card or UPI payment.' },
          { title: 'Tier pricing', text: 'The shop, the bar and Odoo’s own POS read the same pricelist.' },
        ],
      },
      {
        group: 'Running the club',
        items: [
          { title: 'CRM pipeline', text: 'Website enquiry to lead, quote and member.' },
          { title: 'Owner dashboard', text: 'Revenue by source, GST, payroll and leave in one place.' },
          { title: 'Public website', text: 'Plans, live availability, online booking and the shop.' },
        ],
      },
    ],
    technicalHighlights: [
      {
        title: 'No double bookings under load',
        text: 'The overlap check locks the court row with SELECT … FOR UPDATE, so two simultaneous requests can’t both take the same slot.',
      },
      {
        title: 'One source of truth for price',
        text: 'Each plan generates an Odoo pricelist, every screen asks the server for prices, and a test checks that the screen price matches the real POS.',
      },
      {
        title: 'Club-time rules',
        text: 'Daily limits and Friday social play are worked out in Asia/Kolkata time, not the server’s timezone.',
      },
      {
        title: 'Tested in a real browser',
        text: 'Python tests cover the booking, pricing and CRM rules, and headless Chrome scripts drive the real screens and then check the database.',
      },
      {
        title: 'Hardened public forms',
        text: 'CSRF tokens, a honeypot field and random status tokens stop enquiries from being spammed or guessed.',
      },
    ],
    architecture: [
      { label: 'club_website', detail: 'Public pages, availability and online booking' },
      { label: 'OWL screens', detail: 'Booking grid, plans, pro shop and bar POS' },
      { label: 'club_management', detail: 'Rules, pricing, CRM and reports in Python' },
      { label: 'Odoo 17 + PostgreSQL', detail: 'CRM, Sales, Inventory, Accounting and POS' },
    ],
    badges: ['Odoo 17', 'Python', 'OWL', 'PostgreSQL 15', 'Docker Compose'],
    stack: [
      { group: 'Platform', items: ['Odoo 17', 'Python', 'PostgreSQL 15'] },
      { group: 'Frontend', items: ['OWL', 'JavaScript', 'QWeb', 'SCSS'] },
      { group: 'Tooling', items: ['Docker Compose', 'Puppeteer', 'Mailpit'] },
    ],
    team: 'Hackathon team',
    contribution:
      'I built the club_management backend (booking rules, tier pricing, invoicing, the CRM pipeline and scheduled jobs), the public website and the owner dashboard and reports, and connected the team’s OWL screens to the backend.',
    liveLink: null,
    sourceCodeLink: 'https://github.com/hanumanraj07/OdooXLDCE',
    placeholder: { frame: 'browser', monogram: 'Cc', hue: 150 },
    assets: {
      cover: { src: championsPos, width: 1600, height: 1000, alt: 'Champions Club bar and POS screen with the menu and an order panel' },
      screenshots: [
        { src: championsPos, width: 1600, height: 1000, alt: 'Champions Club bar and POS screen with the menu and an order panel' },
        { src: championsHome, width: 1600, height: 1000, alt: 'Champions Club home with front desk, member and owner shortcuts' },
        { src: championsPlans, width: 1600, height: 1000, alt: 'Champions Club membership plans: Gold, Silver and Junior' },
        { src: championsProducts, width: 1600, height: 1000, alt: 'Champions Club shop and bar products with prices and stock' },
      ],
      video: null,
      model: {
        type: 'laptop',
        alt: 'Champions Club bar and POS screen on a laptop',
        textures: [{ srcSet: `${championsScreen} 1440w`, placeholder: championsScreen }],
      },
      illustrations: [],
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

/**
 * Filters for the More projects grid. A project can sit in several.
 */
export const projectCategories = [
  { id: 'web', label: 'Web platforms' },
  { id: 'ai', label: 'AI & LLM' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'hackathon', label: 'Hackathon builds' },
];

export const featuredProjects = projects.filter(project => project.featured);
export const moreProjects = projects.filter(project => !project.featured);

/**
 * A project's media in one shape, whether it comes from an `assets` block or
 * from a featured project's original `gallery` and `model`
 * @returns {ProjectAssets}
 */
export function getProjectMedia(project) {
  if (project.assets) {
    const { cover = null, screenshots = [], video = null, model = null, illustrations = [] } =
      project.assets;
    return { cover, screenshots, video, model, illustrations };
  }

  const screenshots = project.gallery.filter(item => item.kind === 'image');
  const video = project.gallery.find(item => item.kind === 'video') || null;
  const poster = video && {
    src: video.poster,
    width: video.width,
    height: video.height,
    alt: video.alt,
  };

  return {
    cover: screenshots[0] || poster || null,
    screenshots,
    video,
    model: project.model || null,
    illustrations: [],
  };
}

/**
 * The repository link to show, or null while the repository is private
 */
export function getSourceLink(project) {
  return project.sourcePrivate ? null : project.sourceCodeLink;
}
