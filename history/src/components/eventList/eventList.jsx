import styles from './eventList.module.scss';
import readMoreIcon from '../../assets/images/readmore.png';

export const EventList = ({ events, visibleEvents, loadMoreEvents }) => {
  return (
    <>
      <div className={styles.timeline}>
        {events.length > 0 ? (
          <>
            <div className={styles.timelineStart}></div>
            {events.slice(0, visibleEvents).map((event, index) => (
              <div key={index} className={styles.timelineEvent}>
                <div className={`${styles.year} ${index % 2 === 0 ? styles.yearEven : styles.yearOdd}`}>
                  YEAR: {event.year}
                </div>
                <div className={`${styles.timelineContent} ${index % 2 === 0 ? styles.timelineContentEven : styles.timelineContentOdd}`}>
                  <p>{event.text}</p>
                  {event.pages?.length > 0 && (
                    <a href={event.pages[0].content_urls.desktop.page} target="_blank" rel="noopener noreferrer">
                      {index % 2 === 0 ? (
                        <>Read more <img src={readMoreIcon} alt="Read more" className={styles.readMoreIcon} /></>
                      ) : (
                        <><img src={readMoreIcon} alt="Read more" className={styles.readMoreIcon} /> Read more</>
                      )}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className={styles.noData}>No events available for this date.</p>
        )}
      </div>

      {visibleEvents < events.length && (
        <div className={styles.scrollDownSection} onClick={loadMoreEvents}>
          <p className={styles.scrollText}>Scroll down for more</p>
          <div className={styles.arrowDown}></div>
        </div>
      )}
    </>
  );
};