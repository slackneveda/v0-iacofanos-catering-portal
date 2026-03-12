# Deployment Guide for Iacofanos Portal

## Vercel Deployment (Frontend)

### Quick Deploy
1. **Connect GitHub Repository**: Go to [Vercel Dashboard](https://vercel.com/dashboard) and import your GitHub repository
2. **Configure Build Settings**:
   - Framework: Next.js (auto-detected)
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `pnpm install` (or your preferred package manager)

3. **Environment Variables**: Set in Vercel Project Settings under "Environment Variables"
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
   ```
   Leave empty for mock data in preview mode.

4. **Deploy**: Click "Deploy" - the site should be live within 2-3 minutes

### Troubleshooting Deployment Errors

**Error: "DEPLOYMENT_NOT_FOUND"**
- This occurs when the build fails during deployment
- Check Vercel Logs for detailed error messages
- Ensure all TypeScript types are correct
- Verify all imports are using absolute paths with `@/`

**Error: Build Timeout**
- Increase timeout in `vercel.json`
- Ensure `package.json` dependencies are minimal
- Check for large image files in public folder

**Missing Dependencies**
- The app includes automatic fallback to mock data if `NEXT_PUBLIC_API_URL` is not set
- This allows the app to work without a backend server during preview/development

## Backend Deployment (Node.js/Express)

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured

### Step 1: Set Up Database
```bash
cd backend
# Update .env with your database credentials
DATABASE_URL=postgresql://user:password@localhost:5432/iacofanos

# Run migrations
node src/db/migrate.js
```

### Step 2: Configure Environment
Copy `.env.example` to `.env` and fill in:
```
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key-min-32-chars
NODE_ENV=production
```

### Step 3: Deploy Options

**Option A: Heroku**
```bash
heroku create iacofanos-api
heroku addons:create heroku-postgresql:standard-0
git push heroku main
```

**Option B: Railway/Render/Fly.io**
- Follow their Node.js deployment guides
- Set DATABASE_URL environment variable
- Set JWT_SECRET with a strong random string

**Option C: Self-hosted (DigitalOcean, AWS EC2, etc.)**
```bash
# Install PM2 for process management
npm install -g pm2

# Start backend
pm2 start src/index.js --name "iacofanos-api"
pm2 save
```

### Step 3: Update Frontend API URL
Once backend is deployed, update the Vercel environment variable:
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## Database Setup (PostgreSQL)

The schema includes:
- `users` - User accounts and authentication
- `menu_items` - Catering menu items
- `orders` - Order records
- `order_items` - Items in each order
- `contact_submissions` - Contact form submissions

Auto-created by migration script.

## Monitoring & Logs

**Vercel Logs**:
- Dashboard → Deployments → Select deployment → Logs tab
- Real-time logs for frontend errors

**Backend Logs** (if self-hosted):
```bash
pm2 logs iacofanos-api
```

**Database Logs**:
```bash
# PostgreSQL
psql -d iacofanos -c "SELECT * FROM pg_stat_statements LIMIT 10;"
```

## SSL/HTTPS

- Vercel: Automatic SSL on all deployments
- Custom Domain: Add in Vercel settings, configure DNS
- Backend: Use Let's Encrypt with Certbot (for self-hosted)

## Performance Tips

1. **Database Indexing**: Add indexes on frequently queried columns
2. **Caching**: Backend includes basic caching headers
3. **Image Optimization**: Frontend uses Unsplash for menu images
4. **API Rate Limiting**: Add rate limiting middleware for production

## Security Checklist

- [ ] Change all default JWT_SECRET
- [ ] Enable HTTPS on all endpoints
- [ ] Configure CORS properly for your domain
- [ ] Use strong database passwords
- [ ] Set environment variables (never commit .env files)
- [ ] Enable database SSL connections
- [ ] Regular security updates for dependencies

## Support & Issues

For deployment issues:
1. Check Vercel build logs
2. Verify all environment variables are set
3. Test API locally before deploying
4. Check database connectivity
5. Review error logs for specific error messages
