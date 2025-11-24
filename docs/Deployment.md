# Deployment Guide

This guide covers deploying the Flight Tracker Application to various platforms and environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Deployment Platforms](#deployment-platforms)
  - [Railway](#railway)
  - [Render](#render)
  - [Heroku](#heroku)
  - [Vercel + Separate Backend](#vercel--separate-backend)
  - [DigitalOcean](#digitalocean)
  - [AWS](#aws)
- [Docker Deployment](#docker-deployment)
- [Nginx Configuration](#nginx-configuration)
- [SSL/TLS Setup](#ssltls-setup)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] Built and tested the application locally
- [ ] Set up a PostgreSQL database (cloud or self-hosted)
- [ ] Configured environment variables
- [ ] Updated any hardcoded URLs
- [ ] Reviewed security settings

---

## Environment Variables

### Required Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Server
NODE_ENV=production
PORT=5000

# CORS (if frontend is separate)
CLIENT_URL=https://your-frontend-domain.com
```

### Optional Variables

```env
# Logging
LOG_LEVEL=info

# Database Pool
DB_POOL_MIN=2
DB_POOL_MAX=10

# API Settings
API_TIMEOUT=30000
```

---

## Database Setup

### Option 1: Managed PostgreSQL

**Neon (Recommended)**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Use it as your `DATABASE_URL`

**Supabase**
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Use it as your `DATABASE_URL`

**Railway Database**
1. In your Railway project
2. Click "New" → "Database" → "PostgreSQL"
3. Copy the connection string from variables
4. Use it as your `DATABASE_URL`

### Option 2: Self-Hosted PostgreSQL

If hosting PostgreSQL yourself:

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE flighttracker;
CREATE USER flighttracker_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE flighttracker TO flighttracker_user;
\q
```

---

## Deployment Platforms

### Railway

**Best for**: Quick deployment with minimal configuration

#### Steps

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   railway init
   ```

4. **Add PostgreSQL**
   ```bash
   railway add -d postgresql
   ```

5. **Set Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   ```

6. **Deploy**
   ```bash
   railway up
   ```

7. **Open Application**
   ```bash
   railway open
   ```

#### railway.json

Create `railway.json` in root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

### Render

**Best for**: Simple web services with free tier

#### Steps

1. **Create Account** at [render.com](https://render.com)

2. **Create New Web Service**
   - Connect your GitHub repository
   - Select the repository

3. **Configure Settings**
   - **Name**: flighttrackerapp
   - **Environment**: Node
   - **Region**: Choose closest to users
   - **Branch**: main
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Add PostgreSQL Database**
   - Go to Dashboard
   - New → PostgreSQL
   - Copy internal connection string

5. **Set Environment Variables**
   ```
   DATABASE_URL=[paste connection string]
   NODE_ENV=production
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy

#### render.yaml

Create `render.yaml` in root for Infrastructure as Code:

```yaml
services:
  - type: web
    name: flighttrackerapp
    env: node
    plan: starter
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: flighttracker-db
          property: connectionString

databases:
  - name: flighttracker-db
    plan: starter
    databaseName: flighttracker
    user: flighttracker_user
```

---

### Heroku

**Best for**: Established platform with many add-ons

#### Steps

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create flighttrackerapp
   ```

4. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **Run Database Migrations**
   ```bash
   heroku run npm run db:push
   ```

8. **Open App**
   ```bash
   heroku open
   ```

#### Procfile

Create `Procfile` in root:

```
web: npm start
release: npm run db:push
```

---

### Vercel + Separate Backend

**Best for**: Deploying frontend separately

#### Frontend (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd client
   vercel --prod
   ```

3. **Configure Environment**
   - Add `VITE_API_URL` pointing to backend URL

#### Backend (Railway/Render)

Deploy backend separately using Railway or Render (see above).

Update CORS settings to allow frontend domain:

```typescript
// server/index-prod.ts
app.use(cors({
  origin: 'https://your-frontend.vercel.app',
  credentials: true
}));
```

---

### DigitalOcean

**Best for**: Full control with VPS

#### Steps

1. **Create Droplet**
   - Ubuntu 22.04 LTS
   - At least 1GB RAM
   - Choose datacenter region

2. **SSH into Server**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install PostgreSQL**
   ```bash
   sudo apt-get install postgresql postgresql-contrib
   ```

5. **Clone Repository**
   ```bash
   git clone https://github.com/darshil0/flighttrackerapp.git
   cd flighttrackerapp
   ```

6. **Install Dependencies**
   ```bash
   npm install
   ```

7. **Set Environment Variables**
   ```bash
   nano .env
   # Add your variables
   ```

8. **Build Application**
   ```bash
   npm run build
   ```

9. **Install PM2** (process manager)
   ```bash
   npm install -g pm2
   ```

10. **Start Application**
    ```bash
    pm2 start dist/server/index-prod.js --name flighttracker
    pm2 save
    pm2 startup
    ```

11. **Configure Nginx** (see Nginx section below)

---

### AWS

**Best for**: Enterprise deployments with AWS infrastructure

#### Using Elastic Beanstalk

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize**
   ```bash
   eb init -p node.js-18 flighttrackerapp
   ```

3. **Create Environment**
   ```bash
   eb create flighttrackerapp-env
   ```

4. **Set Environment Variables**
   ```bash
   eb setenv DATABASE_URL=postgresql://... NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

#### Using EC2

Similar to DigitalOcean VPS approach:
1. Launch EC2 instance (Ubuntu 22.04)
2. Configure security groups (ports 80, 443, 22)
3. Follow DigitalOcean steps above
4. Use RDS for PostgreSQL database

---

## Docker Deployment

### Dockerfile

Create `Dockerfile` in root:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "dist/server/index-prod.js"]
```

### docker-compose.yml

For local testing with Docker:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/flighttracker
      - NODE_ENV=production
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=flighttracker
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres_data:
```

### Docker Commands

```bash
# Build image
docker build -t flighttrackerapp .

# Run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop
docker-compose down
```

---

## Nginx Configuration

If deploying to a VPS, use Nginx as reverse proxy.

### Install Nginx

```bash
sudo apt-get install nginx
```

### Configure Site

Create `/etc/nginx/sites-available/flighttracker`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/flighttracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## SSL/TLS Setup

### Using Certbot (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal (already set up)
sudo certbot renew --dry-run
```

### Updated Nginx Config (with SSL)

Certbot will automatically update your Nginx config to include:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # ... rest of config
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Monitoring

### PM2 Monitoring (for VPS)

```bash
# View logs
pm2 logs flighttracker

# Monitor resources
pm2 monit

# View status
pm2 status
```

### Application Monitoring

Consider using:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **DataDog** - Full-stack monitoring
- **New Relic** - APM

### Database Monitoring

```bash
# Check PostgreSQL connections
SELECT * FROM pg_stat_activity;

# Check database size
SELECT pg_size_pretty(pg_database_size('flighttracker'));
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs flighttracker

# Check environment variables
pm2 env 0

# Restart app
pm2 restart flighttracker
```

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL

# Check if PostgreSQL is running
sudo systemctl status postgresql

# View PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

### Port Already in Use

```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Performance Optimization

### Enable Gzip Compression (Nginx)

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
```

### Add Caching Headers

```nginx
location /assets {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Database Connection Pooling

Adjust in your `.env`:

```env
DATABASE_URL=postgresql://user:pass@host:5432/db?pool_size=10
```

---

## Backup Strategy

### Database Backups

```bash
# Manual backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated daily backups (cron)
0 2 * * * pg_dump $DATABASE_URL > /backups/backup_$(date +\%Y\%m\%d).sql
```

### Restore Database

```bash
psql $DATABASE_URL < backup.sql
```

---

## Scaling

### Horizontal Scaling

1. Use a load balancer (Nginx, AWS ALB)
2. Deploy multiple app instances
3. Use shared PostgreSQL database
4. Configure session storage (Redis)

### Vertical Scaling

1. Upgrade server resources (CPU, RAM)
2. Increase database connection pool
3. Optimize database queries
4. Add database indexes

---

## Security Checklist

- [ ] HTTPS/TLS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] Firewall configured
- [ ] Regular security updates
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Security headers added
- [ ] Database backups automated
- [ ] Monitoring and alerts set up

---

## Post-Deployment

1. **Test the Application**
   - Visit your domain
   - Test all API endpoints
   - Check error handling

2. **Monitor Performance**
   - Watch server resources
   - Monitor response times
   - Check error rates

3. **Set Up Alerts**
   - Downtime alerts
   - Error rate alerts
   - Performance alerts

4. **Documentation**
   - Document deployment process
   - Update environment variables
   - Note any custom configurations

---

## Support

For deployment help:
- Check platform-specific documentation
- Review error logs carefully
- Open an issue on GitHub
- Consult community forums

---

**Last Updated**: 2025-11-24
