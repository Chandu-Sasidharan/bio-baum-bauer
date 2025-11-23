# Bio Baum Bauer Webapp

A dockerized, production-ready web experience for Bio Baum Bauer that pairs a marketing/e-commerce React frontend with a Node.js/Express API, MongoDB-backed persistence, Stripe-powered checkout, and an AdminJS dashboard for on-site content management. The repository is structured as a lightweight monorepo so shared tooling (linting, Husky hooks, Docker Compose orchestration) can live at the root while each service keeps its own package.json.

## Highlights

- **Modern storefront** – Vite + React 18 + Tailwind CSS, React Router 6, TanStack Query, Stripe Elements, react-hook-form, and DaisyUI build the interactive customer experience.
- **Robust backend** – Express routes, MongoDB models, Zod validations, AdminJS UI, email (Resend) + media storage (AWS S3) helpers, and Stripe webhooks cover the operational needs.
- **Docker-first workflow** – Local containers (dev) and multi-stage production images (nginx for frontend, slim Node for backend) keep parity between environments.
- **Split deployments** – Dedicated GitHub Actions workflows for stage/prod build the images, push to GHCR with environment-specific tags, and redeploy the respective droplet via their compose files.
- **Strict tooling** – ESLint flat config, Prettier + Tailwind plugin, Husky + lint-staged keep code quality consistent across frontend and backend sources.

## Repository Layout

```
bio-baum-bauer/
├── backend/                # Express API, AdminJS bundle, migrations, utility scripts
├── frontend/               # Vite React app, Tailwind + DaisyUI styling, Stripe checkout
├── docker-compose.yml      # Local dev (builds from source)
├── docker-compose.stage.yml# Staging deploy (GHCR :staging images + backend env file)
├── docker-compose.prod.yml # Production deploy (GHCR :latest images + backend env file)
├── eslint.config.js        # Flat config that lints backend sources
├── architecture.txt        # High-level directory guide
├── trees.example.txt       # Sample content taxonomy for seeding/reference
└── README.md               # (this file)
```

Each service also ships its own README stub plus `Dockerfile` (local dev) and `Dockerfile.deploy` (deployment) for production/staging builds.

## Prerequisites

- **Node.js 22.x** and **npm 10+** (required for running scripts or developing outside Docker).
- **Docker Desktop** (or Docker Engine + Compose v2) for the recommended workflow.
- **MongoDB** instance reachable from the backend container.
- Accounts/keys for **Stripe**, **Resend**, and **AWS S3** (or compatible storage) if you plan to exercise payments, transactional email, or media uploads locally.

## Environment Variables

Copy the provided `.env.example` files inside `frontend/` and `backend/`, then fill in the values that apply to the environment you are running. The most important keys are listed below:

| Service  | Key                                                  | Purpose                                                             |
| -------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| Backend  | `PORT`                                               | Port the Express API listens on (defaults to 4000).                 |
| Backend  | `FRONTEND_URL`                                       | Public-facing URL used for CORS + email templates.                  |
| Backend  | `MONGODB_URI`, `MONGO_DB_NAME`                       | Mongo connection string and optional db override for Migrate-Mongo. |
| Backend  | `JWT_SECRET_KEY`, `SUPER_PASSWORD`, `ADMIN_PASSWORD` | Auth, super-admin, and initial admin credentials.                   |
| Backend  | `RESEND_API_KEY`                                     | Transactional emails.                                               |
| Backend  | `STRIPE_API_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`     | Stripe server secret + webhook signature validation.                |
| Backend  | `AWS_*` keys, `AWS_S3_PUBLIC_BASE_URL`               | Media upload destinations for AdminJS forms.                        |
| Frontend | `VITE_API_BASE_URL`                                  | Base URL for the axios client.                                      |
| Frontend | `VITE_FRONTEND_URL`                                  | Used in Stripe redirect URLs and SEO tags.                          |
| Frontend | `VITE_STRIPE_PUBLIC_KEY`                             | Publishable key injected into Stripe Elements.                      |

Maintain dedicated `backend/.env.stage` and `backend/.env.prod` files for the staging/production compose files. In production/staging the frontend envs are injected at build time via the `VITE_STRIPE_PUBLIC_KEY`, `VITE_FRONTEND_URL`, and `VITE_API_BASE_URL` Docker build args (wired up in the GitHub Actions workflows), so you don’t need to keep those values in `frontend/.env.*` unless you are building images manually on the server.

## Environments

- **Development (local)** – `docker-compose.yml` builds from local sources, mounts the repo for hot reload, and uses `frontend/.env` + `backend/.env`. Ports: frontend `3000`, backend `4000`.
- **Staging** – `docker-compose.stage.yml` pulls GHCR images tagged `:staging` for both services, loads backend config from `backend/.env.stage`, and joins the external `edge_net` network. Frontend env is baked in at image build via CI secrets.
- **Production** – `docker-compose.prod.yml` pulls GHCR images tagged `:latest`, loads backend config from `backend/.env.prod`, and also uses the shared `edge_net` network.

