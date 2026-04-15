# Cloud-Based Secure File Storage Analytics System

A Vercel-ready React project that stores file metadata in browser localStorage.

## Project Structure

```text
Cloud-Based-Secure-File-Storage-Analytics-System/
|- frontend/
|  |- public/
|  |- src/
|  |- build/
|  |- package.json
|- package.json
|- vercel.json
`- README.md
```

## Features

- Upload file metadata
- List uploaded files
- Delete files by generated file ID
- Analytics for total files, total storage, average file size, type distribution, and recent uploads
- React dashboard UI with charts

## Storage Model

- Data is stored in browser `localStorage` under the key `files`.
- No external database setup is required.
- Data stays in the user's browser until localStorage is cleared.

## Local Development

Build frontend:

```bash
npm run build
```

Run locally:

```bash
npm run start
```

React runs on the development server with localStorage-backed data.

## Vercel Deployment

1. Push repository to GitHub.
2. Import project into Vercel.
3. Deploy.

## Implementation Notes

- `frontend/src/utils/filesStore.js` provides upload/list/delete/analytics operations.
- Upload, Files, Dashboard, Charts, and KPI components all use localStorage directly.
