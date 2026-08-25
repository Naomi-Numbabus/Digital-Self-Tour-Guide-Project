import { Link } from 'react-router-dom';
import StopVisual from './StopVisual.jsx';

export default function POICard({ stop }) {
  return (
    <Link to={`/poi/${stop.id}`} className="poi-card">
      <StopVisual image={stop.image} size="small" />
      <div className="poi-card__body">
        <span className="poi-card__category">{stop.category}</span>
        <h3>{stop.name}</h3>
        <p>{stop.shortDescription}</p>
        {stop.media && (
          <span className="poi-card__media-tag">
            {stop.media.type === 'video' ? '🎬 Video available' : '🔊 Audio available'}
          </span>
        )}
      </div>
    </Link>
  );
}
