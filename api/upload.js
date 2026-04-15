const { connectDB } = require('./db');
const { safeNumber } = require('../utils/storage');

function methodNotAllowed(res, allowedMethods) {
  res.setHeader('Allow', allowedMethods);
  return res.status(405).json({ error: 'Method not allowed' });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, 'POST');
  }

  try {
    const { filename, size, type } = req.body || {};

    if (!filename) {
      return res.status(400).json({ error: 'filename is required' });
    }

    const db = await connectDB();
    const result = await db.collection('files').insertOne({
      filename: String(filename),
      size: safeNumber(size),
      type: type || 'unknown',
      uploadTime: new Date()
    });

    return res.status(201).json({
      message: 'File uploaded',
      fileId: result.insertedId.toString()
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to upload file' });
  }
};
