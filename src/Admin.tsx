import React, { useEffect, useState } from 'react';

type ClickRow = {
  id: number;
  ts: number;
  ip: string;
  text: string;
  referrer: string;
};

type MessageRow = {
  id: number;
  ts: number;
  from_phone: string;
  message_text: string;
};

const Admin: React.FC = () => {
  const [clicks, setClicks] = useState<ClickRow[]>([]);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'clicks' | 'messages'>('clicks');

  const BASE = (import.meta.env.VITE_BACKEND_URL as string) || '';
  const api = BASE.replace(/\/$/, '') || '';

  const fetchData = async () => {
    setLoading(true);
    try {
      const clicksUrl = api ? `${api}/api/clicks` : '/api/clicks';
      const messagesUrl = api ? `${api}/api/messages` : '/api/messages';

      const [clickRes, msgRes] = await Promise.all([
        fetch(clicksUrl),
        fetch(messagesUrl),
      ]);

      if (!clickRes.ok || !msgRes.ok) throw new Error('Failed to fetch');

      const clickData = await clickRes.json();
      const msgData = await msgRes.json();

      setClicks(clickData);
      setMessages(msgData);
      setError(null);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 shadow">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <a href="/" className="text-blue-600 hover:underline">Back to site</a>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setTab('clicks')}
            className={`px-4 py-2 font-medium border-b-2 ${
              tab === 'clicks'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Clicks ({clicks.length})
          </button>
          <button
            onClick={() => setTab('messages')}
            className={`px-4 py-2 font-medium border-b-2 ${
              tab === 'messages'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Messages ({messages.length})
          </button>
        </div>

        {loading && <div className="text-center py-4">Loading...</div>}
        {error && <div className="text-red-600 py-4">{error}</div>}

        {!loading && !error && tab === 'clicks' && (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-2">When</th>
                  <th className="py-2 px-2">Text</th>
                  <th className="py-2 px-2 hidden sm:table-cell">IP</th>
                  <th className="py-2 px-2 hidden md:table-cell">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {clicks.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0 hover:bg-slate-50">
                    <td className="py-3 px-2">{new Date(r.ts).toLocaleString()}</td>
                    <td className="py-3 px-2 max-w-xs truncate">{r.text}</td>
                    <td className="py-3 px-2 hidden sm:table-cell text-xs">{r.ip}</td>
                    <td className="py-3 px-2 hidden md:table-cell text-xs max-w-md truncate">{r.referrer}</td>
                  </tr>
                ))}
                {clicks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-slate-500">No clicks yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && tab === 'messages' && (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-2">When</th>
                  <th className="py-2 px-2">From</th>
                  <th className="py-2 px-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id} className="border-b last:border-b-0 hover:bg-slate-50">
                    <td className="py-3 px-2">{new Date(m.ts).toLocaleString()}</td>
                    <td className="py-3 px-2 font-mono text-xs">{m.from_phone}</td>
                    <td className="py-3 px-2 max-w-md">{m.message_text}</td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-slate-500">No messages yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
