import React, { useEffect, useState } from 'react';
import { Header } from "../components/header/header";
import styles from './byDate.module.scss';
import { Navbar } from '../components/navbar/navbar';
import { useQuery } from '@tanstack/react-query';
import { EventList } from '../components/eventList/eventList';
import { BackToTopButton } from '../components/backToTop/backToTop';

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

  const { data, isLoading } = useQuery({
    queryKey: ['byDateEvents', month, day],
    queryFn: fetchHistoricalData,
    enabled: !!month && !!day && !errorState,
    staleTime: 1000 * 600,
    retry: 2,
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

      <EventList 
        events={events} 
        visibleEvents={visibleEvents} 
        loadMoreEvents={loadMoreEvents} 
      />

      <BackToTopButton 
        showBackToTop={showBackToTop} 
        scrollToTop={scrollToTop} 
      />
    </>
  );
};