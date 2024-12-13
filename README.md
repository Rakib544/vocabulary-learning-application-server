# SakuraLexis - Server Repository

## Project Overview

SakuraLexis is an interactive Japanese vocabulary learning application designed to help users expand their vocabulary and improve communication skills in Japanese. It supports two user roles: **Admin** and **User**, each with distinct functionalities for an engaging and streamlined learning experience.

This repository contains the server-side implementation, including APIs for user management, lesson and vocabulary handling, and role-based access control.

---

## Features

### Admin Role

- **User Management**: Assign and manage user roles (Admin or Normal User).
- **Lesson Management**:
  - Create, view, update, and delete lessons.
  - Track vocabulary count per lesson.
- **Vocabulary Management**:
  - Add, view, update, and delete vocabulary items.
  - Filter vocabulary items by lesson.
- **Tutorial Management**: Embed and manage YouTube tutorial links.

### User Role

- **Lesson Access**: View and engage with lessons.
- **Vocabulary Learning**:
  - View vocabulary details such as word, pronunciation, meaning, and usage context.
  - Listen to vocabulary pronunciation.
  - Navigate vocabulary with pagination.
  - Celebrate lesson completion with animations.

---

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB
- Prisma

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Rakib544/vocabulary-learning-application-server.git
   ```
2. Navigate to the project directory:

````bash
  cd vocabulary-learning-application-server
  ```
3. Install dependencies
```bash
npm install
# or
yarn install
````

4. Set up the .env file with the following variables:

```bash
NODE_ENV=
PORT=8080
APP_BASE_URL=
DATABASE_URL=
ACCESS_TOKEN=
ACCESS_TOKEN_EXPIRES_IN=
REFRESH_TOKEN=
REFRESH_TOKEN_EXPIRES_IN=
```

5. Start the dev server

```bash
npm run dev
#or
yarn dev
```

6. The server will be available at `http://localhost:8080`

## API Endpoints

### Auth

- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Authenticate a user and return a token.
- Lessons
- GET /api/lessons: Retrieve all lessons.
- POST /api/lessons: Add a new lesson (Admin only).
- PUT /api/lessons/:id: Update lesson details (Admin only).
- DELETE /api/lessons/:id: Delete a lesson (Admin only).

### Vocabulary

- GET /api/vocabulary: Retrieve all vocabularies with optional filters.
- POST /api/vocabulary: Add a new vocabulary (Admin only).
- PUT /api/vocabulary/:id: Update vocabulary details (Admin only).
- DELETE /api/vocabulary/:id: Delete a vocabulary (Admin only).

### Tutorials

- GET /api/tutorials: Retrieve all tutorials.
- POST /api/tutorials: Add a new tutorial (Admin only).
- DELETE /api/tutorials/:id: Delete a tutorial (Admin only).

### Users

- GET /api/users: Retrieve a list of all users (Admin only).
- PUT /api/users/:id/role: Update a user's role (Admin only).
