import { Link } from '@remix-run/react';
import { useState } from 'react';
import { Icon } from '~/components/icon';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { cssProps } from '~/utils/style';
import { projects } from './project-data';
import { ShowcaseHeader } from './showcase-header';
import { coreStack, skillCategories, skillCount } from './skill-data';
import skillSprite from './skill-icons.svg';
import styles from './skills.module.css';

const pad = value => String(value).padStart(2, '0');

const stats = [
  { value: pad(skillCount), label: 'Technologies' },
  { value: pad(skillCategories.length), label: 'Disciplines' },
  { value: pad(projects.length), label: 'Projects shipped' },
];

// Black logos follow the text colour so they stay visible on dark surfaces
const brandStyle = ({ color, mono }, style) =>
  cssProps({ brand: mono ? 'var(--textTitle)' : color }, style);

const SkillLogo = ({ icon, className }) => (
  <svg aria-hidden className={className} width="24" height="24">
    <use href={`${skillSprite}#${icon}`} />
  </svg>
);

/**
 * The MERN stack as an exploded view of layers, from the interface down to the data
 */
const CoreStack = ({ visible }) => {
  const { layers } = coreStack;

  return (
    <div className={styles.core} data-visible={visible}>
      <div className={styles.coreIntro}>
        <span className={styles.kicker}>Core stack</span>
        <h3 className={styles.coreTitle}>{coreStack.name}</h3>
        <p className={styles.coreSummary}>
          One language from the database to the browser. It’s the stack I reach for first,
          and the one behind {coreStack.projects.length} of my {projects.length} projects.
        </p>
      </div>

      <div className={styles.stage}>
        <span aria-hidden className={styles.stageGlow} />
        <ol className={styles.layers} aria-label="MERN layers, from interface to data">
          {layers.map((layer, index) => (
            <li
              className={styles.layer}
              key={layer.name}
              style={brandStyle(layer, {
                zIndex: layers.length - index,
                // Build the stack from the ground up
                '--revealDelay': `${300 + (layers.length - 1 - index) * 140}ms`,
              })}
            >
              <span aria-hidden className={styles.slabMount}>
                <span className={styles.slab}>
                  <SkillLogo icon={layer.icon} className={styles.slabLogo} />
                </span>
              </span>
              <span className={styles.layerText}>
                <span className={styles.layerRole}>{layer.role}</span>
                <span className={styles.layerName}>{layer.name}</span>
                <span className={styles.layerNote}>{layer.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.coreProjects}>
        <span className={styles.kicker}>Powers</span>
        <ul className={styles.projectLinks}>
          {coreStack.projects.map(project => (
            <li key={project.slug}>
              <Link
                className={styles.projectLink}
                prefetch="intent"
                to={`/projects/${project.slug}`}
              >
                {project.shortTitle}
                <Icon
                  className={styles.projectLinkIcon}
                  icon="arrow-right"
                  size={16}
                  // Sprite symbols are 24px; a viewBox scales them instead of cropping
                  viewBox="0 0 24 24"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Phone = () => (
  <span aria-hidden className={styles.phone}>
    <span className={styles.phoneScreen}>
      <SkillLogo icon="react" className={styles.phoneLogo} />
    </span>
  </span>
);

const DisciplinePanel = ({ category, index, sectionId, visible }) => {
  const titleId = `${sectionId}-${category.id}`;

  return (
    <div
      className={styles.panel}
      data-area={category.id}
      data-visible={visible}
      style={cssProps({ revealDelay: `${200 + index * 90}ms` })}
    >
      <div className={styles.panelHeader}>
        <span aria-hidden className={styles.panelIndex}>
          {pad(index + 1)}
        </span>
        <h3 className={styles.panelTitle} id={titleId}>
          {category.title}
        </h3>
        <span className={styles.panelCount}>
          {pad(category.skills.length)}
          <span className={styles.visuallyHidden}> skills</span>
        </span>
      </div>
      <p className={styles.panelSummary}>{category.summary}</p>

      {category.id === 'mobile' && <Phone />}

      <ul className={styles.chips} aria-labelledby={titleId}>
        {category.skills.map((skill, skillIndex) => (
          <li
            className={styles.chip}
            key={skill.name}
            style={brandStyle(skill, { '--chipIndex': skillIndex })}
          >
            <span className={styles.chipLogo}>
              <SkillLogo icon={skill.icon} className={styles.chipIcon} />
            </span>
            <span className={styles.chipText}>
              <span className={styles.chipName}>{skill.name}</span>
              <span className={styles.chipNote}>{skill.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Skills = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.skills}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <ShowcaseHeader
              eyebrow="Toolkit"
              title="Skills"
              titleId={titleId}
              lead="The languages, frameworks and tools I use to design, build and ship full-stack products, from React interfaces to the APIs and databases behind them."
              stats={stats}
              visible={visible}
            />
            <div className={styles.board}>
              <CoreStack visible={visible} />
              {skillCategories.map((category, index) => (
                <DisciplinePanel
                  category={category}
                  index={index}
                  key={category.id}
                  sectionId={id}
                  visible={visible}
                />
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
