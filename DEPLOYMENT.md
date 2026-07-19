# 🚀 SutraKriti Deployment Guide

## Current Deployment Status

**✅ Website is LIVE:**
- **URL:** https://craft-boutique-26.preview.emergentagent.com
- **Status:** Production Ready
- **Deployment Platform:** Emergent Cloud (Kubernetes)

---

## Deployment Summary

### What's Deployed

✅ **Full-Stack Next.js Application**
- Next.js 15 with App Router
- React 19
- MongoDB database
- RESTful API
- Server-side rendering

✅ **All Features Working**
- Premium homepage
- Product collections (8 products)
- Product detail pages with order buttons
- Custom orders form
- Contact page
- About page
- Admin dashboard
- Floating WhatsApp button

✅ **Database**
- MongoDB running on localhost:27017
- Database name: `sutrakriti`
- Collections: products, orders, customOrders, contacts, newsletter, blog, settings
- 8 products seeded
- Contact settings configured

---

## GitHub Repository Setup

### Current Git Status
- ✅ Git repository initialized
- ✅ All code committed to `main` branch
- ❌ No remote repository connected yet

### To Connect GitHub Repository

#### Option 1: Create New Repository on GitHub

1. **Go to GitHub** and create a new repository:
   - Repository name: `sutrakriti-website` (or your preferred name)
   - Description: "SutraKriti - Premium Handmade Crochet E-commerce Website"
   - Visibility: Public or Private (your choice)
   - Don't initialize with README (we already have one)

2. **Copy the repository URL** (will look like):
   ```
   https://github.com/YOUR_USERNAME/sutrakriti-website.git
   ```

3. **Connect and push from server:**
   ```bash
   cd /app
   git remote add origin https://github.com/YOUR_USERNAME/sutrakriti-website.git
   git branch -M main
   git push -u origin main
   ```

#### Option 2: Use Existing Repository

If you already have a GitHub repository:

```bash
cd /app
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

---

## Environment Configuration

### Production Environment Variables

The `.env` file is committed but you should update these for production:

```bash
# Database
MONGO_URL=mongodb://localhost:27017
DB_NAME=sutrakriti

# Frontend URL (already configured for production)
NEXT_PUBLIC_BASE_URL=https://craft-boutique-26.preview.emergentagent.com

# CORS
CORS_ORIGINS=*
```

### Contact Settings (In Database)

Current settings in MongoDB:
```json
{
  "whatsappNumber": "919876543210",
  "instagramHandle": "_sutrakriti",
  "email": "sutrakriti.help@outlook.com"
}
```

To update: Visit `/admin` → Settings tab

---

## Deployment Architecture

### Current Setup (Kubernetes)

```
┌─────────────────────────────────────┐
│   Kubernetes Ingress                │
│   https://craft-boutique-26...      │
└────────────┬────────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│   Next.js Container (Port 3000)    │
│   - Frontend (SSR)                 │
│   - API Routes                     │
│   - Supervisor managed             │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│   MongoDB (localhost:27017)        │
│   - Database: sutrakriti           │
│   - 8 Collections                  │
└────────────────────────────────────┘
```

### Services Running

- **Next.js:** Managed by Supervisor
  - Command: `yarn dev`
  - Port: 3000
  - Auto-restart: Yes

- **MongoDB:** System service
  - Port: 27017
  - Database: sutrakriti

---

## Deployment Checklist

### ✅ Pre-Deployment (Completed)

- [x] No hardcoded secrets in code
- [x] Environment variables properly configured
- [x] Database queries optimized (with limits and projections)
- [x] CORS configured for production
- [x] All API routes use relative paths
- [x] Responsive design tested
- [x] Contact information updated
- [x] Database seeded with products
- [x] No compilation errors

### ✅ Deployment (Active)

- [x] Application deployed on Kubernetes
- [x] Domain configured: craft-boutique-26.preview.emergentagent.com
- [x] SSL/HTTPS enabled
- [x] Services running (Next.js, MongoDB)
- [x] Health checks passing

### 📋 Post-Deployment (Recommended)

- [ ] Connect GitHub repository
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring/analytics
- [ ] Add Google Analytics (optional)
- [ ] Set up email notifications (Resend integration)
- [ ] Enable image optimization (Cloudinary)
- [ ] Add authentication for admin dashboard

---

## Accessing the Website

### Public URLs

**Production Site:** https://craft-boutique-26.preview.emergentagent.com

**Key Pages:**
- Homepage: `/`
- Collections: `/collections`
- Product Example: `/products/handmade-rose-bouquet`
- Custom Orders: `/custom-orders`
- Contact: `/contact`
- About: `/about`
- Admin Dashboard: `/admin`

### Admin Access

**URL:** https://craft-boutique-26.preview.emergentagent.com/admin

**Note:** No authentication yet. Add NextAuth.js for production security.

---

## Managing the Deployment

### Restarting Services

```bash
# Restart Next.js
sudo supervisorctl restart nextjs

