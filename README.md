# VYBORA — Social Networking & Chat App

A React + TypeScript social networking UI prototype with profiles, discovery, connection requests, messaging, notifications, privacy settings, and browser-local demo persistence.

## Requirements

- Node.js 20.19+ or 22.12+
- npm 10+

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run typecheck` | Check TypeScript |
| `npm run build` | Type-check and create production build |
| `npm run preview` | Preview the production build |

## Demo behavior

- Demo profiles are created by `src/lib/seed.ts`.
- Demo login password for seeded profiles is `password`.
- State is saved in the browser's `localStorage` (`vybora_state_v2`).
- Chat replies are simulated in the frontend; no real-time server or external messaging is connected.
- Authentication is demo-only. Passwords are stored in browser local storage, so this is **not production-ready authentication**.

## Project structure

```text
src/
  components/       App screens and reusable UI components
    ui/             Button, card, input, checkbox, switch, toast, etc.
  lib/              Seed data, local storage, utility helpers
  App.tsx           App state and screen routing
  index.css         Tailwind and global styles
  main.tsx          React entry point
  types.ts          Shared TypeScript types
public/             Static public assets
```

## Production checklist

Before launching publicly, add a backend API, secure server-side authentication and password hashing, database persistence, real messaging, authorization checks, input validation, rate limiting, moderation/report workflows, privacy policy, and age-appropriate safety controls. Do not use the local demo authentication for real accounts.
