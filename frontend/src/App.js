import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Upload from './components/Upload';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import FileList from './components/FileList';
import Login from './components/Login';
import KpiRibbon from './components/KpiRibbon';

function resolveInitialTheme() {
  const savedTheme = localStorage.getItem('dashboard-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark';
}

function App() {
  const isLoggedIn = localStorage.getItem('user');
  const [theme, setTheme] = useState(resolveInitialTheme);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const pageMeta = {
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Executive overview and key cloud metrics'
    },
    upload: {
      title: 'Upload Center',
      subtitle: 'Add file metadata with fast drag-and-drop ingestion'
    },
    analytics: {
      title: 'Analytics',
      subtitle: 'Storage intelligence and file distribution insights'
    },
    files: {
      title: 'Files Library',
      subtitle: 'Search, filter, sort, and manage stored file records'
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dashboard-theme', theme);
  }, [theme]);

  const nextThemeLabel = useMemo(() => (theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'), [theme]);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="layout">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#ffffff',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '12px'
          }
        }}
      />
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="main">
        <Topbar
          theme={theme}
          nextThemeLabel={nextThemeLabel}
          onToggleTheme={() => setTheme(current => (current === 'dark' ? 'light' : 'dark'))}
          pageTitle={pageMeta[currentPage].title}
          pageSubtitle={pageMeta[currentPage].subtitle}
        />

        <AnimatePresence mode="wait">
          <motion.section
            key={currentPage}
            className="page-shell"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {currentPage === 'dashboard' ? (
              <>
                <header id="overview" className="main-header card">
                  <p className="eyebrow">Cloud-Based Secure File Storage & Analytics</p>
                  <h1>☁️ Cloud Storage Dashboard</h1>
                  <p>
                    This system is deployed on cloud for scalability. We simulate big data analytics using file
                    metadata, and NoSQL is used to handle unstructured data efficiently.
                  </p>
                </header>
                <div id="kpi">
                  <KpiRibbon />
                </div>
              </>
            ) : null}

            {currentPage === 'upload' ? (
              <section className="single-page-grid" id="upload">
                <Upload />
              </section>
            ) : null}

            {currentPage === 'analytics' ? (
              <section className="analytics-page-grid" id="analytics">
                <Dashboard />
                <Charts />
              </section>
            ) : null}

            {currentPage === 'files' ? (
              <section className="single-page-grid" id="files">
                <FileList />
              </section>
            ) : null}
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
