import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import FaceCapture from './FaceCapture';

interface Props {
  onGoRegister: () => void;
}

export default function LoginScreen({ onGoRegister }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFace, setShowFace] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = login(email, password);
    setLoading(false);
    if (!result.success) setError(result.error || 'Error al iniciar sesión');
  }

  const demoAccounts = [
    { role: 'Admin', email: 'admin@microge.com', color: '#3b7eff' },
    { role: 'Vendedor', email: 'ventas@microge.com', color: '#00d4aa' },
    { role: 'Inventario', email: 'inventario@microge.com', color: '#f59e0b' },
    { role: 'RRHH', email: 'rrhh@microge.com', color: '#a78bfa' },
  ];

  return (
    <div className="min-h-screen bg-[#080d19] flex items-center justify-center p-4">
      {showFace && (
        <FaceCapture
          mode="login"
          onSuccess={() => setShowFace(false)}
          onCancel={() => setShowFace(false)}
        />
      )}

      <div className="w-full max-w-sm animate-fade-up">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#3b7eff] flex items-center justify-center shadow-lg shadow-[#3b7eff]/30">
              <span className="font-heading font-bold text-white">MG</span>
            </div>
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">MicroGestión</h1>
          <p className="text-slate-400 text-sm mt-1">Sistema de gestión empresarial</p>
        </div>

        <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-2xl p-6">
          <h2 className="font-heading text-lg font-semibold text-white mb-5">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="correo@empresa.com"
                className="w-full px-3.5 py-2.5 bg-[#080d19] border border-[#1e2d4a] rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#3b7eff] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#080d19] border border-[#1e2d4a] rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#3b7eff] transition-colors"
              />
            </div>

            {error && <p className="text-[#ef4444] text-xs bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg px-3 py-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#3b7eff] hover:bg-[#5a94ff] disabled:opacity-60 text-white font-medium text-sm transition-colors"
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1e2d4a]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#0f1629] px-3 text-xs text-slate-500">o</span>
            </div>
          </div>

          <button
            onClick={() => setShowFace(true)}
            className="w-full py-2.5 rounded-lg border border-[#1e2d4a] hover:border-[#3b7eff]/50 hover:bg-[#3b7eff]/5 text-slate-300 text-sm flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-4 h-4 text-[#3b7eff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Iniciar con reconocimiento facial
          </button>
        </div>

        {/* Demo accounts */}
        <div className="mt-5 bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">Cuentas demo (contraseña: 123456)</p>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.role}
                onClick={() => { setEmail(acc.email); setPassword('123456'); }}
                className="text-left px-3 py-2 rounded-lg bg-[#080d19] border border-[#1e2d4a] hover:border-[#2a3d60] transition-colors"
              >
                <div className="text-xs font-medium" style={{ color: acc.color }}>{acc.role}</div>
                <div className="text-[10px] text-slate-500 truncate">{acc.email}</div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-5">
          ¿No tienes cuenta?{' '}
          <button onClick={onGoRegister} className="text-[#3b7eff] hover:text-[#5a94ff] transition-colors font-medium">
            Registrarse
          </button>
        </p>
      </div>
    </div>
  );
}
