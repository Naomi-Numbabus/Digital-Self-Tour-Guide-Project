import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import FloorMap from '../components/FloorMap.jsx';
import RoomDetailsPanel from '../components/RoomDetailsPanel.jsx';
import { levels, levelNumbers } from '../content/levels.js';
import { searchRooms } from '../content/rooms.js';

export default function RoomsPage() {
  useEffect(() => {
    document.title = 'N79 Rooms & Labs | Griffith University';
  }, []);

  const [level, setLevel] = useState(levelNumbers[0]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const current = levels[String(level)];
  const results = useMemo(() => searchRooms(query), [query]);
  const showResults = searchFocused && query.trim().length > 0;

  const selectedPoint = selectedRoomId
    ? current.points.find((p) => p.roomIds.includes(selectedRoomId))
    : null;
  const selectedRoom = selectedRoomId
    ? current.rooms.find((r) => r.id === selectedRoomId) ??
      Object.values(levels)
        .flatMap((l) => l.rooms)
        .find((r) => r.id === selectedRoomId)
    : null;
  const otherRooms = selectedPoint ? selectedPoint.rooms.filter((r) => r.id !== selectedRoomId) : [];

  function goToRoom(room) {
    setLevel(room.level);
    setSelectedRoomId(room.id);
    setQuery('');
    setSearchFocused(false);
  }

  function selectLevel(next) {
    setLevel(next);
    setSelectedRoomId(null);
  }

  return (
    <div className="page-transition">
      <Header />
      <main id="main-content" className={`navigator-page${selectedRoom ? ' has-details' : ''}`}>
        <div className="nav-panel">
          <span className="section-tag">N79 Room Directory</span>
          <h1>Explore rooms and labs</h1>
          <p className="nav-intro">Choose a level to see its classrooms, laboratories and shared facilities.</p>

          <div className="room-search">
            <div className="search-box" role="search" aria-label="Search the N79 room directory">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                type="search"
                placeholder="Search rooms, codes or levels"
                aria-label="Search N79 rooms"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              />
            </div>
            {showResults && (
              <div className="search-results">
                <p className="search-summary" aria-live="polite">
                  {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
                </p>
                <ul>
                  {results.map((room) => (
                    <li key={room.id}>
                      <button type="button" onClick={() => goToRoom(room)}>
                        <span>
                          {room.name}
                          <small>
                            {room.code} · Level {room.level}
                          </small>
                        </span>
                        <svg aria-hidden="true" viewBox="0 0 24 24">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="floor-select">
            <span>Choose a level</span>
            <div role="group" aria-label="Choose a level">
              {levelNumbers.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={n === level ? 'active' : ''}
                  aria-pressed={n === level}
                  aria-label={`Show Level ${n}`}
                  onClick={() => selectLevel(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="places">
            <h2>Level {level} rooms and labs</h2>
            {current.rooms.map((room) => (
              <button
                key={room.id}
                type="button"
                className={room.id === selectedRoomId ? 'active' : ''}
                onClick={() => setSelectedRoomId(room.id)}
              >
                <span>
                  {room.name}
                  <small>{room.code}</small>
                </span>
              </button>
            ))}
          </div>
        </div>

        <FloorMap
          level={level}
          planImage={current.planImage}
          points={current.points}
          selectedRoomId={selectedRoomId}
          onSelectPoint={(point) => setSelectedRoomId(point.roomIds[0])}
        />

        {selectedRoom && (
          <RoomDetailsPanel
            key={selectedRoom.id}
            room={selectedRoom}
            otherRooms={otherRooms}
            onSelectRoom={setSelectedRoomId}
            onClose={() => setSelectedRoomId(null)}
          />
        )}
      </main>
    </div>
  );
}
