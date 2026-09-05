import { useState } from 'react';
import { recentSales, products, aiRecommendations } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

interface Props { panel: string }

function StatCard({ label, value, sub, trend }: { label: string; value: string; sub: string; trend?: 'up' | 'down' }) {
  return (
    <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
      <div className="text-xs text-slate-500 mb-2">{label}</div>
      <div className="font-heading text-2xl font-bold text-white">{value}</div>
      <div className={`text-xs mt-1 ${trend === 'up' ? 'text-[#10b981]' : trend === 'down' ? 'text-[#ef4444]' : 'text-slate-500'}`}>{sub}</div>
    </div>
  );
}

export default function VendedorDashboard({ panel }: Props) {
  const { user } = useAuth();
  const [form, setForm] = useState({ cliente: '', producto: '', monto: '', nota: '' });
  const [submitted, setSubmitted] = useState(false);
  const [clockIn, setClockIn] = useState(false);
  const [clockTime, setClockTime] = useState('');

  const myVentas = recentSales.filter(s => s.vendedor === user?.name);

  function handleNewSale(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ cliente: '', producto: '', monto: '', nota: '' }); }, 2000);
  }

  if (panel === 'nueva-venta') return (
    <div className="max-w-lg animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white mb-4">Registrar nueva venta</h2>
      {submitted ? (
        <div className="bg-[#0f1629] border border-[#10b981]/30 rounded-xl p-8 text-center">
          <div className="text-3xl mb-3">✅</div>
          <div className="text-[#10b981] font-medium">¡Venta registrada exitosamente!</div>
        </div>
      ) : (
        <form onSubmit={handleNewSale} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-5 space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Cliente</label>
            <input value={form.cliente} onChange={e => setForm(p => ({ ...p, cliente: e.target.value }))} placeholder="Nombre del cliente o empresa" className="w-full px-3.5 py-2.5 bg-[#080d19] border border-[#1e2d4a] rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#3b7eff] transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Producto</label>
            <select value={form.producto} onChange={e => setForm(p => ({ ...p, producto: e.target.value }))} className="w-full px-3.5 py-2.5 bg-[#080d19] border border-[#1e2d4a] rounded-lg text-white text-sm focus:outline-none focus:border-[#3b7eff] transition-colors">
              <option value="">Seleccionar producto</option>
              {products.map(p => <option key={p.id} value={p.nombre}>{p.nombre} — ${p.precio.toLocaleString('es')}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Monto ($)</label>
            <input type="number" value={form.monto} onChange={e => setForm(p => ({ ...p, monto: e.target.value }))} placeholder="0" className="w-full px-3.5 py-2.5 bg-[#080d19] border border-[#1e2d4a] rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#3b7eff] transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Nota (opcional)</label>
            <textarea value={form.nota} onChange={e => setForm(p => ({ ...p, nota: e.target.value }))} rows={2} placeholder="Observaciones de la venta..." className="w-full px-3.5 py-2.5 bg-[#080d19] border border-[#1e2d4a] rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#3b7eff] transition-colors resize-none" />
          </div>
          <button type="submit" className="w-full py-2.5 rounded-lg bg-[#3b7eff] hover:bg-[#5a94ff] text-white font-medium text-sm transition-colors">Registrar venta</button>
        </form>
      )}
    </div>
  );

  if (panel === 'mis-ventas') return (
    <div className="space-y-4 animate-fade-up">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Mis ventas" value={`$${myVentas.reduce((a, b) => a + b.monto, 0).toLocaleString('es')}`} sub="Este mes" trend="up" />
        <StatCard label="Transacciones" value={String(myVentas.length)} sub="Registradas" />
        <StatCard label="Meta mensual" value="85%" sub="Progreso actual" trend="up" />
      </div>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <h3 className="font-heading font-semibold text-white text-sm mb-4">Historial de ventas</h3>
        {myVentas.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6">No tienes ventas registradas este mes</p>
        ) : (
          <div className="space-y-2">
            {myVentas.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-[#080d19] rounded-lg hover:bg-[#162035] transition-colors">
                <div>
                  <div className="text-xs font-medium text-white">{s.cliente}</div>
                  <div className="text-[10px] text-slate-500">{s.producto} · {s.fecha}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">${s.monto.toLocaleString('es')}</div>
                  <div className={`text-[10px] ${s.estado === 'completada' ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>{s.estado}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (panel === 'productos') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Catálogo de productos</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {products.map(p => (
          <div key={p.id} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-white">{p.nombre}</div>
              <div className="text-xs text-slate-500 mt-0.5">{p.categoria} · Stock: {p.stock}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white">${p.precio.toLocaleString('es')}</div>
              {p.alerta && <div className="text-[10px] text-[#ef4444]">Stock bajo</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (panel === 'jornada') return (
    <div className="max-w-md animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white mb-4">Mi jornada laboral</h2>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-6 text-center">
        <div className="text-4xl font-heading font-bold text-white mb-1">
          {new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-slate-400 text-sm mb-6">{new Date().toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        {clockIn ? (
          <div className="space-y-3">
            <div className="text-[#10b981] text-sm">Entrada registrada a las {clockTime}</div>
            <button onClick={() => setClockIn(false)} className="w-full py-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] font-medium hover:bg-[#ef4444]/20 transition-colors">
              Registrar salida
            </button>
          </div>
        ) : (
          <button
            onClick={() => { setClockIn(true); setClockTime(new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })); }}
            className="w-full py-3 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-medium hover:bg-[#10b981]/20 transition-colors"
          >
            Registrar entrada
          </button>
        )}
      </div>
      <div className="mt-4 bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Esta semana</h3>
        {['Lun','Mar','Mié','Jue','Vie'].map((dia, i) => (
          <div key={dia} className="flex items-center justify-between py-2 border-b border-[#1e2d4a] last:border-0 text-xs">
            <span className="text-slate-400">{dia}</span>
            <span className={i < 4 ? 'text-[#10b981]' : 'text-slate-600'}>{i < 4 ? '08:00 – 17:00 · 9h' : 'Pendiente'}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (panel === 'perfil') return (
    <div className="max-w-md animate-fade-up">
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#3b7eff]/20 border-2 border-[#3b7eff]/40 flex items-center justify-center mx-auto mb-4">
          <span className="font-heading font-bold text-[#3b7eff] text-xl">
            {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </span>
        </div>
        <h2 className="font-heading text-xl font-bold text-white">{user?.name}</h2>
        <p className="text-slate-400 text-sm mt-1">Vendedor</p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <span className={`w-2 h-2 rounded-full ${user?.faceRegistered ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`} />
          <span className="text-xs text-slate-500">{user?.faceRegistered ? 'Rostro registrado' : 'Sin reconocimiento facial'}</span>
        </div>
      </div>
      <div className="mt-4 bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4 space-y-3">
        {[{ label: 'Correo', value: user?.email }, { label: 'Ingreso', value: user?.createdAt }, { label: 'Cargo', value: 'Vendedor' }].map(item => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-slate-500">{item.label}</span>
            <span className="text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (panel === 'ia') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Consejos de IA para vendedores</h2>
      <div className="grid grid-cols-1 gap-3">
        {[
          { titulo: 'Producto más rentable', tip: 'Laptop Dell XPS 15 tiene el mayor margen de ganancia este mes (38%). Prioriza ofrecerlo en tus próximas visitas.' },
          { titulo: 'Mejor hora para contactar', tip: 'Los cierres de venta exitosos ocurren principalmente entre 10:00–12:00 y 15:00–17:00. Agenda tus llamadas en esas ventanas.' },
          { titulo: 'Cliente con más potencial', tip: 'Empresa Alfa SA ha comprado 3 veces. Considera ofrecerle un paquete con descuento para fidelizarlo.' },
          { titulo: 'Tip de negociación', tip: 'Los clientes nuevos responden mejor a demos en vivo. Ofrece una muestra del producto antes del cierre.' },
        ].map((tip, i) => (
          <div key={i} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3b7eff]/15 flex items-center justify-center shrink-0 text-sm">💡</div>
            <div>
              <div className="text-sm font-semibold text-white mb-1">{tip.titulo}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{tip.tip}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <div className="text-slate-400 text-sm">Panel en construcción</div>;
}
