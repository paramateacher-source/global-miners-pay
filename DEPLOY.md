# GlobalMinersPay — Vercel Deployment Guide

## What you need
- A free GitHub account (github.com)
- A free Vercel account (vercel.com)
- Your Telegram Bot Token: `8793674207:AAF6NtFmIOtRH_k5g7GCmeVpQGzN_ytsKyc`

---

## Step 1 — Upload to GitHub

1. Go to **github.com** and sign in (or create a free account)
2. Click the **+** button → **New repository**
3. Name it: `global-miners-pay`
4. Set to **Private**, click **Create repository**
5. Download this entire `vercel-deploy` folder as a ZIP
6. On GitHub, click **uploading an existing file**
7. Drag all files from the `vercel-deploy` folder into the upload area
8. Click **Commit changes**

---

## Step 2 — Deploy on Vercel

1. Go to **vercel.com** and sign in with GitHub
2. Click **Add New → Project**
3. Select your `global-miners-pay` repository
4. Vercel will auto-detect Vite — click **Deploy**
5. Wait ~2 minutes — your app is live!

Your app URL will be something like: `https://global-miners-pay.vercel.app`

---

## Step 3 — Add Environment Variables

In Vercel dashboard → Your project → **Settings → Environment Variables**:

Add these two variables:

| Name | Value |
|------|-------|
| `TELEGRAM_BOT_TOKEN` | `8793674207:AAF6NtFmIOtRH_k5g7GCmeVpQGzN_ytsKyc` |
| `APP_URL` | `https://your-app-name.vercel.app` (your actual Vercel URL) |

After adding them, click **Deployments → Redeploy** to apply.

---

## Step 4 — Set Telegram Webhook

1. Go to your live app: `https://your-app.vercel.app/gmp-admin-secure`
2. Login: `gramfreemigration@gmail.com` / `Ologibadge`
3. Click the **Bot** tab
4. Click **"Use Auto-detected URL"**
5. Click **"Set Webhook"**
6. You should see: ✅ Webhook set successfully!

---

## Step 5 — Test the Bot

1. Open Telegram and search for **@GlobalMinersPaybot**
2. Send `/start`
3. You should see the welcome message with the "Open GlobalMinersPay" button
4. Tap the button — your Mini App opens!

---

## Admin Panel

Always accessible at: `https://your-app.vercel.app/gmp-admin-secure`

- Email: `gramfreemigration@gmail.com`
- Password: `Ologibadge`

---

## Important Notes

- **Free forever** — Vercel Hobby plan never expires
- **Custom domain** — You can connect your own domain (e.g. globalminerspy.com) free in Vercel settings
- **Auto-redeploy** — Every time you push changes to GitHub, Vercel redeploys automatically
- **Data storage** — User data is stored in each user's browser (localStorage). No database costs.
