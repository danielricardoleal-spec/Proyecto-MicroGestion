import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Role } from './data/mockData';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import AppShell from './components/shared/AppShell';
import AdminDashboard from './components/dashboards/AdminDashboard';
import VendedorDashboard from './components/dashboards/VendedorDashboard';
import InventarioDashboard from './components/dashboards/InventarioDashboard';
import RRHHDashboard from './components/dashboards/RRHHDashboard';

const defaultPanel: Record<Role, string> = {
  admin: 'dashboard',
  vendedor: 'nueva-venta',
  inventario: 'productos',
  rrhh: 'trabajadores',
};

function Inner() {
  const { user } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [panel, setPanel] = useState<string>('');

  if (!user) {
    return authView === 'login'
      ? <LoginScreen onGoRegister={() => setAuthView('register')} />
      : <RegisterScreen onGoLogin={() => setAuthView('login')} />;
  }

  const activePanel = panel || defaultPanel[user.role];

  function handleNavigate(id: string) {
    setPanel(id);
  }

  function renderDashboard() {
    switch (user!.role) {
      case 'admin': return <AdminDashboard panel={activePanel} />;
      case 'vendedor': return <VendedorDashboard panel={activePanel} />;
      case 'inventario': return <InventarioDashboard panel={activePanel} />;
      case 'rrhh': return <RRHHDashboard panel={activePanel} />;
    }
  }

  return (
    <AppShell activePanel={activePanel} onNavigate={handleNavigate}>
      {renderDashboard()}
    </AppShell>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}
