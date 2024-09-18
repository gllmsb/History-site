import { Header } from "../components/header/header";
import { Navbar } from "../components/navbar/navbar";


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
        </>
    );
};