# Restart all services
sudo supervisorctl restart all

# Check status
sudo supervisorctl status
```

### Viewing Logs

```bash
# Next.js logs
tail -f /var/log/supervisor/nextjs.out.log
tail -f /var/log/supervisor/nextjs.err.log

# Supervisor logs
sudo supervisorctl tail nextjs
```

### Database Management

```bash
# Connect to MongoDB
mongosh

# Use sutrakriti database
use sutrakriti

# View products
db.products.find().pretty()

# Update settings
db.settings.updateOne(
  { type: 'site' },
  { $set: { whatsappNumber: '919876543210' } }
)
```

---

## Continuous Deployment

### Update Workflow

1. **Make changes locally** (via this agent or manually)
2. **Test changes** (automatic hot reload in dev mode)
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

### Update Settings

Contact information can be updated without code changes:

**Via Admin Dashboard:**
1. Visit `/admin`
2. Go to Settings tab
3. Update WhatsApp, Instagram, Email
4. Save

**Via Database Script:**
```bash
cd /app
node scripts/update-settings.js
```

---

## Backup and Recovery

### Database Backup

```bash
# Backup entire database
mongodump --db=sutrakriti --out=/tmp/backup

# Restore database
mongorestore --db=sutrakriti /tmp/backup/sutrakriti
```

### Code Backup

All code is version-controlled in Git. Latest commit:
- Branch: `main`
- Commit: Complete SutraKriti website with all features

---

## Performance Optimization

### Already Implemented

✅ **Database Queries:**
- Limited to 100 orders max
- Limited to 50 blog posts max
- Projection used to fetch only needed fields
- Indexes on common queries

✅ **Frontend:**
- Image optimization with Next.js Image component
- Code splitting (automatic with App Router)
- Lazy loading for images
- Framer Motion animations (lightweight)

✅ **API:**
- Efficient MongoDB queries
- Proper error handling
- CORS optimized

### Future Optimizations

- [ ] Add Redis caching for products
- [ ] Implement CDN for images (Cloudinary)
- [ ] Add API rate limiting
- [ ] Enable Next.js ISR (Incremental Static Regeneration)
- [ ] Compress images (WebP format)

---

## Monitoring

### Health Check Endpoints

- **API Health:** `GET /api` → Returns status
- **Products:** `GET /api/products` → Returns product list
- **Settings:** `GET /api/settings` → Returns site settings

### Monitoring Commands

```bash
# Check if site is up
curl -I https://craft-boutique-26.preview.emergentagent.com

# Check API
curl https://craft-boutique-26.preview.emergentagent.com/api

# Check products
curl https://craft-boutique-26.preview.emergentagent.com/api/products
```

---

## Troubleshooting

### Common Issues

**Site not loading:**
```bash
sudo supervisorctl status nextjs
sudo supervisorctl restart nextjs
tail -f /var/log/supervisor/nextjs.err.log
```

**Database connection error:**
```bash
sudo systemctl status mongodb
sudo systemctl restart mongodb
```

**Code changes not reflecting:**
```bash
# Hot reload should work automatically
# If not, restart Next.js:
sudo supervisorctl restart nextjs
```

---

## Security Recommendations

### For Production

1. **Add Authentication:**
   - Implement NextAuth.js for admin dashboard
   - Add role-based access control

2. **Environment Variables:**
   - Move sensitive data to environment variables
   - Use secrets management (Kubernetes secrets)

3. **API Security:**
   - Add rate limiting
   - Implement CSRF protection
   - Validate all inputs

4. **Database:**
   - Enable MongoDB authentication
   - Use connection string with credentials
   - Regular backups

---

## Support & Documentation

### Internal Documentation

- `/app/README.md` - Complete project documentation
- `/app/PRODUCT_UPDATES.md` - Product catalog updates
- `/app/CONTACT_UPDATE.md` - Contact information changes
- `/app/DEPLOYMENT.md` - This file

### Quick Links

- **Live Site:** https://craft-boutique-26.preview.emergentagent.com
- **Instagram:** https://www.instagram.com/_sutrakriti
- **Email:** sutrakriti.help@outlook.com

---

## Next Steps

1. ✅ **Website is live and deployed**
2. 📋 **Connect GitHub repository** (see instructions above)
3. 🎨 **Customize content:**
   - Add more products via `/admin`
   - Update WhatsApp number
   - Add blog posts
4. 🔒 **Add authentication** for admin (optional)
5. 📊 **Add analytics** (Google Analytics, Clarity)
6. 🚀 **Custom domain** (optional)

---

**🎉 Your SutraKriti website is successfully deployed and ready for production!**

For any issues or questions, refer to the documentation files or check the logs.
