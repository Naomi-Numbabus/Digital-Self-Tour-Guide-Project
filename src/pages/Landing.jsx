import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const ROLES = [
  { id: 'student', label: 'Current Student', blurb: "You're enrolled at Griffith and exploring N79." },
  { id: 'staff', label: 'Staff', blurb: "You work at Griffith and want a refresher on N79." },
  { id: 'guest', label: 'Visitor / Guest', blurb: 'Prospective student, industry partner, or community visitor.' },
];

export default function Landing() {
  const { setVisitorRole, highContrast, toggleHighContrast, fontStep, cycleFontSize } = useApp();
  const navigate = useNavigate();

  function choose(roleId) {
    setVisitorRole(roleId);
    navigate('/home');
  }

  return (
    <div className="landing">
      <a className="skip-link" href="#role-heading">Skip to role selection</a>

      <div className="landing__a11y" role="group" aria-label="Accessibility controls">
        <button type="button" onClick={cycleFontSize} aria-pressed={fontStep !== 'normal'}>
          Text size: {fontStep === 'normal' ? 'Normal' : fontStep === 'large' ? 'Large' : 'Extra large'}
        </button>
        <button type="button" onClick={toggleHighContrast} aria-pressed={highContrast}>
          {highContrast ? 'High contrast: On' : 'High contrast: Off'}
        </button>
      </div>

      <main id="main-content" className="landing__card">
        <p className="landing__eyebrow">Griffith University · N79</p>
        <h1>N79 Digital Self-Tour</h1>
        <p className="landing__intro">
          Explore N79 at your own pace — no staff-led tour or booking required. Choose how you're
          visiting today to get started.
        </p>

        <h2 id="role-heading" className="landing__subheading">Continue as</h2>
        <div className="landing__roles">
          {ROLES.map((role) => (
            <button key={role.id} type="button" className="landing__role-btn" onClick={() => choose(role.id)}>
              <span className="landing__role-label">{role.label}</span>
              <span className="landing__role-blurb">{role.blurb}</span>
            </button>
          ))}
        </div>

        <p className="landing__privacy">
          No account or personal details needed. This choice only personalises your welcome message
          and isn't stored anywhere except this device.
        </p>
      </main>
    </div>
  );
}
