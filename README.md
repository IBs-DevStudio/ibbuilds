<div align="center">

# 🖥️ IB Dev Portfolio

**A developer portfolio that looks and feels like a macOS desktop.**
Draggable windows, a live dock, a working terminal, and an MDX blog.

[![Live](https://img.shields.io/badge/Live-ibnix.vercel.app-black?style=for-the-badge&logo=vercel)](https://ibnix.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-black?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-black?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-black?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-black)

![Preview](public/preview.gif)

</div>

## ✨ Features

- 🪟 **macOS-style desktop**: draggable, focus-aware windows with a dock and menu bar
- 💻 **Interactive terminal**: virtual filesystem with `ls`, `cat`, `cd`, `whoami`, `neofetch`, tab completion and history
- 📝 **MDX blog**: drop `.mdx` files into `/content/blog` and they show up automatically
- 🎨 **Themes**: four palettes driven by CSS variables, switchable from a desktop widget
- 📊 **Live widgets**: GitHub contributions heatmap, visitor counter, quotes, links, status
- 📱 **Mobile layout**: clean scrollable fallback on phones and small tablets
- ♿ **Reduced motion**: respects `prefers-reduced-motion` site-wide

## 🛠️ Tech stack

| Layer     | Choice                              |
| --------- | ----------------------------------- |
| Framework | Next.js 15 (App Router)             |
| UI        | React 19, TypeScript, Tailwind v4   |
| Animation | Framer Motion                       |
| Content   | MDX (`next-mdx-remote`)             |
| Data      | Upstash Redis (visitor counter)     |
| Hosting   | Vercel                              |

## 🚀 Run locally

```bash
git clone https://github.com/IBs-DevStudio/ibbuilds.git
cd ibbuilds
npm install
npm run dev
```

Open http://localhost:3000.

The visitor counter is optional. Copy `.env.example` to `.env` and add:

```
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## 🗂️ Customize

Everything editable lives in `/config` (identity, projects, experience, skills, themes, terminal output) and `/content/blog` (posts).

## 🤝 Connect

[![GitHub](https://img.shields.io/badge/GitHub-IBs--DevStudio-black?logo=github)](https://github.com/IBs-DevStudio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ikram%20Banadar-blue?logo=linkedin)](https://www.linkedin.com/in/ikrambanadarwebdev/)
[![X](https://img.shields.io/badge/X-@IkramBanadar-black?logo=x)](https://x.com/IkramBanadar)

## 🙏 Credits

Built on the MIT-licensed [portfolio-template](https://github.com/cb7chaitanya/portfolio-template) by cb7chaitanya.

## 📄 License

MIT