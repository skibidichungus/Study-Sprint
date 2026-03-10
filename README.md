# StudySprint

StudySprint is a beginner-friendly student productivity app built with Next.js and TypeScript.

You can:
- add tasks
- view tasks
- mark tasks as complete

## Tech Stack

- Next.js
- TypeScript
- React

## Project Structure

```text
Study-Sprint/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  └─ TaskList.tsx
│  └─ types/
│     └─ task.ts
├─ package.json
├─ tsconfig.json
└─ README.md
```

## What Each Main Folder Does

- `public/`: static files like images and icons.
- `src/app/`: pages and layout for the app (App Router).
- `src/components/`: reusable UI pieces, like the task list.
- `src/types/`: shared TypeScript types.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser:

`http://localhost:3000`

## Available Scripts

- `npm run dev` - run in development mode
- `npm run build` - build for production
- `npm run start` - start production server
- `npm run lint` - run lint checks

## Beginner API Routes (Tasks)

These backend routes are intentionally simple and use an in-memory array.
That means data resets when the server restarts.

### `GET /api/tasks`

Returns all tasks.

Response shape:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Review notes for math",
      "completed": false
    }
  ]
}
```

### `POST /api/tasks`

Creates a new task.

Request body shape:

```json
{
  "title": "Study biology chapter 3"
}
```

Success response (`201`) shape:

```json
{
  "task": {
    "id": 1710000000000,
    "title": "Study biology chapter 3",
    "completed": false
  }
}
```

Validation error response (`400`) shape:

```json
{
  "error": "Title is required and must be a non-empty string."
}
```

### `PATCH /api/tasks/:id/complete`

Marks one task as completed (`true`).

Example:
- `PATCH /api/tasks/1/complete`

Success response (`200`) shape:

```json
{
  "task": {
    "id": 1,
    "title": "Review notes for math",
    "completed": true
  }
}
```

Not found response (`404`) shape:

```json
{
  "error": "Task not found."
}
```
## Future Features

- Delete
- Undo