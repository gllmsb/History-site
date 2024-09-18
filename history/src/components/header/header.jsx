import styles from './header.module.scss';
import headerImage from '../../assets/images/header.png';

export const Header = ({ title, subtitle, customTitleClass, customSubtitleClass, customOverlayClass }) => {
    return (
      <header className={styles.header}>
        <img src={headerImage} alt="Header background" className={styles.headerImage} />
        <div className={`${styles.overlay} ${styles[customOverlayClass]}`}>
          <h1 className={`${styles.defaultTitle} ${styles[customTitleClass]}`}>{title}</h1>
          <p className={`${styles.defaultSubtitle} ${styles[customSubtitleClass]}`}>{subtitle}</p>
          <div className={styles.circleTopLeft}></div>
          <div className={styles.circleTopRight}></div>
          <div className={styles.circleBottomLeft}></div>
          <div className={styles.circleBottomRight}></div>
        </div>
      </header>
    );
  };