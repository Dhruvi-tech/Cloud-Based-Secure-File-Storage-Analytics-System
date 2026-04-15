require('dotenv').config();

const express = require('express');
const path = require('path');

const uploadHandler = require('./api/upload');
const filesHandler = require('./api/files');
const deleteHandler = require('./api/delete');
const analyticsHandler = require('./api/analytics');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.all('/api/upload', (req, res) => uploadHandler(req, res));
app.all('/api/files', (req, res) => filesHandler(req, res));
app.all('/api/delete', (req, res) => deleteHandler(req, res));
app.all('/api/analytics', (req, res) => analyticsHandler(req, res));

const buildPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(buildPath));

app.use((_req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Local full-stack server running at http://localhost:${PORT}`);
});
