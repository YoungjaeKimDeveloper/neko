# Neko - Lost Cat Community Platform

> A full-stack web application to help users find their lost cats and connect with others. <br/>Built with the PERN stack and designed with clean architecture principles.

---

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61dafb?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-EF4444?style=for-the-badge&logo=zod&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" />

</p>

### Frontend

- **React**
- **TypeScript**
- **TanStack Query** (Server state)
- **Tailwind CSS**
- **Daisy UI**
- **React Router**
- **RHF(React Hook Form)**
- **Zod**

### Backend(RestfulAPI)

- **Node.js**
- **Express.js**
- **PostgreSQL** (Neon)
- **TypeScript**
- **Zod**
- **Jest**

### DevOps

- **Render** (Deployment)

### Third-Party / External APIs

- **Cloudinary** – Image upload and hosting service

---

## 📦 Features

### Authentication

- Sign up, login with JWT
- User profile image support

### Post

- View post details
- Display relative updated time
- Shareable post URL

### Comment

- Add comments
- Optimistic UI(useState + Tanstack(Rollback))

### Like System

- Toggle like/unlike
- Prevent duplicate likes
- Optimistic UI(useState + Tanstack(Rollback))

### Notification

- View comment, like, and post notifications
- Auto-fetch and clear read notifications
- Can find user and post info

### Profile

- View other users’ profiles
- Update own profile image
- Update own profile location

### Error Handling

- Custom error logging via `errorLogV2`
- 404 redirect if post not found

---

## Validation

All payloads are validated with **Zod**:

- Frontend: Form schema
- Backend: DTO + runtime validation

---

## 🔍 Completed Tasks

- [x] JWT-based auth
- [x] Denormalised post with comments & likes
- [x] Optimistic UI for comment/like
- [x] Notification system
- [x] Profile edit with image
- [x] Zod integration (FE + BE)
- [x] 404 redirect for deleted posts
- [x] Error boundary handling
- [x] Toast feedback system

---

## 🧱 Architecture Overview

This project follows a feature-first folder structure, loosely inspired by Clean Architecture principles. Each domain (e.g., post, auth, comment) encapsulates its logic inside dedicated folders in both frontend and backend.

```bash
📦 backend/
├── features/           # Backend domain logic
│   └── post/
│   └── auth/
│   └── comment/
├── db/                 # Database config and queries
├── middleware/         # Express middlewares
├── lib/                # Shared backend logic
├── tests/              # Unit & integration tests
└── server.ts           # Entry point

📦 frontend/
├── src/
│   ├── features/       # Feature-based structure
│   │   ├── post/
│   │   ├── auth/
│   │   ├── comment/
│   │   ├── notification/
│   │   └── ...
│   └── shared/         # Reusable components/hooks/utils
│   └── App.tsx         # Root app component
│   └── main.tsx        # Entry point

Structure Highlights
Domain isolation: Each domain (post, auth, etc.) is self-contained

Zod used for both FE/BE validation

RHF + TanStack Query colocated per feature

Shared module for global UI/components/hooks



## Author

**Youngjae Kim**
Frontend-Focused Full-Stack Developer
Macquarie University
[LinkedIn](https://www.linkedin.com/in/youngjaekimdeveloper/)
```
