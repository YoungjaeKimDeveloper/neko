# Neko - Lost Cat Community Platform

> A full-stack web application to help users find their lost cats and connect with others. Built with the PERN stack and designed with clean architecture principles.

---

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61dafb?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TailwindCSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-EF4444?style=for-the-badge&logo=zod&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" />
  <img src="https://img.shields.io/badge/Neon-1E90FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiBoZWlnaHQ9IjMyIiB3aWR0aD0iMzIiIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHBhdGggZD0iTTI0IDJDMTIuOTUgMiAyIDExLjI4IDIgMjRzMTAuOTUgMjIgMjIgMjIgMjItMTAuOTkgMjItMjJTMzUuMDUgMiAyNCAyem0xMS4yNyAyNi45OEwyMy43MyAzNC4wMmwtNy4zMiAxMS41Yy0uNjkuOXYtOS4xTDExLjMgMzcuOThIMjIuM2wxLjY4LTIuMjR6Ii8+PC9zdmc+" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />

</p>

### Backend

- **Node.js** + **Express.js**
- **PostgreSQL** (Neon)
- **TypeScript**
- **Zod** (Schema validation)
- **Jest** (Unit testing)

### Frontend

- **React** + **TypeScript**
- **TanStack Query** (Server state)
- **Tailwind CSS** + **Daisy UI**
- **React Router**
- **RHF(React Hook Form)**
- **Zod**

### DevOps / Infra

- **Render** (Deployment)
- **ESLint** + **Prettier**

### API

- **cloudinary**

---

## 📦 Features

### Authentication

- Sign up, login with JWT
- User profile image support

### Post

- Create/edit/delete lost cat posts
- Image upload supported

### Comment

- Add/delete comments
- Optimistic UI update
- Edge case & error handled

### React

- Toggle like/unlike
- Prevent duplicate likes
- Optimistic UI

### Notification

- View comment, like, and post notifications
- Auto-fetch and clear read notifications
- Can find user info and post info

### Profile

- View other users’ profiles
- Update own profile (Zod validated)

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

## Author

**Youngjae Kim**  
Frontend-Focused Full-Stack Developer  
Macquarie University  
[LinkedIn](https://www.linkedin.com/in/youngjaekimdeveloper/)
