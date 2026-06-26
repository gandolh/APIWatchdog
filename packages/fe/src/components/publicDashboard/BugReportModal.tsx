import { useState } from 'react';
import type { IApp } from '@apiwatchdog/shared';
import { useAuth } from '../auth/AuthContext';
import { createBugReport } from '../../api/apps';
import Modal from '../shared/Modal';

interface Props { app: IApp; open: boolean; onClose: () => void; }

function lastSegment(url: string): string {
  if (!url) return url;
  const parts = url.replace(/\/$/, '').split('/');
  return parts[parts.length - 1] || url;
}

export default function BugReportModal({ app, open, onClose }: Props) {
  const [endpoint, setEndpoint] = useState('');
  const [state, setState] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const endpoints = Array.from(new Set((app.endpoints ?? []).map(e => e.name)));

  const handleSubmit = async () => {
    if (!endpoint || !state) return;
    setLoading(true);
    try {
      await createBugReport(app.id, endpoint, state, message, currentUser?.email ?? '');
      setEndpoint(''); setState(''); setMessage('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Report a Bug">
      <div className="space-y-stack-md">
        <div className="space-y-1">
          <label className="font-mono text-label-caps text-on-surface-variant">Endpoint</label>
          <select
            value={endpoint} onChange={e => setEndpoint(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface font-mono text-code-md focus:outline-none focus:border-tertiary"
          >
            <option value="">Select endpoint...</option>
            {endpoints.map(ep => <option key={ep} value={ep}>{lastSegment(ep)}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="font-mono text-label-caps text-on-surface-variant">Status</label>
          <select
            value={state} onChange={e => setState(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface font-mono text-code-md focus:outline-none focus:border-tertiary"
          >
            <option value="">Select status...</option>
            <option value="Unstable">Unstable</option>
            <option value="Down">Down</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="font-mono text-label-caps text-on-surface-variant">Message</label>
          <input
            type="text" value={message} onChange={e => setMessage(e.target.value)}
            placeholder="Short description..."
            className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface font-mono text-code-md placeholder:text-on-surface-variant/40 focus:outline-none focus:border-tertiary"
          />
        </div>
        <button
          onClick={() => void handleSubmit()} disabled={loading || !endpoint || !state}
          className="w-full py-2.5 rounded-lg font-mono text-label-caps text-white disabled:opacity-50 hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(90deg, #93000a, #690005)' }}
        >
          {loading ? 'Sending...' : 'Send Report'}
        </button>
      </div>
    </Modal>
  );
}
