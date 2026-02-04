require('dotenv').config();
const path = require('path');
const express = require('express');
const Database = require('better-sqlite3');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend build
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

const DB_PATH = path.join(__dirname, 'clicks.db');
const db = new Database(DB_PATH);
db.prepare('CREATE TABLE IF NOT EXISTS clicks (id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER, ip TEXT, text TEXT, referrer TEXT)').run();
db.prepare('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER, from_phone TEXT, message_text TEXT, message_id TEXT UNIQUE)').run();

const PHONE = process.env.PHONE; // e.g. 255712345678 (no +)
const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || 'atikwanduka-secret';
if (!PHONE) {
  console.error('Missing PHONE in environment. Create a .env with PHONE=2557xxxxx');
}

app.get('/api/whatsapp', (req, res) => {
  if (!PHONE) return res.status(500).send('Server not configured');

  const text = req.query.text ? String(req.query.text) : 'Hello';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const ref = req.get('referer') || '';

  try {
    db.prepare('INSERT INTO clicks (ts, ip, text, referrer) VALUES (?, ?, ?, ?)').run(Date.now(), ip, text, ref);
  } catch (err) {
    console.error('DB insert error', err);
  }

  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  res.redirect(url);
});

// Return recent click logs (limit optional via ?limit=100). Secure this in production.
app.get('/api/clicks', (req, res) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit)) || 200, 1000);
    const rows = db.prepare('SELECT id, ts, ip, text, referrer FROM clicks ORDER BY ts DESC LIMIT ?').all(limit);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching clicks', err);
    res.status(500).json({ error: 'failed' });
  }
});

// Return recent incoming messages
app.get('/api/messages', (req, res) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit)) || 200, 1000);
    const rows = db.prepare('SELECT id, ts, from_phone, message_text FROM messages ORDER BY ts DESC LIMIT ?').all(limit);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching messages', err);
    res.status(500).json({ error: 'failed' });
  }
});

// Webhook verification: WhatsApp sends GET with challenge
app.get('/api/whatsapp-webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];

  if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
    console.log('Webhook verified');
    res.status(200).send(String(challenge));
  } else {
    res.status(403).json({ error: 'forbidden' });
  }
});

// Webhook for receiving incoming messages from WhatsApp
app.post('/api/whatsapp-webhook', (req, res) => {
  res.status(200).json({ received: true }); // Respond immediately to WhatsApp

  try {
    const body = req.body;
    if (!body.entry || !body.entry[0]) return;

    const entry = body.entry[0];
    if (!entry.changes || !entry.changes[0]) return;

    const changes = entry.changes[0];
    if (changes.field !== 'messages') return;

    const value = changes.value;
    if (!value.messages || !value.messages[0]) return;

    const message = value.messages[0];
    const fromPhone = message.from; // e.g. 255712345678
    const messageId = message.id; // unique message ID
    let messageText = '';

    if (message.type === 'text') {
      messageText = message.text?.body || '';
    } else {
      messageText = `[${message.type}]`; // e.g. [image], [document]
    }

    if (messageText) {
      db.prepare('INSERT OR IGNORE INTO messages (ts, from_phone, message_text, message_id) VALUES (?, ?, ?, ?)').run(
        Date.now(),
        fromPhone,
        messageText,
        messageId
      );
      console.log(`Message from ${fromPhone}: ${messageText}`);
    }
  } catch (err) {
    console.error('Webhook processing error:', err);
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

// SPA fallback: serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
