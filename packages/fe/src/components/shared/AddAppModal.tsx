import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { createApp, addAppToUser } from '../../api/apps';
import Modal from './Modal';

interface Props { open: boolean; onClose: () => void; }

export default function AddAppModal({ open, onClose }: Props) {
  const [appName, setAppName] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async () => {
    if (!appName.trim()) return;
    setLoading(true);
    try {
      const appId = await createApp(appName.trim());
      if (currentUser) await addAppToUser(appId, currentUser.email);
      setAppName('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New App">
      <div className="space-y-stack-md">
        <div className="space-y-1">
          <label className="font-mono text-label-caps text-on-surface-variant">App Name</label>
          <input
            type="text" value={appName} onChange={e => setAppName(e.target.value)}
            placeholder="my-production-api"
            className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface font-mono text-code-md placeholder:text-on-surface-variant/40 focus:outline-none focus:border-tertiary"
            onKeyDown={e => e.key === 'Enter' && void handleSubmit()}
          />
        </div>
        <button
          onClick={() => void handleSubmit()} disabled={loading || !appName.trim()}
          className="w-full py-2.5 rounded-lg font-mono text-label-caps text-white disabled:opacity-50 transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, #4d8eff, #571bc1)' }}
        >
          {loading ? 'Creating...' : 'Create App'}
        </button>
      </div>
    </Modal>
  );
}
