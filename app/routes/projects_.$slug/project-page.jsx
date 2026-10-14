import { useLoaderData } from '@remix-run/react';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/button';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Lightbox } from '~/components/lightbox';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useInViewport } from '~/hooks';
import { useHydrated } from '~/hooks/useHydrated';
import { classes, cssProps } from '~/utils/style';
import { certificates } from '~/routes/home/certificate-data';
import { hackathons } from '~/routes/home/hackathon-data';
import { AchievementBadge, ExhibitStage, TeamDots } from '~/routes/home/hackathons';
import { ProjectDevice } from '~/routes/home/project-device';
import {
  getProject,
  getProjectMedia,
  getSourceLink,
  getVideoLink,
  projectPath,
  projects,
} from '~/routes/home/project-data';
import { ProjectMedia } from '~/routes/home/project-media';
import { techIcons } from '~/routes/home/tech-icons';
import styles from './project-page.module.css';

function pad(value) {
  return String(value).padStart(2, '0');
}

function hostLabel(url) {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url;
  }
}

const revealOptions = { rootMargin: '0px 0px -12% 0px' };

/**
 * True once the element has entered the viewport. Also true if a fast scroll
 * (or a busy main thread) skipped past it before the observer fired.
 */
function useReveal(ref) {
  const inViewport = useInViewport(ref, true, revealOptions);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    if (inViewport || passed) return;

    const check = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight) setPassed(true);
    };

    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [inViewport, passed, ref]);

  return inViewport || passed;
}

/**
 * Section wrapper that reveals its content once scrolled into view
 */
const RevealSection = ({ className, children, labelledBy, ...rest }) => {
  const ref = useRef();
  const visible = useReveal(ref);

  return (
    <Section
      as="section"
      ref={ref}
      className={classes(styles.section, className)}
      data-visible={visible}
      aria-labelledby={labelledBy}
      {...rest}
    >
      <div className={styles.sectionInner}>{children(visible)}</div>
    </Section>
  );
};

const SectionHeading = ({ eyebrow, title, id }) => (
  <div className={styles.sectionHeading}>
    <span className={styles.eyebrow}>{eyebrow}</span>
    <Heading className={styles.sectionTitle} level={3} as="h2" id={id}>
      {title}
    </Heading>
  </div>
);

const Hero = ({ project, position }) => {
  const isHydrated = useHydrated();
  const video = getVideoLink(project);
  const source = getSourceLink(project);
  const { cover, model } = getProjectMedia(project);
  const hackathon = hackathons.find(item => item.id === project.hackathonId);
  const primaryStack = project.stack[0]?.items.slice(0, 3).join(' · ');
  const visualKind = model ? model.type : project.placeholder?.frame || 'browser';

  return (
    <Section as="header" className={styles.hero}>
      <div className={styles.heroTop}>
        <Link className={styles.back} href="/projects">
          <Icon className={styles.backIcon} icon="arrow-left" />
          All projects
        </Link>
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow} style={cssProps({ delay: '60ms' })}>
            Project {pad(position + 1)} · {project.type}
          </span>
          <Heading className={styles.heroTitle} level={1} as="h1" style={cssProps({ delay: '120ms' })}>
            {project.shortTitle}
          </Heading>
          <p className={styles.heroFullTitle} style={cssProps({ delay: '160ms' })}>
            {project.title}
          </p>
          {project.tagline && (
            <p className={styles.tagline} style={cssProps({ delay: '200ms' })}>
              {project.tagline}
            </p>
          )}
          <Text className={styles.lead} as="p" size="l" style={cssProps({ delay: '240ms' })}>
            {project.description}
          </Text>
          <div className={styles.heroActions} style={cssProps({ delay: '300ms' })}>
            {project.liveLink && (
              <Button
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                iconEnd="arrow-right"
                iconHoverShift
              >
                Live demo
              </Button>
            )}
            {source && (
              <Button
                secondary
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                icon="github"
              >
                Source code
              </Button>
            )}
            {!source && project.sourcePrivate && (
              <span className={styles.privateNote}>
                <Icon className={styles.privateIcon} icon="github" />
                Private repository
              </span>
            )}
            {video && (
              <Button
                secondary
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                icon="youtube"
              >
                {video.label}
              </Button>
            )}
          </div>
        </div>

        <div className={styles.heroVisual} data-device={visualKind}>
          <div aria-hidden className={styles.heroGlow} />
          {model ? (
            <ProjectDevice
              className={styles.device}
              loaderClassName={styles.loader}
              model={model}
              visible={isHydrated}
            />
          ) : (
            <ProjectMedia
              className={styles.heroMedia}
              project={project}
              cover={cover}
              sizes="(max-width: 1040px) 90vw, 50vw"
              eager
            />
          )}
        </div>
      </div>

      <dl className={styles.quickFacts} style={cssProps({ delay: '380ms' })}>
        <div className={styles.quickFact}>
          <dt>Type</dt>
          <dd>{project.type}</dd>
        </div>
        {hackathon && (
          <div className={styles.quickFact}>
            <dt>Built at</dt>
            <dd>
              <a className={styles.factLink} href="#hackathon">
                {hackathon.name}
              </a>
            </dd>
          </div>
        )}
        {!hackathon && project.event && (
          <div className={styles.quickFact}>
            <dt>Built at</dt>
            <dd>{project.event}</dd>
          </div>
        )}
        {project.team && (
          <div className={styles.quickFact}>
            <dt>Team</dt>
            <dd>{project.team}</dd>
          </div>
        )}
        {primaryStack && (
          <div className={styles.quickFact}>
            <dt>Core stack</dt>
            <dd>{primaryStack}</dd>
          </div>
        )}
        {project.liveLink && (
          <div className={styles.quickFact}>
            <dt>Live at</dt>
            <dd>
              <a
                className={styles.factLink}
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hostLabel(project.liveLink)}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </Section>
  );
};

