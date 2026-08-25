import { useMemo, useState } from 'react';
import TopNav from '../components/TopNav.jsx';
import POICard from '../components/POICard.jsx';
import FloorMap from '../components/FloorMap.jsx';
import { useApp } from '../context/AppContext.jsx';
import stops from '../content/tourStops.json';

const ROLE_WELCOME = {
  student: 'Welcome back — here are the ground-floor spots you can drop into between classes.',
  staff: 'Welcome — a quick refresher on what visitors will see on the ground floor.',
  guest: "Welcome to N79! Here's everything on the ground floor to get you started.",
  '': 'Welcome to N79 — here’s the ground floor to get you started.',
};

export default function Home() {
  const { visitorRole } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState('list');

  const categories = useMemo(() => ['All', ...new Set(stops.map((s) => s.category))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stops.filter((stop) => {
      const matchesQuery =
        !q ||
        stop.name.toLowerCase().includes(q) ||
        stop.shortDescription.toLowerCase().includes(q) ||
        stop.category.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || stop.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="page">
      <TopNav query={query} onQueryChange={setQuery} />
      <main id="main-content" className="home">
        <div className="home__intro">
          <p className="home__floor-tag">Ground Floor</p>
          <h1>Find your next stop</h1>
          <p>{ROLE_WELCOME[visitorRole] ?? ROLE_WELCOME['']}</p>
        </div>

        <div className="home__controls">
          <div className="home__filters" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip${category === cat ? ' chip--active' : ''}`}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="home__view-toggle" role="group" aria-label="Choose view">
            <button
              type="button"
              className={`toggle-btn${view === 'list' ? ' toggle-btn--active' : ''}`}
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
            >
              ☰ List
            </button>
            <button
              type="button"
              className={`toggle-btn${view === 'map' ? ' toggle-btn--active' : ''}`}
              aria-pressed={view === 'map'}
              onClick={() => setView('map')}
            >
              ⌂ Map
            </button>
          </div>
        </div>

        <p className="home__result-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'stop' : 'stops'} found
        </p>

        {view === 'list' ? (
          <div className="poi-grid">
            {filtered.map((stop) => (
              <POICard key={stop.id} stop={stop} />
            ))}
            {filtered.length === 0 && (
              <p className="home__empty">No stops match "{query}". Try a different search or clear the filter.</p>
            )}
          </div>
        ) : (
          <FloorMap stops={filtered} />
        )}
      </main>
    </div>
  );
}
