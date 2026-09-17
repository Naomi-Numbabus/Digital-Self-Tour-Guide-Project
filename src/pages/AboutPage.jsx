import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import ArrowIcon from '../components/ArrowIcon.jsx';
import { useApp } from '../context/AppContext.jsx';
import campus from '../assets/campus.jpg';

const FEATURES = [
  {
    title: 'High-bay laboratory',
    body: 'An indoor drone fly-zone with cranes and gantries, large enough to suspend a lightweight aircraft or vehicle.',
  },
  {
    title: 'Simulation facilities',
    body: 'Virtual and augmented reality environments support scenario planning and problem solving.',
  },
  {
    title: 'Flexible learning',
    body: 'Workshops, specialised laboratories, informal learning areas and a central atrium bring students together.',
  },
  {
    title: 'Disaster resilience',
    body: 'Specialist spaces support exercises, planning, training and simulated emergency response.',
  },
];

export default function AboutPage() {
  const { isAuthed } = useApp();

  useEffect(() => {
    document.title = 'About N79 | Griffith University';
  }, []);

  return (
    <div className="page-transition about-page">
      <Header />
      <main id="main-content">
        <section className="about-hero" style={{ '--campus-image': `url(${campus})` }}>
          <div>
            <p className="campus-label light">Discover N79</p>
            <h1>Built for ideas that move.</h1>
            <p>
              Engineering, technology and aviation come together in one of Nathan campus's most innovative learning
              environments.
            </p>
            <Link className="primary" to={isAuthed ? '/rooms' : '/login'}>
              {isAuthed ? 'Explore rooms & labs' : 'Login to explore'} <ArrowIcon />
            </Link>
          </div>
        </section>

        <section className="about-intro">
          <span className="section-tag">The building</span>
          <div>
            <h2>Henry Smerdon Engineering, Technology and Aviation</h2>
            <p>
              N79 is a landmark learning and teaching building at Griffith University's Nathan campus. Its adaptable
              spaces connect hands-on experimentation, teaching and industry-focused problem solving.
            </p>
          </div>
        </section>

        <section className="feature-stats">
          <article>
            <strong>6,000 m²</strong>
            <p>of adaptable learning and research space</p>
          </article>
          <article>
            <strong>Six levels</strong>
            <p>of multi-functional teaching facilities</p>
          </article>
          <article>
            <strong>10 m high</strong>
            <p>specialised high-bay laboratory</p>
          </article>
        </section>

        <section className="inside">
          <div className="inside-art" aria-hidden="true">
            <span>N79</span>
          </div>
          <div>
            <span className="section-tag">Inside N79</span>
            <h2>Designed to test, make and simulate.</h2>
            <ul>
              {FEATURES.map((f) => (
                <li key={f.title}>
                  <b>{f.title}</b>
                  <span>{f.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about-cta">
          <div>
            <span className="section-tag">Ready to explore?</span>
            <h2>See N79 for yourself.</h2>
          </div>
          <Link className="light-btn" to={isAuthed ? '/rooms' : '/login'}>
            {isAuthed ? 'Open the room directory' : 'Login to open directory'} <ArrowIcon />
          </Link>
        </section>

        <footer>
          <span>Information sourced from Griffith University.</span>
          <div>
            <a
              href="https://news.griffith.edu.au/2020/02/25/engineering-students-make-the-most-of-n79-their-new-home-at-nathan/"
              target="_blank"
              rel="noreferrer"
            >
              Building story
            </a>
            <a href="https://www.griffith.edu.au/research/disaster-network/facilities" target="_blank" rel="noreferrer">
              N79 facilities
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
