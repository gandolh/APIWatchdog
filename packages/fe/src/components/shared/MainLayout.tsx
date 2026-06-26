import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-on-background flex">
      <Sidebar />
      {/* Content offset for sidebar on desktop, top bar on mobile */}
      <main className="flex-1 md:ml-[240px] pt-[60px] md:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
