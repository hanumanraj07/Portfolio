import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { featuredProjects } from './project-data';
import { MoreProjects, ProjectsIntro } from './more-projects';
import { Skills } from './skills';
import { Certificates } from './certificates';
import { Hackathons } from './hackathons';
import { Contact } from '~/routes/contact/contact';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@remix-run/react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

// The section routes all render the home page, so each needs its own title
// and description to avoid being flagged as duplicate content
const sectionMeta = {
  '/': {
    title: 'Full-Stack MERN Developer & Designer',
    description: `Portfolio of ${config.name}, a Computer Science student and full-stack MERN developer from India building web apps with React, Node.js, Express and MongoDB.`,
  },
  '/details': {
    title: 'About Me',
    description: `About ${config.name} — a Computer Science student and aspiring full-stack developer from India working with React, JavaScript, Node.js and MongoDB.`,
  },
  '/skills': {
    title: 'Skills',
    description: `Technical skills of ${config.name}: React, JavaScript, HTML5, CSS3, Node.js, Express.js, MongoDB, Redis, C, C++, Git, Figma and more.`,
  },
  '/projects': {
    title: 'Projects',
    description: `Projects by ${config.name}, including FuelGuard (AI fuel fraud detection), Knowledge Twin (RAG AI chatbot), Chess Insight (real-time chess analytics), Obsidian (LLM governance), Homecoming (React Native safety app), NexHood and Champions Club.`,
  },
  '/hackathons': {
    title: 'Hackathons',
    description: `Hackathons ${config.name} has competed in, including Dev Heat at IIIT Surat and Robotrix at NITK Surathkal, with the projects built at each.`,
  },
  '/certificates': {
    title: 'Certificates',
    description: `Certifications earned by ${config.name} including Solutions Architecture, Ethical AI, GitHub Copilot, JavaScript, HTML, CSS, C and problem solving.`,
  },
};

export const meta = ({ location }) => {
  const pathname = location?.pathname?.replace(/\/+$/, '') || '/';
  const { title, description } = sectionMeta[pathname] || sectionMeta['/'];

  return baseMeta({ title, description });
};

export const Home = () => {
  const location = useLocation();
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectsIntro = useRef();
  const moreProjects = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const details = useRef();
  const skills = useRef();
  const hackathons = useRef();
  const certificates = useRef();
  const contact = useRef();
  const projectRefs = [projectOne, projectTwo, projectThree, projectFour, projectFive];

  useEffect(() => {
    const sectionPathMap = {
      '/details': 'details',
      '/skills': 'skills',
      '/projects': 'projects',
      '/hackathons': 'hackathons',
      '/certificates': 'certificates',
      '/contact': 'contact',
    };

    const targetId = sectionPathMap[location.pathname];

    if (!targetId) return;

    const element = document.getElementById(targetId);

    if (!element) return;

    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.pathname]);

  useEffect(() => {
    const sections = [intro, details, skills, projectsIntro, projectOne, projectTwo, projectThree, projectFour, projectFive, moreProjects, hackathons, certificates, contact];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            setVisibleSections(prevSections =>
              prevSections.includes(section) ? prevSections : [...prevSections, section]
            );
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
    // Observe once; rebuilding the observers on every reveal re-measured every section
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Skills
        sectionRef={skills}
        visible={visibleSections.includes(skills.current)}
        id="skills"
      />
      <ProjectsIntro
        id="projects"
        sectionRef={projectsIntro}
        visible={visibleSections.includes(projectsIntro.current)}
      />
      {featuredProjects.map((project, index) => (
        <ProjectSummary
          key={project.slug}
          id={`project-${index + 1}`}
          sectionRef={projectRefs[index]}
          visible={visibleSections.includes(projectRefs[index].current)}
          index={index + 1}
          alternate={index % 2 === 1}
          project={project}
        />
      ))}
      <MoreProjects
        id="more-projects"
        sectionRef={moreProjects}
        visible={visibleSections.includes(moreProjects.current)}
      />
      <Hackathons
        id="hackathons"
        sectionRef={hackathons}
        visible={visibleSections.includes(hackathons.current)}
        style={{ marginBottom: '100px' }}
      />
      <Certificates
        sectionRef={certificates}
        visible={visibleSections.includes(certificates.current)}
        id="certificates"
      />
      <Contact
        id="contact"
        sectionRef={contact}
        hideFooter
      />
      <Footer />
    </div>
  );
};
