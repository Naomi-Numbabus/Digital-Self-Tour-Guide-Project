import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import logoDesktop from '../assets/griffith-logo-desktop.png';
import logoMobile from '../assets/griffith-symbol-mobile.png';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About N79' },
  { to: '/rooms', label: 'Rooms & Labs', authOnly: true },
  { to: '/wifi', label: 'Wi-Fi guide' },
];

export default function Header() {
  const { highContrast, toggleHighContrast, fontStep, fontLabel, cycleFontSize, isAuthed, displayName, logout } =
    useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileWrapRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!profileOpen) return undefined;
    function onDocClick(e) {
      if (!profileWrapRef.current?.contains(e.target)) setProfileOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setProfileOpen(false);
        profileButtonRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [profileOpen]);

  function handleLogout() {
    logout();
    setProfileOpen(false);
    navigate('/');
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <Link className="logo-link" to="/" aria-label="Return to N79 Navigator home">
          <picture>
            <source media="(max-width: 780px)" srcSet={logoMobile} />
            <img src={logoDesktop} alt="Griffith University" />
          </picture>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-navigation" aria-label="Main navigation" className={mobileOpen ? 'open' : ''}>
          {NAV_LINKS.filter((link) => !link.authOnly || isAuthed).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-link"
              aria-current={location.pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a href="https://www.griffith.edu.au/about-griffith/campuses-facilities/nathan" target="_blank" rel="noreferrer">
            Nathan campus
          </a>

          <div className="a11y-controls" role="group" aria-label="Accessibility controls">
            <button type="button" onClick={cycleFontSize} aria-pressed={fontStep !== 'normal'}>
              <span aria-hidden="true">{fontLabel}</span>
              <span className="sr-only">
                Text size: {fontStep === 'normal' ? 'normal' : fontStep === 'large' ? 'large' : 'extra large'}.
                Activate to change.
              </span>
            </button>
            <button type="button" onClick={toggleHighContrast} aria-pressed={highContrast}>
              {highContrast ? 'High contrast: On' : 'High contrast: Off'}
            </button>
          </div>

          {isAuthed ? (
            <div className="profile-menu-wrap" ref={profileWrapRef}>
              <button
                type="button"
                ref={profileButtonRef}
                className="profile-button"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((v) => !v)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span className="profile-name">{displayName || 'Account'}</span>
                <span className="profile-chevron" aria-hidden="true">
                  ⌄
                </span>
              </button>
              {profileOpen && (
                <div className="profile-dropdown" role="menu" aria-label="Profile menu">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate('/profile');
                    }}
                  >
                    <span className="dropdown-icon" aria-hidden="true">
                      👤
                    </span>
                    <span>
                      Profile
                      <small>View account details</small>
                    </span>
                  </button>
                  <button type="button" role="menuitem" className="logout-option" onClick={handleLogout}>
                    <span className="dropdown-icon" aria-hidden="true">
                      ⎋
                    </span>
                    <span>
                      Logout
                      <small>End this session</small>
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-login" aria-current={location.pathname === '/login' ? 'page' : undefined}>
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
