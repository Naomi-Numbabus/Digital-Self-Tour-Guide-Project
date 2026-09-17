import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RoomsPage from './pages/RoomsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import WifiGuidePage from './pages/WifiGuidePage.jsx';

// HashRouter so the built app works as a plain static site on GitHub Pages,
// Vercel, or any static host without server-side rewrite rules.
function RequireAuth({ children }) {
  const { isAuthed } = useApp();
  return isAuthed ? children : <Navigate to="/login" replace />;
}

function RedirectIfAuthed({ children }) {
  const { isAuthed } = useApp();
  return isAuthed ? <Navigate to="/" replace /> : children;
}

function Root() {
  const { isAuthed } = useApp();
  return isAuthed ? <RoomsPage /> : <HomePage />;
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/wifi" element={<WifiGuidePage />} />
          <Route
            path="/login"
            element={
              <RedirectIfAuthed>
                <LoginPage />
              </RedirectIfAuthed>
            }
          />
          <Route
            path="/rooms"
            element={
              <RequireAuth>
                <RoomsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
