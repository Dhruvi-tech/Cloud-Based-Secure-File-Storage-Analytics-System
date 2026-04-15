const { connectDB } = require('./db');
const { safeNumber } = require('../utils/storage');

function parsePayload(body) {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch (_error) {
      return {};
    }
  }

  return body;
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { filename, size, type, user } = parsePayload(req.body);

    if (!filename) {
      return res.status(400).json({ message: 'No file data' });
    }

    const db = await connectDB();
    await db.collection('files').insertOne({
      filename: String(filename),
      size: safeNumber(size),
      type: type || 'unknown',
      user: user || 'anonymous',
      uploadTime: new Date()
    });

    return res.status(200).json({ message: 'Uploaded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
}

module.exports = handler;

module.exports.config = {
  api: {
    bodyParser: true
  }
};
