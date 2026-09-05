import { useState, ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../data/mockData';
import AIAssistant from './AIAssistant';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

const roleNav: Record<Role, NavItem[]> = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: <GridIcon /> },
    { id: 'ventas', label: 'Ventas', icon: <ChartIcon /> },
    { id: 'inventario', label: 'Inventario', icon: <BoxIcon /> },
    { id: 'trabajadores', label: 'Trabajadores', icon: <UsersIcon /> },
    { id: 'almacenamiento', label: 'Almacenamiento', icon: <DatabaseIcon /> },
    { id: 'reportes', label: 'Reportes', icon: <FileIcon /> },
    { id: 'configuracion', label: 'Configuración', icon: <CogIcon /> },
    { id: 'ia', label: 'Inteligencia Artificial', icon: <AIIcon /> },
  ],
  vendedor: [
    { id: 'nueva-venta', label: 'Registrar venta', icon: <PlusIcon /> },
    { id: 'mis-ventas', label: 'Mis ventas', icon: <ChartIcon /> },
    { id: 'productos', label: 'Productos', icon: <BoxIcon /> },
    { id: 'jornada', label: 'Mi jornada', icon: <ClockIcon /> },
    { id: 'perfil', label: 'Perfil', icon: <UserIcon /> },
    { id: 'ia', label: 'Consejos de IA', icon: <AIIcon /> },
  ],
  inventario: [
    { id: 'productos', label: 'Productos', icon: <BoxIcon /> },
    { id: 'stock', label: 'Stock', icon: <LayersIcon /> },
    { id: 'movimientos', label: 'Movimientos', icon: <ArrowsIcon /> },
    { id: 'almacenamiento', label: 'Almacenamiento', icon: <DatabaseIcon /> },
    { id: 'reportes', label: 'Reportes', icon: <FileIcon /> },
  ],
  rrhh: [
    { id: 'trabajadores', label: 'Trabajadores', icon: <UsersIcon /> },
    { id: 'horarios', label: 'Horarios', icon: <CalendarIcon /> },
    { id: 'asistencia', label: 'Asistencia', icon: <CheckIcon /> },
    { id: 'reportes', label: 'Reportes', icon: <FileIcon /> },
  ],
};

const roleLabels: Record<Role, string> = {
  admin: 'Administrador',
  vendedor: 'Vendedor',
  inventario: 'Encargado de Inventario',
  rrhh: 'Recursos Humanos',
};

interface Props {
  activePanel: string;
  onNavigate: (id: string) => void;
  children: ReactNode;
}

export default function AppShell({ activePanel, onNavigate, children }: Props) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  if (!user) return null;

  const navItems = roleNav[user.role];
  const roleLabel = roleLabels[user.role];
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="flex h-screen bg-[#080d19] overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-14'} shrink-0 bg-[#0f1629] border-r border-[#1e2d4a] flex flex-col transition-all duration-200`}>
        {/* Logo */}
        <div className="h-14 flex items-center gap-2.5 px-3.5 border-b border-[#1e2d4a]">
          <div className="w-7 h-7 rounded-lg bg-[#3b7eff] flex items-center justify-center shrink-0">
            <span className="font-heading font-bold text-white text-[10px]">MG</span>
          </div>
          {sidebarOpen && <span className="font-heading text-sm font-bold text-white">MicroGestión</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activePanel === item.id
                  ? 'bg-[#3b7eff]/15 text-[#3b7eff]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#162035]'
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="w-4 h-4 shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-[#1e2d4a]">
          <div className={`flex items-center gap-2.5 ${!sidebarOpen ? 'justify-center' : ''}`}>
            <div className="w-7 h-7 rounded-full bg-[#3b7eff]/20 border border-[#3b7eff]/40 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-[#3b7eff]">{initials}</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white truncate">{user.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{roleLabel}</div>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={logout}
              className="mt-2.5 w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-500 hover:text-[#ef4444] hover:bg-[#ef4444]/5 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-[#0f1629] border-b border-[#1e2d4a] flex items-center px-4 gap-3 shrink-0">
          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1">
            <span className="text-sm font-heading font-semibold text-white capitalize">
              {navItems.find(n => n.id === activePanel)?.label ?? 'Panel'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{new Date().toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <div className="w-1 h-1 rounded-full bg-[#1e2d4a]" />
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#3b7eff]/15 text-[#3b7eff] font-medium">{roleLabel}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>

      <AIAssistant />
    </div>
  );
}

// Inline icon components
function GridIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>; }
function ChartIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>; }
function BoxIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>; }
function UsersIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>; }
function DatabaseIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>; }
function FileIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>; }
function CogIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
function AIIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>; }
function PlusIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>; }
function ClockIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function UserIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>; }
function LayersIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4L2 9l10 5 10-5-10-5zM2 14l10 5 10-5M2 19l10 5 10-5" /></svg>; }
function ArrowsIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>; }
function CalendarIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>; }
function CheckIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
