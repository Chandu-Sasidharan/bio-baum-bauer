# Bio Baum Bauer Webapp

A dockerized, production-ready web experience for Bio Baum Bauer that pairs a marketing/e-commerce React frontend with a Node.js/Express API, MongoDB-backed persistence, Stripe-powered checkout, and an AdminJS dashboard for on-site content management. The repository is structured as a lightweight monorepo so shared tooling (linting, Husky hooks, Docker Compose orchestration) can live at the root while each service keeps its own package.json.

## Highlights

- **Modern storefront** – Vite + React 18 + Tailwind CSS, React Router 6, TanStack Query, Stripe Elements, react-hook-form, and DaisyUI build the interactive customer experience.
- **Robust backend** – Express routes, MongoDB models, Zod validations, AdminJS UI, email (Resend) + media storage (AWS S3) helpers, and Stripe webhooks cover the operational needs.
- **Docker-first workflow** – Local containers (dev) and multi-stage production images (served via Caddy in front) make it easy to keep parity between environments.
- **Continuous deployment** – GitHub Actions build tagged images, push to GHCR, and redeploy the remote droplet using `docker-compose.prod.yml`.
- **Strict tooling** – ESLint flat config, Prettier + Tailwind plugin, Husky + lint-staged keep code quality consistent across frontend and backend sources.

## Repository Layout

```
bio-baum-bauer/
├── backend/                # Express API, AdminJS bundle, migrations, utility scripts
├── frontend/               # Vite React app, Tailwind + DaisyUI styling, Stripe checkout
├── docker-compose*.yml     # Service orchestration for dev & prod
├── eslint.config.js        # Flat config that lints backend sources
├── architecture.txt        # High-level directory guide
├── trees.example.txt       # Sample content taxonomy for seeding/reference
└── README.md               # (this file)
```

Each service also ships its own README stub plus `Dockerfile` + `Dockerfile.prod` for local vs production builds.

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

Maintain separate `.env.prod` files when deploying with `docker-compose.prod.yml`—the production compose file mounts those explicitly. In production the frontend’s Stripe publishable key is injected at build time via the `VITE_STRIPE_PUBLIC_KEY` Docker build arg (wired up in `.github/workflows/build-push-deploy.yml`), so you don’t need to keep it in `frontend/.env.prod` unless you are building images manually on the server.

## Quick Start (Docker Compose)

1. **Install root tooling** (optional but recommended for Husky/lint scripts):
   ```bash
   npm install
   ```
2. **Copy env files** inside `frontend/` and `backend/` (`cp .env.example .env`) and provide real credentials.
3. **Build and start both services**:
   ```bash
   npm run start:dev
   # or: docker compose up -d --build
   ```
4. Navigate to `http://localhost:3000` for the storefront and `http://localhost:4000/admin` for AdminJS.
5. When you are done, stop and clean containers/images/volumes with:
   ```bash
   npm run stop:dev
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

`npm run build` emits static assets to `dist/` which the production Dockerfile serves with Caddy.

## Database, Migrations & Admin

- **Migrations** – The backend uses [migrate-mongo](https://github.com/seppevs/migrate-mongo). Set `MONGODB_URI`/`MONGO_DB_NAME`, then run `npm run migrate` inside `backend/`.
- **Modify scripts** – `backend/scripts/modify-db.js` shows how to run targeted maintenance tasks (connect, execute logic, disconnect). Use as a template for other one-off scripts.
- **AdminJS** – Admin resources live under `backend/src/admin`. `npm run bundle:admin` bundles the AdminJS frontend; the production Docker build runs it automatically. In dev mode AdminJS watches for changes and rebuilds in memory.

## Tooling & Useful Scripts

| Location | Script                              | Description                                                                  |
| -------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| Root     | `npm run start:dev` / `stop:dev`    | Wrap `docker compose up/down` for local containers.                          |
| Root     | `npm run start:prod` / `stop:prod`  | Use the production compose file and GHCR images to mimic deployment locally. |
| Backend  | `npm run dev` / `start`             | Start Express in watch mode or production mode.                              |
| Backend  | `npm run bundle:admin`              | Builds AdminJS assets (also run during Docker production builds).            |
| Backend  | `npm run migrate`                   | Apply pending Migrate-Mongo migrations.                                      |
| Frontend | `npm run dev` / `build` / `preview` | Standard Vite lifecycle commands.                                            |
| Frontend | `npm run lint`                      | ESLint with React and React Hooks plugins.                                   |

Linting is enforced through Husky’s pre-commit hook (`.husky/pre-commit`) which leverages `lint-staged` to format/lint backend sources. Frontend linting can be added to the config if desired.

## Testing

There are currently no automated tests (`npm test` is a placeholder in the root).

## Deployment Pipeline

`.github/workflows/build-push-deploy.yml` performs the following whenever `main` is updated:

1. Build frontend and backend production images using the respective `Dockerfile.prod` files.
2. Push tagged images (`latest` + commit SHA) to GitHub Container Registry under `ghcr.io/<owner>/bio-baum-bauer-(frontend|backend)`.
3. SSH into the target droplet, pull the new images, and restart the services with `docker-compose.prod.yml`.

To deploy manually outside CI, log in to GHCR, pull the images referenced in `docker-compose.prod.yml`, and run `docker compose -f docker-compose.prod.yml up -d` on your server.

## Additional Resources

- `architecture.txt` for a terse directory walkthrough.
- `trees.example.txt` as a content taxonomy reference when seeding data.
- `frontend/public/` for shared media (fonts, images) referenced by the marketing pages.
