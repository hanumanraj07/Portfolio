import { classes } from '~/utils/style';
import styles from './project-media.module.css';

function addressLabel(project) {
  const url = project.liveLink || (!project.sourcePrivate && project.sourceCodeLink);
  if (!url) return project.shortTitle;

  try {
    const { host, pathname } = new URL(url);
    return `${host.replace(/^www\./, '')}${pathname.replace(/\/$/, '')}`;
  } catch {
    return url;
  }
}

/**
 * Title-card art shown until real screenshots are added to a project's assets.
 * It is deliberately typographic so it never passes for an app screenshot.
 */
const PlaceholderArt = ({ project, monogram }) => (
  <div aria-hidden className={styles.art}>
    <span className={styles.monogram}>{monogram}</span>
    <span className={styles.artTitle}>{project.shortTitle}</span>
    <span className={styles.artMeta}>{project.type}</span>
  </div>
);

/**
 * A project's cover inside a browser or phone frame. Without a cover it shows
 * placeholder art at the same aspect ratio, so adding a screenshot later
 * doesn't shift the layout.
 */
export function ProjectMedia({ project, cover, sizes, eager = false, className }) {
  const { frame = 'browser', monogram, hue = 293 } = project.placeholder || {};
  const mark = monogram || project.shortTitle.slice(0, 2);

  const screen = (
    <div className={styles.screen} data-empty={!cover}>
      {cover ? (
        <img
          className={styles.image}
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <PlaceholderArt project={project} monogram={mark} />
      )}
    </div>
  );

  return (
    <div
      className={classes(styles.media, className)}
      data-frame={frame}
      style={{ '--hue': hue }}
    >
      {frame === 'phone' ? (
        <div className={styles.phone}>
          <span aria-hidden className={styles.notch} />
          {screen}
        </div>
      ) : (
        <div className={styles.window}>
          <div aria-hidden className={styles.chrome}>
            <span className={styles.dots}>
              <span />
              <span />
              <span />
            </span>
            <span className={styles.address}>{addressLabel(project)}</span>
          </div>
          {screen}
        </div>
      )}
    </div>
  );
}
