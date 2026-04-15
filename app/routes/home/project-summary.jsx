import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { deviceModels } from '~/components/model/device-models';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useTheme } from '~/components/theme-provider';
import { Transition } from '~/components/transition';
import { Loader } from '~/components/loader';
import { useWindowSize } from '~/hooks';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { cssProps, media } from '~/utils/style';
import { useHydrated } from '~/hooks/useHydrated';
import styles from './project-summary.module.css';

const Model = lazy(() =>
  import('~/components/model').then(module => ({ default: module.Model }))
);

export function ProjectSummary({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  liveLink,
  sourceCodeLink,
  videoLink,
  alternate,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const isHydrated = useHydrated();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;
  const projectLinks = [
    {
      label: 'Live Deploy',
      caption: 'Open the running build',
      href: liveLink || buttonLink,
      icon: 'link',
      tone: 'deploy',
    },
    {
      label: 'Source Code',
      caption: 'Read the full implementation',
      href: sourceCodeLink,
      icon: 'github',
      tone: 'source',
    },
    {
      label: 'Project Video',
      caption: 'Watch the build breakdown',
      href: videoLink,
      icon: 'youtube',
      tone: 'video',
    },
  ];

  function handleModelLoad() {
    setModelLoaded(true);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = event => {
      const inTrigger = triggerRef.current?.contains(event.target);
      const inPanel = panelRef.current?.contains(event.target);

      if (!inTrigger && !inPanel) {
        setMenuOpen(false);
      }
    };

    const handleEscape = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!sectionVisible) {
      setMenuOpen(false);
    }
  }, [sectionVisible]);

  function renderKatakana(device, visible) {
    return null;
  }

  function renderProjectMenuOverlay(visible) {
    return (
      <div
        className={styles.projectHud}
        data-open={menuOpen}
        data-visible={visible}
        data-alternate={alternate}
      >
        <div className={styles.hudAura} />
        <div className={styles.hudOrbit} />
        <div
          className={styles.commandDeck}
          data-open={menuOpen}
          ref={panelRef}
          role="menu"
          aria-label={`${title} project links`}
        >
          <div className={styles.commandDeckHeader}>
            <Text className={styles.commandDeckEyebrow} secondary>
              Project Commands
            </Text>
            <Heading className={styles.commandDeckTitle} level={5} as="h3">
              Launch Experience
            </Heading>
          </div>
          <div className={styles.commandList}>
            {projectLinks.map(({ label, caption, href, icon, tone }, index) => (
              <a
                key={label}
                className={styles.commandItem}
                href={href}
                role="menuitem"
                target="_blank"
                rel="noreferrer noopener"
                style={cssProps({ delay: `${120 + index * 90}ms` })}
                data-tone={tone}
              >
                <span className={styles.commandIndex}>{`0${index + 1}`}</span>
                <span className={styles.commandIconWrap} data-icon={icon}>
                  <Icon className={styles.commandIcon} icon={icon} />
                </span>
                <span className={styles.commandCopy}>
                  <span className={styles.commandLabel}>{label}</span>
                  <span className={styles.commandCaption}>{caption}</span>
                </span>
                <span className={styles.commandArrow}>GO</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderDetails(visible) {
    return (
      <div className={styles.details}>
        <div aria-hidden className={styles.index}>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
          <span className={styles.indexNumber} data-visible={visible}>
            {indexText}
          </span>
        </div>
        <Heading
          level={3}
          as="h2"
          className={styles.title}
          data-visible={visible}
          id={titleId}
        >
          {title}
        </Heading>
        <Text className={styles.description} data-visible={visible} as="p">
          {description}
        </Text>
        <div className={styles.button} data-visible={visible}>
          <div className={styles.projectMenu} ref={triggerRef}>
            <Button
              className={styles.menuButton}
              iconHoverShift
              iconEnd={menuOpen ? 'close' : 'arrow-right'}
              onClick={() => setMenuOpen(open => !open)}
              onFocus={() => setMenuOpen(true)}
              onMouseEnter={() => setMenuOpen(true)}
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function renderPreview(visible) {
    return (
      <div className={styles.preview}>
        {model.type === 'laptop' && (
          <>
            {renderKatakana('laptop', visible)}
            <div className={styles.model} data-device="laptop">
              {!modelLoaded && (
                <Loader center className={styles.loader} data-visible={visible} />
              )}
              {isHydrated && visible && (
                <Suspense>
                  <Model
                    alt={model.alt}
                    cameraPosition={{ x: 0, y: 0, z: 8 }}
                    showDelay={700}
                    onLoad={handleModelLoad}
                    show={visible}
                    models={[
                      {
                        ...deviceModels.laptop,
                        texture: {
                          ...model.textures[0],
                          sizes: laptopSizes,
                        },
                      },
                    ]}
                  />
                </Suspense>
              )}
            </div>
          </>
        )}
        {model.type === 'phone' && (
          <>
            {renderKatakana('phone', visible)}
            <div className={styles.model} data-device="phone">
              {!modelLoaded && (
                <Loader center className={styles.loader} data-visible={visible} />
              )}
              {isHydrated && visible && (
                <Suspense>
                  <Model
                    alt={model.alt}
                    cameraPosition={{ x: 0, y: 0, z: 11.5 }}
                    showDelay={300}
                    onLoad={handleModelLoad}
                    show={visible}
                    models={[
                      {
                        ...deviceModels.phone,
                        position: { x: -0.6, y: 1.1, z: 0 },
                        texture: {
                          ...model.textures[0],
                          sizes: phoneSizes,
                        },
                      },
                      {
                        ...deviceModels.phone,
                        position: { x: 0.6, y: -0.5, z: 0.3 },
                        texture: {
                          ...model.textures[1],
                          sizes: phoneSizes,
                        },
                      },
                    ]}
                  />
                </Suspense>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {({ visible }) => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                  {renderProjectMenuOverlay(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                  {renderProjectMenuOverlay(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
