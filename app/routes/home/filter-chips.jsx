import { classes } from '~/utils/style';
import styles from './filter-chips.module.css';

/**
 * Toggle-button filter row shared by the showcase sections
 */
export const FilterChips = ({ options, value, onChange, label, className }) => (
  <div className={classes(styles.filters, className)} role="group" aria-label={label}>
    {options.map(({ id, label: optionLabel, count }) => (
      <button
        key={id}
        className={styles.filter}
        type="button"
        aria-pressed={value === id}
        onClick={() => onChange(id)}
      >
        {optionLabel}
        {count !== undefined && <span className={styles.count}>{count}</span>}
      </button>
    ))}
  </div>
);
