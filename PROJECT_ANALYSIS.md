# Source Review & Project Setup Notes

## What was in the supplied ZIP

The archive contained 14 source files under `src/`:

- `App.tsx`: application state, screen switching, registration/login, requests, conversations, messages, notifications, blocking and reporting.
- `components/`: 10 screens/layout components (`AppShell`, `AuthScreen`, `ChatView`, `Dashboard`, `Explore`, `Landing`, `Messages`, `Notifications`, `ProfileView`, `Requests`, `Settings`).
- `lib/seed.ts`: sample user profiles.
- `lib/storage.ts`: browser `localStorage` persistence.
- `types.ts`: shared data model.

The archive did not include a package manifest, Vite entry point/configuration, TypeScript configuration, global stylesheet, or the imported `components/ui/*` primitives. Those files have been added in this project.

## Application capabilities found in source

- Landing and register/login screens
- Profile cards and profile detail views
- Explore/discovery screen
- Incoming and outgoing chat requests
- Conversation list and chat view
- Notifications and read state
- Profile privacy and online visibility settings
- Block/unblock and report flows
- Demo reset
- Browser-local persistence

## Important implementation boundaries

This is a frontend prototype, not a complete production dating/social platform:

1. Registration and login are local-only. The seeded demo account password is `password`.
2. Password values are stored in browser local storage by the current data model. Never use this authentication approach for real users.
3. Messages and chat replies are simulated in the browser; there is no API, database, WebSocket service, or push notification server.
4. Reports are only recorded in local state; no moderation service receives them.
5. A new installation starts with seeded demo profiles. Existing browser data is stored under `vybora_state_v2`.

## Setup added

- Vite + React + TypeScript
- Tailwind CSS v4 via the Vite plugin
- `@` path alias for `src/`
- Reusable UI primitives required by the supplied components
- npm scripts for development, type-checking, build, and preview
- README, `.gitignore`, and `.env.example`

## Run locally

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run typecheck
npm run build
npm run preview
```

## Verification performed during packaging

- All supplied files were extracted and retained.
- All TypeScript/TSX source files passed a TypeScript transpilation syntax check (zero syntax diagnostics).
- A full dependency-backed typecheck/build could not be completed in this environment because `npm install` did not finish before the execution timeout. Run the commands above after dependencies install on your machine and resolve any environment-specific errors.
