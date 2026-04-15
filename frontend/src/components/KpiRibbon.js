import React, { useEffect, useState } from 'react';

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

function trendInfo(current, previous) {
  const delta = Number(current) - Number(previous);

  if (delta > 0) {
    return { arrow: '↗', className: 'trend up', delta };
  }

  if (delta < 0) {
    return { arrow: '↘', className: 'trend down', delta };
  }

  return { arrow: '→', className: 'trend flat', delta: 0 };
}

function formatDelta(value, asBytes = false) {
  if (value === 0) {
    return asBytes ? '0 B' : '0';
  }

  if (asBytes) {
    const sign = value > 0 ? '+' : '-';
    return `${sign}${formatBytes(Math.abs(value))}`;
  }

  return `${value > 0 ? '+' : ''}${value}`;
}

function KpiRibbon() {
  const [kpis, setKpis] = useState({
    totalFiles: 0,
    totalStorage: 0,
    avgSize: 0,
    typeCount: 0
  });
  const [trend, setTrend] = useState({
    files: { arrow: '→', className: 'trend flat', delta: 0 },
    storage: { arrow: '→', className: 'trend flat', delta: 0 },
    avg: { arrow: '→', className: 'trend flat', delta: 0 },
    types: { arrow: '→', className: 'trend flat', delta: 0 }
  });

  useEffect(() => {
    fetch('/api/analytics')
      .then(response => response.json())
      .then(payload => {
        const current = {
          totalFiles: Number(payload.totalFiles) || 0,
          totalStorage: Number(payload.totalStorage) || 0,
          avgSize: Number(payload.avgSize) || 0,
          typeCount: Object.keys(payload.fileTypes || {}).length
        };

        const previousRaw = localStorage.getItem('kpi-snapshot-v1');
        const previous = previousRaw ? JSON.parse(previousRaw) : current;

        setKpis(current);
        setTrend({
          files: trendInfo(current.totalFiles, previous.totalFiles),
          storage: trendInfo(current.totalStorage, previous.totalStorage),
          avg: trendInfo(current.avgSize, previous.avgSize),
          types: trendInfo(current.typeCount, previous.typeCount)
        });

        localStorage.setItem('kpi-snapshot-v1', JSON.stringify(current));
      })
      .catch(() => {
        // Keep defaults when analytics is unavailable.
      });
  }, []);

  return (
    <section className="kpi-ribbon card">
      <div className="kpi-item">
        <span>Files</span>
        <strong>{kpis.totalFiles}</strong>
        <small className={trend.files.className}>
          {trend.files.arrow} {formatDelta(trend.files.delta)}
        </small>
      </div>

      <div className="kpi-item">
        <span>Storage</span>
        <strong>{formatBytes(kpis.totalStorage)}</strong>
        <small className={trend.storage.className}>
          {trend.storage.arrow} {formatDelta(trend.storage.delta, true)}
        </small>
      </div>

      <div className="kpi-item">
        <span>Avg Size</span>
        <strong>{formatBytes(kpis.avgSize)}</strong>
        <small className={trend.avg.className}>
          {trend.avg.arrow} {formatDelta(trend.avg.delta, true)}
        </small>
      </div>

      <div className="kpi-item">
        <span>Types</span>
        <strong>{kpis.typeCount}</strong>
        <small className={trend.types.className}>
          {trend.types.arrow} {formatDelta(trend.types.delta)}
        </small>
      </div>
    </section>
  );
}

export default KpiRibbon;
