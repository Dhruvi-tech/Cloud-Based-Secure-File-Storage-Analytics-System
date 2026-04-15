# Cloud-Based Secure File Storage Analytics System

This repository now uses a Vercel-friendly split between a static frontend and serverless API routes backed by MongoDB.

## Structure

```text
Cloud-Based-Secure-File-Storage-Analytics-System/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   ├── Upload.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Charts.js
│   │   │   ├── FileList.js
│   │   │   └── Login.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── api/
│   ├── upload.js
│   ├── files.js
│   ├── delete.js
│   ├── analytics.js
│   └── db.js
├── utils/
│   └── storage.js
├── .env
├── package.json
├── vercel.json
└── README.md
```

## What it does

- Uploads file metadata to MongoDB.
- Lists stored files.
- Deletes files by MongoDB `_id`.
- Aggregates analytics for total files, total storage, and file type counts.

## Environment

Set this in `.env`:

```bash
MONGO_URI=your_mongodb_connection_string
```

Optional:

```bash
MONGO_DB_NAME=cloud_storage
```

## API routes

- `POST /api/upload`
- `GET /api/files`
- `DELETE /api/delete?id=<fileId>`
- `GET /api/analytics`

Analytics response includes:

- `totalFiles`
- `totalStorage`
- `avgSize`
- `fileTypes`
- `recent` (latest 5 uploads)

## Deployment

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Add `MONGO_URI` in the Vercel environment settings.
4. Deploy.

## Notes

- The frontend is a React dashboard with Chart.js under `frontend/src`.
- `api/db.js` caches the MongoDB client for serverless reuse.
- `api/delete.js` uses real `ObjectId` values, so deletions work correctly with MongoDB documents.
