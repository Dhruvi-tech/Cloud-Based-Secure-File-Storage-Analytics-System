import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAnalytics } from '../utils/filesStore';

function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = Number(bytes) || 0;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
}

function Dashboard() {
  const [data, setData] = useState({
    totalFiles: 0,
    totalStorage: 0,
    avgSize: 0,
    fileTypes: {},
    recent: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setData(getAnalytics());
    } catch (_error) {
      setData({ totalFiles: 0, totalStorage: 0, avgSize: 0, fileTypes: {}, recent: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="card">
      <h3 className="section-title">📊 Analytics Overview</h3>
      {loading ? (
        <div className="loading">
          <span className="spinner" />
          Loading analytics...
        </div>
      ) : (
        <>
          <div className="grid">
            {[
              { title: '📁 Total Files', value: data.totalFiles || 0 },
              { title: '💾 Total Storage', value: formatBytes(data.totalStorage || 0) },
              { title: '📈 Average Size', value: formatBytes(data.avgSize || 0) },
              { title: '📊 File Types', value: Object.keys(data.fileTypes || {}).length }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="metric"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.4, ease: 'easeOut' }}
              >
                <span>{item.title}</span>
                <strong>{item.value}</strong>
              </motion.div>
            ))}
          </div>

          <div className="recent-list">
            <h4>Recent Uploads</h4>
            {(data.recent || []).length ? (
              <ul>
                {(data.recent || []).map(file => (
                  <li key={file.id || file._id}>{file.filename}</li>
                ))}
              </ul>
            ) : (
              <p>No recent uploads.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
