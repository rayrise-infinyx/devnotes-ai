# DevNotes AI

A modern full-stack notes application built with Next.js, allowing users to create, manage, and organize developer notes efficiently.

Live Demo: [https://devnotes-ai.vercel.app/](https://devnotes-ai.vercel.app/)

---

## Features

* Create, read, and delete notes
* Authentication with Clerk
* Dark / Light mode toggle
* Server Actions (no Express backend)
* PostgreSQL database (Neon)
* Tag system (many-to-many relationship)
* Search and filter notes
* Clean UI with Tailwind and shadcn

---

## Tech Stack

* Frontend: Next.js (App Router)
* Backend: Server Actions (Next.js)
* Database: PostgreSQL (Neon)
* ORM: Drizzle ORM
* Auth: Clerk
* Styling: Tailwind CSS + shadcn/ui
* Animations: Framer Motion

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rayrise-infinyx/devnotes-ai.git
cd devnotes-ai
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root:

```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
```

---

### 4. Run database migrations

```bash
npm run db:generate
npm run db:migrate
```

---

### 5. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## What I Learned

* Building full-stack apps with Next.js (App Router)
* Using Server Actions instead of traditional APIs
* Designing relational databases (many-to-many)
* Managing authentication with Clerk
* Working with Drizzle ORM and PostgreSQL

---

## Note

This is my first full-stack project in Next.js.
It may have bugs and is not fully optimized, but it represents a strong learning milestone.

---

## Deployment

Deployed on Vercel:
[https://devnotes-ai.vercel.app/](https://devnotes-ai.vercel.app/)

---

## Future Improvements

* Edit notes
* Better search optimization
* Tag UI improvements
* Performance optimizations
* Mobile responsiveness improvements

---

## Contributing

Feel free to fork the project and improve it.

---

## Screenshots

Add screenshots of your application here to showcase UI and features.

```
/assets/screenshot-1.png
/assets/screenshot-2.png
```

---

## Badges

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql\&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

---

## Project Structure

```
app/
  actions/
  components/
  db/
  page.tsx

lib/

public/
```

---

## Architecture Overview

* Client: Next.js App Router components
* Server: Server Actions for mutations and queries
* Database: PostgreSQL accessed via Drizzle ORM
* Auth: Clerk for user management

---

## License

This project is open source and available under the MIT License.
