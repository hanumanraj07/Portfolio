import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Button } from '~/components/button';
import { Fragment, useState, useRef, useEffect } from 'react';
import { Link } from '~/components/link';
import styles from './hackathons.module.css';
import { hackathons, hackathonStats, filterTags } from './hackathon-data';
import { useInViewport } from '~/hooks/useInViewport';

const TechIcon = ({ tech }) => {
  const iconMap = {
    'React': '⚛️',
    'Python': '🐍',
    'Node.js': '🟢',
    'MongoDB': '🍃',
    'Express': '🚀',
    'JavaScript': '📜',
    'TypeScript': '📘',
    'TensorFlow': '🧠',
    'FastAPI': '⚡',
    'PostgreSQL': '🐘',
    'Firebase': '🔥',
    'Solidity': '💎',
    'Web3.js': '🌐',
    'Ethers.js': '🔗',
    'React Native': '📱',
    'AR.js': '🥽',
    'D3.js': '📊',
    'Flask': '🍶',
    'Docker': '🐳',
    'Azure SDK': '☁️',
    'Cloud Functions': '☁️',
    'Maps API': '🗺️',
    'IoT': '📡',
    'REST APIs': '🔌',
    'SQL': '🗄️',
    'OpenAI API': '🤖',
    'LLaMA': '🦙',
    'Next.js': '▲',
    'Tailwind': '🎨'
  };

  return (
    <span className={styles.techIcon} title={tech}>
      {iconMap[tech] || '💻'} {tech}
    </span>
  );
};

const AchievementBadge = ({ achievement }) => {
  const getBadgeConfig = () => {
    switch (achievement.toLowerCase()) {
      case 'winner':
      case '1st place':
        return { icon: '🏆', class: styles.badgeWinner };
      case 'top 10 finalist':
      case 'top 15 finalist':
        return { icon: '🎯', class: styles.badgeFinalist };
      case 'special mention':
        return { icon: '⭐', class: styles.badgeSpecial };
      default:
        return { icon: '🎓', class: styles.badgeParticipation };
    }
  };

  const config = getBadgeConfig();

  return (
    <span className={`${styles.achievementBadge} ${config.class}`}>
      {config.icon} {achievement}
    </span>
  );
};

const AnimatedCounter = ({ value, label, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef();
  const visible = useInViewport(counterRef, true);

  useEffect(() => {
    if (visible && !isVisible) {
      setIsVisible(true);
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [visible, isVisible, value]);

  return (
    <div ref={counterRef} className={styles.counterItem}>
      <span className={styles.counterValue}>{count}</span>
      <span className={styles.counterLabel}>{label}</span>
    </div>
  );
};

const HackathonCard = ({ hackathon, index, onExpand, isExpanded }) => {
  const cardRef = useRef();
  const visible = useInViewport(cardRef, true);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
      data-visible={visible}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <Text className={styles.hackathonName} as="h4">
              {hackathon.name}
            </Text>
            <Text className={styles.organizer} size="s">
              {hackathon.organizer} • {hackathon.platform}
            </Text>
          </div>
          <Text className={styles.date} size="xs">
            {hackathon.date}
          </Text>
        </div>

        <Text className={styles.projectName} as="h5">
          {hackathon.projectName}
        </Text>

        <Text className={styles.description} size="s">
          {hackathon.description}
        </Text>

        <div className={styles.tags}>
          {hackathon.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.techStack}>
          {hackathon.techStack.slice(0, 4).map(tech => (
            <TechIcon key={tech} tech={tech} />
          ))}
          {hackathon.techStack.length > 4 && (
            <span className={styles.techMore}>+{hackathon.techStack.length - 4}</span>
          )}
        </div>

        <div className={styles.cardFooter}>
          <AchievementBadge achievement={hackathon.achievement} />
          <div className={styles.links}>
            {hackathon.github && (
              <a
                href={hackathon.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            )}
            {hackathon.demo && (
              <a
                href={hackathon.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                onClick={(e) => e.stopPropagation()}
              >
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const HackathonModal = ({ hackathon, onClose }) => {
  if (!hackathon) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>×</button>
        
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <Text className={styles.modalTitle} as="h3">{hackathon.name}</Text>
            <Text className={styles.modalMeta}>
              {hackathon.organizer} • {hackathon.platform} • {hackathon.date}
            </Text>
          </div>

          <AchievementBadge achievement={hackathon.achievement} />

          <div className={styles.modalSection}>
            <Text as="h4" size="s">Project</Text>
            <Text>{hackathon.projectName}</Text>
          </div>

          <div className={styles.modalSection}>
            <Text as="h4" size="s">Description</Text>
            <Text>{hackathon.description}</Text>
          </div>

          <div className={styles.modalSection}>
            <Text as="h4" size="s">Technologies</Text>
            <div className={styles.modalTechStack}>
              {hackathon.techStack.map(tech => (
                <TechIcon key={tech} tech={tech} />
              ))}
            </div>
          </div>

          <div className={styles.modalSection}>
            <Text as="h4" size="s">Highlights</Text>
            <ul className={styles.modalHighlights}>
              {hackathon.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className={styles.modalSection}>
            <Text as="h4" size="s">Team</Text>
            <Text>{hackathon.type} • {hackathon.teamSize} {hackathon.teamSize === 1 ? 'member' : 'members'}</Text>
          </div>

          <div className={styles.modalLinks}>
            {hackathon.github && (
              <a href={hackathon.github} target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                View Code
              </a>
            )}
            {hackathon.demo && (
              <a href={hackathon.demo} target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterBar = ({ activeFilter, onFilterChange }) => {
  return (
    <div className={styles.filterBar}>
      {filterTags.map(tag => (
        <button
          key={tag}
          className={`${styles.filterButton} ${activeFilter === tag ? styles.filterActive : ''}`}
          onClick={() => onFilterChange(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export const Hackathons = ({ id, visible, sectionRef, style }) => {
  const [focused, setFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedCard, setExpandedCard] = useState(null);
  const titleId = `${id}-title`;

  const filteredHackathons = activeFilter === 'All'
    ? hackathons
    : hackathons.filter(h => h.tags.includes(activeFilter));

  const handleExpand = (hackathon) => {
    setExpandedCard(expandedCard?.id === hackathon.id ? null : hackathon);
  };

  const handleModalClose = () => {
    setExpandedCard(null);
  };

  const handleFilterChange = (tag) => {
    setActiveFilter(tag);
    setExpandedCard(null);
  };

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
        {({ visible: visibleState, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <Heading
              className={styles.title}
              data-visible={visibleState}
              level={3}
              id={titleId}
            >
              Hackathons
            </Heading>

            <div className={styles.controls} data-visible={visibleState}>
              <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
            </div>

            <div className={styles.cardsContainer}>
              {filteredHackathons.map((hackathon, index) => (
                <HackathonCard
                  key={hackathon.id}
                  hackathon={hackathon}
                  index={index}
                  onExpand={handleExpand}
                  isExpanded={expandedCard?.id === hackathon.id}
                />
              ))}
            </div>

            {expandedCard && (
              <HackathonModal hackathon={expandedCard} onClose={handleModalClose} />
            )}
          </div>
        )}
      </Transition>
    </Section>
  );
};