import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import POIDetail from './pages/POIDetail.jsx';

// HashRouter so the built prototype works as a plain static site on GitHub
// Pages (or any static host) without server-side rewrite rules.
export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/poi/:stopId" element={<POIDetail />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
