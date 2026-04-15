# Cloud-Based Secure File Storage Analytics System

A Vercel-ready React + Node serverless project for file metadata storage and analytics using MongoDB Atlas.

## Project Structure

```text
Cloud-Based-Secure-File-Storage-Analytics-System/
|- api/
|  |- analytics.js
|  |- db.js
|  |- delete.js
|  |- files.js
|  |- upload.js
|- frontend/
|  |- public/
|  |- src/
|  |- build/
|  |- package.json
|- local-dev-server.js
|- package.json
|- vercel.json
|- .env
`- README.md
```

## Features

- Upload file metadata
- List uploaded files
- Delete files by MongoDB ObjectId
- Analytics for total files, total storage, average file size, type distribution, and recent uploads
- React dashboard UI with charts

## MongoDB Setup

Install dependencies:

```bash
npm install
```

Root `.env` must include:

```bash
MONGO_URI=mongodb+srv://DHRUVI:YOUR_PASSWORD@cluster0.szqxr8b.mongodb.net/cloud_storage?retryWrites=true&w=majority
```

Rules:

- Do not keep angle brackets in the URI
- Use the real Atlas database user password
- Keep `/cloud_storage` in the URI path

Atlas checklist:

- Database user exists (`DHRUVI`)
- Network Access allows your environment (for testing, `0.0.0.0/0`)
- Cluster is running

## Local Development

Build frontend:

```bash
npm run build
```

Run full stack locally:

```bash
npm run start
```

Local server runs at `http://localhost:3000`.

## API Endpoints

- `POST /api/upload`
- `GET /api/files`
- `DELETE /api/delete?id=<fileId>`
- `GET /api/analytics`

## Vercel Deployment

1. Push repository to GitHub.
2. Import project into Vercel.
3. Add environment variable `MONGO_URI` in Vercel Project Settings.
4. Deploy.

## Implementation Notes

- `api/db.js` uses a cached MongoClient connection to avoid reconnect spam in serverless runtime.
- The backend currently connects to database name `cloud_storage`.
- `local-dev-server.js` loads `.env` using `dotenv` for local runs.
