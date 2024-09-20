import { useEffect, useState } from "react";
import { Header } from "../components/header/header"
import { Navbar } from "../components/navbar/navbar";
import { useQuery } from "@tanstack/react-query";
import styles from './today.module.scss';
import { EventList } from "../components/eventList/eventList";
import { BackToTopButton } from "../components/backToTop/backToTop";

export const Today = () => {
  const [visibleEvents, setVisibleEvents] = useState(5);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  const fetchTodayData = async () => {
    const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month}/${day}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todayEvents', month, day],
    queryFn: fetchTodayData, 
    staleTime: 1000 * 60 * 60, 
    retry: 2
  });

  const events = data?.events || [];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
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

  const handleBackToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const loadMoreEvents = () => {
    setVisibleEvents((prev) => prev + 5);
  };

  return (
    <>
      <Header
        title="ON THIS DAY"
        subtitle={(
          <>
            What happened on this day - historical events,<br />
            deaths and births throughout time
          </>
        )}
        customTitleClass="todayPageTitle"
        customSubtitleClass="todayPageSubtitle"
        customOverlayClass="todayPageOverlay"
      />
      <Navbar />

      {isLoading && <p className={styles.loadingMessage}>Historical events loading...</p>}
      {isError && <p className={styles.errorMessage}>{error.message}</p>}

      <EventList
        events={events} 
        visibleEvents={visibleEvents} 
        loadMoreEvents={loadMoreEvents} 
      /> 

      <BackToTopButton
        showBackToTop={showBackToTop} 
        scrollToTop={handleBackToTop} 
      /> 
    </>
  );
};