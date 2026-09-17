import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import ArrowIcon from '../components/ArrowIcon.jsx';
import { useApp } from '../context/AppContext.jsx';
import campus from '../assets/campus.jpg';

export default function HomePage() {
  const { isAuthed, displayName } = useApp();

  useEffect(() => {
    document.title = 'N79 Navigator | Griffith University';
  }, []);

  return (
    <div className="page-transition">
      <Header />
      <main id="main-content" className="home-stage" style={{ '--campus-image': `url(${campus})` }}>
        <div className="home-content">
          <p className="campus-label light">Griffith University · Nathan campus</p>
          <h1>Find your way around N79.</h1>
          <p>
            Explore rooms, laboratories and learning spaces inside the Henry Smerdon Engineering, Technology and
            Aviation building.
            {isAuthed && displayName ? ` Welcome back, ${displayName}.` : ''}
          </p>

          <div className="home-actions">
            {isAuthed ? (
              <Link className="primary" to="/rooms">
                Explore rooms &amp; labs <ArrowIcon />
              </Link>
            ) : (
              <Link className="primary" to="/login">
                Login to explore <ArrowIcon />
              </Link>
            )}
            <Link className="secondary-light" to="/wifi">
              Connect to campus Wi-Fi
            </Link>
          </div>

          <div className="home-quick">
            {isAuthed ? (
              <Link to="/profile">
                My profile
                <span>Open your account details →</span>
              </Link>
            ) : (
              <Link to="/about">
                About N79
                <span>Learn about the building →</span>
              </Link>
            )}
            <a href="https://www.griffith.edu.au/about-griffith/campuses-facilities/nathan" target="_blank" rel="noreferrer">
              Nathan campus
              <span>Open the official campus page ↗</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
