# HealHub

A full-stack healthcare management platform for hospitals and clinics, built with React, Node.js, Express, MongoDB, and Socket.IO.

HealHub supports multiple roles ( admin, doctor, receptionist, and patient) and includes modules for appointments, queueing, telemedicine, medical records, diagnostics, billing, notifications, and AI-assisted workflows.

## Tech Stack

- Frontend: React 18, React Router, Axios, Chart.js
- Backend: Node.js, Express, Mongoose, JWT, Socket.IO
- Database: MongoDB (Atlas or local)
- File Handling: Multer (uploads)
- Deployment: Render (single service serving API + built React app)

## Key Features

- Role-based authentication and authorization
- Multi-role dashboards:
  - admin
  - Doctor
  - Receptionist
  - Patient
- Appointment booking and management
- Queue management and triage workflows
- Medical records and prescriptions
- Telemedicine module
- Lab and diagnostic workflows
- Pharmacy and support
- Notifications and realtime updates (Socket.IO)
- Analytics dashboards
- AI Assistant and Report Analyzer 

## Project Structure

```text
healhub/
├── client/                 # React frontend
├── server/                 # Express backend
│   ├── config/             # DB + socket setup
│   ├── middleware/         # Auth, uploads, etc.
│   ├── models/             # Mongoose models
│   ├── routes/             # API route modules
│   ├── utils/              # Utility modules
│   ├── index.js            # Server entry point
│   └── seed.js             # Database seed script
├── uploads/                # Uploaded files
├── DEPLOYMENT.md           # Step-by-step deployment guide
├── .env.example            # Environment variable template
└── package.json            # Root scripts and dependencies
```

## Getting Started (Local Development)

### 1. Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas account (recommended) or local MongoDB

### 2. Install Dependencies

From the project root:

```bash
npm run install:all
```

### 3. Configure Environment Variables

Create a local environment file:

Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Then update values in .env as needed.

Minimum required variables:

- NODE_ENV=development
- MONGODB_URI=your_mongodb_connection_string
- JWT_SECRET=your_secure_secret
- JWT_REFRESH_SECRET=your_secure_refresh_secret
- FRONTEND_URL=http://localhost:3000

Optional variables:

- GEMINI_API_KEY (for AI features)
- EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS (for email workflows)

### 4. (Optional) Seed Demo Data

```bash
npm run seed
```

This creates demo accounts and sample entities.

### 5. Run the App

Start backend + frontend together:

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/api/health

## Demo Credentials (After Seeding)

- Super Admin: admin@healhub.com / admin123
- Receptionist: receptionist@healhub.com / recep123
- Doctor: dr.rajesh@healhub.com / doctor123
- Doctor: dr.sneha@healhub.com / doctor123
- Patient: rahul@test.com / patient123
- Patient: anita@test.com / patient123

## Available Scripts

From project root:

- npm run server: Start backend in normal mode
- npm run server:dev: Start backend with nodemon
- npm run client: Start React frontend
- npm run client:build: Build frontend
- npm run dev: Run backend + frontend concurrently
- npm run seed: Seed database with sample data
- npm run render-build: Install deps + build client for Render
- npm start: Start backend (production)

From client folder:

- npm start
- npm run build
- npm test

## Deployment

A detailed beginner-friendly deployment guide is available in DEPLOYMENT.md.

Production setup in this project serves the built React app from the Express server in server/index.js.

## Notes

- CORS allowed origins are controlled by FRONTEND_URL (comma-separated values supported).
- Uploads are served from /uploads.
- On free hosting with ephemeral storage, uploaded files may not persist across restarts/redeployments.

## License

This project currently does not define a license. Add one if you plan to distribute it publicly.
