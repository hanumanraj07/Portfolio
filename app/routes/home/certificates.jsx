import { useReducedMotion } from 'framer-motion';
import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '~/components/button';
import { Icon } from '~/components/icon';
import { Lightbox } from '~/components/lightbox';
import { Loader } from '~/components/loader';
import { deviceModels } from '~/components/model/device-models';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { usePointerTilt } from '~/hooks';
import { useHydrated } from '~/hooks/useHydrated';
import { cssProps, media } from '~/utils/style';
import { certificateCategories, certificates } from './certificate-data';
import { credentialScreenSize, getCredentialScreen } from './credential-screen';
import { FilterChips } from './filter-chips';
import { ShowcaseHeader } from './showcase-header';
import styles from './certificates.module.css';

const Model = lazy(() =>
  import('~/components/model').then(module => ({ default: module.Model }))
);

const INITIAL_TILE_COUNT = 8;
const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;
const issuerCount = new Set(certificates.map(cert => cert.issuer)).size;
const verifiableCount = certificates.filter(cert => cert.verifyUrl).length;
const categoryOptions = certificateCategories.map(({ id, label }) => ({
  id,
  label,
  count:
    id === 'all'
      ? certificates.length
      : certificates.filter(cert => cert.category === id).length,
}));

function issuerLine(cert) {
  return [cert.issuer, cert.partner].filter(Boolean).join(' · ');
}

function categoryLabel(categoryId) {
  return certificateCategories.find(({ id }) => id === categoryId)?.label;
}

/**
 * The laptop model doubles as a credential viewer: the selected certificate
 * is composited onto its screen and crossfades when the selection changes
 */
const CredentialLaptop = ({ cert, visible }) => {
  const isHydrated = useHydrated();
  const [screen, setScreen] = useState();
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    let cancelled = false;

    getCredentialScreen(cert).then(url => {
      if (!cancelled) setScreen({ id: cert.id, url });
    });

    return () => {
      cancelled = true;
    };
  }, [cert, isHydrated]);

  const texture = useMemo(
    () =>
      screen && {
        srcSet: `${screen.url} ${credentialScreenSize.width}w`,
        placeholder: screen.url,
        sizes: laptopSizes,
      },
    [screen]
  );

  return (
    <div className={styles.laptop} data-visible={visible}>
      <div aria-hidden className={styles.laptopGlow} />
      {!modelLoaded && <Loader center className={styles.loader} data-visible={visible} />}
      {isHydrated && visible && texture && (
        <Suspense>
          <Model
            className={styles.model}
            alt={`${cert.title} certificate shown on a laptop screen`}
            cameraPosition={{ x: 0, y: 0, z: 8 }}
            showDelay={400}
            show={visible}
            onLoad={() => setModelLoaded(true)}
            models={[{ ...deviceModels.laptop, texture }]}
          />
        </Suspense>
      )}
    </div>
  );
};

