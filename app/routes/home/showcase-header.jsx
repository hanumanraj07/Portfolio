import { Heading } from '~/components/heading';
import { Text } from '~/components/text';
import { classes, cssProps } from '~/utils/style';
import styles from './showcase-header.module.css';

/**
 * Shared editorial header for the Hackathons and Certificates showcases
 */
export const ShowcaseHeader = ({
  eyebrow,
  title,
  titleId,
  lead,
  stats = [],
  visible,
  className,
}) => (
  <header className={classes(styles.header, className)} data-visible={visible}>
    <div className={styles.intro}>
      <span className={styles.eyebrow}>
        <span aria-hidden className={styles.eyebrowMark} />
        {eyebrow}
      </span>
      <Heading className={styles.title} level={2} as="h2" id={titleId}>
        {title}
      </Heading>
      {lead && (
        <Text className={styles.lead} as="p" size="l">
          {lead}
        </Text>
      )}
    </div>
    {stats.length > 0 && (
      <dl className={styles.stats}>
        {stats.map(({ value, label }, index) => (
          <div
            className={styles.stat}
            key={label}
            style={cssProps({ delay: `${300 + index * 120}ms` })}
          >
            <dt className={styles.statLabel}>{label}</dt>
            <dd className={styles.statValue}>{value}</dd>
          </div>
        ))}
      </dl>
    )}
  </header>
);
