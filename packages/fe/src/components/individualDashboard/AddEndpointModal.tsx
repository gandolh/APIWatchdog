import { useState } from 'react';
import { addEndpointToApp } from '../../api/apps';
import Modal from '../shared/Modal';

interface Props { appId: string; open: boolean; onClose: () => void; }

export default function AddEndpointModal({ appId, open, onClose }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      await addEndpointToApp(appId, url.trim());
      setUrl('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Endpoint">
      <div className="space-y-stack-md">
        <div className="space-y-1">
          <label className="font-mono text-label-caps text-on-surface-variant">Endpoint URL</label>
          <input
            type="text" value={url} onChange={e => setUrl(e.target.value)}
            placeholder="https://api.example.com/health"
            className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface font-mono text-code-md placeholder:text-on-surface-variant/40 focus:outline-none focus:border-tertiary"
            onKeyDown={e => e.key === 'Enter' && void handleSubmit()}
          />
        </div>
        <button
          onClick={() => void handleSubmit()} disabled={loading || !url.trim()}
          className="w-full py-2.5 rounded-lg font-mono text-label-caps text-white disabled:opacity-50 hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(90deg, #00a392, #4fdbc8)', color: '#00302a' }}
        >
          {loading ? 'Adding...' : 'Add Endpoint'}
        </button>
      </div>
    </Modal>
  );
}