To mimic stage/prod locally you can `docker login ghcr.io` and run the relevant compose file (after creating the `edge_net` network with `docker network create edge_net || true` and adding the correct backend env file). No frontend env file is needed for those images because their values are compiled at build time.

## Quick Start (Docker Compose)

1. **Install root tooling** (optional but recommended for Husky/lint scripts):
   ```bash
   npm install
   ```
2. **Copy env files** inside `frontend/` and `backend/` (`cp .env.example .env`) and provide real credentials.
3. **Build and start both services**:
   ```bash
   npm run start
   # or: docker compose up -d --build
   ```
4. Navigate to `http://localhost:3000` for the storefront and `http://localhost:4000/admin` for AdminJS.
5. When you are done, stop and clean containers/images/volumes with:
   ```bash
   npm run stop
   ```

The dev compose file mounts the local source folders into the containers, so Vite and the backend pick up filesystem changes instantly without manual rebuilds.

## Running Without Docker

If you prefer to run the apps directly on your machine:

### Backend (Express API)

```bash
cd backend
npm ci
cp .env.example .env   # fill secrets
npm run dev            # uses node --watch
```

The backend expects MongoDB to be reachable via `MONGODB_URI`. Production mode runs `npm run start`, which respects `NODE_ENV=production` and bundles AdminJS assets beforehand via `npm run bundle:admin`.

### Frontend (Vite + React)

```bash
cd frontend
npm ci
cp .env.example .env
npm run dev            # starts Vite on :3000
```

`npm run build` emits static assets to `dist/` which the production Dockerfile serves with nginx.

## Database, Migrations & Admin

- **Migrations** – The backend uses [migrate-mongo](https://github.com/seppevs/migrate-mongo). Set `MONGODB_URI`/`MONGO_DB_NAME`, then run `npm run migrate` inside `backend/`.
- **Modify scripts** – `backend/scripts/modify-db.js` shows how to run targeted maintenance tasks (connect, execute logic, disconnect). Use as a template for other one-off scripts.
- **AdminJS** – Admin resources live under `backend/src/admin`. `npm run bundle:admin` bundles the AdminJS frontend; the production Docker build runs it automatically. In dev mode AdminJS watches for changes and rebuilds in memory.

## Tooling & Useful Scripts

| Location | Script                              | Description                                                                  |
| -------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| Root     | `npm run start` / `stop`            | Wrap `docker compose up/down` for local dev containers.                      |
| Root     | `npm test`                          | Runs backend + frontend test suites.                                         |
| Backend  | `npm run dev` / `start`             | Start Express in watch mode or production mode.                              |
| Backend  | `npm run bundle:admin`              | Builds AdminJS assets (also run during Docker production builds).            |
| Backend  | `npm run migrate`                   | Apply pending Migrate-Mongo migrations.                                      |
| Frontend | `npm run dev` / `build` / `preview` | Standard Vite lifecycle commands.                                            |
| Frontend | `npm run lint`                      | ESLint with React and React Hooks plugins.                                   |

Linting is enforced through Husky’s pre-commit hook (`.husky/pre-commit`) which leverages `lint-staged` to format/lint backend sources. Frontend linting can be added to the config if desired.

## Deployment Pipeline

- **Stage** – `.github/workflows/build-push-deploy-stage.yml` runs on the `stage` branch. It executes backend/frontend tests, builds images with the `:staging` tag (and a `staging-<sha>` tag), injects staging frontend env via build args, pushes to GHCR, then SSHes to the staging droplet. The remote step logs into GHCR, pulls with `docker-compose.stage.yml`, ensures `edge_net` exists, and restarts containers using `backend/.env.stage`.
- **Prod** – `.github/workflows/build-push-deploy-prod.yml` runs on the `prod` branch. It mirrors the staging flow but tags images as `:latest` (and `<sha>`), uses production build args for the frontend, and redeploys on the production droplet with `docker-compose.prod.yml` and `backend/.env.prod`.

To deploy manually outside CI, log in to GHCR, pull the images referenced in the relevant compose file, and run `docker compose -f docker-compose.stage.yml up -d` (or `docker-compose.prod.yml up -d`) on your server. Ensure the backend env file for that environment is present and `edge_net` exists (`docker network create edge_net || true`).

## Additional Resources

- `architecture.txt` for a terse directory walkthrough.
- `trees.example.txt` as a content taxonomy reference when seeding data.
- `frontend/public/` for shared media (fonts, images) referenced by the marketing pages.
