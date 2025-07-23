# Neko - Lost Cat Community Platform

> A full-stack web application to help users find their lost cats and connect with others. Built with the PERN stack and designed with clean architecture principles.

---

## Tech Stack

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

---

## Author

**Youngjae Kim**  
Frontend-Focused Full-Stack Developer  
Macquarie University  
[LinkedIn](https://www.linkedin.com/in/youngjaekimdeveloper/)
