interface Props { uptime: number; }

export default function UptimeDonut({ uptime }: Props) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const arc = circumference * (uptime / 100);
  const color = uptime >= 95 ? '#74c69d' : uptime >= 75 ? '#f4a261' : '#ffb4ab';

  return (
    <div className="relative w-[96px] h-[96px] flex items-center justify-center">
      <svg className="absolute inset-0 rotate-[-90deg]" width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#1c1e22" strokeWidth="10" />
        <circle
          cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${arc} ${circumference - arc}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.5s ease' }}
        />
      </svg>
      <span className="relative z-10 font-mono font-bold text-headline-md" style={{ color }}>
        {uptime.toFixed(0)}%
      </span>
    </div>
  );
}
