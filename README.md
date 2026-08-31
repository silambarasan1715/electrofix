# Electrofix

This repository contains the Electrofix web application. 

## Project Structure

The actual Vite application, backend server, and configurations are located inside the `electrofix/` subdirectory. 

## Vercel Deployment Instructions

Because the application is inside a subdirectory, Vercel requires you to configure the **Root Directory** setting for deployments to succeed.

If you see an error like `[UNRESOLVED_ENTRY] Cannot resolve entry module index.html`, it means Vercel is looking in the root folder instead of the `electrofix` folder.

**To fix this permanently in Vercel:**
1. Go to your project on the Vercel Dashboard.
2. Navigate to **Settings** > **General**.
3. Scroll down to **Root Directory**.
4. Click **Edit**, enter exactly `electrofix`, and save.
5. Vercel will now automatically detect the Vite Framework, use `npm run build`, and output to `dist`.

*Note: Moving the project files to the root directory was considered, but keeping the current structure is safer to prevent interrupting your active local development servers and avoiding Windows file-lock corruption.*
