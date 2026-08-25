// Decorative placeholder "image" for a tour stop, standing in for client-approved
// photography. Uses a real alt text description so screen readers get the same
// information a real photo's alt text would give — swap the implementation for
// an <img> once approved photos are available, keeping the `alt` field as-is.
export default function StopVisual({ image, size = 'medium' }) {
  return (
    <div
      className={`stop-visual stop-visual--${size}`}
      style={{ background: `linear-gradient(135deg, ${image.color}, #10151c)` }}
      role="img"
      aria-label={image.alt}
    >
      <span aria-hidden="true" className="stop-visual__icon">{image.icon}</span>
    </div>
  );
}
