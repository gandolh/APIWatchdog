import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { setPollingInterval } from '../../api/apps';
import Modal from './Modal';

interface Props { open: boolean; onClose: () => void; }

const frequencies = ['5s','10s','15s','30s','1m','5m','10m','15m','30m','1h','2h','3h','6h','12h','1d','3d'];
const periods = ['1h','2h','3h','6h','12h','1d','1w','1M','1y'];

function freqToSeconds(v: string): number {
  const n = parseInt(v);
  const u = v.slice(-1);
  if (u === 's') return n;
  if (u === 'm') return n * 60;
  if (u === 'h') return n * 3600;
  if (u === 'd') return n * 86400;
  return 60;
}

function periodToHours(v: string): number {
  const n = parseInt(v);
  const u = v.slice(-1);
  if (u === 'h') return n;
  if (u === 'd') return n * 24;
  if (u === 'w') return n * 168;
  if (u === 'M') return n * 720;
  if (u === 'y') return n * 8760;
  return 24;
}

export default function SettingsModal({ open, onClose }: Props) {
  const { currentUser, setCurrentUser } = useAuth();
  const [freq, setFreq] = useState('1m');
  const [period, setPeriod] = useState('1d');

  const handleSave = async () => {
    const seconds = freqToSeconds(freq);
    const hours = periodToHours(period);
    if (currentUser) setCurrentUser({ ...currentUser, frequency: seconds, period: hours });
    await setPollingInterval(seconds);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Settings">
      <div className="space-y-stack-md">
        <div className="space-y-1">
          <label className="font-mono text-label-caps text-on-surface-variant">Log Frequency</label>
          <select
            value={freq} onChange={e => setFreq(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface font-mono text-code-md focus:outline-none focus:border-tertiary"
          >
            {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="font-mono text-label-caps text-on-surface-variant">Display Period</label>
          <select
            value={period} onChange={e => setPeriod(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface font-mono text-code-md focus:outline-none focus:border-tertiary"
          >
            {periods.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <button
          onClick={() => void handleSave()}
          className="w-full py-2.5 rounded-lg font-mono text-label-caps text-white hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(90deg, #4d8eff, #571bc1)' }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
