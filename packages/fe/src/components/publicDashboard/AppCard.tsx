import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IApp } from '@apiwatchdog/shared';
import StatusBadge, { statusIcon, statusColor } from './StatusBadge';
import BugReportModal from './BugReportModal';
import { useAuth } from '../auth/AuthContext';

interface Props {
  app: IApp;
  isDevDashboard?: boolean;
}

function lastSegment(url: string): string {
  if (!url) return url;
  const parts = url.replace(/\/$/, '').split('/');
  return parts[parts.length - 1] || url;
}

export default function AppCard({ app, isDevDashboard = false }: Props) {
  const [bugOpen, setBugOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const endpoints = app.endpoints ?? [];
  const visibleEndpoints = endpoints.slice(0, 3);
  const overflow = endpoints.length - 3;

  return (
    <>
      <div className="group flex flex-col p-5 bg-surface-container border border-outline-variant/10 rounded-xl min-h-[220px] relative overflow-hidden hover:border-outline-variant/30 transition-colors cursor-pointer"
        onClick={() => navigate(`/pubdash/${app.id}`)}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-headline-md text-on-surface truncate pr-8">{app.appName}</h3>
          <button
            onClick={e => { e.stopPropagation(); setBugOpen(true); }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            style={{ background: 'rgba(147,0,10,0.2)', color: '#ffb4ab' }}
            title="Report a bug"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>bug_report</span>
          </button>
        </div>

        {/* Status badge */}
        <div className="mb-4">
          <StatusBadge status={app.status} />
        </div>

        <div className="w-full h-px bg-outline-variant/10 my-1" />

        {/* Endpoints */}
        <div className="mt-3 flex-1 flex flex-col gap-2">
          {visibleEndpoints.map(ep => (
            <div key={ep.id} className="flex items-center justify-between font-mono text-code-md">
              <span className="text-on-surface-variant truncate">{lastSegment(ep.name)}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: statusColor(ep.status) }}>
                {statusIcon(ep.status)}
              </span>
            </div>
          ))}
          {overflow > 0 && (
            <span className="font-mono text-[10px] text-primary-container bg-primary-container/10 px-2 py-0.5 rounded self-start">
              +{overflow} more endpoints
            </span>
          )}
        </div>

        {/* Dev dashboard button */}
        {isDevDashboard && currentUser && (
          <button
            onClick={e => { e.stopPropagation(); navigate(`/pubdash/${app.id}`); }}
            className="mt-3 w-full py-1.5 rounded-lg border border-outline-variant text-on-surface-variant font-mono text-label-caps hover:border-primary hover:text-primary transition-colors"
          >
            Open Dashboard
          </button>
        )}
      </div>

      <BugReportModal app={app} open={bugOpen} onClose={() => setBugOpen(false)} />
    </>
  );
}

export function CreateAppCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-6 bg-surface-container hover:bg-surface-container-high border border-outline-variant/10 hover:border-tertiary-container/50 rounded-xl min-h-[220px] transition-all duration-200 w-full"
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: 'rgba(0,163,146,0.1)', color: '#00a392' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>add</span>
      </div>
      <span className="font-semibold text-headline-md" style={{ color: '#00a392' }}>Create App</span>
      <span className="font-normal text-body-sm text-on-surface-variant mt-2 text-center">Add a new application to monitoring.</span>
    </button>
  );
}
