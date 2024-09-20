import { Header } from "../components/header/header";
import { Navbar } from "../components/navbar/navbar";
import styles from './Since.module.scss';


export const Since = () => {
    return (
        <>
            <Header
                title="Since"
                subtitle={(
                    <>
                    What happened on this day - Here you can enter <br />
                    a specific year to get only events for that year
                    </>
                )}
                customTitleClass="sincePageTitle" 
                customSubtitleClass="sincePageSubtitle" 
                customOverlayClass="sincePageOverlay" 
            />
            <Navbar />
            <div className={styles.aboutContainer}>
            <div className={styles.aboutContent}>
                <h1>About This Website</h1>
                <p>
                Welcome to our history site, where we explore significant events that happened on this day
                in the past. Our goal is to provide an engaging and educational platform where users can
                discover historical facts and learn more about the world we live in.
                </p>
                <h2>Our Mission</h2>
                <p>
                We aim to make history accessible and interesting for everyone. By highlighting events
                from different periods, we hope to inspire curiosity and a deeper understanding of the
                past.
                </p>
                <h2>Why This Site?</h2>
                <p>
                History is full of stories that shape our present and future. This site serves as a
                reminder of the important moments that have influenced the course of humanity. We believe
                that by learning from the past, we can better navigate the challenges of the future.
                </p>
                <h2>Special Thanks</h2>
                <p>
                We would like to thank all the contributors and developers who made this site possible. A
                special thanks to the Wikimedia Foundation for providing a vast collection of historical
                data and resources.
                </p>
            </div>
            </div>
        </>
    );
};