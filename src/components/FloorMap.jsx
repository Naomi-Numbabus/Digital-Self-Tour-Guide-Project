import { useRef, useState } from 'react';

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

export default function FloorMap({ level, planImage, points, selectedRoomId, onSelectPoint }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const dragRef = useRef(null);
  const viewportRef = useRef(null);

  const isZoomed = zoom > 1;

  function clampPan(next, z) {
    const max = (z - 1) * 260;
    return {
      x: Math.min(max, Math.max(-max, next.x)),
      y: Math.min(max, Math.max(-max, next.y)),
    };
  }

  function setZoomClamped(next) {
    const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
    setZoom(z);
    setPan((p) => (z === 1 ? { x: 0, y: 0 } : clampPan(p, z)));
  }

  function zoomIn() {
    setZoomClamped(zoom + ZOOM_STEP);
  }
  function zoomOut() {
    setZoomClamped(zoom - ZOOM_STEP);
  }
  function reset() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function onPointerDown(e) {
    if (!isZoomed) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, origin: pan };
    setIsPanning(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan(clampPan({ x: dragRef.current.origin.x + dx, y: dragRef.current.origin.y + dy }, zoom));
  }

  function endPan() {
    dragRef.current = null;
    setIsPanning(false);
  }

  function onKeyDown(e) {
    const PAN_STEP = 40;
    switch (e.key) {
      case '+':
      case '=':
        e.preventDefault();
        zoomIn();
        break;
      case '-':
      case '_':
        e.preventDefault();
        zoomOut();
        break;
      case 'ArrowUp':
        if (isZoomed) {
          e.preventDefault();
          setPan((p) => clampPan({ x: p.x, y: p.y + PAN_STEP }, zoom));
        }
        break;
      case 'ArrowDown':
        if (isZoomed) {
          e.preventDefault();
          setPan((p) => clampPan({ x: p.x, y: p.y - PAN_STEP }, zoom));
        }
        break;
      case 'ArrowLeft':
        if (isZoomed) {
          e.preventDefault();
          setPan((p) => clampPan({ x: p.x + PAN_STEP, y: p.y }, zoom));
        }
        break;
      case 'ArrowRight':
        if (isZoomed) {
          e.preventDefault();
          setPan((p) => clampPan({ x: p.x - PAN_STEP, y: p.y }, zoom));
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="map-panel">
      <div className="map-toolbar">
        <div>
          <span>
            N79 · Level {level}
          </span>
          <b>Henry Smerdon Building</b>
        </div>
        <span className="plan-type-badge">Interactive level map</span>
      </div>

      <div
        className="floor-map real-plan"
        data-zoomed={isZoomed}
        data-panning={isPanning || undefined}
        aria-label={`Interactive N79 Level ${level} map`}
      >
        <div
          ref={viewportRef}
          className="map-viewport"
          tabIndex={0}
          role="region"
          aria-label={`Level ${level} room map. Use the plus and minus keys to zoom, and arrow keys to move around when zoomed in.`}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPan}
          onPointerLeave={endPan}
        >
          <div
            className="map-transform-layer"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
          >
            <img
              className="floor-plan-image"
              src={planImage}
              alt={`N79 Level ${level} plan showing numbered rooms and laboratories`}
              draggable={false}
            />
            {points.map((point) => {
              const selected = point.roomIds.includes(selectedRoomId);
              const label = point.rooms.map((r) => r.name).join(', ');
              return (
                <button
                  key={point.displayNumber}
                  type="button"
                  className={`map-hotspot${selected ? ' selected' : ''}`}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  onClick={() => onSelectPoint(point)}
                >
                  <span aria-hidden="true">{point.displayNumber}</span>
                  <span className="sr-only">
                    {selected ? 'Selected, ' : ''}
                    {label}
                    {point.rooms[0]?.code ? `, ${point.rooms[0].code}` : ''}, Level {level}
                    {point.rooms.length > 1 ? ` — ${point.rooms.length} rooms at this location` : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="map-zoom-controls" role="group" aria-label="Map zoom controls">
          <button type="button" onClick={zoomOut} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out of level map">
            −
          </button>
          <span className="map-zoom-value" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button type="button" onClick={zoomIn} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in on level map">
            +
          </button>
          <button type="button" onClick={reset} aria-label="Reset level map view">
            Reset
          </button>
        </div>

        <p className="map-gesture-hint">Zoom in, then drag to explore</p>

        <div className="plan-legend">
          <span>
            <i className="legend-point" aria-hidden="true" />
            Room or lab
          </span>
          <span>
            <i aria-hidden="true">♿</i>
            Plan access symbol
          </span>
          <span>
            <i className="legend-stairs" aria-hidden="true">
              ↗
            </i>
            Stairs
          </span>
        </div>
      </div>

      <p className="map-disclaimer">
        Use this map for room information only. It is not emergency or evacuation guidance; always follow official
        building signage and staff instructions.
      </p>
    </div>
  );
}
