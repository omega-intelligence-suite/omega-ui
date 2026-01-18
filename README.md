# 🌌 OMEGA-UI — The Sovereign Wealth Dashboard

OMEGA-UI is the visualization layer of the OMEGA Intelligence Suite. It is a modern, high-performance Next.js application designed to display the financial intelligence gathered by your local OMEGA-Core engine.

**Philosophy:**
- **Zero-Knowledge:** The UI pulls data from your private Supabase instance. We (the developers) see nothing.
- **Client-Side First:** Heavy use of React Server Components (RSC) for layout, but interactive data visualization happens on the client.
- **Aesthetic:** "Financial Terminal" meets "Deep Space". Dark mode only.

---

## ⚡️ Tech Stack & Dependencies

The project is built on a robust, modern stack designed for speed and maintainability.

### Core Framework
- **[Next.js 14 (App Router)](https://nextjs.org/)**: The React framework for the web.
- **[React 18](https://react.dev/)**: UI library.
- **[TypeScript](https://www.typescriptlang.org/)**: Type safety.

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework.
- **[Geist Font](https://vercel.com/font)**: The typeface for the next generation of developers (Sans & Mono).
- **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icons.
- **[Recharts](https://recharts.org/)**: Composable charting library for React.

### Data & State
- **[Supabase SSR](https://supabase.com/docs/guides/auth/server-side/nextjs)**: Server-side authentication and data fetching.
- **[Date-fns](https://date-fns.org/)**: Modern date utility library.

---

## 💻 Local Development Guide

Follow these steps to run the dashboard on your machine.

### Prerequisites
- Node.js 18+ installed.
- An active OMEGA-Cloud (Supabase) project.

### 1. Clone & Install
```bash
git clone https://github.com/omega-intelligence-suite/omega-ui.git
cd omega-ui
npm install
```

### 2. Configure Environment
Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials (found in your Project Settings > API):

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment Guide (Vercel)

OMEGA-UI is optimized for deployment on [Vercel](https://vercel.com), the creators of Next.js. It is free for personal use.

### Step 1: Push to GitHub
Ensure your code is pushed to your own GitHub repository (private or public).

### Step 2: Create Vercel Project
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your `omega-ui` repository.
3. In the **Configure Project** screen:
   - **Framework Preset**: Next.js (Auto-detected).
   - **Root Directory**: `omega-ui` (if it's in a monorepo) or leave empty if it's the root.

### Step 3: Environment Variables
Expand the **Environment Variables** section and add the same keys from your local setup:

| Key | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-ref.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` |

### Step 4: Deploy
Click **Deploy**. Vercel will build your application and assign it a live URL (e.g., `omega-ui.vercel.app`).

### Step 5: Update Supabase Auth
Once deployed, copy your new Vercel URL.
1. Go to your Supabase Dashboard > Authentication > URL Configuration.
2. Add your Vercel URL to **Site URL** and **Redirect URLs**.

---

## 🛡 Security Note
This UI is a "dumb terminal". It visualizes data but does not contain the logic to execute trades or move funds.
- **Read Access**: Granted via RLS policies for the authenticated user.
- **Write Access**: Limited to User Settings (e.g., changing your target net worth).
- **Core Logic**: All heavy lifting (scraping, API calls) is done by the **OMEGA-Core** running on your private hardware.
