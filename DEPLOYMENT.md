# HealHub – Deployment Guide (Beginner-Friendly)

This guide walks you through deploying HealHub from zero to a live URL using **Render** (free tier) and **MongoDB Atlas** (free tier). No credit card needed.

---

## Overview

Your app has two parts:
| Part | What it does | Where it lives after deploy |
|------|-------------|---------------------------|
| **Server** (Node.js/Express) | API, database, authentication, sockets | Render Web Service |
| **Client** (React) | The UI users see in their browser | Built and served by the same Render service |
| **Database** (MongoDB) | Stores all data | MongoDB Atlas (cloud) |

---

## Step 1 — Push Your Code to GitHub

Render deploys from a Git repository.

### 1.1 Create a GitHub account (skip if you have one)
Go to https://github.com and sign up.

### 1.2 Create a new repository
1. Click the **"+"** icon (top-right) → **New repository**
2. Name it `healhub` (or anything you like)
3. Keep it **Private** (recommended, since it has server code)
4. Do NOT check "Add a README" (you already have files)
5. Click **Create repository**

### 1.3 Push your code
Open a terminal **inside your project folder** (`healhub`) and run:

```bash
git init
git add .
git commit -m "Initial commit - deployment ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/healhub.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

> **Tip:** Make sure your `.gitignore` excludes `node_modules/`, `.env`, and `uploads/`. It already does.

---

## Step 2 — Set Up MongoDB Atlas (Free Cloud Database)

### 2.1 Create an account
Go to https://www.mongodb.com/atlas and click **"Try Free"**.

### 2.2 Create a free cluster
1. After signing in, click **"Build a Database"**
2. Choose **M0 FREE** tier
3. Pick a cloud provider & region closest to you (e.g., AWS → Mumbai / US East)
4. Name the cluster (e.g., `Cluster0`) → Click **Create Deployment**

### 2.3 Create a database user
1. You'll be prompted to create a user
2. Choose a **username** (e.g., `healhubadmin`)
3. Choose a **password** — click "Autogenerate" for a strong one
4. **Copy the password somewhere safe** — you'll need it soon
5. Click **Create User**

### 2.4 Allow connections from anywhere
1. Under **"Where would you like to connect from?"**, choose **"My Local Environment"**
2. In the IP Access List, click **"Add Entry"**
3. Click **"Allow Access from Anywhere"** (this adds `0.0.0.0/0`)
4. Click **Add Entry** → **Finish and Close**

> This is needed because Render's IP addresses change. For better security later, you can restrict IPs.

### 2.5 Get your connection string
1. Click **"Connect"** on your cluster
2. Choose **"Drivers"**
3. Copy the connection string. It looks like:
   ```
   mongodb+srv://healhubadmin:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```
4. **Replace `<password>`** with your actual password
5. **Add the database name** before the `?`:
   ```
   mongodb+srv://healhubadmin:MyP%40ssword@cluster0.abc123.mongodb.net/healhub?retryWrites=true&w=majority
   ```
   > If your password has special characters like `@`, replace them with URL-encoded versions (`@` → `%40`).

**Save this full connection string — you'll paste it into Render in Step 3.**

---

## Step 3 — Deploy on Render (Free Hosting)

### 3.1 Create a Render account
Go to https://render.com and sign up (you can use your GitHub account).

### 3.2 Create a new Web Service
1. From Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub account if prompted
3. Find and select your `healhub` repository
4. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `healhub` (this becomes `healhub.onrender.com`) |
| **Region** | Pick one close to your MongoDB Atlas region |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && cd client && npm install && npm run build` |
| **Start Command** | `node server/index.js` |
| **Instance Type** | **Free** |

### 3.3 Add Environment Variables
Scroll down to **"Environment Variables"** and add these one by one:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | *(paste the connection string from Step 2.5)* |
| `JWT_SECRET` | *(click "Generate" or type a random 32+ character string)* |
| `JWT_REFRESH_SECRET` | *(click "Generate" or type a different random string)* |
| `FRONTEND_URL` | `https://healhub.onrender.com` |
| `GEMINI_API_KEY` | *(optional — only if you want AI features)* |

