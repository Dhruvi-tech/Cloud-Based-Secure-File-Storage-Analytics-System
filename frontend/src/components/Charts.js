import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Charts() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(response => response.json())
      .then(data => {
        const labels = Object.keys(data.fileTypes || {});
        const values = Object.values(data.fileTypes || {});

        setChartData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#14b8a6'],
              borderColor: '#0f172a',
              borderWidth: 2
            }
          ]
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <h3>📈 File Type Distribution</h3>
      {loading ? (
        <div className="loading">
          <span className="spinner" />
          Loading chart...
        </div>
      ) : chartData && chartData.labels.length ? (
        <div className="chart-wrap">
          <Pie data={chartData} />
        </div>
      ) : (
        <p>No chart data available yet.</p>
      )}
    </motion.div>
  );
}

export default Charts;
