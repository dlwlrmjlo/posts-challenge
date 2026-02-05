# Posts Challenge

A full-stack application for managing posts built with **React + Redux** and **Node.js + Express + PostgreSQL**.

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vite + React 18 + TypeScript |
| State Management | Redux Toolkit |
| Styling | Tailwind CSS |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL 15 (Docker) |

---

## 📁 Project Structure

```
posts-challenge/
├── docker-compose.yml          # PostgreSQL container config
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts            # Express server entry
│       ├── routes/
│       │   └── posts.ts        # API routes definition
│       ├── controllers/
│       │   └── postsController.ts
│       ├── services/
│       │   └── postsService.ts # Data access layer
│       └── db/
│           ├── connection.ts   # PostgreSQL pool
│           └── init.sql        # Schema
└── frontend/
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx            # Entry + Redux Provider
        ├── App.tsx             # Main layout, fetches posts ONCE
        ├── store/
        │   ├── index.ts        # Redux store config
        │   └── postsSlice.ts   # State, actions, selectors
        ├── components/
        │   ├── PostForm.tsx    # Create new posts
        │   ├── PostFilter.tsx  # Local search filter
        │   └── PostList.tsx    # Display + delete posts
        ├── services/
        │   └── api.ts          # Fetch wrapper
        └── types/
            └── post.ts         # TypeScript interfaces
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| `GET` | `/api/posts` | Get all posts | `Post[]` |
| `POST` | `/api/posts` | Create a post | Created `Post` |
| `DELETE` | `/api/posts/:id` | Delete a post | Deleted `Post` |

### Response Format (camelCase)

```json
{
  "id": 1,
  "name": "My Post",
  "description": "Post description",
  "createdAt": "2024-02-04T20:30:00.000Z"
}
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │  PostForm   │    │  PostFilter  │    │   PostList   │   │
│  └──────┬──────┘    └──────┬───────┘    └──────┬───────┘   │
│         │                  │                    │           │
│         ▼                  ▼                    ▼           │
│  ┌────────────────────────────────────────────────────┐    │
│  │                   REDUX STORE                       │    │
│  │  state: { posts, filter, loading, error }          │    │
│  │  selectors: selectFilteredPosts (memoized)         │    │
│  └─────────────────────────┬──────────────────────────┘    │
│                            │                                │
│                            ▼                                │
│  ┌────────────────────────────────────────────────────┐    │
│  │                   API SERVICE                       │    │
│  │  fetchPosts() | createPost() | deletePost()        │    │
│  └─────────────────────────┬──────────────────────────┘    │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTP
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                              │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │   Routes    │───▶│ Controllers  │───▶│   Services   │   │
│  └─────────────┘    └──────────────┘    └──────┬───────┘   │
│                                                 │           │
│                                                 ▼           │
│                                    ┌──────────────────┐    │
│                                    │    PostgreSQL    │    │
│                                    └──────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Features

### Single API Call Constraint
Posts are fetched **only once** when the app loads:
```tsx
useEffect(() => {
  dispatch(loadPosts());
}, []); // Empty dependency array = runs once
```

### Local Filtering (No Backend Call)
Filter uses a memoized Redux selector:
```ts
export const selectFilteredPosts = createSelector(
  [selectPosts, selectFilter],
  (posts, filter) => posts.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase())
  )
);
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop

### 1. Start PostgreSQL
```bash
docker-compose up -d
```

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:3001
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 📋 Best Practices Implemented

| Practice | Implementation |
|----------|----------------|
| JSON camelCase | Backend converts `created_at` → `createdAt` |
| JS camelCase | All JavaScript/TypeScript uses camelCase |
| Separation of Concerns | Routes → Controllers → Services → DB |
| TypeScript | Full type safety across front and backend |
| Memoized Selectors | `createSelector` prevents unnecessary re-renders |
| Error Handling | Try-catch in controllers, error states in UI |
| Loading States | Visual feedback during async operations |

---

## 🧪 Testing the Flow

1. **Create Post**: Fill form → Submit → Post appears in list
2. **Filter**: Type in search → List updates instantly (no API call)
3. **Delete**: Click trash icon → Post removed
4. **Persistence**: Refresh page → Posts still there (from DB)
5. **Single Call**: Check Network tab → `GET /api/posts` called only once

---

## 🎓 Skills Applied (Refactoring)

This project was refactored using the following expert skills:

### Backend Express Skill
| Improvement | File |
|-------------|------|
| Custom `AppError` class with status codes | `src/errors/AppError.ts` |
| Global error handling middleware | `src/errors/errorHandler.ts` |
| Zod validation schemas | `src/validation/schemas.ts` |
| Controller uses Zod + AppError | `src/controllers/postsController.ts` |

### Tailwind Best Practices Skill
| Improvement | File |
|-------------|------|
| `cn()` utility (clsx + tailwind-merge) | `src/lib/utils.ts` |
| Reusable `Button` component | `src/components/ui/Button.tsx` |
| Reusable `Input` component | `src/components/ui/Input.tsx` |
| Logical class ordering | All components |

### React Best Practices Skill (Vercel)
| Rule | Implementation |
|------|----------------|
| `rendering-hoist-jsx` | Static SVG icons hoisted outside components |
| `rendering-conditional-render` | Ternary operators instead of `&&` |
| `rerender-memo` | `createSelector` for filtered posts |

---

## 📝 License

MIT