const Overview = ({ project }) => (
  <RevealSection labelledBy="overview-title">
    {() => (
      <div className={styles.overview}>
        <SectionHeading eyebrow="Overview" title="What it is" id="overview-title" />
        <div className={styles.overviewText}>
          {project.overview.map((paragraph, index) => (
            <Text
              key={index}
              className={styles.reveal}
              as="p"
              size="l"
              style={cssProps({ delay: `${120 + index * 100}ms` })}
            >
              {paragraph}
            </Text>
          ))}
        </div>
      </div>
    )}
  </RevealSection>
);

const ProblemSolution = ({ project }) => (
  <RevealSection labelledBy="problem-title">
    {() => (
      <>
        <SectionHeading eyebrow="Overview" title="Problem and solution" id="problem-title" />
        <div className={styles.problemGrid}>
          <div className={classes(styles.problemCard, styles.reveal)}>
            <h3 className={styles.problemLabel}>The problem</h3>
            <Text as="p" size="l">
              {project.problem}
            </Text>
          </div>
          <div
            className={classes(styles.problemCard, styles.reveal)}
            data-tone="solution"
            style={cssProps({ delay: '120ms' })}
          >
            <h3 className={styles.problemLabel}>The solution</h3>
            <Text as="p" size="l">
              {project.solution}
            </Text>
          </div>
        </div>
      </>
    )}
  </RevealSection>
);

const Highlights = ({ project }) => (
  <RevealSection labelledBy="highlights-title">
    {() => (
      <>
        <SectionHeading
          eyebrow="Technical highlights"
          title="Under the hood"
          id="highlights-title"
        />
        <ol className={styles.highlights} data-count={project.technicalHighlights.length}>
          {project.technicalHighlights.map((highlight, index) => (
            <li
              key={highlight.title}
              className={classes(styles.highlight, styles.reveal)}
              style={cssProps({ delay: `${index * 90}ms` })}
            >
              <span aria-hidden className={styles.highlightIndex}>
                {pad(index + 1)}
              </span>
              <h3 className={styles.highlightTitle}>{highlight.title}</h3>
              <p className={styles.highlightText}>{highlight.text}</p>
            </li>
          ))}
        </ol>
      </>
    )}
  </RevealSection>
);

const Contribution = ({ project }) => (
  <RevealSection labelledBy="contribution-title">
    {() => (
      <div className={styles.overview}>
        <SectionHeading eyebrow={project.team} title="My part" id="contribution-title" />
        <div className={styles.overviewText}>
          <Text className={styles.reveal} as="p" size="l">
            {project.contribution}
          </Text>
        </div>
      </div>
    )}
  </RevealSection>
);

