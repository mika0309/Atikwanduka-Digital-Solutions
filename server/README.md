# Atikwanduka Server

Small Express backend used to redirect clicks to WhatsApp, log them, and receive incoming messages via WhatsApp Business API webhook.

## Getting started

1. `cd server`
2. `npm install`
3. Copy `.env.example` to `.env` and set:
   - `PHONE`: your WhatsApp Business number (no leading `+`, e.g. `2557...`)
   - `WEBHOOK_VERIFY_TOKEN`: a secret token for webhook verification
4. `npm run dev` (requires `nodemon`) or `npm start`

## Endpoints

- `GET /api/whatsapp?text=...` — logs click and redirects to WhatsApp Web/mobile.
- `GET /api/clicks` — returns recent click logs.
- `GET /api/messages` — returns recent incoming messages.
- `GET /api/health` — simple health check.
- `GET /api/whatsapp-webhook` — webhook verification (WhatsApp sends challenge).
- `POST /api/whatsapp-webhook` — webhook for receiving incoming messages.

## Setting up WhatsApp Business API Webhook

1. Register for WhatsApp Business API at [developers.facebook.com](https://developers.facebook.com)
2. Create a Business App and get a **Phone Number ID** and **Access Token**
3. Go to **Configuration** → **Webhooks**
4. Set webhook URL to: `https://your-domain.com/api/whatsapp-webhook`
5. Verify token: use the `WEBHOOK_VERIFY_TOKEN` from your `.env`
6. Subscribe to `messages` (and optionally `message_status`)

Once approved, incoming messages will be logged in the `messages` table and visible in the admin UI at `/admin`.

## Admin Dashboard

Access the dashboard at `/admin` to see:
- **Clicks tab**: all outbound WhatsApp clicks
- **Messages tab**: all incoming WhatsApp messages (requires webhook setup)
