# Pre-Deployment Checklist

## ✅ Local Setup (Completed)
- [x] `vite.config.js` created with production build config
- [x] Frontend successfully builds to `dist/` folder
- [x] `terser` package installed for minification
- [x] `.env` file created with required variables
- [x] `.env.example` template created for reference
- [x] Server updated to serve static files from `dist/`
- [x] API routes configured and tested
- [x] SPA fallback route added for client-side routing

## 📝 Before Deploying

### Environment Variables
- [ ] Update `PHONE` with your WhatsApp business number
- [ ] Generate and set secure `WEBHOOK_VERIFY_TOKEN`
- [ ] Set `VITE_BACKEND_URL` to production domain
- [ ] Do NOT commit `.env` file

### Code Review
- [ ] Remove any console.log/debug statements
- [ ] Review API endpoints for security
- [ ] Check database queries for SQL injection
- [ ] Verify CORS settings if needed

### Testing
- [ ] Run `npm run build` without errors
- [ ] Test locally: `npm run build && cd server && npm start`
- [ ] Test admin panel at `/admin`
- [ ] Test WhatsApp link at `/api/whatsapp?text=hello`
- [ ] Test API endpoints manually

## 🚀 Deployment Steps

### Step 1: Choose Hosting Provider
Options: Render, Railway, Vercel, Heroku, AWS, DigitalOcean, etc.

### Step 2: Push to Git
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 3: Set Up Hosting
1. Connect your GitHub repository
2. Set build command: `npm install && npm run build`
3. Set start command: `cd server && npm start`
4. Add environment variables:
   - PHONE
   - WEBHOOK_VERIFY_TOKEN
   - PORT=5000

### Step 4: Deploy
- Click "Deploy" in hosting provider dashboard
- Wait for build to complete
- Test the live URL

### Step 5: Configure WhatsApp Webhook
1. Go to Meta/WhatsApp Business Platform
2. Set webhook URL: `https://your-domain.com/api/whatsapp-webhook`
3. Set verify token to match your `WEBHOOK_VERIFY_TOKEN`
4. Subscribe to messages

## 📊 Post-Deployment Verification

- [ ] Website loads at your domain
- [ ] Admin panel accessible at `/admin`
- [ ] WhatsApp button redirects correctly
- [ ] Database files created (clicks.db)
- [ ] Check server logs for errors
- [ ] Monitor API response times

## 🔐 Security Checklist

- [ ] HTTPS enabled (hosting provider handles this)
- [ ] Environment variables stored securely
- [ ] `.env` file in `.gitignore`
- [ ] Strong webhook verification token
- [ ] Rate limiting enabled (if needed)
- [ ] Database backup strategy planned

## 📦 Build Artifacts

All ready for production:
```
dist/
  ├── index.html          (Main page)
  ├── assets/
  │   ├── index-*.css    (Minified CSS)
  │   ├── index-*.js     (Minified React)
  │   ├── vendor-*.js    (React, Router, etc.)
  │   └── *.png          (Optimized images)
  
server/
  ├── index.js           (Express server)
  ├── package.json
  └── clicks.db          (SQLite database - created on first run)
```

## 📱 Mobile Testing
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test WhatsApp integration on mobile
- [ ] Test responsive design

## 🆘 Common Issues & Fixes

### Issue: "PHONE environment variable not set"
- **Fix:** Add PHONE to .env and hosting provider settings

### Issue: "Port already in use"
- **Fix:** Change PORT in .env or kill process using port 5000

### Issue: "Cannot GET /admin"
- **Fix:** Verify SPA fallback route is configured in server/index.js

### Issue: "WhatsApp link not working"
- **Fix:** Check PHONE format (no + sign), verify it's in .env

---

**You're all set! 🎉 Ready to deploy to production.**