const Architecture = ({ project, illustrations = [] }) => (
  <RevealSection labelledBy="architecture-title">
    {() => (
      <>
        <SectionHeading eyebrow="Architecture" title="How it’s built" id="architecture-title" />
        <ol className={styles.flow}>
          {project.architecture.map((node, index) => (
            <li
              key={node.label}
              className={classes(styles.flowNode, styles.reveal)}
              style={cssProps({ delay: `${index * 110}ms` })}
            >
              <span className={styles.flowIndex}>{pad(index + 1)}</span>
              <span className={styles.flowLabel}>{node.label}</span>
              <span className={styles.flowDetail}>{node.detail}</span>
            </li>
          ))}
        </ol>
        {illustrations.map(item => (
          <figure key={item.src} className={classes(styles.illustration, styles.reveal)}>
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
            />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </>
    )}
  </RevealSection>
);

const Features = ({ project }) => (
  <RevealSection labelledBy="features-title">
    {() => (
      <>
        <SectionHeading eyebrow="Features" title="What it does" id="features-title" />
        <div className={styles.featureGroups} data-count={project.features.length}>
          {project.features.map((group, groupIndex) => (
            <div
              key={group.group}
              className={classes(styles.featureGroup, styles.reveal)}
              style={cssProps({ delay: `${groupIndex * 120}ms` })}
            >
              <h3 className={styles.featureGroupTitle}>{group.group}</h3>
              <ul className={styles.featureList}>
                {group.items.map(item => (
                  <li key={item.title} className={styles.feature}>
                    <span className={styles.featureTitle}>{item.title}</span>
                    <span className={styles.featureText}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    )}
  </RevealSection>
);

const Stack = ({ project }) => (
  <RevealSection labelledBy="stack-title">
    {() => (
      <>
        <SectionHeading eyebrow="Tech stack" title="Built with" id="stack-title" />
        <div className={styles.stackGroups}>
          {project.stack.map((group, index) => (
            <div
              key={group.group}
              className={classes(styles.stackGroup, styles.reveal)}
              style={cssProps({ delay: `${index * 100}ms` })}
            >
              <span className={styles.stackLabel}>{group.group}</span>
              <ul className={styles.stackList}>
                {group.items.map(item => (
                  <li key={item} className={styles.chip}>
                    {techIcons[item] && <Icon className={styles.chipIcon} icon={techIcons[item]} />}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    )}
  </RevealSection>
);

/**
 * Screenshots and recordings in display order. Featured projects keep their
 * hand-ordered gallery; others are built from their assets.
 */
function getGalleryItems(project) {
  if (project.gallery) return project.gallery;

  const { video, screenshots } = getProjectMedia(project);
  return [
    ...(video ? [{ ...video, kind: 'video' }] : []),
    ...screenshots.map(item => ({ ...item, kind: 'image' })),
  ];
}

const Gallery = ({ project, items }) => {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(null);
  const images = items.filter(item => item.kind === 'image');
  const lightboxItems = images.map(item => ({
    id: item.src,
    src: item.src,
    alt: item.alt,
    eyebrow: project.shortTitle,
    title: item.alt,
  }));

  return (
    <RevealSection labelledBy="gallery-title">
      {() => (
        <>
          <SectionHeading eyebrow="Screens" title="A closer look" id="gallery-title" />
          <div className={styles.gallery} data-count={items.length}>
            {items.map((item, index) =>
              item.kind === 'video' ? (
                <figure
                  key={item.src}
                  className={classes(styles.shot, styles.reveal)}
                  data-orientation="landscape"
                  style={cssProps({ delay: `${index * 120}ms` })}
                >
                  <video
                    className={styles.shotMedia}
                    src={item.src}
                    poster={item.poster}
                    width={item.width}
                    height={item.height}
                    muted
                    loop
                    playsInline
                    autoPlay={!reduceMotion}
                    controls={!!reduceMotion}
                    aria-label={item.alt}
                  />
                </figure>
              ) : (
                <button
                  key={item.src}
                  type="button"
                  className={classes(styles.shot, styles.reveal)}
                  data-orientation={item.width >= item.height ? 'landscape' : 'portrait'}
                  style={cssProps({ delay: `${index * 120}ms` })}
                  onClick={() => setOpenIndex(images.indexOf(item))}
                  aria-label={`View full size: ${item.alt}`}
                >
                  <img
                    className={styles.shotMedia}
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span aria-hidden className={styles.shotHint}>
                    View full size
                  </span>
                </button>
              )
            )}
          </div>
          <Lightbox
            label={`${project.shortTitle} screenshots`}
            items={lightboxItems}
            index={openIndex ?? 0}
            open={openIndex !== null}
            onClose={() => setOpenIndex(null)}
            onIndexChange={setOpenIndex}
          />
        </>
      )}
    </RevealSection>
  );
};

const HackathonDetails = ({ hackathon }) => {
  const [certificateOpen, setCertificateOpen] = useState(false);
  const certificate = certificates.find(cert => cert.id === hackathon.certificateId);
  const position = hackathons.indexOf(hackathon);

  return (
    <RevealSection id="hackathon" className={styles.hackathon} labelledBy="hackathon-title">
      {visible => (
        <>
          <SectionHeading
            eyebrow="Built at a hackathon"
            title={hackathon.name}
            id="hackathon-title"
          />
          <div className={styles.hackathonGrid}>
            <ExhibitStage hackathon={hackathon} index={position} visible={visible} />
            <div className={styles.hackathonInfo}>
              <div className={styles.reveal} style={cssProps({ delay: '120ms' })}>
                <AchievementBadge achievement={hackathon.achievement} />
              </div>
              <dl
                className={classes(styles.hackathonFacts, styles.reveal)}
                style={cssProps({ delay: '200ms' })}
              >
                <div>
                  <dt>Organiser</dt>
                  <dd>{hackathon.organizer}</dd>
                </div>
                <div>
                  <dt>Platform</dt>
                  <dd>{hackathon.platform}</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>{hackathon.date}</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>{hackathon.type} event</dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd className={styles.teamValue}>
                    <TeamDots size={hackathon.teamSize} />
                    {hackathon.teamSize} {hackathon.teamSize === 1 ? 'member' : 'members'}
                  </dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>{hackathon.tags.join(' · ')}</dd>
                </div>
                <div className={styles.factWide}>
                  <dt>Our build</dt>
                  <dd>{hackathon.projectName}</dd>
                </div>
              </dl>
              <div
                className={classes(styles.hackathonActions, styles.reveal)}
                style={cssProps({ delay: '280ms' })}
              >
                {certificate && (
                  <Button type="button" icon="check" onClick={() => setCertificateOpen(true)}>
                    View certificate
                  </Button>
                )}
                {certificate?.verifyUrl && (
                  <Button
                    secondary
                    href={certificate.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    iconEnd="arrow-right"
                  >
                    Verify with {certificate.issuer}
                  </Button>
                )}
                <Button secondary href="/hackathons" iconEnd="arrow-right" iconHoverShift>
                  All hackathons
                </Button>
              </div>
            </div>
          </div>
          {certificate && (
            <Lightbox
              label="Hackathon certificate"
              items={[
                {
                  id: certificate.id,
                  src: certificate.image,
                  alt: `${certificate.title} certificate issued to Hanuman Singh`,
                  eyebrow: certificate.credential,
                  title: certificate.title,
                  subtitle: [certificate.issuer, certificate.partner].filter(Boolean).join(' · '),
                  meta: [{ label: 'Issued', value: certificate.issued }],
                  actions: certificate.verifyUrl
                    ? [{ label: 'Verify credential', href: certificate.verifyUrl, icon: 'check' }]
                    : [],
                },
              ]}
              index={0}
              open={certificateOpen}
              onClose={() => setCertificateOpen(false)}
              onIndexChange={() => {}}
            />
          )}
        </>
      )}
    </RevealSection>
  );
};

const NextProject = ({ project }) => (
  <Section as="nav" className={styles.next} aria-label="Next project">
    <Link className={styles.nextCard} href={projectPath(project)}>
      <span className={styles.eyebrow}>Next project</span>
      <span className={styles.nextTitle}>{project.shortTitle}</span>
      <span className={styles.nextType}>{project.type}</span>
      <Icon className={styles.nextIcon} icon="arrow-right" />
    </Link>
  </Section>
);

export function ProjectPage() {
  const { slug } = useLoaderData();
  const project = getProject(slug);
  const position = projects.indexOf(project);
  const nextProject = projects[(position + 1) % projects.length];
  const hackathon = hackathons.find(item => item.id === project.hackathonId);
  const galleryItems = getGalleryItems(project);
  const { illustrations } = getProjectMedia(project);

  return (
    <article className={styles.page} key={project.slug}>
      <Hero project={project} position={position} />
      {project.overview && <Overview project={project} />}
      {project.problem && <ProblemSolution project={project} />}
      {project.architecture && (
        <Architecture project={project} illustrations={illustrations} />
      )}
      <Features project={project} />
      {project.technicalHighlights && <Highlights project={project} />}
      <Stack project={project} />
      {project.contribution && <Contribution project={project} />}
      {/* Projects without screenshots yet skip the gallery rather than show empty frames */}
      {galleryItems.length > 0 && <Gallery project={project} items={galleryItems} />}
      {hackathon && <HackathonDetails hackathon={hackathon} />}
      <NextProject project={nextProject} />
      <Footer />
    </article>
  );
}
