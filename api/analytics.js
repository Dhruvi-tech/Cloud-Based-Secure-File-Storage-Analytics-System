const { connectDB } = require('./db');
const { buildAnalyticsSummary, normalizeFileRecord } = require('../utils/storage');

function methodNotAllowed(res, allowedMethods) {
  res.setHeader('Allow', allowedMethods);
  return res.status(405).json({ error: 'Method not allowed' });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return methodNotAllowed(res, 'GET');
  }

  try {
    const db = await connectDB();
    const filesCollection = db.collection('files');

    const files = await filesCollection
      .find({}, { projection: { filename: 1, size: 1, type: 1, uploadTime: 1, createdAt: 1 } })
      .toArray();

    const totalFiles = files.length;
    const summary = buildAnalyticsSummary(files);
    const avgSize = totalFiles ? summary.totalStorage / totalFiles : 0;
    const recent = files
      .slice()
      .sort((a, b) => new Date(b.uploadTime || b.createdAt || 0) - new Date(a.uploadTime || a.createdAt || 0))
      .slice(0, 5)
      .map(normalizeFileRecord);

    return res.status(200).json({
      totalFiles,
      totalStorage: summary.totalStorage,
      avgSize,
      fileTypes: summary.fileTypes,
      recent
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load analytics' });
  }
};
