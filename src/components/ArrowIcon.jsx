export default function ArrowIcon({ direction = 'right' }) {
  const rotation = { right: 0, left: 180, up: -90, down: 90 }[direction] ?? 0;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
