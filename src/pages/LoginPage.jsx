import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import campus from '../assets/campus.jpg';

const ROLES = ['student', 'staff', 'guest'];
const ROLE_LABELS = { student: 'Student', staff: 'Staff', guest: 'Guest' };

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Login | N79 Navigator';
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    let displayName = '';
    if (role === 'student') displayName = form.get('studentNumber')?.toString().trim() || 'Student';
    else if (role === 'staff') displayName = form.get('staffUsername')?.toString().trim() || 'Staff';
    else displayName = form.get('fullName')?.toString().trim() || 'Guest';

    setSubmitting(true);
    window.setTimeout(() => {
      login(role, { displayName });
      navigate('/rooms');
    }, 700);
  }

  if (submitting) {
    return (
      <div className="auth-loading" role="status" aria-live="polite">
        <div className="auth-spinner" aria-hidden="true" />
        <p>Opening directory…</p>
      </div>
    );
  }

  return (
    <div className="page-transition login-page" style={{ '--campus-image': `url(${campus})` }}>
      <main id="main-content" className="login-card">
        <Link className="back" to="/">
          ← Back to home
        </Link>
        <p className="campus-label">N79 access</p>
        <h1>Choose how to continue.</h1>

        <div className="role-tabs" role="tablist" aria-label="Choose how to sign in">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={role === r}
              aria-controls={`role-panel-${r}`}
              id={`role-tab-${r}`}
              className={role === r ? 'active' : ''}
              onClick={() => setRole(r)}
            >
              {ROLE_LABELS[r]}
            </button>
          ))}
        </div>

        <div
          className="login-role-content"
          id={`role-panel-${role}`}
          role="tabpanel"
          aria-labelledby={`role-tab-${role}`}
        >
          <form onSubmit={handleSubmit}>
            {role === 'guest' ? (
              <>
                <label htmlFor="fullName">Full name</label>
                <input id="fullName" name="fullName" type="text" placeholder="Enter your full name" required />

                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" placeholder="Enter your email address" required />

                <label htmlFor="phone">
                  Phone number <span className="optional-label">(optional)</span>
                </label>
                <input id="phone" name="phone" type="tel" placeholder="Enter your phone number" />

                <button type="submit" className="primary full">
                  Continue as guest →
                </button>
              </>
            ) : (
              <>
                <label htmlFor="identifier">{role === 'student' ? 'Student number' : 'Staff username'}</label>
                <input
                  id="identifier"
                  name={role === 'student' ? 'studentNumber' : 'staffUsername'}
                  type="text"
                  placeholder={role === 'student' ? 'Enter student number' : 'Enter staff username'}
                  required
                />

                <div className="password-row">
                  <label htmlFor="password">Password</label>
                  <button type="button" onClick={() => setShowPassword((v) => !v)} aria-pressed={showPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  required
                />

                <div className="form-meta">
                  <label htmlFor="remember">
                    <input id="remember" name="remember" type="checkbox" /> Remember this login
                  </label>
                  <a href="https://www.griffith.edu.au/password-management" target="_blank" rel="noreferrer">
                    Griffith password help
                  </a>
                </div>

                <button type="submit" className="primary full">
                  Sign in →
                </button>
              </>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
