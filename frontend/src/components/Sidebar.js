import { FaChartBar, FaCloud, FaFolderOpen, FaHome, FaUpload } from 'react-icons/fa';

function Sidebar({ currentPage, onNavigate }) {
  const user = localStorage.getItem('user') || 'User';
  const navItems = [
    { icon: <FaHome />, label: 'Dashboard', page: 'dashboard' },
    { icon: <FaUpload />, label: 'Upload', page: 'upload' },
    { icon: <FaChartBar />, label: 'Analytics', page: 'analytics' },
    { icon: <FaFolderOpen />, label: 'Files', page: 'files' }
  ];

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="brand-stack">
        <h2>
          <FaCloud /> AstraVault
        </h2>
        <p>Cloud Intelligence Suite</p>
      </div>

      <div className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.page}
            type="button"
            onClick={() => onNavigate(item.page)}
            className={`sidebar-nav-btn${currentPage === item.page ? ' active' : ''}`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      <div className="sidebar-user">
        <span>Signed in as</span>
        <strong>{user}</strong>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Sidebar;
