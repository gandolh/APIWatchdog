import { Status } from '@apiwatchdog/shared';

interface Props { status: Status; }

const config: Record<Status, { label: string; bg: string; text: string; border: string; pulse: boolean }> = {
  [Status.STABLE]: { label: 'OPERATIONAL', bg: '#1b4332', text: '#74c69d', border: '#2d6a4f', pulse: true },
  [Status.UNSTABLE]: { label: 'DEGRADED', bg: '#5c4033', text: '#f4a261', border: '#7f4f24', pulse: false },
  [Status.DOWN]: { label: 'MAJOR OUTAGE', bg: '#93000a', text: '#ffdad6', border: 'rgba(255,180,171,0.5)', pulse: false },
};

export default function StatusBadge({ status }: Props) {
  const c = config[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${c.pulse ? 'animate-pulse' : ''}`}
        style={{ background: c.text }}
      />
      {c.label}
    </span>
  );
}

export function statusIcon(status: Status): string {
  if (status === Status.STABLE) return 'check_circle';
  if (status === Status.UNSTABLE) return 'warning';
  return 'cancel';
}

export function statusColor(status: Status): string {
  if (status === Status.STABLE) return '#74c69d';
  if (status === Status.UNSTABLE) return '#f4a261';
  return '#ffb4ab';
}
