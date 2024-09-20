import styles from './dateInput.module.scss';

export const DateInput = ({ day, month, handleDayChange, handleMonthChange }) => {
    return (
      <div className={styles.dateContainer}>
        <span className={styles.label}>ON:</span>
        <input
          type="text"
          value={day}
          onChange={handleDayChange}
          className={styles.dateInput}
          maxLength={2}
          placeholder="DD"
        />
        <span className={styles.underline}>/</span>
        <input
          type="text"
          value={month}
          onChange={handleMonthChange}
          className={styles.dateInput}
          maxLength={2}
          placeholder="MM"
        />
      </div>
    );
  };