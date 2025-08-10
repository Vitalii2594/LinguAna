# Deployment Guide - LinguaSchool Platform

This guide covers deploying the LinguaSchool platform to production environments.

## 🏗 Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React SPA)   │────│   (Node.js)     │────│   (Supabase)    │
│   Port: 5173    │    │   Port: 3001    │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Deploy (Recommended)

### Option 1: Deploy to Railway (Full Stack)

1. **Fork this repository** to your GitHub account

2. **Create Railway account** at [railway.app](https://railway.app)

3. **Deploy Backend:**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your forked repository
   - Set root directory to `/server`
   - Add environment variables:
     ```
     NODE_ENV=production
     JWT_SECRET=your_super_secure_jwt_secret_here
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     FRONTEND_URL=https://your-frontend-domain.netlify.app
     ```

4. **Deploy Frontend:**
   - Go to [netlify.com](https://netlify.com) and create account
   - Click "New site from Git" → Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-domain.railway.app/api
     ```

### Option 2: Deploy to Vercel + Railway

1. **Backend on Railway** (same as above)

2. **Frontend on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Framework preset: Vite
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-domain.railway.app/api
     ```

## 🗄 Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create account
2. Click "New Project"
3. Choose organization and set project details
4. Wait for project to be ready (2-3 minutes)

### 2. Run Database Migrations

1. Go to your Supabase dashboard
2. Navigate to "SQL Editor"
3. Create new query and paste contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" to execute
5. Create another query with `supabase/migrations/002_seed_data.sql`
6. Click "Run" to add sample data

### 3. Get API Keys

1. Go to Settings → API
2. Copy your project URL and anon key
3. Copy service role key (keep this secret!)

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Backend (.env)
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters
JWT_EXPIRES_IN=7d

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# CORS Configuration
FRONTEND_URL=https://your-frontend-domain.com

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads
```

## 🔒 Security Checklist

### Before Going Live:

- [ ] Change all default passwords
- [ ] Generate strong JWT secret (32+ characters)
- [ ] Set up proper CORS origins
- [ ] Enable HTTPS on all domains
- [ ] Review Supabase RLS policies
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup strategy
- [ ] Review API endpoints security
- [ ] Test authentication flows

### JWT Secret Generation:
```bash
# Generate secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📊 Monitoring & Analytics

### Health Checks
- Backend: `https://your-api-domain.com/health`
- Frontend: Check if app loads and authentication works

### Recommended Monitoring Tools:
- **Uptime**: UptimeRobot, Pingdom
- **Errors**: Sentry, LogRocket
- **Analytics**: Google Analytics, Mixpanel
- **Performance**: Lighthouse, Web Vitals

## 🚀 Advanced Deployment Options

### Docker Deployment

1. **Create Dockerfile for Backend:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/dist ./dist
EXPOSE 3001
CMD ["npm", "start"]
```

2. **Create docker-compose.yml:**
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
```

### Kubernetes Deployment

1. **Create deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: linguaschool-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: linguaschool-backend
  template:
    metadata:
      labels:
        app: linguaschool-backend
    spec:
      containers:
      - name: backend
        image: your-registry/linguaschool-backend:latest
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: linguaschool-secrets
              key: jwt-secret
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd server && npm ci
      - name: Build
        run: cd server && npm run build
      - name: Deploy to Railway
        run: railway deploy
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
      - name: Deploy to Netlify
        run: netlify deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Check `FRONTEND_URL` in backend environment
   - Verify frontend is making requests to correct API URL

2. **Database Connection Failed:**
   - Verify Supabase credentials
   - Check if migrations were run successfully
   - Ensure RLS policies are set up correctly

3. **Authentication Issues:**
   - Verify JWT secret is set and consistent
   - Check token expiration settings
   - Ensure HTTPS is enabled in production

4. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all environment variables are set
   - Review build logs for specific errors

### Debug Commands:
```bash
# Check backend health
curl https://your-api-domain.com/health

# Test authentication
curl -X POST https://your-api-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@linguaschool.com","password":"password"}'

# Check database connection
# (Run in Supabase SQL Editor)
SELECT COUNT(*) FROM users;
```

## 📈 Performance Optimization

### Frontend:
- Enable gzip compression
- Use CDN for static assets
- Implement code splitting
- Optimize images and fonts
- Enable browser caching

### Backend:
- Implement Redis caching
- Use connection pooling
- Enable gzip compression
- Optimize database queries
- Set up load balancing

### Database:
- Add proper indexes
- Optimize queries
- Set up read replicas
- Monitor query performance
- Regular maintenance

## 🔄 Backup Strategy

### Database Backups:
- Supabase provides automatic daily backups
- Set up additional backup to external storage
- Test restore procedures regularly

### Code Backups:
- Use Git with multiple remotes
- Regular repository backups
- Document deployment procedures

## 📞 Support

For deployment issues:
1. Check this guide first
2. Review application logs
3. Check service status pages
4. Create GitHub issue with details

---

**Happy Deploying!** 🚀