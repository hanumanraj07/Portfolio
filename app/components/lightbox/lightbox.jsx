import { Button } from '~/components/button';
import { Icon } from '~/components/icon';
import { useEffect, useId, useRef } from 'react';
import { classes } from '~/utils/style';
import styles from './lightbox.module.css';

/**
 * Full-size image viewer built on the native <dialog> element, which gives us
 * focus trapping, Escape to close and focus restoration for free.
 */
export const Lightbox = ({ items, index, open, onClose, onIndexChange, label }) => {
  const dialogRef = useRef();
  const titleId = useId();
  const item = items[index];
  const hasMultiple = items.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.dataset.lightbox = 'open';
    }

    if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      delete document.documentElement.dataset.lightbox;
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      delete document.documentElement.dataset.lightbox;
      onClose();
    };

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const step = direction => {
    onIndexChange((index + direction + items.length) % items.length);
  };

  const handleKeyDown = event => {
    if (!hasMultiple) return;
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  // Clicks on the backdrop land on the dialog element itself
  const handleClick = event => {
    if (event.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      aria-labelledby={titleId}
      aria-label={item ? undefined : label}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      {open && item && (
        <div className={styles.frame}>
          <header className={styles.header}>
            <div className={styles.heading}>
              {item.eyebrow && <span className={styles.eyebrow}>{item.eyebrow}</span>}
              <h2 className={styles.title} id={titleId}>
                {item.title}
              </h2>
              {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
            </div>
            <button
              className={styles.close}
              type="button"
              aria-label="Close preview"
              onClick={() => dialogRef.current.close()}
            >
              <Icon icon="close" />
            </button>
          </header>

          <div className={styles.stage}>
            {hasMultiple && (
              <button
                className={classes(styles.nav, styles.prev)}
                type="button"
                aria-label="Previous certificate"
                onClick={() => step(-1)}
              >
                <Icon icon="arrow-left" />
              </button>
            )}
            <img
              key={item.src}
              className={styles.image}
              src={item.src}
              alt={item.alt}
              decoding="async"
            />
            {hasMultiple && (
              <button
                className={classes(styles.nav, styles.next)}
                type="button"
                aria-label="Next certificate"
                onClick={() => step(1)}
              >
                <Icon icon="arrow-right" />
              </button>
            )}
          </div>

          <footer className={styles.footer}>
            {item.meta?.length > 0 && (
              <dl className={styles.meta}>
                {item.meta.map(({ label: metaLabel, value }) => (
                  <div className={styles.metaItem} key={metaLabel}>
                    <dt>{metaLabel}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className={styles.actions}>
              {hasMultiple && (
                <span className={styles.counter} aria-live="polite">
                  {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              )}
              {item.actions?.map(action => (
                <Button
                  key={action.label}
                  secondary={action.secondary}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={action.icon}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </footer>
        </div>
      )}
    </dialog>
  );
};
