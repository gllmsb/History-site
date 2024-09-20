import styles from './backToTop.module.scss';
import backToTopIcon from '../../assets/images/arrowup.png';

export const BackToTopButton = ({ showBackToTop, scrollToTop }) => {
    return (
      showBackToTop && (
        <div className={styles.backToTop} onClick={scrollToTop}>
          <img src={backToTopIcon} alt="Back to top" className={styles.backToTopIcon} />
        </div>
      )
    );
  };