# Portfolio

Personal portfolio website for **Hanuman Rajpurohit** — a full-stack developer focused on web applications, UI design, and accessibility.

**Live Site**: [hanumanrajpurohit.netlify.app](https://hanumanrajpurohit.netlify.app)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Remix](https://remix.run/) with Vite |
| 3D Graphics | [Three.js](https://threejs.org/) + [Draco](https://github.com/google/draco) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Styling | Vanilla CSS with CSS Custom Properties |
| Content | MDX for blog articles |
| Component Docs | [Storybook](https://storybook.js.org/) |
| Deployment | Cloudflare Pages, Vercel |
| Email | [EmailJS](https://www.emailjs.com/) |

## Features

- **Dark/Light Theme** — System preference detection with manual toggle
- **Project Showcase** — 5 featured projects with 3D device mockups
- **Contact Form** — EmailJS integration with bot protection
- **Blog** — MDX-powered articles on web development
- **Skills & Certificates** — Professional development showcase
- **Hackathon Participation** — Competition highlights
- **Accessible** — Semantic HTML, skip links, ARIA attributes
- **Performance** — Optimized assets, lazy loading, IntersectionObserver

## Projects Featured

1. **Bugatti** — Luxury automotive website clone
2. **Epic Games Store** — Mobile app clone with game browsing
3. **Binance** — Cryptocurrency exchange UI clone
4. **Gemini** — Crypto trading platform clone
5. **Walmart** — E-commerce website clone

## Scripts

```bash
# Development
npm run dev           # Start Remix dev server

# Production
npm run build         # Build for production
npm run start         # Preview production build

# Deployment
npm run deploy        # Build and deploy to Cloudflare Pages
npm run deploy:vercel # Deploy to Vercel (requires Vercel CLI)

# Storybook
npm run dev:storybook   # Start Storybook dev server
npm run build:storybook # Build Storybook
npm run deploy:storybook # Deploy Storybook to Cloudflare Pages
```

## Project Structure

```
app/
├── assets/           # Fonts, videos, images
├── components/       # Reusable UI components
│   ├── button/
│   ├── footer/
│   ├── heading/
│   ├── loader/
│   ├── model/        # 3D device mockup
│   └── ...
├── hooks/            # Custom React hooks
├── layouts/          # Page layouts (Navbar, Error)
├── routes/           # Remix routes + MDX articles
│   ├── home/         # Home page components
│   ├── articles/     # Blog posts
│   └── contact/     # Contact page
└── utils/            # Helper functions
```

## Environment Variables

Copy `.dev.vars.example` to `.dev.vars` and configure:

```env
SESSION_SECRET=your-secret-key
```

## Development

Requires **Node.js >=19.9.0**

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173`

## Deploy To Vercel

1. Import this repository in Vercel.
2. Keep default Framework preset as `Remix`.
3. Build command: `npm run build`.
4. Deploy.

This project includes `vercel.json` so Vercel can pick the correct Remix setup automatically.

## License

MIT
