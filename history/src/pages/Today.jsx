import { Header } from "../components/header/header"
import { Navbar } from "../components/navbar/navbar";


export const Today = () => {
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
      </>
    );
  };