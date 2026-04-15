import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

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

function FileList() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/files')
      .then(response => response.json())
      .then(setFiles)
      .finally(() => setLoading(false));
  }, []);

  const types = useMemo(() => {
    return [...new Set(files.map(file => String(file.type || 'unknown')))].sort((a, b) => a.localeCompare(b));
  }, [files]);

  const filteredFiles = useMemo(() => {
    const query = search.toLowerCase();
    const cloned = files.filter(file => {
      const name = String(file.filename || '').toLowerCase();
      const type = String(file.type || 'unknown');
      return (!query || name.includes(query)) && (typeFilter === 'all' || type === typeFilter);
    });

    return cloned.sort((a, b) => {
      const sizeA = Number(a.size) || 0;
      const sizeB = Number(b.size) || 0;
      const dateA = new Date(a.uploadTime || 0).getTime();
      const dateB = new Date(b.uploadTime || 0).getTime();

      switch (sortBy) {
        case 'size_asc':
          return sizeA - sizeB;
        case 'size_desc':
          return sizeB - sizeA;
        case 'date_asc':
          return dateA - dateB;
        case 'date_desc':
        default:
          return dateB - dateA;
      }
    });
  }, [files, search, typeFilter, sortBy]);

  const deleteFile = async id => {
    const response = await fetch(`/api/delete?id=${id}`, { method: 'DELETE' });

    if (!response.ok) {
      toast.error('Delete failed');
      return;
    }

    toast.success('File deleted');
    setTimeout(() => window.location.reload(), 280);
  };

  return (
    <div className="card">
      <h3 className="section-title">📁 Files</h3>
      <p className="muted-line">Manage, filter, and organize your uploaded file metadata.</p>

      <div className="toolbar">
        <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search files" />
        <select value={typeFilter} onChange={event => setTypeFilter(event.target.value)}>
          <option value="all">All types</option>
          {types.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
          <option value="date_desc">Newest</option>
          <option value="date_asc">Oldest</option>
          <option value="size_desc">Largest</option>
          <option value="size_asc">Smallest</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">
          <span className="spinner" />
          Loading files...
        </div>
      ) : filteredFiles.length ? (
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Size</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map(file => (
              <tr key={file.id} className="file-item">
                <td>{file.filename}</td>
                <td>{formatBytes(file.size)}</td>
                <td>{file.type || 'unknown'}</td>
                <td>
                  <button onClick={() => deleteFile(file.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
}

export default FileList;
