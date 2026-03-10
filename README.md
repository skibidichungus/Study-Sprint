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
