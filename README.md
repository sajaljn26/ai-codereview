# AI Code Review

A full‑stack project with a React (Vite) Frontend and an Express BackEnd that connects to Google GenAI to perform AI-assisted code review and explanation.

## Project Structure

```
ai-codereview/
├─ BackEnd/                # Express server
│  ├─ server.js            # Entry point (port 3000)
│  └─ src/
│     ├─ app.js
│     ├─ routes/
│     │  └─ ai.routes.js
│     ├─ controllers/
│     │  └─ ai.controller.js
│     └─ services/
│        └─ ai.service.js  # Uses @google/genai
├─ Frontend/               # React + Vite app
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ ...
│  └─ vite.config.js
└─ .gitignore
```

## Prerequisites

- Node.js 18+ and npm
- A Google Generative AI API key (for `@google/genai`)

## Setup

### 1) Clone and install

```bash
# clone
git clone <your-repo-url>.git
cd ai-codereview

# install root (if needed)
npm install

# install backend deps
cd BackEnd
npm install

# install frontend deps
cd ../Frontend
npm install
```

### 2) Environment variables

Create a `.env` file in `BackEnd/` with your API key and any other config. Example:

```bash
# BackEnd/.env
GOOGLE_GENAI_API_KEY=your_api_key_here
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

- `PORT` defaults to 3000 per `server.js` if not set.
- `CORS_ORIGIN` should match your Frontend dev server URL.

## Running the apps (development)

Open two terminals:

1) Backend (Express)
```bash
cd BackEnd
npm start # or: node server.js
```
- Starts on http://localhost:3000

2) Frontend (Vite + React)
```bash
cd Frontend
npm run dev
```
- Typically runs on http://localhost:5173

## Build & Production

- Frontend build:
```bash
cd Frontend
npm run build
```
- Output goes to `Frontend/dist/`.

- Backend can be deployed on any Node host. Ensure `BackEnd/.env` is set on the server and that the frontend points to the correct backend URL.

## Scripts Reference

- BackEnd `package.json` (add as needed):
  - `start`: start the server
- Frontend `package.json`:
  - `dev`: run Vite dev server
  - `build`: build for production
  - `preview`: preview production build
  - `lint`: run ESLint

## API Overview

Your backend likely exposes endpoints under `ai.routes.js` that call `ai.controller.js` and `ai.service.js` which uses `@google/genai`.
Common pattern:
- Request from Frontend → `ai.routes.js` → `ai.controller.js` → `ai.service.js` → Google GenAI → response back.

Adjust endpoint paths and request/response formats based on your implementation.

## Development Notes

- Keep secrets out of git; `.env` files are ignored by `.gitignore`.
- Update CORS in the backend to match your frontend origin.
- If you change ports, update both sides accordingly.

## License

MIT
