import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { uploadFileToStore } from '../utils/filesStore';

function Upload() {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Select a file and upload metadata to the system.');
  const fileInputRef = useRef(null);

  const uploadFile = fileToUpload => {
    if (!fileToUpload) {
      alert('No file selected');
      setMessage('Please choose a file first.');
      toast.error('Please choose a file first');
      return;
    }

    setLoading(true);

    try {
      const user = localStorage.getItem('user') || 'anonymous';
      uploadFileToStore(fileToUpload, user);

      setMessage(`Uploaded ${fileToUpload.name}.`);
      toast.success('File Uploaded 🚀');
      setTimeout(() => window.location.reload(), 450);
    } catch (error) {
      setMessage(error.message);
      toast.error(error.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = event => {
    event.preventDefault();
    setDrag(false);

    const droppedFile = event.dataTransfer?.files?.[0];
    if (!droppedFile) {
      return;
    }

    setFile(droppedFile);
    uploadFile(droppedFile);
  };

  const handleFileChange = event => {
    const selected = event.target.files?.[0] || null;
    setFile(selected);
  };

  const handleManualUpload = () => {
    uploadFile(file);
  };

  return (
    <div
      className={`card upload-drop-zone${drag ? ' drag-active' : ''}`}
      onDragOver={event => event.preventDefault()}
      onDragEnter={() => setDrag(true)}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
    >
      <h3 className="section-title">📤 Upload Metadata</h3>
      <p className="muted-line">Drag and drop a file here, or click below to choose one.</p>

      <div className="upload-row">
        <input ref={fileInputRef} type="file" onChange={handleFileChange} className="upload-input" />
        <button onClick={() => fileInputRef.current?.click()} disabled={loading}>
          Choose File
        </button>
        <button onClick={handleManualUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <p className="muted-line">{file ? `Selected: ${file.name}` : 'No file selected'}</p>

      {loading ? (
        <div className="loading">
          <span className="spinner" />
          Processing upload...
        </div>
      ) : null}

      <p className="status-line">{message}</p>
    </div>
  );
}

export default Upload;