> **Important:** The `FRONTEND_URL` must match your Render URL exactly (no trailing slash). If you chose a different name in step 3.2, adjust accordingly.

### 3.4 Click "Create Web Service"
Render will now:
1. Clone your repo
2. Run `npm install` + build the React client
3. Start your Node.js server

**First deploy takes 5-10 minutes.** Watch the logs — when you see `HealHub server running on port XXXX` and `MongoDB Connected`, you're live!

### 3.5 Verify it works
Open `https://healhub.onrender.com` in your browser. You should see the login page.

You can also check the health endpoint: `https://healhub.onrender.com/api/health`

---

## Step 4 — Seed Initial Data (Optional)

If you want to populate the database with sample data (admin user, departments, etc.):

1. In Render Dashboard → your service → **"Shell"** tab
2. Run:
   ```bash
   node server/seed.js
   ```
   This creates default users you can log in with.

Alternatively, you can register a new user through the app.

---

## Step 5 — Get a Gemini API Key (Optional — for AI Features)

The AI Assistant and Report Analyzer use Google's Gemini API.

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key
5. In Render Dashboard → your service → **"Environment"** tab
6. Add: `GEMINI_API_KEY` = *(paste your key)*
7. The service will auto-redeploy

---

## Troubleshooting

### "Application Error" or blank page
- Check **Render Logs** (Dashboard → your service → "Logs" tab)
- Most common: wrong `MONGODB_URI` — double-check the password and database name

### "CORS error" in browser console
- Make sure `FRONTEND_URL` in Render env vars matches your exact URL (e.g., `https://healhub.onrender.com`, no trailing slash)

### App is slow / takes 30+ seconds to load
- **This is normal on Render's free tier.** Free services "spin down" after 15 min of inactivity. The first request after that takes ~30s to wake up.
- Upgrading to the $7/month plan removes this cold start.

### MongoDB connection error
- Verify Atlas IP Access List includes `0.0.0.0/0`
- Verify the connection string's password is correct and URL-encoded

### Build fails
- Check Render logs for the specific error
- Usually it's a missing npm package — the `render-build` script should handle this

---

## Updating Your App

After making changes locally:

```bash
git add .
git commit -m "describe your changes"
git push origin main
```

Render automatically detects the push and re-deploys. Takes 3-5 minutes.

---

## Project Structure Reminder

```
healhub/
├── client/          ← React frontend (built into client/build/ during deploy)
├── server/          ← Express API server
│   ├── index.js     ← Entry point
│   ├── config/      ← DB & socket config
│   ├── middleware/   ← Auth, upload middleware
│   ├── models/      ← Mongoose schemas
│   ├── routes/      ← API routes
│   └── utils/       ← Helpers (PDF, notifications, etc.)
├── uploads/         ← User-uploaded files (not persisted on Render free tier*)
├── .env.example     ← Template for environment variables
├── render.yaml      ← Render deployment config
└── package.json     ← Root scripts & server dependencies
```

> *Note: Render's free tier has an **ephemeral filesystem** — uploaded files (like profile pictures, lab reports) will be lost on each redeploy. For production use, switch to a cloud storage service like **Cloudinary** (free tier) or **AWS S3**.

---

## Quick Reference — All Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Secret for signing auth tokens |
| `JWT_REFRESH_SECRET` | Yes | Secret for refresh tokens |
| `FRONTEND_URL` | Yes | Your Render app URL (e.g., `https://healhub.onrender.com`) |
| `PORT` | No | Auto-set by Render |
| `GEMINI_API_KEY` | No | Google Gemini API key for AI features |

---

That's it! Your HealHub app should now be live at `https://healhub.onrender.com` 🎉
