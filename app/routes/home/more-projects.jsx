import { Link } from '@remix-run/react';
import { useState } from 'react';
import { Button } from '~/components/button';
import { Icon } from '~/components/icon';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { cssProps, media } from '~/utils/style';
import { FilterChips } from './filter-chips';
import {
  getProjectMedia,
  getSourceLink,
  moreProjects,
  projectCategories,
  projectPath,
  projects,
} from './project-data';
import { ProjectMedia } from './project-media';
import { ShowcaseHeader } from './showcase-header';
import { techIcons } from './tech-icons';
import styles from './more-projects.module.css';

const pad = value => String(value).padStart(2, '0');

const introStats = [
  { value: pad(projects.length), label: 'Projects' },
  {
    value: pad(projects.filter(project => project.liveLink).length),
    label: 'Live demos',
  },
  {
    value: pad(projects.filter(project => project.type === 'Hackathon build').length),
    label: 'Hackathon builds',
  },
];

const filterOptions = [
  { id: 'all', label: 'All', count: moreProjects.length },
  ...projectCategories
    .map(({ id, label }) => ({
      id,
      label,
      count: moreProjects.filter(project => project.categories.includes(id)).length,
    }))
    .filter(option => option.count > 0),
];

const coverSizes = `(max-width: ${media.mobile}px) 90vw, (max-width: ${media.tablet}px) 60vw, 40vw`;

/**
 * Opens the Projects part of the page, above the featured showcases
 */
export const ProjectsIntro = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.intro}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible: isVisible }) => (
          <div className={styles.content}>
            <ShowcaseHeader
              className={styles.introHeader}
              eyebrow="Selected work"
              title="Projects"
              titleId={titleId}
              lead="Ten things I’ve built, from weekend hackathon prototypes to full-stack platforms. The featured five come first; the rest follow in the project index, each with its own case study."
              stats={introStats}
              visible={isVisible}
            />
          </div>
        )}
      </Transition>
    </Section>
  );
};

/**
 * The card's shape in the grid. The full index uses each project's layout;
 * a filtered list falls back to an even two-column grid.
 */
function cardShape(project, index, count, filtered) {
  if (!filtered) return project.layout || 'standard';
  const isLastOfOdd = count % 2 === 1 && index === count - 1;
  return isLastOfOdd ? 'row' : 'half';
}

const ProjectCard = ({ project, shape, delay }) => {
  const { cover } = getProjectMedia(project);
  const source = getSourceLink(project);
  const path = projectPath(project);
  const number = pad(projects.indexOf(project) + 1);
  const titleId = `project-card-${project.slug}`;
  const badges =
    project.badges || project.stack.flatMap(group => group.items).slice(0, 5);

  return (
    <li className={styles.cell} data-shape={shape} style={cssProps({ delay })}>
      <article
        className={styles.card}
        aria-labelledby={titleId}
        style={{ '--hue': project.placeholder?.hue ?? 293 }}
      >
        {/* The case study button below is the keyboard route; this is a larger mouse target */}
        <Link
          className={styles.stage}
          to={path}
          prefetch="intent"
          tabIndex={-1}
          aria-hidden
          data-frame={project.placeholder?.frame || 'browser'}
        >
          <ProjectMedia
            className={styles.media}
            project={project}
            cover={cover}
            sizes={coverSizes}
          />
        </Link>

        <div className={styles.body}>
          <div className={styles.meta}>
            <span aria-hidden className={styles.number}>
              {number}
            </span>
            <span className={styles.type}>{project.type}</span>
            {project.event && <span className={styles.tag}>{project.event}</span>}
            {project.team && project.team !== 'Solo project' && (
              <span className={styles.tag}>{project.team}</span>
            )}
          </div>

          <h3 className={styles.title} id={titleId}>
            {project.shortTitle}
          </h3>
          {project.tagline && <p className={styles.tagline}>{project.tagline}</p>}
          <p className={styles.description}>{project.description}</p>

          <ul
            className={styles.badges}
            aria-label={`${project.shortTitle} key technologies`}
          >
            {badges.map(item => (
              <li key={item} className={styles.badge}>
                {techIcons[item] && (
                  <Icon className={styles.badgeIcon} icon={techIcons[item]} size={14} />
                )}
                {item}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Button
              href={path}
              iconEnd="arrow-right"
              iconHoverShift
              aria-label={`Case study: ${project.shortTitle}`}
            >
              Case study
            </Button>
            {/* Grouped so the external links wrap together on narrow cards */}
            <div className={styles.links}>
              {project.liveLink && (
                <Button
                  secondary
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.shortTitle} live demo (opens in a new tab)`}
                >
                  Live demo
                </Button>
              )}
              {source ? (
                <Button
                  secondary
                  iconOnly
                  icon="github"
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.shortTitle} source code on GitHub (opens in a new tab)`}
                />
              ) : (
                <span className={styles.private}>
                  <Icon icon="github" size={16} />
                  Private repository
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

/**
 * Index of the projects that aren't featured, with category filters
 */
export const MoreProjects = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const [category, setCategory] = useState('all');
  const titleId = `${id}-title`;
  const filtered = category !== 'all';
  const shown = filtered
    ? moreProjects.filter(project => project.categories.includes(category))
    : moreProjects;

  return (
    <Section
      className={styles.more}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible: isVisible }) => (
          <div className={styles.content} data-visible={isVisible}>
            <ShowcaseHeader
              className={styles.moreHeader}
              eyebrow="Project index"
              title="More projects"
              titleId={titleId}
              lead="Real-time multiplayer chess, an LLM governance layer, a personal safety app, neighbourhood intelligence and a sports club platform on Odoo."
              visible={isVisible}
            />

            {filterOptions.length > 2 && (
              <div className={styles.toolbar}>
                <FilterChips
                  label="Filter projects by category"
                  value={category}
                  onChange={setCategory}
                  options={filterOptions}
                />
                <p className={styles.resultCount} aria-live="polite">
                  {shown.length} {shown.length === 1 ? 'project' : 'projects'}
                </p>
              </div>
            )}

            {/* Keyed by filter so the cards replay their entrance when it changes */}
            <ul className={styles.grid} key={category}>
              {shown.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  shape={cardShape(project, index, shown.length, filtered)}
                  delay={`${(filtered ? 0 : 200) + index * 90}ms`}
                />
              ))}
            </ul>
          </div>
        )}
      </Transition>
    </Section>
  );
};
