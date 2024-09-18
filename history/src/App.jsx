import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import { Since } from './pages/Since'
import { Today } from './pages/Today'
import { MainLayout } from './layout/MainLayout'
import { ByDate } from './pages/ByDate';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Today/>} />
          <Route path="/by-date" element={<ByDate />} />
          <Route path="/since" element={<Since />} />
          <Route path="/*" element={<div>Oops! Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
