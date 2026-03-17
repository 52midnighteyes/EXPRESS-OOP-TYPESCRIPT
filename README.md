# Persija Jakarta API

REST API untuk Persija Jakarta company profile. Built with TypeScript, Express, Prisma, PostgreSQL.

## 📌 Version & Status

**Current Version:** `v1.0.0`  
**Status:** 🟡 In Development  
**Last Updated:** March 17, 2026

## 🛠 Tech Stack

- Node.js + TypeScript
- Express.js v5+
- PostgreSQL + Prisma v7+
- JWT + Argon2 (Auth)
- Zod (Validation)
- Multer + Cloudinary (File Upload)

## ⚡ Quick Start

```bash
npm install
cp .env.example .env
# Update .env dengan credentials Anda
npm run prisma:migrate
npm run dev
```

## 📝 API Endpoints

### Auth

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login & get JWT token

### Blog

- `GET /api/blogs` - Get all (dengan pagination, filter, sort)
- `GET /api/blogs/:id` - Get detail
- `POST /api/blogs` - Create (auth required)
- `PUT /api/blogs/:id` - Update (auth required)
- `DELETE /api/blogs/:id` - Delete (auth required)

## 🗄️ Database Models

- **User** - id, email, firstName, lastName, password, role, createdAt, updatedAt, deletedAt
- **Blog** - id, title, slug, content, image, excerpt, category, isPublished, authorId, createdAt, updatedAt, deletedAt
- **Players** - Player info
- **Staff** - Staff info
- **ContactForm** - id, email, message, isResponded, createdAt

Blog Categories: MATCH, PLAYER, TRANSFER, NEWS, TRAINING, FANS, HISTORY, EVENT, MERCH

## 📂 Project Structure

```
src/
├── modules/
│   ├── auth/        (register, login)
│   ├── blog/        (CRUD operations)
│   └── user/        (user queries)
├── middlewares/     (auth, validation, error handling)
├── libs/           (Prisma, Cloudinary config)
├── enum/           (blogCategory, userRole)
├── config/         (environment variables)
└── helper/         (utilities)
```

## 🔐 Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/prisja_db"
JWT_SECRET="your-min-32-char-secret-key-here"
NODE_ENV="development"
PORT=3000
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## 📜 Available Scripts

```bash
npm run dev              # Development with hot reload
npm start               # Production
npm run prisma:migrate  # Run database migrations
npm run prisma:generate # Generate Prisma Client
npm run prisma:studio   # Open Prisma Studio GUI
```

## 🔄 Version History

### v1.0.0 (Current - March 17, 2026)

- ✅ Authentication (Register, Login with JWT)
- ✅ Blog CRUD with image upload (Cloudinary)
- ✅ Blog pagination, filtering & sorting
- ✅ User, Players, Staff, ContactForm models
- ✅ Soft delete implementation
- ✅ Zod validation & error handling
