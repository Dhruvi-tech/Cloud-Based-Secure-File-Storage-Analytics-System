import { FaMoon, FaSun, FaUserCircle } from 'react-icons/fa';

export default function Topbar({ theme, nextThemeLabel, onToggleTheme, pageTitle, pageSubtitle }) {
  const user = localStorage.getItem('user') || 'User';
  const now = new Date();
  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="topbar card reveal delay-1">
      <div>
        <h2>{pageTitle}</h2>
        <p>{pageSubtitle}</p>
        <div className="topbar-meta">
          <span className="meta-pill status-pill">Live</span>
          <span className="meta-pill">{formattedDate}</span>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />} {nextThemeLabel}
        </button>
        <div className="topbar-user">
          <FaUserCircle />
          <span>{user}</span>
        </div>
      </div>
    </div>
  );
}
