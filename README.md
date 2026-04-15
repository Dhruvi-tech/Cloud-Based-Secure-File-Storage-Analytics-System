# 🚀 Cloud-Based Secure File Storage Analytics System

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/version-1.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-MIT-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/deployment-vercel-black?style=for-the-badge" />
</p>

<p align="center">
  <b>⚡ Fast • Secure • Beautiful • Analytics Dashboard</b><br/>
  <i>Frontend-only system with real-time file insights</i>
</p>

## 🌐 Live Demo

Production URL: https://cloud-based-secure-file-storage-analytics-system-dwxgqqi20.vercel.app/

## ✨ Features That Make It Stand Out

- 🚀 **Zero Backend Required** (fully browser-based)
- ⚡ **Lightning Fast Performance** (instant localStorage operations)
- 📊 **Real-Time Analytics Dashboard** for file insights
- 🎯 **Perfect for Portfolio & College Submission**

## 🧩 Core Functionalities

### 📂 File System

- Upload file **metadata** (name, size, type, user, timestamp)
- Instant search
- Delete files in real-time

### 📊 Smart Analytics

- 📁 Total Files
- 💾 Storage Usage
- 📏 Average File Size
- 🧩 File Type Breakdown
- 🕒 Recent Activity

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React |
| Charts | Chart.js + react-chartjs-2 |
| Animation | Framer Motion |
| Alerts | react-hot-toast |
| Storage | Browser localStorage |
| Deployment | Vercel |

## ⚡ Project Structure

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

## ⚙️ Run Locally

```bash
npm install
npm run start
```

Create a production build:

```bash
npm run build
```

## 🚀 Deploy (Vercel)

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Deploy without any environment variables.

## 🧠 How It Works

- Data is stored in browser **localStorage** under the key `files`.
- The data layer is implemented in `frontend/src/utils/filesStore.js`.

## 🌟 Future Scope

- Authentication system
- Cloud storage integration
- Real file upload
- Mobile UI optimization
