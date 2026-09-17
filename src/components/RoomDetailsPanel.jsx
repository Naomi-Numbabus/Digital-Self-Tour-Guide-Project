import { useState } from 'react';

// Rendered with key={room.id} by the caller, so this component remounts
// (and photoIndex naturally resets to 0) whenever the selected room changes.
export default function RoomDetailsPanel({ room, otherRooms, onSelectRoom, onClose }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const images = room.images ?? [];
  const total = images.length;

  function showPhoto(i) {
    setPhotoIndex((i + total) % total);
  }

  return (
    <aside className="room-panel" aria-label={`${room.name} details`}>
      <div className="room-details" role="dialog" aria-label={`${room.name} details`}>
        <div className="room-panel-header">
          <span className="detail-label">Room information</span>
          <button type="button" className="room-panel-close" onClick={onClose} aria-label={`Close details for ${room.name}`}>
            <span aria-hidden="true">×</span> Close
          </button>
        </div>

        {total > 0 && (
          <div className="room-gallery">
            <div className="room-photo">
              <img src={images[photoIndex].src} alt={`${room.name}, photo ${photoIndex + 1} of ${total}`} />
              <span aria-hidden="true">
                Photo {photoIndex + 1} of {total}
              </span>
              {total > 1 && (
                <div className="room-photo-controls">
                  <button type="button" onClick={() => showPhoto(photoIndex - 1)} aria-label="Show previous room photo">
                    ‹
                  </button>
                  <button type="button" onClick={() => showPhoto(photoIndex + 1)} aria-label="Show next room photo">
                    ›
                  </button>
                </div>
              )}
            </div>
            {total > 1 && (
              <div className="room-thumbnails" role="group" aria-label={`${room.name} photo gallery`}>
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    className={i === photoIndex ? 'active' : ''}
                    onClick={() => showPhoto(i)}
                    aria-label={`Show room photo ${i + 1} of ${total}`}
                    aria-current={i === photoIndex}
                  >
                    <img src={img.src} alt="" aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="room-detail-heading">
          <div>
            <small>
              Map point {room.mapPoint ?? room.id} · {room.type}
            </small>
            <h2>{room.name}</h2>
            <p>
              {room.code} · Level {room.level}
            </p>
          </div>
        </div>

        <p className="room-description">{room.detail}</p>

        {room.access && (
          <div className="room-features">
            <span>⚠ {room.access}</span>
          </div>
        )}

        {otherRooms && otherRooms.length > 0 && (
          <div className="room-features" role="group" aria-label="Other rooms at this location">
            {otherRooms.map((r) => (
              <button key={r.id} type="button" onClick={() => onSelectRoom(r.id)}>
                {r.name} →
              </button>
            ))}
          </div>
        )}

        <p className="room-description">Located on Level {room.level} in the supplied map.</p>

        {room.media && room.media.length > 0 && (
          <div className="room-media" aria-label="Watch and explore">
            <h3>Watch and explore</h3>
            {room.media.map((item, i) =>
              item.kind === 'video' ? (
                <div className="room-video" key={i}>
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <b>{item.title}</b>
                  <span className="sr-only">Captions can be turned on from the video player's CC control.</span>
                </div>
              ) : (
                <a
                  className="room-resource-link"
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    {item.title}
                    <small>Opens in a new tab</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              ),
            )}
          </div>
        )}

        <div className="detail-help">
          <b>Finding this room</b>
          <p>Room-specific walking directions have not been verified. Use the highlighted marker and follow on-site signage.</p>
        </div>

        <button type="button" onClick={onClose}>
          ← Close room details
        </button>
      </div>
    </aside>
  );
}
