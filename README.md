# Persija Jakarta Company Profile API

A REST API for Persija Jakarta's company profile, built with TypeScript, Express, and Prisma.

## Tech Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL + Prisma ORM
- JWT Auth + Argon2
- Zod Validation
- Multer + Cloudinary

## Quick Setup

1. Install deps: `npm install`
2. Setup `.env`:
   ```
   DATABASE_URL="postgresql://..."
   JWT_SECRET="your-secret"
   CLOUDINARY_CLOUD_NAME="..."
   CLOUDINARY_API_KEY="..."
   CLOUDINARY_API_SECRET="..."
   ```
3. Run: `npm run prisma:migrate && npm run prisma:generate`
4. Start: `npm run dev`

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/blogs` - Create blog (with image)
- `GET /` - Status check

## Changelog

- **Blog System**: Create blog posts with image upload to Cloudinary
- **Authentication**: JWT-based login/register with Argon2 password hashing
- **Database Models**: User, Blog, Players, Staff, ContactForm
- **File Upload**: Multer middleware for handling image uploads
- **Initial Setup**: Basic User and Post models with Prisma
- Contact form

## Database Models

- User (admin/user roles)
- Post (news with categories)
- Players (football players)
- Staff (team staff)
- ContactForm (inquiries)

## Scripts

- `npm run dev` - Development
- `npm start` - Production
- `npm run prisma:studio` - Database GUI
