# LinguaSchool - Complete Language Learning Platform MVP

A comprehensive full-stack language learning platform built with React, TypeScript, Node.js, and Supabase.

## 🚀 Features

### Frontend
- **Modern React Application** with TypeScript and Tailwind CSS
- **Multi-language Support** (Polish/Ukrainian interface)
- **Responsive Design** optimized for all devices
- **User Authentication** with role-based access (Student/Teacher/Admin)
- **Course Management** with interactive lessons and progress tracking
- **Personal Dictionary** for vocabulary building
- **Interactive Exercises** with immediate feedback
- **Real-time Progress Tracking**

### Backend
- **RESTful API** built with Node.js and Express
- **PostgreSQL Database** with Supabase integration
- **JWT Authentication** with secure password hashing
- **Role-based Authorization** (Student/Teacher/Admin)
- **File Upload Support** for course materials
- **Rate Limiting** and security middleware
- **Comprehensive Error Handling**

### Database
- **Supabase PostgreSQL** with Row Level Security (RLS)
- **Optimized Schema** with proper indexing
- **Real-time Subscriptions** support
- **Automated Backups** and scaling

## 🛠 Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for build tooling

### Backend
- Node.js with Express
- TypeScript for type safety
- Supabase for database and auth
- JWT for authentication
- bcryptjs for password hashing
- Helmet for security headers
- Express Rate Limit for API protection

### Database
- PostgreSQL (via Supabase)
- Row Level Security (RLS)
- Real-time subscriptions
- Automated migrations

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Git for version control

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd linguaschool
npm install
cd server && npm install && cd ..
```

### 2. Database Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and keys
3. Copy `.env.example` to `.env` and update with your Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. Run database migrations:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and run the contents of `supabase/migrations/001_initial_schema.sql`
   - Then run `supabase/migrations/002_seed_data.sql` for sample data

### 3. Start Development

```bash
# Start both frontend and backend
npm run dev:full

# Or start separately:
npm run dev              # Frontend only (port 5173)
npm run dev:server       # Backend only (port 3001)
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## 👥 Demo Accounts

The platform comes with pre-seeded demo accounts:

```
Admin: admin@linguaschool.com / password
Teacher: teacher@linguaschool.com / password  
Student: student@linguaschool.com / password
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Course Endpoints
- `GET /api/courses` - List all courses (with filters)
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Teacher/Admin)
- `PUT /api/courses/:id` - Update course (Teacher/Admin)
- `DELETE /api/courses/:id` - Delete course (Teacher/Admin)
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/my-enrollments` - Get user enrollments

### Lesson Endpoints
- `GET /api/lessons/course/:courseId` - Get course lessons
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons/course/:courseId` - Create lesson (Teacher/Admin)
- `PUT /api/lessons/:id` - Update lesson (Teacher/Admin)
- `DELETE /api/lessons/:id` - Delete lesson (Teacher/Admin)
- `POST /api/lessons/:id/complete` - Mark lesson complete

### Dictionary Endpoints
- `GET /api/dictionary` - Get user dictionary entries
- `POST /api/dictionary` - Create dictionary entry
- `PUT /api/dictionary/:id` - Update dictionary entry
- `DELETE /api/dictionary/:id` - Delete dictionary entry

## 🏗 Project Structure

```
linguaschool/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service layer
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── server/                # Backend source code
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── config/        # Configuration files
│   │   └── types/         # TypeScript types
│   └── dist/              # Compiled JavaScript
├── supabase/
│   └── migrations/        # Database migrations
└── public/                # Static assets
```

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcryptjs with salt rounds
- **Rate Limiting** to prevent API abuse
- **CORS Protection** with configurable origins
- **Helmet Security Headers** for XSS protection
- **Row Level Security** in database
- **Input Validation** with express-validator
- **SQL Injection Prevention** through parameterized queries

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
npm run build:server
# Deploy with start command: "cd server && npm start"
```

### Environment Variables for Production
```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=your_production_jwt_secret_here
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📊 Database Schema

The platform uses a comprehensive PostgreSQL schema with:

- **Users** - Authentication and profile management
- **Courses** - Course information and metadata
- **Lessons** - Individual lesson content
- **Enrollments** - User course registrations
- **Lesson Completions** - Progress tracking
- **Exercises** - Interactive learning activities
- **Dictionary Entries** - Personal vocabulary
- **Payments** - Transaction records

All tables include Row Level Security (RLS) policies for data protection.

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd server && npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🎯 Roadmap

- [ ] Payment integration (Stripe)
- [ ] Video streaming for lessons
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-tenant support
- [ ] AI-powered recommendations
- [ ] Real-time chat support
- [ ] Offline mode support

---

**LinguaSchool** - Empowering language learning through technology 🌍