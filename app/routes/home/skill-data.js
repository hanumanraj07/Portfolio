import { projects } from './project-data';

// Brand colours come from Simple Icons. Logos whose brand colour is black are
// marked `mono` and take the text colour, so they stay visible in dark mode.
export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    summary: 'Interfaces, motion and responsive layout',
    skills: [
      { name: 'HTML5', icon: 'html5', color: '#E34F26', note: 'Semantic markup' },
      { name: 'CSS', icon: 'css', color: '#663399', note: 'Layout and motion' },
      { name: 'React', icon: 'react', color: '#61DAFB', note: 'Component UIs' },
      { name: 'Next.js', icon: 'nextjs', mono: true, note: 'Full-stack React' },
      {
        name: 'Tailwind CSS',
        icon: 'tailwind',
        color: '#06B6D4',
        note: 'Utility-first styling',
      },
      { name: 'Framer Motion', icon: 'framer', color: '#0055FF', note: 'UI animation' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    summary: 'Native apps from one React codebase',
    skills: [
      {
        name: 'React Native',
        icon: 'react',
        color: '#61DAFB',
        note: 'iOS and Android',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    summary: 'APIs, auth and services',
    skills: [
      { name: 'Node.js', icon: 'nodejs', color: '#5FA04E', note: 'JavaScript runtime' },
      { name: 'Express.js', icon: 'express', mono: true, note: 'REST APIs' },
      { name: 'FastAPI', icon: 'fastapi', color: '#009688', note: 'Python APIs' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    summary: 'Modelling, querying and caching data',
    skills: [
      { name: 'MongoDB', icon: 'mongodb', color: '#47A248', note: 'Document database' },
      { name: 'MySQL', icon: 'mysql', color: '#4479A1', note: 'Relational SQL' },
      {
        name: 'PostgreSQL',
        icon: 'postgresql',
        color: '#4169E1',
        note: 'Object-relational SQL',
      },
      { name: 'Redis', icon: 'redis', color: '#FF4438', note: 'In-memory cache' },
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    summary: 'What I write and think in',
    skills: [
      {
        name: 'JavaScript',
        icon: 'javascript',
        color: '#F7DF1E',
        note: 'Web and Node.js',
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        color: '#3178C6',
        note: 'Typed JavaScript',
      },
      { name: 'Python', icon: 'python', color: '#3776AB', note: 'AI and APIs' },
      { name: 'C', icon: 'c', color: '#A8B9CC', note: 'Systems basics' },
      { name: 'C++', icon: 'cpp', color: '#00599C', note: 'Data structures' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Cloud',
    summary: 'Build, test, design and ship',
    skills: [
      { name: 'Git', icon: 'git', color: '#F03C2E', note: 'Version control' },
      { name: 'GitHub', icon: 'github', mono: true, note: 'Code and reviews' },
      { name: 'Postman', icon: 'postman', color: '#FF6C37', note: 'API testing' },
      { name: 'Vite', icon: 'vite', color: '#9135FF', note: 'Build tooling' },
      { name: 'Vercel', icon: 'vercel', mono: true, note: 'Frontend hosting' },
      { name: 'Netlify', icon: 'netlify', color: '#00C7B7', note: 'Web hosting' },
      { name: 'Render', icon: 'render', mono: true, note: 'Backend hosting' },
      { name: 'Figma', icon: 'figma', color: '#F24E1E', note: 'UI design' },
    ],
  },
];

export const skillCount = skillCategories.reduce(
  (total, category) => total + category.skills.length,
  0
);

const usesTech = (project, pattern) =>
  project.stack.some(group => group.items.some(item => pattern.test(item)));

const mernPatterns = [/^React\b/, /^Express\b/, /^Node\.js$/, /^MongoDB$/];

// The stack drawn as layers, from the browser down to the data
export const coreStack = {
  name: 'MERN',
  layers: [
    {
      role: 'Interface',
      name: 'React',
      icon: 'react',
      color: '#61DAFB',
      note: 'Components, routing, motion',
    },
    {
      role: 'API',
      name: 'Express.js',
      icon: 'express',
      mono: true,
      note: 'REST endpoints and auth',
    },
    {
      role: 'Runtime',
      name: 'Node.js',
      icon: 'nodejs',
      color: '#5FA04E',
      note: 'Event-driven JavaScript',
    },
    {
      role: 'Data',
      name: 'MongoDB',
      icon: 'mongodb',
      color: '#47A248',
      note: 'Documents with Mongoose',
    },
  ],
  // Projects in the portfolio built on all four layers
  projects: projects.filter(project =>
    mernPatterns.every(pattern => usesTech(project, pattern))
  ),
};
