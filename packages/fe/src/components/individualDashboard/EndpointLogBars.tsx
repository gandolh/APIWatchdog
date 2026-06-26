import type { ILog } from '@apiwatchdog/shared';

interface Props { logs: ILog[]; }

function getColor(response: number): string {
  if (response >= 200 && response < 300) return '#74c69d';
  if (response >= 300 && response < 500) return '#f4a261';
  return '#ffb4ab';
}

export default function EndpointLogBars({ logs }: Props) {
  return (
    <div className="flex items-end gap-[2px] h-[36px]">
      {logs.map(log => (
        <div
          key={log.id}
          title={`HTTP ${log.response} · ${new Date(log.time).toLocaleString()}`}
          className="w-2 rounded-sm h-[14px] cursor-default transition-all hover:h-9"
          style={{ background: getColor(log.response) }}
        />
      ))}
    </div>
  );
}
