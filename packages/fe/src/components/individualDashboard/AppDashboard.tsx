import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { IApp, IEndpoint } from '@apiwatchdog/shared';
import { Status } from '@apiwatchdog/shared';
import { getAppWithLogs, markReportFixed } from '../../api/apps';
import { useAuth } from '../auth/AuthContext';
import StatusBadge, { statusColor, statusIcon } from '../publicDashboard/StatusBadge';
import EndpointLogBars from './EndpointLogBars';
import UptimeDonut from './UptimeDonut';
import AddEndpointModal from './AddEndpointModal';

function uptime(ep: IEndpoint): number {
  const logs = ep.logs ?? [];
  if (!logs.length) return 100;
  const ok = logs.filter(l => l.response >= 200 && l.response < 300).length;
  return (ok / logs.length) * 100;
}

function lastSegment(url: string): string {
  if (!url) return url;
  const parts = url.replace(/\/$/, '').split('/');
  return parts[parts.length - 1] || url;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function AppDashboard() {
  const { appId } = useParams<{ appId: string }>();
  const [app, setApp] = useState<IApp | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [addEpOpen, setAddEpOpen] = useState(false);

  const hours = currentUser?.period ?? 24;

  const load = async () => {
    if (!appId) return;
    const data = await getAppWithLogs(appId, hours);
    setApp(data);
  };

  useEffect(() => { void load(); }, [appId]);

  if (!app) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="font-mono text-label-caps text-on-surface-variant">Loading…</span>
      </div>
    );
  }

  const endpoints = app.endpoints ?? [];
  const reports = app.reports ?? [];
  const openReports = reports.filter(r => !r.fixed);

  const totalLogs = endpoints.reduce((s, ep) => s + (ep.logs?.length ?? 0), 0);
  const okLogs = endpoints.reduce((s, ep) => s + (ep.logs ?? []).filter(l => l.response >= 200 && l.response < 300).length, 0);
  const overallUptime = totalLogs ? (okLogs / totalLogs) * 100 : 100;

  return (
    <>
      {/* Page header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 px-margin-page py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-headline-lg text-on-surface truncate">{app.appName}</h2>
        </div>
        <StatusBadge status={app.status} />
        <button onClick={() => void load()} className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors text-on-surface" title="Refresh">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>refresh</span>
        </button>
      </div>

      <div className="p-margin-page space-y-stack-lg">
        {/* Bento summary row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-md">
          {[
            { label: 'Overall Uptime', value: `${overallUptime.toFixed(1)}%`, icon: 'show_chart', color: statusColor(app.status) },
            { label: 'Endpoints', value: String(endpoints.length), icon: 'account_tree', color: '#adc6ff' },
            { label: 'Open Reports', value: String(openReports.length), icon: 'bug_report', color: openReports.length ? '#ffb4ab' : '#74c69d' },
            { label: 'Period', value: `${hours}h`, icon: 'schedule', color: '#d0bcff' },
          ].map(card => (
            <div key={card.label} className="p-4 rounded-xl bg-surface-container border border-outline-variant/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: card.color }}>{card.icon}</span>
                <span className="font-mono text-label-caps text-on-surface-variant">{card.label}</span>
              </div>
              <span className="font-bold text-display" style={{ color: card.color }}>{card.value}</span>
            </div>
          ))}
        </div>

        {/* Endpoints section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-headline-md text-on-surface">Endpoints</h3>
            {currentUser && (
              <button
                onClick={() => setAddEpOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-label-caps hover:opacity-90 transition-opacity"
                style={{ background: 'rgba(0,163,146,0.12)', color: '#4fdbc8' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
                Add Endpoint
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-md">
            {endpoints.map(ep => {
              const ep_uptime = uptime(ep);
              const logs = ep.logs ?? [];
              return (
                <div key={ep.id} className="p-4 rounded-xl bg-surface-container border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined icon-fill" style={{ fontSize: 16, color: statusColor(ep.status) }}>
                        {statusIcon(ep.status)}
                      </span>
                      <span className="font-mono text-code-md text-on-surface truncate" title={ep.name}>{lastSegment(ep.name)}</span>
                    </div>
                    <UptimeDonut uptime={ep_uptime} />
                  </div>
                  <EndpointLogBars logs={logs} />
                  {logs.length > 0 && (
                    <p className="font-mono text-[10px] text-on-surface-variant/60 mt-1">
                      Last: HTTP {logs[logs.length - 1]?.response} · {formatTime(logs[logs.length - 1]?.time ?? '')}
                    </p>
                  )}
                </div>
              );
            })}
            {endpoints.length === 0 && (
              <div className="col-span-2 py-12 flex flex-col items-center text-on-surface-variant/60">
                <span className="material-symbols-outlined mb-2" style={{ fontSize: 40 }}>sensors</span>
                <p className="font-mono text-label-caps">No endpoints yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Reports */}
        {reports.length > 0 && (
          <div>
            <h3 className="font-semibold text-headline-md text-on-surface mb-4">Bug Reports</h3>
            <div className="space-y-2">
              {reports.map(report => (
                <div key={report.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-opacity ${report.fixed ? 'opacity-40' : ''}`}
                  style={{ background: '#1c0809', borderColor: 'rgba(255,180,171,0.15)' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: report.fixed ? '#74c69d' : '#ffb4ab' }}>
                      {report.fixed ? 'check_circle' : 'error'}
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-code-md text-on-surface truncate">{lastSegment(report.endpoint)}</p>
                      <p className="text-body-sm text-on-surface-variant truncate">{report.message || report.state}</p>
                    </div>
                  </div>
                  {!report.fixed && currentUser && (
                    <button
                      onClick={() => void markReportFixed(app.id, report.id).then(load)}
                      className="shrink-0 ml-4 px-3 py-1.5 rounded-lg font-mono text-label-caps border border-outline-variant/20 hover:border-tertiary/50 hover:text-tertiary transition-colors text-on-surface-variant"
                    >
                      Mark Fixed
                    </button>
                  )}
                  {report.fixed && (
                    <span className="shrink-0 ml-4 font-mono text-label-caps" style={{ color: '#74c69d' }}>Fixed</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AddEndpointModal appId={app.id} open={addEpOpen} onClose={() => { setAddEpOpen(false); void load(); }} />
    </>
  );
}
