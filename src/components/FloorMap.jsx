import { Link } from 'react-router-dom';

// A simplified, schematic layout of the ground floor — NOT the official floor
// plan. Stands in until the client supplies approved floor-plan artwork
// (Proposal §3.2: producing new floor plans is out of scope for this team).
export default function FloorMap({ stops }) {
  return (
    <div className="floor-map" role="group" aria-label="Simplified ground floor layout">
      <p className="floor-map__note">
        Simplified layout for the prototype — to be replaced with N79's official ground-floor plan.
      </p>
      <div className="floor-map__grid">
        {stops.map((stop) => (
          <Link
            key={stop.id}
            to={`/poi/${stop.id}`}
            className="floor-map__stop"
            style={{ gridColumn: stop.mapPosition.col, gridRow: stop.mapPosition.row }}
            title={stop.name}
          >
            <span aria-hidden="true">{stop.image.icon}</span>
            <span className="floor-map__stop-label">{stop.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
