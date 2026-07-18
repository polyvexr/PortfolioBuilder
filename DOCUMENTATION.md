# Technical Documentation and Development Guide

This document serves as the comprehensive development guide, technical reference, and system architecture manual for developers working on the Build Your Portfolio project.

***

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Development Environment Setup](#development-environment-setup)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Frontend Development](#frontend-development)
  - [Routing](#routing)
  - [Context Providers](#context-providers)
  - [API Layer](#api-layer)
  - [Pages](#pages)
  - [Components](#components)
  - [Templates](#templates)
  - [Styling](#styling)
- [Backend Development](#backend-development)
  - [Express App](#express-app)
  - [Database Models](#database-models)
  - [API Routes](#api-routes)
  - [Authentication Middleware](#authentication-middleware)
- [Developer Workflow and Conventions](#developer-workflow-and-conventions)
  - [Branching Strategy](#branching-strategy)
  - [Commit Messages](#commit-messages)
  - [Code Style](#code-style)
- [Step-by-Step Development Instructions](#step-by-step-development-instructions)
  - [Adding a New Template](#adding-a-new-template)
  - [Adding a New Editor Tab](#adding-a-new-editor-tab)
  - [Adding a New API Endpoint](#adding-a-new-api-endpoint)
  - [Testing Your Changes](#testing-your-changes)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Data Flow Diagrams](#data-flow-diagrams)
- [Error Handling](#error-handling)
- [Security](#security)

***

## Architecture Overview

The project is structured as a monorepo containing both the frontend and backend applications:

```
Monorepo Root
  ├─ server/     (Express API, MongoDB ODM, JWT Auth)
  ├─ client/     (React, Vite SPA, Tailwind CSS, Framer Motion)
  └─ dev-server.js (Unified dev server running API and Vite together)
```

Key Design Decisions:
- **Unified Dev Server**: The dev-server.js script creates a single Express and Vite instance. API routes are mounted first under /api, and all remaining requests are passed to Vite as a single-page application fallback. This design prevents Cross-Origin Resource Sharing (CORS) issues during development.
- **Modal-Based Authentication**: Login and registration are overlay components rather than separate routes. They are mounted at the root layout and toggled using the authentication context state.
- **Template System**: The public portfolio page renders a React template component dynamically based on the template identifier stored in the database.
- **Vercel Deployment**: A serverless function adapter (api/all.js) wraps the Express application for production execution, while the Vite client is built into static assets.

***

## Development Environment Setup

### Prerequisites
- Node.js version 16 or higher
- MongoDB (local database or a remote MongoDB Atlas database instance)
- Git
- npm (Node Package Manager)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd builder-your-portfolio
   ```

2. **Install dependencies**
   The root postinstall script automatically installs the client dependencies.
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a .env file inside the `server` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_key_here
   ```

   Optional: Create a .env file inside the `client` directory:
   ```env
   VITE_API_URL=https://your-production-api.com
   ```

4. **Start the application**
   Run the unified dev server (starts both Express API and Vite frontend):
   ```bash
   npm run dev
   ```
   The application will be accessible at http://localhost:5173. API requests are routed internally to /api.

***

## Available Scripts

The following scripts can be executed from the root directory:

| Script | Command | Description |
|---|---|---|
| npm run dev | node dev-server.js | Start unified dev server (API and frontend) |
| npm run build | cd client && npm run build | Build production client bundle |
| npm run dev:server | node server/index.js | Run Express API standalone on port 5000 |
| npm run postinstall | cd client && npm install | Automatically install client dependencies |

Client-only scripts (run from the `client` directory):

| Script | Description |
|---|---|
| npm run dev | Start Vite dev server only (no API backend) |
| npm run build | Build the production assets to client/dist |
| npm run preview | Preview the production build locally |
| npm run lint | Run ESLint static analysis |

***

## Project Structure

```
builder-your-portfolio/
├── api/
│   └── [[...all]].js          # Vercel serverless adapter
├── dev-server.js               # Unified Express and Vite dev server
├── vercel.json                 # Vercel deployment configuration
├── package.json                # Root package configuration
│
├── client/                     # React frontend (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx             # Routes and entry layout
│       ├── main.jsx            # React mounting entrypoint
│       ├── index.css           # Global styles and Tailwind imports
│       ├── api/
│       │   ├── axiosConfig.js  # Axios instance and auth interceptors
│       │   └── portfolioService.js
│       ├── components/
│       │   ├── Navbar.jsx      # Navigation header
│       │   ├── ProtectedRoute.jsx
│       │   ├── editor/         # Tabbed form inputs
│       │   │   ├── PersonalInfoForm.jsx
│       │   │   ├── ExperienceForm.jsx
│       │   │   ├── EducationForm.jsx
│       │   │   ├── ProjectsForm.jsx
│       │   │   ├── SkillsForm.jsx
│       │   │   └── SettingsForm.jsx
│       │   └── templates/      # Portfolio themes
│       │       ├── ModernTemplate.jsx
│       │       ├── MinimalTemplate.jsx
│       │       └── CreativeTemplate.jsx
│       ├── context/
│       │   ├── AuthContext.jsx  # Authentication context
│       │   └── ThemeContext.jsx # Theme context
│       └── pages/
│           ├── LandingPage.jsx
│           ├── Login.jsx
│           ├── Register.jsx
│           ├── Dashboard.jsx
│           ├── Editor.jsx
│           └── PublicPortfolio.jsx
│
└── server/                     # Express API
    ├── app.js                  # App configuration and middleware
    ├── index.js                # Standalone entrypoint
    ├── config/
    │   └── db.js               # MongoDB database connection
    ├── middleware/
    │   └── authMiddleware.js   # JWT authentication parser
    ├── models/
    │   ├── User.js             # User data schema
    │   └── Portfolio.js        # Portfolio data schema
    └── routes/
        ├── auth.js             # Authentication routes
        └── portfolio.js        # Portfolio CRUD routes
```

***

## Frontend Development

### Routing

Client-side routes are defined in client/src/App.jsx:

```
ThemeProvider -> AuthProvider -> BrowserRouter
  ├─ <Login />          (modal overlay)
  ├─ <Register />       (modal overlay)
  └─ <Routes>
       ├─ /                    -> LandingPage
       ├─ /u/:username         -> PublicPortfolio
       ├─ /dashboard           -> Dashboard       (ProtectedRoute)
       ├─ /editor              -> Editor           (ProtectedRoute)
       └─ *                    -> Redirect to /
```

- **ProtectedRoute**: Validates if the user is authenticated. If no user session is detected, it redirects to the landing page and displays the login modal.
- **Auth Modals**: Login and registration components are mounted globally and controlled via states in the authentication context.

### Context Providers

#### AuthContext (client/src/context/AuthContext.jsx)
Provides global state for user authentication.

- `user` (Object | null): The current user profile, containing ID, name, email, username, and token.
- `loading` (Boolean): Request state status.
- `showLoginModal` (Boolean): Toggles the login modal visibility.
- `showRegisterModal` (Boolean): Toggles the register modal visibility.
- `login(email, password)`: Sends a request to login, saving the session data.
- `register(name, email, password, username)`: Sends a request to register a new user.
- `logout()`: Clears the local storage and state.

Sessions are persisted via localStorage under the user key.

#### ThemeContext (client/src/context/ThemeContext.jsx)
Manages application-wide dark and light themes.

- `theme` ('dark' | 'light'): Current active theme.
- `toggleTheme()`: Toggles between light and dark modes.

Theme configuration is applied by adding or removing the dark class on the html element.

### API Layer

#### Axios Configuration (client/src/api/axiosConfig.js)
Sets the default configurations for API calls:
- **Base URL**: Extracted from VITE_API_URL. In development, it defaults to an empty string to send requests to the unified dev server.
- **Request Interceptor**: Checks localStorage for a valid user token and appends the Authorization header: `Bearer <token>`.

#### Portfolio Service (client/src/api/portfolioService.js)
Encapsulates HTTP endpoints for portfolio actions:
- `getMyPortfolio()`: Fetches the authenticated user's portfolio data.
- `upsertPortfolio(data)`: Updates or inserts new portfolio details.
- `getPublicPortfolio(username)`: Fetches a portfolio using a public username.

### Pages

- **LandingPage**: The entry page featuring product features, visual screenshots, and calls to action.
- **Dashboard**: The main control board showing portfolio status, options to edit, and a link copying utility.
- **Editor**: A five-tab configuration form containing fields for Personal info, Experience, Education, Projects, and Theme Settings.
- **PublicPortfolio**: Page resolving under /u/:username that dynamically loads the appropriate visual template.

### Components

- **Navbar**: Standard navigation bar which renders buttons dynamically depending on auth status.
- **ProtectedRoute**: Custom guard component preventing unauthenticated views.
- **Editor Forms**: Components managing forms for each category (e.g. ExperienceForm, SkillsForm).

### Templates

Templates receive the portfolio data object and render a customized UI:
- **ModernTemplate**: Sticky sidebar layout with dual columns and soft neon backgrounds.
- **MinimalTemplate**: Grid layout featuring uppercase typography and clean borders.
- **CreativeTemplate**: Spacious layouts, large scale text, and dramatic hover rotations.

### Styling
- **Tailwind CSS**: Built using Tailwind CSS version 4.
- **Custom Classes**: Defined in client/src/index.css, including mesh-gradient, glass-card, and gradient-text utilities.
- **Animations**: Created using Framer Motion for clean page loading and button interactions.

***

## Backend Development

### Express App (server/app.js)
Sets up Express server configurations, registers routing systems, and establishes connection with the MongoDB database.

### Database Models

#### User Model (server/models/User.js)
Defines structure for system accounts:
- `name` (String, Required)
- `email` (String, Required, Unique)
- `password` (String, Required, Hashed)
- `username` (String, Required, Unique)
- `isPremium` (Boolean, Default: false)

Password encryption is managed automatically using a pre-save Mongoose hook.

#### Portfolio Model (server/models/Portfolio.js)
Defines structure for portfolio records:
- `userId` (Mongoose ObjectId, Required)
- `templateId` (String, Default: 'modern')
- `personalInfo` (Object containing name, bio, role, profilePhoto, email, phone, location)
- `education` (Array of objects containing institution, degree, fieldOfStudy, startYear, endYear, description)
- `skills` (Array of objects containing name, level)
- `projects` (Array of objects containing title, description, techStack, githubLink, liveLink, image)
- `experience` (Array of objects containing company, position, location, startDate, endDate, description)
- `socialLinks` (Object containing github, linkedin, twitter, portfolio)
- `settings` (Object containing theme, isPublic)

### API Routes

#### Authentication (server/routes/auth.js)
- `POST /api/auth/register`: Checks constraints and creates a new user profile.
- `POST /api/auth/login`: Validates password credentials and returns a JWT.

#### Portfolio (server/routes/portfolio.js)
- `GET /api/portfolio/me`: Returns the logged-in user's portfolio.
- `POST /api/portfolio`: Updates or inserts new portfolio sections.
- `GET /api/portfolio/public/:username`: Returns public portfolio details.

### Authentication Middleware
The protect middleware verified in server/middleware/authMiddleware.js extracts the Bearer token from the incoming request authorization headers and validates it using the JSON Web Token secret.

***

## Developer Workflow and Conventions

### Branching Strategy
Create branches from the main branch using the format: `type/short-description` (e.g. `feature/pdf-export` or `fix/auth-redirect`).

### Commit Messages
Follow conventional commit specifications: `<type>(<scope>): <description>` (e.g. `feat(editor): add skills tab` or `fix(api): fix validation`).

### Code Style
- Use two-space indentation.
- Use single quotes for Javascript strings.
- Implement functional components in React.
- Use async and await with try-catch blocks in route handlers.

***

## Step-by-Step Development Instructions

### Adding a New Template

1. **Create the component file**: Create `client/src/components/templates/YourTemplate.jsx`. Accept `portfolio` and `user` as props.
2. **Design the UI**: Develop the structure using Tailwind CSS and Framer Motion. Support light and dark theme toggles using settings.theme.
3. **Register the template**: Add the template key to the templates object in `client/src/pages/PublicPortfolio.jsx`.
4. **Update the settings form**: Register your template card inside `client/src/components/editor/SettingsForm.jsx`.

### Adding a New Editor Tab

1. **Create the input form component**: Create a custom form in `client/src/components/editor/YourForm.jsx`.
2. **Add tab configuration**: Register the new tab in `client/src/pages/Editor.jsx`. Add the corresponding CRUD handler logic.
3. **Extend the database model**: Update the portfolio schema in `server/models/Portfolio.js` to match the new structure.

### Adding a New API Endpoint

1. **Define routes**: Add the new route endpoint inside the route files under `server/routes/`.
2. **Implement service calls**: Add a corresponding async helper in `client/src/api/portfolioService.js`.
3. **Verify backend functionality**: Validate that the endpoint correctly processes requests.

### Testing Your Changes
Before finalizing changes, verify:
- The backend and frontend execute without errors when starting the dev server.
- Database changes persist securely to MongoDB.
- UI elements remain responsive on mobile, tablet, and desktop views.
- ESLint checks pass with no errors.

***

## Deployment

Deployments are configured for Vercel using vercel.json. API requests are routed to the catch-all API handler, while frontend routes are routed back to the index.html page to support client-side SPA routing.

***

## Environment Variables

- `MONGO_URI`: Connection endpoint for the MongoDB instance.
- `JWT_SECRET`: Private signature key used for web tokens.
- `VITE_API_URL`: Root path of the production API.

***

## Data Flow Diagrams

### Registration Flow
```
User fills Register form
  │
  ▼
AuthContext.register()
  │
  ▼
POST /api/auth/register
  │
  ├─ Verify constraints
  ├─ User.create() (Hashes password on pre-save)
  └─ Return user profile and token
  │
  ▼
Save session to local storage
  │
  ▼
Redirect to /dashboard
```

### Portfolio Save Flow
```
User edits portfolio data
  │
  ▼
Click Save button
  │
  ▼
portfolioService.upsertPortfolio()
  │
  ▼
Request interceptor appends Bearer Token
  │
  ▼
POST /api/portfolio (protect middleware runs validation)
  │
  ├─ Check if portfolio exists
  └─ Save data to database
  │
  ▼
Return portfolio details
  │
  ▼
Display toast alert
```

***

## Error Handling

Server operations wrap code blocks in try-catch handlers. Standard endpoints respond with status code 400 for bad input data, 401 for unauthorized calls, 404 for missing entities, and 500 for general server exceptions.

***

## Security

- Password database entries are securely hashed using bcryptjs.
- Route endpoints are protected using verified JSON Web Tokens.
- Access permissions check the privacy configuration flag on each request before returning portfolio data.
