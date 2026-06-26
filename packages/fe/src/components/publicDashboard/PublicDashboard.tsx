import { useEffect, useState } from 'react';
import type { IApp } from '@apiwatchdog/shared';
import { getAllApps } from '../../api/apps';
import AppCard, { CreateAppCard } from './AppCard';
import { useAuth } from '../auth/AuthContext';
import AddAppModal from '../shared/AddAppModal';

export default function PublicDashboard() {
  const [apps, setApps] = useState<IApp[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const { currentUser } = useAuth();

  const load = () => { void getAllApps().then(setApps); };
  useEffect(load, []);

  return (
    <>
      {/* Page header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 px-margin-page py-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-headline-lg text-on-surface">Public Dashboard</h2>
          <p className="text-body-md text-on-surface-variant">Real-time status of all monitored applications.</p>
        </div>
        <button onClick={load} className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors text-on-surface" title="Refresh">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>refresh</span>
        </button>
      </div>

      <div className="p-margin-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-stack-md">
          {currentUser && <CreateAppCard onClick={() => setAddOpen(true)} />}
          {apps.map(app => <AppCard key={app.id} app={app} />)}
        </div>
      </div>

      <AddAppModal open={addOpen} onClose={() => { setAddOpen(false); load(); }} />
    </>
  );
}
