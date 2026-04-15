import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

function Upload() {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Select a file and upload metadata to MongoDB.');
  const fileInputRef = useRef(null);

  const uploadFile = async fileToUpload => {
    if (!fileToUpload) {
      setMessage('Please choose a file first.');
      toast.error('Please choose a file first');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: fileToUpload.name,
          size: fileToUpload.size,
          type: fileToUpload.type || 'unknown'
        })
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

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

  const handleDrop = async event => {
    event.preventDefault();
    setDrag(false);

    const droppedFile = event.dataTransfer?.files?.[0];
    if (!droppedFile) {
      return;
    }

    setFile(droppedFile);
    await uploadFile(droppedFile);
  };

  const handleFileChange = event => {
    const selected = event.target.files?.[0] || null;
    setFile(selected);
  };

  const handleManualUpload = async () => {
    await uploadFile(file);
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
