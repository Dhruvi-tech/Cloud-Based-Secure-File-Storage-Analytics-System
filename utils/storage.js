function safeNumber(value) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) && numberValue >= 0 ? numberValue : 0;
}

function normalizeFileRecord(document) {
  return {
    id: document._id?.toString(),
    filename: document.filename || 'untitled-file',
    size: safeNumber(document.size),
    type: document.type || 'unknown',
    uploadTime: document.uploadTime || document.createdAt || null
  };
}

function buildAnalyticsSummary(files) {
  return files.reduce(
    (summary, file) => {
      summary.totalFiles += 1;
      summary.totalStorage += safeNumber(file.size);
      summary.fileTypes[file.type || 'unknown'] = (summary.fileTypes[file.type || 'unknown'] || 0) + 1;
      return summary;
    },
    {
      totalFiles: 0,
      totalStorage: 0,
      fileTypes: {}
    }
  );
}

module.exports = {
  buildAnalyticsSummary,
  normalizeFileRecord,
  safeNumber
};
