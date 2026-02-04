# Atikwanduka Digital Solutions - Hosting Guide

## ✅ Setup Complete - Your Website is Ready to Host!

### Project Structure
```
├── dist/                 # Production build (ready to deploy)
├── server/              # Express.js backend
├── src/                 # React frontend source
├── .env                 # Environment variables (DO NOT commit)
├── .env.example         # Template for environment variables
├── vite.config.js       # Vite build configuration
└── package.json         # Dependencies
```

## Quick Start (Local Testing)

### 1. Install Dependencies
```bash
npm install
cd server && npm install
```

### 2. Build Frontend
```bash
npm run build
```

### 3. Start Server
```bash
cd server
npm start
```

The website will be available at: **http://localhost:5000**

## Environment Variables (.env)

Your `.env` file must contain:

```env
# Frontend - Backend URL
VITE_BACKEND_URL=http://localhost:5000

# WhatsApp Configuration
PHONE=255712345678

# Webhook Verification Token
WEBHOOK_VERIFY_TOKEN=atikwanduka-secret

# Server Port
PORT=5000
```

**Important:** 
- Replace `PHONE` with your actual WhatsApp business number
- Replace `WEBHOOK_VERIFY_TOKEN` with a secure token for WhatsApp webhooks
- Never commit `.env` file to Git

## Production Deployment Checklist

### For Any Hosting Provider (Heroku, Render, Railway, etc.)

1. **Set Environment Variables**
   ```
   PHONE=your_phone_number
   WEBHOOK_VERIFY_TOKEN=your_secure_token
   VITE_BACKEND_URL=your_production_url
   PORT=5000
   ```

2. **Build Command**
   ```bash
   npm install && npm run build
   ```

3. **Start Command**
   ```bash
   cd server && npm start
   ```

4. **Key Files Ready**
   - ✅ `dist/` - Compiled React frontend
   - ✅ `server/` - Express backend with SQLite
   - ✅ `vite.config.js` - Vite build config
   - ✅ `.env.example` - Reference template

## Deployment Options

### Option A: Render (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Render auto-builds and deploys

### Option B: Railway
1. Connect GitHub repo
2. Set environment variables
3. Auto-deploys on push

### Option C: Docker (Any Host)
Create `Dockerfile`:
```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
WORKDIR /app/server
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

### Option D: Heroku (Legacy)
```bash
heroku create your-app-name
heroku config:set PHONE=... WEBHOOK_VERIFY_TOKEN=...
git push heroku main
```

## Database
- **Type:** SQLite (better-sqlite3)
- **Location:** `server/clicks.db`
- **Tables:** 
  - `clicks` - Button click logs
  - `messages` - Incoming WhatsApp messages

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Homepage (SPA) |
| `/admin` | GET | Admin panel |
| `/api/whatsapp` | GET | WhatsApp redirect link |
| `/api/clicks` | GET | View click logs |
| `/api/messages` | GET | View incoming messages |
| `/api/whatsapp-webhook` | POST | WhatsApp webhook receiver |
| `/api/health` | GET | Health check |

## Frontend Configuration
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Router:** React Router
- **State:** Zustand
- **Animations:** Framer Motion, GSAP
- **3D:** Three.js

## Server Configuration
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (better-sqlite3)
- **Port:** 5000
- **Static Files:** Served from `/dist`

## Troubleshooting

### Build Fails
- Ensure Node.js v18+ is installed
- Run: `npm install` and `npm run build`
- Check for missing dependencies

### Server Won't Start
- Verify `.env` file exists with `PHONE` variable
- Check port 5000 isn't already in use
- Run: `cd server && npm install`

### API Calls Fail
- Verify `VITE_BACKEND_URL` in `.env`
- Check server is running
- Inspect browser console for CORS errors

### WhatsApp Integration
- Update `PHONE` variable with correct number (no +)
- Verify `WEBHOOK_VERIFY_TOKEN` matches WhatsApp settings
- Test redirect at `/api/whatsapp?text=hello`

## Security Notes
- ⚠️ Never commit `.env` to Git
- ⚠️ Use strong `WEBHOOK_VERIFY_TOKEN` for production
- ⚠️ Enable HTTPS in production
- ⚠️ Secure the admin endpoint (`/admin`)
- ⚠️ Rate limit API endpoints for production

## Next Steps
1. Update PHONE number with your WhatsApp business number
2. Set a secure WEBHOOK_VERIFY_TOKEN
3. Test locally: `npm run build && cd server && npm start`
4. Deploy to your chosen hosting provider
5. Configure WhatsApp webhook URL to: `https://your-domain.com/api/whatsapp-webhook`

---
**All systems ready for production! 🚀**
