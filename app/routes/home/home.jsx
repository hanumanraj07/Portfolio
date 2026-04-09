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
import binanceTexture from '~/assets/Binance3.png';
import geminiTexture1 from '~/assets/gemini1.png';
import geminiTexture2 from '~/assets/gemini2.jpeg';
import walmartTexture from '~/assets/Walmart.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { Skills } from './skills';
import { Certificates } from './certificates';
import { Hackathons } from './hackathons';
import { useEffect, useRef, useState } from 'react';
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
  });
};

export const Home = () => {
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

  useEffect(() => {
    const sections = [intro, details, skills, projectOne, projectTwo, projectThree, projectFour, projectFive, hackathons, certificates];

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
        buttonLink="https://hanuman07.netlify.app/epic_games/master"
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
        title="Binance – Crypto Exchange Website Clone"
        description="A responsive clone of the Binance website highlighting modern fintech UI, structured layouts, and clean design."
        buttonText="View project"
        buttonLink="https://hanuman07.netlify.app/binance_clone/"
        model={{
          type: 'laptop',
          alt: 'Binance clone interface',
          textures: [
            {
              srcSet: `${binanceTexture} 800w, ${binanceTexture} 1920w`,
              placeholder: binanceTexture,
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
        title="Gemini – Crypto Trading Website UI Clone"
        description="A visually accurate clone of Gemini.com showcasing minimal UI design, clear typography, and structured sections inspired by real-world cryptocurrency platforms."
        buttonText="View project"
        buttonLink="https://hanuman07.netlify.app/gemini/register"
        model={{
          type: 'phone',
          alt: 'Project 4 mockup',
          textures: [
            {
              srcSet: `${geminiTexture1} 375w, ${geminiTexture1} 750w`,
              placeholder: geminiTexture1,
            },
            {
              srcSet: `${geminiTexture2} 375w, ${geminiTexture2} 750w`,
              placeholder: geminiTexture2,
              fit: 'cover',
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
        title="Walmart E-Commerce Website Clone"
        description="A modern e-commerce website clone inspired by Walmart, designed to replicate a scalable online shopping experience with structured layouts and responsive design."
        buttonText="View project"
        buttonLink="https://hanuman07.netlify.app/walmart_clone/"
        model={{
          type: 'laptop',
          alt: 'Walmart clone interface',
          textures: [
            {
              srcSet: `${walmartTexture} 800w, ${walmartTexture} 1920w`,
              placeholder: walmartTexture,
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
      <Footer />
    </div>
  );
};
