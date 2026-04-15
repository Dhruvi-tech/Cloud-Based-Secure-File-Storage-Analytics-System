const FILES_KEY = 'files';

function readFiles() {
  try {
    const raw = localStorage.getItem(FILES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function writeFiles(files) {
  localStorage.setItem(FILES_KEY, JSON.stringify(files));
}

export function getFiles() {
  return readFiles().slice().sort((a, b) => new Date(b.uploadTime || 0) - new Date(a.uploadTime || 0));
}

export function uploadFileToStore(file, user) {
  const newFile = {
    id: Date.now(),
    filename: file.name,
    size: Number(file.size) || 0,
    type: file.type || 'unknown',
    user: user || 'anonymous',
    uploadTime: new Date().toISOString()
  };

  const files = readFiles();
  files.push(newFile);
  writeFiles(files);
  return newFile;
}

export function deleteFileFromStore(id) {
  const files = readFiles();
  const nextFiles = files.filter(file => String(file.id) !== String(id));
  writeFiles(nextFiles);
  return nextFiles.length !== files.length;
}

export function getAnalytics() {
  const files = getFiles();
  const totalFiles = files.length;
  const totalStorage = files.reduce((sum, file) => sum + (Number(file.size) || 0), 0);
  const fileTypes = {};

  files.forEach(file => {
    const type = file.type || 'unknown';
    fileTypes[type] = (fileTypes[type] || 0) + 1;
  });

  return {
    totalFiles,
    totalStorage,
    avgSize: totalFiles ? totalStorage / totalFiles : 0,
    fileTypes,
    recent: files.slice(0, 5)
  };
}
