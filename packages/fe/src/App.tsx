import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import MainLayout from './components/shared/MainLayout';
import Login from './components/auth/Login';
import PublicDashboard from './components/publicDashboard/PublicDashboard';
import DevDashboard from './components/devDashboard/DevDashboard';
import AppDashboard from './components/individualDashboard/AppDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route index element={<PublicDashboard />} />
            <Route path="devdash" element={<DevDashboard />} />
            <Route path="pubdash/:appId" element={<AppDashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
