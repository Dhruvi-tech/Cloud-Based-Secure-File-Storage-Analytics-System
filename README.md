# 🚀 Cloud-Based Secure File Storage Analytics System

<p align="center">
  <img alt="build" src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge" />
  <img alt="version" src="https://img.shields.io/badge/version-1.0-blue?style=for-the-badge" />
  <img alt="license" src="https://img.shields.io/badge/license-MIT-purple?style=for-the-badge" />
  <img alt="deployment" src="https://img.shields.io/badge/deployment-vercel-black?style=for-the-badge" />
</p>

<p align="center">
  <b>⚡ Fast • Secure • Beautiful • Analytics Dashboard</b><br/>
  <i>Frontend-only system with real-time file insights</i>
</p>

<p align="center">
  <a href="https://cloud-based-secure-file-storage-analytics-system-dwxgqqi20.vercel.app/">🔗 Live Demo</a>
  ·
  <a href="#-run-locally">Run locally</a>
  ·
  <a href="#-tech-stack">Tech stack</a>
  ·
  <a href="#-future-scope">Future scope</a>
</p>

---

## 🌐 Live Demo

**Production URL:** https://cloud-based-secure-file-storage-analytics-system-dwxgqqi20.vercel.app/

---

## ✨ Features That Make It Stand Out

- 🚀 **Zero Backend Required** — fully browser-based
- ⚡ **Lightning Fast Performance** — instant localStorage operations
- 📊 **Real-Time Analytics Dashboard** — file insights at a glance
- 🎯 **Portfolio & College Submission Ready**

---

## 🧩 Core Functionalities

### 📂 File System

- Upload file **metadata** (name, size, type, user, timestamp)
- Instant search
- Delete files in real-time

### 📊 Smart Analytics

| Metric | Description |
| --- | --- |
| 📁 Total Files | Total number of files tracked |
| 💾 Storage Usage | Total storage used by metadata entries |
| 📏 Average File Size | Average size across all tracked files |
| 🧩 File Type Breakdown | Distribution by file type |
| 🕒 Recent Activity | Recent uploads at a glance |

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React |
| Charts | Chart.js + react-chartjs-2 |
| Animation | Framer Motion |
| Alerts | react-hot-toast |
| Storage | Browser localStorage |
| Deployment | Vercel |

---

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

---

## ⚙️ Run Locally

```bash
npm install
npm run start
```

Create a production build:

```bash
npm run build
```

---

## 🚀 Deploy (Vercel)

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Deploy without any environment variables.

---

## 🧠 How It Works

- Data is stored in browser **localStorage** under the key `files`.
- The data layer is implemented in `frontend/src/utils/filesStore.js`.

> **Note:** Data is browser-specific and remains until storage is cleared.

---

## 🌟 Future Scope

- Authentication system
- Cloud storage integration
- Real file upload
- Mobile UI optimization
