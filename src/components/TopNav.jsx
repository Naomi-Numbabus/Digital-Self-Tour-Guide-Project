import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function TopNav({ query, onQueryChange, showSearch = true }) {
  const { highContrast, toggleHighContrast, fontStep, cycleFontSize } = useApp();
  const navigate = useNavigate();

  return (
    <header className="top-nav">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="top-nav__row">
        <Link to="/home" className="top-nav__brand" aria-label="N79 Digital Self-Tour — Home">
          <span className="top-nav__mark" aria-hidden="true">N79</span>
          <span>Digital Self-Tour</span>
        </Link>

        {showSearch && (
          <form
            className="top-nav__search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/home');
            }}
          >
            <label htmlFor="global-search" className="visually-hidden">
              Search rooms, labs and points of interest
            </label>
            <input
              id="global-search"
              type="search"
              placeholder="Search rooms, labs, facilities…"
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
            />
          </form>
        )}

        <div className="top-nav__a11y" role="group" aria-label="Accessibility controls">
          <button type="button" onClick={cycleFontSize} aria-pressed={fontStep !== 'normal'}>
            <span aria-hidden="true">A</span>
            <span className="visually-hidden">Change text size, currently </span>
            {fontStep === 'normal' ? 'A' : fontStep === 'large' ? 'A+' : 'A++'}
          </button>
          <button type="button" onClick={toggleHighContrast} aria-pressed={highContrast}>
            {highContrast ? 'High contrast: On' : 'High contrast: Off'}
          </button>
        </div>
      </div>
    </header>
  );
}
