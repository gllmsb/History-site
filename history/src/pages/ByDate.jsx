import React, { useEffect, useState } from 'react';
import { Header } from "../components/header/header";
import styles from './byDate.module.scss';
import { Navbar } from '../components/navbar/navbar';
import { useQuery } from '@tanstack/react-query';
import readMoreIcon from '../assets/images/readmore.png';
import backToTopIcon from '../assets/images/arrowup.png';

export const ByDate = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [errorState, setErrorState] = useState('');
  const [visibleEvents, setVisibleEvents] = useState(5);
  const [showBackToTop, setShowBackToTop] = useState(false); 

  const daysInMonth = (month) => {
    const daysPerMonth = {
      1: 31,
      2: 28, 
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };
    return daysPerMonth[month] || 31;
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (value > 12 || value < 1) {
      setErrorState('Please enter a valid month (1-12).');
      setMonth('');
    } else {
      setMonth(value);
      setErrorState('');
      setVisibleEvents(5);
    }
  };

  const handleDayChange = (e) => {
    const value = e.target.value;
    const maxDays = daysInMonth(Number(month));
    if (value > maxDays || value < 1) {
      setErrorState(`Please enter a valid day (1-${maxDays}) for this month.`);
      setDay('');
    } else {
      setDay(value);
      setErrorState('');
      setVisibleEvents(5);
    }
  };

  const fetchHistoricalData = async () => {
    const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month}/${day}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['byDateEvents', month, day],
    queryFn: fetchHistoricalData,
    enabled: !!month && !!day && !errorState,
    staleTime: 1000 * 600,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const events = data?.events || [];

  const loadMoreEvents = () => {
    setVisibleEvents((prev) => prev + 5);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && events.length > 0) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [events]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Header
        title={(
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
        )}
        subtitle={(
          <>
            What happened on this day - Enter a specific month and day<br />
            to see historical events from that date.
          </>
        )}
        customTitleClass="byDateTitle"
        customSubtitleClass="byDateSubtitle"
        customOverlayClass="byDateOverlay"
      />

      <Navbar />

      {isLoading && <p className={styles.loadingMessage}>Historical events loading...</p>}
      {errorState && <p className={styles.errorMessage}>{errorState}</p>}

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

      {showBackToTop && (
        <div className={styles.backToTop} onClick={scrollToTop}>
          <img src={backToTopIcon} alt="Back to top" className={styles.backToTopIcon} />
        </div>
      )}
    </>
  );
};