const CredentialDetails = ({ cert, position, total, onStep, onExpand }) => (
  <div className={styles.details}>
    <div className={styles.detailsTop}>
      <span className={styles.categoryChip} data-category={cert.category}>
        {categoryLabel(cert.category)}
      </span>
      <div className={styles.stepper}>
        <button
          className={styles.stepButton}
          type="button"
          aria-label="Previous certificate"
          onClick={() => onStep(-1)}
        >
          <Icon icon="arrow-left" />
        </button>
        <span className={styles.stepCount}>
          {String(position + 1).padStart(2, '0')}
          <span aria-hidden> / </span>
          <span className={styles.visuallyHidden}>of</span>
          {String(total).padStart(2, '0')}
        </span>
        <button
          className={styles.stepButton}
          type="button"
          aria-label="Next certificate"
          onClick={() => onStep(1)}
        >
          <Icon icon="arrow-right" />
        </button>
      </div>
    </div>

    <div className={styles.detailsBody} key={cert.id} aria-live="polite">
      <span className={styles.credentialType}>{cert.credential}</span>
      <h3 className={styles.detailsTitle}>{cert.title}</h3>
      <p className={styles.detailsIssuer}>{issuerLine(cert)}</p>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>Issued</dt>
          <dd>{cert.issued}</dd>
        </div>
        {cert.credentialId && (
          <div className={styles.fact}>
            <dt>Credential ID</dt>
            <dd className={styles.mono}>{cert.credentialId}</dd>
          </div>
        )}
        <div className={styles.fact}>
          <dt>Status</dt>
          <dd>{cert.verifyUrl ? 'Verifiable online' : 'Issued certificate'}</dd>
        </div>
      </dl>

      {cert.topics?.length > 0 && (
        <ul className={styles.topics} aria-label="Skills covered">
          {cert.topics.map(topic => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      )}
    </div>

    <div className={styles.actions}>
      {cert.verifyUrl && (
        <Button
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          icon="check"
          className={styles.verifyButton}
        >
          Verify credential
        </Button>
      )}
      <Button
        secondary={!!cert.verifyUrl}
        iconEnd="arrow-right"
        iconHoverShift
        type="button"
        onClick={onExpand}
      >
        View full size
      </Button>
    </div>
  </div>
);

const CredentialTile = ({ cert, index, selected, onSelect, onPreload, revealed }) => {
  const tileRef = useRef();
  usePointerTilt(tileRef, { maxTilt: 7 });

  return (
    <li
      className={styles.tileItem}
      data-revealed={revealed}
      style={cssProps({ delay: `${Math.min(index, 8) * 60}ms` })}
    >
      <button
        ref={tileRef}
        className={styles.tile}
        type="button"
        aria-pressed={selected}
        onClick={() => onSelect(cert.id)}
        onPointerEnter={() => onPreload(cert)}
        onFocus={() => onPreload(cert)}
      >
        <span className={styles.tileFrame}>
          <img
            className={styles.tileImage}
            src={cert.image}
            alt=""
            width={cert.width}
            height={cert.height}
            loading="lazy"
            decoding="async"
            data-orientation={cert.width >= cert.height ? 'landscape' : 'portrait'}
          />
          <span aria-hidden className={styles.tileSheen} />
          {selected && <span className={styles.onScreen}>On screen</span>}
        </span>
        <span className={styles.tileText}>
          <span className={styles.tileIssuer}>
            {cert.issuer}
            {cert.verifyUrl && (
              <span className={styles.verifiedDot} title="Verifiable online">
                <svg aria-hidden width="10" height="10" viewBox="0 0 10 10">
                  <path d="M1.5 5.2 4 7.6l4.6-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                <span className={styles.visuallyHidden}>Verifiable</span>
              </span>
            )}
          </span>
          <span className={styles.tileTitle}>{cert.title}</span>
          <span className={styles.tileDate}>{cert.issued}</span>
        </span>
      </button>
    </li>
  );
};

const CertificateShowcase = ({ visible }) => {
  const [category, setCategory] = useState('all');
  const [selectedId, setSelectedId] = useState(certificates[0].id);
  const [expanded, setExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const viewerRef = useRef();
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      category === 'all'
        ? certificates
        : certificates.filter(cert => cert.category === category),
    [category]
  );

  const collapsible = category === 'all' && filtered.length > INITIAL_TILE_COUNT;
  const visibleTiles = collapsible && !expanded ? filtered.slice(0, INITIAL_TILE_COUNT) : filtered;
  const selected = certificates.find(cert => cert.id === selectedId);
  const position = Math.max(
    filtered.findIndex(cert => cert.id === selectedId),
    0
  );

  const lightboxItems = useMemo(
    () =>
      filtered.map(cert => ({
        id: cert.id,
        src: cert.image,
        alt: `${cert.title} certificate issued to Hanuman Singh by ${issuerLine(cert)}`,
        eyebrow: cert.credential,
        title: cert.title,
        subtitle: issuerLine(cert),
        meta: [
          { label: 'Issued', value: cert.issued },
          ...(cert.credentialId ? [{ label: 'Credential ID', value: cert.credentialId }] : []),
        ],
        actions: cert.verifyUrl
          ? [{ label: 'Verify credential', href: cert.verifyUrl, icon: 'check' }]
          : [],
      })),
    [filtered]
  );

  const select = useCallback(
    id => {
      setSelectedId(id);

      // On small screens the viewer can be off-screen when a tile is tapped
      const rect = viewerRef.current?.getBoundingClientRect();
      if (rect && (rect.bottom < 80 || rect.top > window.innerHeight * 0.6)) {
        viewerRef.current.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    },
    [reduceMotion]
  );

  const step = direction => {
    const next = filtered[(position + direction + filtered.length) % filtered.length];
    setSelectedId(next.id);
    if (filtered.indexOf(next) >= INITIAL_TILE_COUNT) setExpanded(true);
  };

  const changeCategory = id => {
    setCategory(id);
    const pool = id === 'all' ? certificates : certificates.filter(cert => cert.category === id);
    if (!pool.some(cert => cert.id === selectedId)) {
      setSelectedId(pool[0].id);
    }
  };

  const preload = useCallback(cert => {
    getCredentialScreen(cert).catch(() => {});
  }, []);

  return (
    <>
      <div className={styles.viewer} ref={viewerRef} data-visible={visible}>
        <CredentialLaptop cert={selected} visible={visible} />
        <CredentialDetails
          cert={selected}
          position={position}
          total={filtered.length}
          onStep={step}
          onExpand={() => setLightboxOpen(true)}
        />
      </div>

      <div className={styles.rackHeader} data-visible={visible}>
        <FilterChips
          label="Filter certificates"
          value={category}
          onChange={changeCategory}
          options={categoryOptions}
        />
        <p className={styles.rackHint}>Select a credential to put it on screen</p>
      </div>

      <ul className={styles.rack} aria-label="Certificates">
        {visibleTiles.map((cert, index) => (
          <CredentialTile
            key={cert.id}
            cert={cert}
            index={index}
            revealed={visible}
            selected={cert.id === selectedId}
            onSelect={select}
            onPreload={preload}
          />
        ))}
      </ul>

      {collapsible && (
        <div className={styles.more}>
          <Button
            secondary
            iconEnd={expanded ? 'close' : 'arrow-right'}
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(value => !value)}
          >
            {expanded ? 'Show fewer' : `Show all ${filtered.length} credentials`}
          </Button>
        </div>
      )}

      <Lightbox
        label="Certificate preview"
        items={lightboxItems}
        index={position}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={index => setSelectedId(filtered[index].id)}
      />
    </>
  );
};

export const Certificates = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.certificates}
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
              eyebrow="Credentials"
              title="Certificates"
              titleId={titleId}
              lead="Industry programs, hackathons, courses and skill tests. Pick any credential to inspect it on screen or verify it with the issuer."
              visible={isVisible}
              stats={[
                { value: String(certificates.length).padStart(2, '0'), label: 'Credentials' },
                { value: String(issuerCount).padStart(2, '0'), label: 'Issuers' },
                { value: String(verifiableCount).padStart(2, '0'), label: 'Verifiable' },
              ]}
            />
            <CertificateShowcase visible={isVisible} />
          </div>
        )}
      </Transition>
    </Section>
  );
};
