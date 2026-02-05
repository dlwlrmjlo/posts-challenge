# Posts Challenge

A full-stack application for managing posts, built with **React**, **Redux**, **Node.js**, and **PostgreSQL**.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Redux Toolkit, Tailwind CSS v4.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: PostgreSQL (Dockerized).

## 🛠 Features

- **Create Posts**: Add new posts with a title and description.
- **List Posts**: View all posts in a clean table layout.
- **Delete Posts**: Remove posts instantly.
- **Local Filtering**: Filter posts by name without re-fetching from the server.
- **Optimized Performance**: The application fetches data from the API **only once** on load.

## 📦 Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Docker](https://www.docker.com/) (for the database)

### 1. Database Setup

Start the PostgreSQL container:

```bash
docker-compose up -d
```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and start the server:

```bash
cd backend
npm install
npm run dev
```

The server will run on `http://localhost:3001`.

### 3. Frontend Setup

In a new terminal, navigate to the frontend directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
posts-challenge/
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── db/             # Database connection & init
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Entry point
│   └── ...
├── frontend/               # React + Vite App
│   ├── src/
│   │   ├── components/     # UI Components (PostList, PostForm, etc.)
│   │   ├── services/       # API integration
│   │   ├── store/          # Redux Toolkit setup
│   │   └── App.tsx         # Main layout
│   └── ...
└── docker-compose.yml      # PostgreSQL service
```

## 📝 License

This project is part of a technical challenge.
