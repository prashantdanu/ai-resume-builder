# AI Resume Builder

A full-stack application that helps users build and enhance resumes using AI-powered suggestions and templates. This repository contains a React + Vite front-end (in `client/`) and an Express + Node.js back-end (in `server/`).

## Features

- User authentication (register / login)
- Build resumes using structured forms (education, experience, projects, skills, etc.)
- AI-powered content enhancement and suggestions (OpenAI integration)
- Export resumes as PDF and DOCX
- Multiple resume templates
- Secure API with rate limiting and basic security middleware

## Table of contents

- Prerequisites
- Environment variables
- Install
- Running (development)
- Building for production
- Project structure
- Useful scripts
- Contributing
- License

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud URI)
- An OpenAI API key (for AI features)

## Environment variables

Copy the example env files and fill in the values:

- Server: `server/env.example` -> create `server/.env`
	- PORT (default: 5000)
	- MONGODB_URI (e.g. mongodb://localhost:27017/ai-resume-builder)
	- JWT_SECRET
	- OPENAI_API_KEY
	- NODE_ENV (development | production)

- Client: `client/env.example` -> create `client/.env` or set environment variables for Vite
	- VITE_API_URL (default: http://localhost:5000/api)

## Install

From the project root, install server and client dependencies:

```powershell
cd server; npm install; cd ..; cd client; npm install; cd ..
```

## Running (development)

Start the server (with nodemon for automatic restarts):

```powershell
cd server
npm run dev
```

Start the client (Vite dev server):

```powershell
cd client
npm run dev
```

By default:
- Server: http://localhost:5000
- Client: http://localhost:5173 (Vite)

Health check endpoint: GET /api/health

## Building for production

Build the front-end and serve it with your preferred static host. The server is an API only; if you want to serve the built client from the same Express server, you'll need to add static serving middleware and copy the `dist` output into the server's public folder.

Client build:

```powershell
cd client
npm run build
```

Server start (production):

```powershell
cd server
npm start
```

## Project structure

Top-level folders:

- `client/` — React + Vite front-end
	- `src/` — React source code (components, pages, contexts, services, templates)
- `server/` — Express back-end
	- `routes/` — API route handlers (auth, resume, ai, templates)
	- `models/` — Mongoose models
	- `middleware/` — auth and other middleware
	- `utils/` — PDF/DOCX generators and helpers

## Useful scripts

- Root: none (run scripts per-folder)
- Server:
	- `npm run dev` — start server with nodemon
	- `npm start` — start server with node
- Client:
	- `npm run dev` — start Vite dev server
	- `npm run build` — build client for production
	- `npm run preview` — locally preview production build

## Contributing

Contributions are welcome. Please open issues or pull requests describing the change.

When contributing, run linting and the dev servers to ensure nothing is broken.

## License

This project is provided as-is. Add a license file if you want to specify terms.

---

If you'd like, I can also:

- Add a minimal `server/.env.example` -> `server/env.example` check to CI-like instructions
- Add a short developer checklist (seed DB, run migrations)

Next step: I'll mark the README creation todo as completed and verify the file was written.

