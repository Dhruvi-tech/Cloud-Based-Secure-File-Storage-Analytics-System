const { connectDB } = require('./db');
const { normalizeFileRecord } = require('../utils/storage');

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
    const files = await db.collection('files').find({}).sort({ uploadTime: -1, _id: -1 }).toArray();

    return res.status(200).json(files.map(normalizeFileRecord));
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch files' });
  }
};
