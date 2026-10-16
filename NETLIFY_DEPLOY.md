# KhudGyan Gym — Netlify Deployment Guide

This project is configured and ready for deployment to **Netlify** with zero extra setup.

---

## 1. Quick Deploy via GitHub (Recommended)

1. Push this project to your GitHub repository.
2. Log in to [Netlify](https://app.netlify.com).
3. Click **"Add new site"** → **"Import an existing project"**.
4. Select **GitHub** and choose your repository.
5. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node.js version**: `20`
6. Click **"Deploy site"**.

---

## 2. Environment Variables on Netlify

In your Netlify site dashboard, navigate to:
**Site configuration** → **Environment variables** → **Add a variable**

Add the following variables:

| Key | Value | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://nukaujxoonylvqnpwwtv.supabase.co` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_555OSLuVF2HjHaeZOuXGNg_82_NtDsA` | Your Supabase publishable API key |

> **Note**: Even if you omit setting these environment variables, the application has built-in safe fallback defaults pointing to your project `nukaujxoonylvqnpwwtv`, so booking appointments will work immediately upon deployment.

---

## 3. Manual Drag & Drop Deploy (Alternative)

If you prefer deploying without connecting to Git:
1. Run `npm run build` in your terminal.
2. Log in to Netlify and go to the **Sites** tab.
3. Drag and drop the generated `dist` folder into the Netlify drop zone.
4. Your site will be live instantly with SSL and SPA routing configured.

---

## 4. Netlify Configuration Files Included

- `netlify.toml`: Sets build command, publish directory (`dist`), Node 20 runtime, security headers, immutable caching for Vite assets, and SPA rewrite rules.
- `public/_redirects`: Provides backup SPA redirection (`/*  /index.html  200`) so direct page reloads or deep links never return a 404 error.
