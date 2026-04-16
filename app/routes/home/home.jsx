import bugattiTexture from '~/assets/bugatti-Trim.mp4'; // Video texture
import bugattiTextureLarge from '~/assets/bugatti-Trim.mp4';
import bugattiTexturePlaceholder from '~/assets/bugatti.png';
import epicTexture1 from '~/assets/gta.jpg';
import epicTexture2 from '~/assets/epic-3.jpeg';
import sliceTextureLarge from '~/assets/flatline.png';
import sliceTexturePlaceholder from '~/assets/flatline.png';
import sliceTexture from '~/assets/flatline.png';
import sprTextureLarge from '~/assets/flatline.png';
import sprTexturePlaceholder from '~/assets/flatline.png';
import sprTexture from '~/assets/flatline.png';
import fuelGaurdTexture from '~/assets/FuelGaurd.png';
import mobileKnowleadgeTexture1 from '~/assets/Mobile-knowleadge.png';
import mobileKnowleadgeTexture2 from '~/assets/Mobile-knowleadge2.png';
import studentProfileTexture from '~/assets/StudentProfile.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
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

export const meta = () => {
  return baseMeta({
    title: 'Developer + Designer',
    description: `Design portfolio of ${config.name} — a full-stack developer working on web & mobile apps with a focus on experience design and accessibility.`,
    keywords: 'portfolio, web developer, full-stack developer, React, JavaScript, design, accessibility, Hanuman Rajpurohit',
  });
};

export const Home = () => {
  const location = useLocation();
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
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

  useEffect(() => {
    const sectionPathMap = {
      '/details': 'details',
      '/skills': 'skills',
      '/projects': 'project-1',
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
    const sections = [intro, details, skills, projectOne, projectTwo, projectThree, projectFour, projectFive, hackathons, certificates, contact];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
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
  }, [visibleSections]);

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
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Bugatti – Luxury Automotive Website Clone"
        description="A premium website clone inspired by Bugatti’s official platform, focusing on luxury branding, smooth transitions, and modern web aesthetics."
        buttonText="View project"
        buttonLink="https://hanuman07.netlify.app/bugatti/"
        liveLink="https://bugatti-clone-dev.vercel.app/"
        sourceCodeLink="https://github.com/hanumanraj07/Bugatti-Clone"
        videoLink="https://youtu.be/__XCbRVxfyI?si=Tq2HNrMkrf9NHijL"
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: `${bugattiTexture} 1280w, ${bugattiTextureLarge} 2560w`,
              placeholder: bugattiTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Epic Games Digital Storefront – App Clone"
        description="A modern mobile clone of the Epic Games Store featuring game browsing, genres, and a premium dark UI experience."
        buttonText="View website" 
        liveLink="https://epic-games-clone-dev.vercel.app/"
        sourceCodeLink="https://github.com/hanumanraj07/Epic-Games-Clone"
        videoLink="https://www.youtube.com/watch?v=Bae7hhBmTBI"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${epicTexture1} 375w, ${epicTexture1} 750w`,
              placeholder: epicTexture1,
            },
            {
              srcSet: `${epicTexture2} 375w, ${epicTexture2} 750w`,
              placeholder: epicTexture2,
              fit: 'cover',
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="FuelGuard - AI-Powered Fuel Fraud Detection"
        description="FuelGuard is a full-stack web app that uses AI to detect fuel pump fraud from uploaded videos, generate legal PDF reports, and map fraudulent pumps in real time."
        buttonText="View project"
        liveLink="https://fuel-guard-dev.vercel.app/"
        sourceCodeLink="https://github.com/hanumanraj07/FuelGuard"
        videoLink="https://www.youtube.com/@hanumanraj07"
        model={{
          type: 'laptop',
          alt: 'FuelGuard Project',
          textures: [
            {
              srcSet: `${fuelGaurdTexture} 800w, ${fuelGaurdTexture} 1920w`,
              placeholder: fuelGaurdTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Knowledge Twin - AI Powered Chat Bot"
        description="Knowledge Twin is a powerful RAG-driven AI built to act like a world-class knowledge expert—able to read documents, understand images and videos, and remember conversations with exceptional accuracy."
        buttonText="View project"
        liveLink="https://knowledgetwin.netlify.app/"
        sourceCodeLink="https://github.com/hanumanraj07/knowledge-twin"
        videoLink="https://www.youtube.com/@hanumanraj07"
        model={{
          type: 'phone',
          alt: 'Project 4 mockup',
          textures: [
            {
              srcSet: `${mobileKnowleadgeTexture2} 375w, ${mobileKnowleadgeTexture2} 750w`,
              placeholder: mobileKnowleadgeTexture2,
            },
            {
              srcSet: `${mobileKnowleadgeTexture1} 375w, ${mobileKnowleadgeTexture1} 750w`,
              placeholder: mobileKnowleadgeTexture1,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
        title="Students Profile Aggregator"
        description="Full-stack platform to aggregate students stats from GitHub, LeetCode, YouTube and Sololearn in one dashboard."
        buttonText="View project"
        liveLink="https://profilestack.netlify.app/"
        sourceCodeLink="https://github.com/hanumanraj07/profile_aggregator"
        videoLink="https://youtu.be/zGbbXOJ6Xpw?si=U0AwU9FtCwziTvvD"
        model={{
          type: 'laptop',
          alt: 'Walmart clone interface',
          textures: [
            {
              srcSet: `${studentProfileTexture} 800w, ${studentProfileTexture} 1920w`,
              placeholder: studentProfileTexture,
            },
          ],
          }}
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
