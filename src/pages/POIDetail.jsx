import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import TopNav from '../components/TopNav.jsx';
import StopVisual from '../components/StopVisual.jsx';
import stops from '../content/tourStops.json';

export default function POIDetail() {
  const { stopId } = useParams();
  const [showTranscript, setShowTranscript] = useState(false);
  const stop = stops.find((s) => s.id === stopId);

  if (!stop) return <Navigate to="/home" replace />;

  const currentIndex = stops.findIndex((s) => s.id === stopId);
  const prevStop = stops[(currentIndex - 1 + stops.length) % stops.length];
  const nextStop = stops[(currentIndex + 1) % stops.length];

  return (
    <div className="page">
      <TopNav showSearch={false} />
      <main id="main-content" className="poi-detail">
        <nav aria-label="Breadcrumb" className="poi-detail__breadcrumb">
          <Link to="/home">← Back to Ground Floor</Link>
        </nav>

        <StopVisual image={stop.image} size="large" />

        <div className="poi-detail__header">
          <span className="poi-card__category">{stop.category}</span>
          <h1>{stop.name}</h1>
          <p className="poi-detail__location">📍 {stop.floor} Floor</p>
        </div>

        <p className="poi-detail__description">{stop.description}</p>

        {stop.media && (
          <section className="poi-detail__media" aria-label="Additional media">
            <h2>{stop.media.type === 'video' ? '🎬 Video' : '🔊 Audio'}: {stop.media.label}</h2>
            <div className="poi-detail__media-placeholder">
              {stop.media.type === 'video' ? 'Video player placeholder' : 'Audio player placeholder'}
              <span className="poi-detail__media-note">{stop.media.captionsNote}</span>
            </div>
            <button
              type="button"
              className="poi-detail__transcript-toggle"
              aria-expanded={showTranscript}
              onClick={() => setShowTranscript((v) => !v)}
            >
              {showTranscript ? 'Hide transcript' : 'Show transcript'}
            </button>
            {showTranscript && (
              <p className="poi-detail__transcript">{stop.media.transcript}</p>
            )}
          </section>
        )}

        <nav className="poi-detail__pager" aria-label="Nearby stops">
          <Link to={`/poi/${prevStop.id}`} className="poi-detail__pager-link">
            ← {prevStop.name}
          </Link>
          <Link to={`/poi/${nextStop.id}`} className="poi-detail__pager-link poi-detail__pager-link--next">
            {nextStop.name} →
          </Link>
        </nav>
      </main>
    </div>
  );
}
