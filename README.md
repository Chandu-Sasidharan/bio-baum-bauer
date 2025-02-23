# Bio Baum Bauer Webapp

Welcome to the Bio Baum Bauer website repository! This project is a Docker-based, full-stack web application. It includes a modern React frontend (built with Vite and Tailwind CSS) and a Node.js/Express backend for business logic and MongoDB data persistence.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Setup & Installation](#setup--installation)
4. [Development Workflow](#development-workflow)
5. [Testing](#testing)
6. [Contributing](#contributing)

## Project Overview

- **Frontend**: A modern React application bundled with [Vite](https://vitejs.dev/) and styled using [Tailwind CSS](https://tailwindcss.com/).
- **Backend**: A [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) RESTful API connecting to MongoDB via [Mongoose](https://mongoosejs.com/).
- **Docker Integration**: Both frontend and backend are containerized via Docker and orchestrated with Docker Compose.

This setup enables a cohesive local development environment and straightforward deployment strategy.

## Requirements

- **Node.js** (version 22.12.0 or higher recommended)
- **Docker** and **Docker Compose**
- A code editor (e.g., Visual Studio Code)

## Setup & Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mindfull-projects/bio-baum-bauer.git
   cd bio-baum-bauer
   ```

2. **Install Root Dependencies**  
   You’ll find project-level scripts and tooling in the root `package.json`. Install them with:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   - Create a `.env` file in both the frontend and backend directories if needed.
   - Refer to the `.env.example` files for guidance on required variables.

4. **Start the Project with Docker Compose**  
   From the project root, build and run the frontend and backend containers:
   ```bash
   npm run start
   ```
   This command leverages the `docker-compose.yml` file to orchestrate both services.

## Development Workflow

1. **Frontend**

   - The React application resides in the `frontend` folder.
   - Use Vite’s development server for hot reloading.
   - Tailwind CSS is set up for styling; make changes in `src` and the Tailwind config.

2. **Backend**

   - The backend code lives in the `backend` folder.
   - It uses Express for the RESTful API, Mongoose for MongoDB operations, and organizes logic into controllers, models, middleware, and routes.

3. **Linting & Formatting**

   - [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) configurations are provided at the root level.
   - [Husky](https://typicode.github.io/husky/) is used to enforce linting on commits to maintain code quality.

4. **Hot Reloading & Automatic Rebuilds**
   - During development, updates to frontend and backend files should trigger automatic rebuilds or hot reloads within their respective containers.

## Testing

There are currently no automated tests included. However, feel free to add tests (e.g., Jest, Cypress) for new or existing features to ensure the application’s reliability and maintainability.

## Contributing

Contributions are welcome! Whether it’s improving documentation, adding tests, or refactoring existing code:

1. Fork the repository and create a new branch for your feature or fix.
2. Commit changes with clear, concise messages.
3. Submit a pull request and provide relevant details or instructions.
