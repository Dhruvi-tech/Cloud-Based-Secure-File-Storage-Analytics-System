const { ObjectId } = require('mongodb');
const { connectDB } = require('./db');

function methodNotAllowed(res, allowedMethods) {
  res.setHeader('Allow', allowedMethods);
  return res.status(405).json({ error: 'Method not allowed' });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return methodNotAllowed(res, 'DELETE');
  }

  try {
    const { id } = req.query || {};

    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid file id' });
    }

    const db = await connectDB();
    const result = await db.collection('files').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    return res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete file' });
  }
};
