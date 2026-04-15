# Cloud-Based Secure File Storage Analytics System

A clean, fast React dashboard for secure file metadata tracking and analytics, fully powered by browser localStorage.

## Live App

Production URL: https://cloud-based-secure-file-storage-analytics-system-dwxgqqi20.vercel.app/

## Why This Project

- Simple deployment on Vercel (no backend services required)
- Fast user experience with instant localStorage operations
- Clear dashboard analytics for file insights
- Great for demos, academic submissions, and portfolio showcase

## Core Features

- Upload file metadata (name, size, type, user, timestamp)
- View and search uploaded files
- Delete files instantly
- Analytics for:
	- total files
	- total storage
	- average file size
	- file type distribution
	- recent uploads

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React |
| Charts | Chart.js + react-chartjs-2 |
| UI Motion | Framer Motion |
| Notifications | react-hot-toast |
| Storage | Browser localStorage |
| Hosting | Vercel |

## Project Structure

```text
Cloud-Based-Secure-File-Storage-Analytics-System/
|- frontend/
|  |- public/
|  |- src/
|  |  |- components/
|  |  |- utils/
|  |  `- App.js
|  |- build/
|  `- package.json
|- package.json
|- vercel.json
`- README.md
```

## Local Setup

```bash
npm install
npm run start
```

Create a production build:

```bash
npm run build
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Deploy without any environment variables.

## Notes

- File data is saved in browser localStorage under the key `files`.
- Data is browser-specific and remains until storage is cleared.
- The data layer is implemented in `frontend/src/utils/filesStore.js`.
