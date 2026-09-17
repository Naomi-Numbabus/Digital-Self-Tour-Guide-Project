import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useApp } from '../context/AppContext.jsx';

const ROLE_LABELS = { student: 'Student', staff: 'Staff', guest: 'Guest' };

export default function ProfilePage() {
  const { visitor, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My profile | N79 Navigator';
  }, []);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="page-transition">
      <Header />
      <main id="main-content" className="profile-page">
        <div className="profile-card">
          <div className="profile-status-mark" aria-hidden="true">
            ✓
          </div>
          <h1>You're signed in.</h1>
          <p className="profile-identity">
            Signed in as {ROLE_LABELS[visitor?.role] ?? 'Visitor'} · {visitor?.displayName || 'N79 visitor'}
          </p>

          <div className="profile-construction">
            <span>Coming soon</span>
            <b>Full profile management</b>
            <p>
              Saved preferences, tour history and account settings are still being built for a future release. Your
              text size and contrast settings are already saved to this device regardless of sign-in.
            </p>
          </div>

          <div className="profile-actions">
            <button type="button" className="primary" onClick={() => navigate('/rooms')}>
              Back to room directory
            </button>
            <button type="button" className="profile-logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
