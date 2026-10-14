import { useRef, useState } from 'react';
import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Lightbox } from '~/components/lightbox';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { usePointerTilt } from '~/hooks';
import { useInViewport } from '~/hooks/useInViewport';
import { cssProps } from '~/utils/style';
import { certificates } from './certificate-data';
import { FilterChips } from './filter-chips';
import { filterTags, hackathons } from './hackathon-data';
import { projectPath, projects } from './project-data';
import { ShowcaseHeader } from './showcase-header';
import { techIcons } from './tech-icons';
import styles from './hackathons.module.css';

// Only the first two entries are confirmed, finished events
const featuredHackathons = hackathons.slice(0, 2);
/**
 * Turn "Top 15 among 200+ teams" into a rank we can feature
 */
export function parseRank(achievement = '') {
  const match = achievement.match(/^top\s+(\d+)\s+(?:among|of|out of)\s+(.+)$/i);
  return match ? { value: match[1], field: match[2] } : null;
}

function getCertificate(hackathon) {
  return certificates.find(cert => cert.id === hackathon.certificateId);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function urlLabel(url) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

const bestRank = featuredHackathons
  .map(hackathon => parseRank(hackathon.achievement))
  .filter(Boolean)
  .sort((a, b) => Number(a.value) - Number(b.value))[0];

export const AchievementBadge = ({ achievement }) => {
  const rank = parseRank(achievement);

  if (rank) {
    return (
      <span className={styles.badge} data-tone="rank">
        <svg aria-hidden className={styles.badgeIcon} viewBox="0 0 20 20" width="18" height="18">
          <path
            d="M6 2h8v5a4 4 0 0 1-8 0V2Zm-3 1h3v2.5A3 3 0 0 1 3 3Zm14 0h-3v2.5A3 3 0 0 0 17 3ZM8.5 12.5h3V15h2.5v2.5H6V15h2.5v-2.5Z"
            fill="currentColor"
          />
        </svg>
        {`Top ${rank.value}`}
        <span className={styles.badgeContext}>{`among ${rank.field}`}</span>
      </span>
    );
  }

  return (
    <span className={styles.badge} data-tone="participant">
      <span aria-hidden className={styles.badgeDot} />
      {achievement === 'Participation' ? 'Participant' : achievement}
    </span>
  );
};

export const TeamDots = ({ size }) => (
  <span className={styles.teamDots} aria-hidden>
    {Array.from({ length: size }, (_, index) => (
      <span key={index} className={styles.teamDot} data-self={index === 0} />
    ))}
  </span>
);

/**
 * Layered CSS 3D composition: backdrop type, the project build on a screen,
 * the event pass and (when earned) a rank medal, each at its own depth
 */
export const ExhibitStage = ({ hackathon, index, visible, alternate }) => {
  const stageRef = useRef();
  const rank = parseRank(hackathon.achievement);
  const { cover } = hackathon;
  usePointerTilt(stageRef, { maxTilt: 9 });

  return (
    <div
      className={styles.stage}
      ref={stageRef}
      data-visible={visible}
      data-alternate={alternate}
      aria-hidden
    >
      <div className={styles.rig}>
        <span className={styles.backdrop}>{hackathon.shortName || hackathon.name}</span>
        <span className={styles.floor} />

        {cover && (
          <figure className={styles.screen} data-kind={cover.kind}>
            <span className={styles.screenBar}>
              <span className={styles.screenDots}>
                <span />
                <span />
                <span />
              </span>
              <span className={styles.screenUrl}>{urlLabel(hackathon.demo)}</span>
            </span>
            <img
              className={styles.screenImage}
              src={cover.src}
              width={cover.width}
              height={cover.height}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </figure>
        )}

        <div className={styles.passAnchor}>
          <div className={styles.pass}>
            <span className={styles.passSlot} />
            <span className={styles.passLabel}>Hackathon pass · {pad(index + 1)}</span>
            <span className={styles.passEvent}>{hackathon.name}</span>
            <span className={styles.passOrg}>{hackathon.organizer}</span>
            <span className={styles.passGrid}>
              <span>
                <small>Date</small>
                {hackathon.date}
              </span>
              <span>
                <small>Team</small>
                {pad(hackathon.teamSize)}
              </span>
              <span>
                <small>Via</small>
                {hackathon.platform}
              </span>
            </span>
            <span className={styles.passCode} />
            <span className={styles.passSheen} />
          </div>
        </div>

        {rank && (
          <div className={styles.medalAnchor}>
            <div className={styles.medal}>
              <small>Top</small>
              <strong>{rank.value}</strong>
              <small>{rank.field}</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Exhibit = ({ hackathon, index, alternate, onViewCertificate }) => {
  const exhibitRef = useRef();
  const visible = useInViewport(exhibitRef, true, { rootMargin: '0px 0px -15% 0px' });
  const titleId = `hackathon-${hackathon.id}-title`;
  const certificate = getCertificate(hackathon);
  const project = projects.find(item => item.hackathonId === hackathon.id);

  return (
    <article
      className={styles.exhibit}
      ref={exhibitRef}
      data-visible={visible}
      data-alternate={alternate}
      aria-labelledby={titleId}
    >
      <ExhibitStage
        hackathon={hackathon}
        index={index}
        visible={visible}
        alternate={alternate}
      />

      <div className={styles.info}>
        <div className={styles.indexRow}>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={600}
          />
          <span className={styles.indexNumber}>{pad(index + 1)}</span>
        </div>

        <span className={styles.meta} style={cssProps({ delay: '120ms' })}>
          {hackathon.date} · {hackathon.organizer}
        </span>
        <Heading
          className={styles.name}
          level={3}
          as="h3"
          id={titleId}
          style={cssProps({ delay: '180ms' })}
        >
          {hackathon.name}
        </Heading>
        <div className={styles.reveal} style={cssProps({ delay: '240ms' })}>
          <AchievementBadge achievement={hackathon.achievement} />
        </div>

        <div className={styles.build} style={cssProps({ delay: '300ms' })}>
          <span className={styles.buildLabel}>What we built</span>
          <Heading className={styles.projectName} level={5} as="h4">
            {project ? (
              <Link className={styles.projectLink} href={projectPath(project)}>
                {hackathon.projectName}
                <Icon className={styles.projectLinkIcon} icon="arrow-right" />
              </Link>
            ) : (
              hackathon.projectName
            )}
          </Heading>
          <Text className={styles.description} as="p">
            {hackathon.description}
          </Text>
        </div>

        <dl className={styles.facts} style={cssProps({ delay: '360ms' })}>
          <div className={styles.fact}>
            <dt>Team</dt>
            <dd>
              <TeamDots size={hackathon.teamSize} />
              {hackathon.teamSize} {hackathon.teamSize === 1 ? 'member' : 'members'}
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>Platform</dt>
            <dd>{hackathon.platform}</dd>
          </div>
          <div className={styles.fact}>
            <dt>Focus</dt>
            <dd>{hackathon.tags.join(' · ')}</dd>
          </div>
        </dl>

        <ul className={styles.stack} aria-label="Tech stack" style={cssProps({ delay: '420ms' })}>
          {hackathon.techStack.map(tech => (
            <li key={tech} className={styles.tech}>
              {techIcons[tech] && <Icon className={styles.techIcon} icon={techIcons[tech]} />}
              {tech}
            </li>
          ))}
        </ul>

        <div className={styles.actions} style={cssProps({ delay: '480ms' })}>
          {hackathon.demo && (
            <Button
              href={hackathon.demo}
              target="_blank"
              rel="noopener noreferrer"
              iconEnd="arrow-right"
              iconHoverShift
            >
              Live demo
            </Button>
          )}
          {hackathon.github && (
            <Button
              secondary
              href={hackathon.github}
              target="_blank"
              rel="noopener noreferrer"
              icon="github"
            >
              Source
            </Button>
          )}
          {certificate && (
            <Button
              secondary
              type="button"
              icon="check"
              onClick={() => onViewCertificate(certificate)}
            >
              Certificate
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export const Hackathons = ({ id, visible, sectionRef, style }) => {
  const [focused, setFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [certificate, setCertificate] = useState(null);
  const titleId = `${id}-title`;

  // Filtering only earns its place once there are enough events to sift
  const showFilters = featuredHackathons.length > 3;
  const filtered =
    activeFilter === 'All'
      ? featuredHackathons
      : featuredHackathons.filter(hackathon => hackathon.tags.includes(activeFilter));

  const demoCount = featuredHackathons.filter(hackathon => hackathon.demo).length;
  const stats = [
    { value: pad(featuredHackathons.length), label: 'Hackathons' },
    ...(bestRank ? [{ value: `Top ${bestRank.value}`, label: `Of ${bestRank.field}` }] : []),
    { value: pad(demoCount), label: 'Live demos' },
  ];

  return (
    <Section
      className={styles.hackathons}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
      style={style}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible: isVisible }) => (
          <div className={styles.content}>
            <ShowcaseHeader
              eyebrow="Competitions"
              title="Hackathons"
              titleId={titleId}
              lead="Weekend builds against the clock, taken from idea to a working, deployed prototype with my team."
              stats={stats}
              visible={isVisible}
            />

            {showFilters && (
              <FilterChips
                className={styles.filters}
                label="Filter hackathons"
                value={activeFilter}
                onChange={setActiveFilter}
                options={filterTags.map(tag => ({ id: tag, label: tag }))}
              />
            )}

            <div className={styles.exhibits}>
              {filtered.map((hackathon, index) => (
                <Exhibit
                  key={hackathon.id}
                  hackathon={hackathon}
                  index={index}
                  alternate={index % 2 === 1}
                  onViewCertificate={setCertificate}
                />
              ))}
            </div>

            <Lightbox
              label="Hackathon certificate"
              items={
                certificate
                  ? [
                      {
                        id: certificate.id,
                        src: certificate.image,
                        alt: `${certificate.title} certificate issued to Hanuman Singh`,
                        eyebrow: certificate.credential,
                        title: certificate.title,
                        subtitle: [certificate.issuer, certificate.partner]
                          .filter(Boolean)
                          .join(' · '),
                        meta: [{ label: 'Issued', value: certificate.issued }],
                        actions: certificate.verifyUrl
                          ? [
                              {
                                label: 'Verify credential',
                                href: certificate.verifyUrl,
                                icon: 'check',
                              },
                            ]
                          : [],
                      },
                    ]
                  : []
              }
              index={0}
              open={!!certificate}
              onClose={() => setCertificate(null)}
              onIndexChange={() => {}}
            />
          </div>
        )}
      </Transition>
    </Section>
  );
};
