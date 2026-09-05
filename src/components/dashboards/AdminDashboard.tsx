import { useState } from 'react';
import { salesData, products, recentSales, workers, aiRecommendations } from '../../data/mockData';

interface Props { panel: string }

function StatCard({ label, value, sub, color = '#3b7eff', trend }: { label: string; value: string; sub: string; color?: string; trend?: 'up' | 'down' | 'neutral' }) {
  return (
    <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
      <div className="text-xs text-slate-500 mb-2">{label}</div>
      <div className="font-heading text-2xl font-bold text-white">{value}</div>
      <div className={`text-xs mt-1 ${trend === 'up' ? 'text-[#10b981]' : trend === 'down' ? 'text-[#ef4444]' : 'text-slate-500'}`}>
        {trend === 'up' && '↑ '}{trend === 'down' && '↓ '}{sub}
      </div>
    </div>
  );
}

function MiniBar({ data }: { data: typeof salesData }) {
  const max = Math.max(...data.map(d => Math.max(d.ventas, d.meta)));
  return (
    <div className="flex items-end gap-1.5 h-24">
      {data.map(d => (
        <div key={d.mes} className="flex-1 flex flex-col items-center gap-0.5">
          <div className="w-full flex gap-0.5 items-end" style={{ height: 76 }}>
            <div className="flex-1 rounded-sm bg-[#3b7eff]/60 transition-all" style={{ height: `${(d.ventas / max) * 100}%` }} />
            <div className="flex-1 rounded-sm bg-[#1e2d4a] transition-all" style={{ height: `${(d.meta / max) * 100}%` }} />
          </div>
          <div className="text-[9px] text-slate-600">{d.mes}</div>
        </div>
      ))}
    </div>
  );
}

function statusBadge(estado: string) {
  const map: Record<string, string> = { completada: '#10b981', pendiente: '#f59e0b', cancelada: '#ef4444' };
  return <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ color: map[estado] ?? '#94a3b8', backgroundColor: `${map[estado] ?? '#94a3b8'}20` }}>{estado}</span>;
}

export default function AdminDashboard({ panel }: Props) {
  const [newSaleForm, setNewSaleForm] = useState({ cliente: '', producto: '', monto: '' });

  if (panel === 'dashboard') return (
    <div className="space-y-5 animate-fade-up">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Ventas del mes" value="$61.0M" sub="+11% sobre meta" trend="up" />
        <StatCard label="Trabajadores activos" value="5" sub="1 en licencia" color="#10b981" />
        <StatCard label="Productos en stock" value="117" sub="4 alertas críticas" trend="down" color="#f59e0b" />
        <StatCard label="Alertas IA" value="4" sub="2 urgentes" color="#ef4444" trend="down" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-semibold text-white text-sm">Ventas vs Meta</h3>
              <p className="text-[11px] text-slate-500">Últimos 7 meses</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#3b7eff]/60 inline-block" />Ventas</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1e2d4a] inline-block" />Meta</span>
            </div>
          </div>
          <MiniBar data={salesData} />
        </div>
        <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
          <h3 className="font-heading font-semibold text-white text-sm mb-3">Alertas IA</h3>
          <div className="space-y-2">
            {aiRecommendations.slice(0, 3).map((rec, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px]">
                <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${rec.prioridad === 'alta' ? 'bg-[#ef4444]' : rec.prioridad === 'media' ? 'bg-[#f59e0b]' : 'bg-[#10b981]'}`} />
                <span className="text-slate-400 leading-snug">{rec.titulo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <h3 className="font-heading font-semibold text-white text-sm mb-3">Últimas ventas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500 border-b border-[#1e2d4a]">
                <th className="text-left pb-2 font-medium">ID</th>
                <th className="text-left pb-2 font-medium">Cliente</th>
                <th className="text-left pb-2 font-medium">Producto</th>
                <th className="text-right pb-2 font-medium">Monto</th>
                <th className="text-left pb-2 font-medium pl-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2d4a]">
              {recentSales.map(s => (
                <tr key={s.id} className="hover:bg-[#162035] transition-colors">
                  <td className="py-2 font-mono text-[#3b7eff]">{s.id}</td>
                  <td className="py-2 text-slate-300">{s.cliente}</td>
                  <td className="py-2 text-slate-400">{s.producto}</td>
                  <td className="py-2 text-right text-white font-medium">${s.monto.toLocaleString('es')}</td>
                  <td className="py-2 pl-3">{statusBadge(s.estado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (panel === 'ventas') return (
    <div className="space-y-4 animate-fade-up">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total julio" value="$61.0M" sub="+11% vs meta" trend="up" />
        <StatCard label="Transacciones" value="127" sub="Este mes" />
        <StatCard label="Ticket promedio" value="$480K" sub="+8% vs mes anterior" trend="up" />
      </div>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <h3 className="font-heading font-semibold text-white text-sm mb-4">Registro de ventas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-slate-500 border-b border-[#1e2d4a]">{['ID','Cliente','Producto','Vendedor','Fecha','Monto','Estado'].map(h => <th key={h} className="text-left pb-2 font-medium pr-4 last:pr-0">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1e2d4a]">
              {recentSales.map(s => (
                <tr key={s.id} className="hover:bg-[#162035] transition-colors">
                  <td className="py-2 pr-4 font-mono text-[#3b7eff] text-[10px]">{s.id}</td>
                  <td className="py-2 pr-4 text-slate-300">{s.cliente}</td>
                  <td className="py-2 pr-4 text-slate-400">{s.producto}</td>
                  <td className="py-2 pr-4 text-slate-400">{s.vendedor}</td>
                  <td className="py-2 pr-4 text-slate-500">{s.fecha}</td>
                  <td className="py-2 pr-4 text-white font-medium">${s.monto.toLocaleString('es')}</td>
                  <td className="py-2">{statusBadge(s.estado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (panel === 'inventario') return (
    <div className="space-y-4 animate-fade-up">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total productos" value={String(products.length)} sub="8 categorías" />
        <StatCard label="Alertas de stock" value="4" sub="Requieren reorden" trend="down" color="#ef4444" />
        <StatCard label="Valor inventario" value="$28.4M" sub="Valorización actual" />
      </div>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <h3 className="font-heading font-semibold text-white text-sm mb-4">Productos</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-slate-500 border-b border-[#1e2d4a]">{['ID','Nombre','Categoría','Stock','Precio','Estado'].map(h => <th key={h} className="text-left pb-2 font-medium pr-4">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1e2d4a]">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-[#162035] transition-colors">
                  <td className="py-2 pr-4 font-mono text-[#3b7eff] text-[10px]">{p.id}</td>
                  <td className="py-2 pr-4 text-slate-200">{p.nombre}</td>
                  <td className="py-2 pr-4 text-slate-400">{p.categoria}</td>
                  <td className={`py-2 pr-4 font-medium ${p.alerta ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>{p.stock}</td>
                  <td className="py-2 pr-4 text-white">${p.precio.toLocaleString('es')}</td>
                  <td className="py-2">{p.alerta ? <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ef4444]/20 text-[#ef4444]">⚠ Crítico</span> : <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981]">OK</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (panel === 'trabajadores') return (
    <div className="space-y-4 animate-fade-up">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total trabajadores" value={String(workers.length)} sub="En nómina" />
        <StatCard label="Activos hoy" value="5" sub="1 en licencia" trend="neutral" />
        <StatCard label="Nómina mensual" value="$5.25M" sub="Total sueldos" />
      </div>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <h3 className="font-heading font-semibold text-white text-sm mb-4">Equipo de trabajo</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-slate-500 border-b border-[#1e2d4a]">{['ID','Nombre','Cargo','Departamento','Ingreso','Sueldo','Estado'].map(h => <th key={h} className="text-left pb-2 font-medium pr-4">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1e2d4a]">
              {workers.map(w => (
                <tr key={w.id} className="hover:bg-[#162035] transition-colors">
                  <td className="py-2 pr-4 font-mono text-[#3b7eff] text-[10px]">{w.id}</td>
                  <td className="py-2 pr-4 text-slate-200 font-medium">{w.nombre}</td>
                  <td className="py-2 pr-4 text-slate-400">{w.cargo}</td>
                  <td className="py-2 pr-4 text-slate-400">{w.departamento}</td>
                  <td className="py-2 pr-4 text-slate-500">{w.ingreso}</td>
                  <td className="py-2 pr-4 text-white">${w.sueldo.toLocaleString('es')}</td>
                  <td className="py-2"><span className={`text-[10px] px-1.5 py-0.5 rounded-full ${w.estado === 'activo' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#f59e0b]/20 text-[#f59e0b]'}`}>{w.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (panel === 'reportes') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Reportes generales</h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          { titulo: 'Reporte de ventas julio 2024', tipo: 'Ventas', fecha: '31/07/2024', size: '248 KB' },
          { titulo: 'Inventario Q2 2024', tipo: 'Inventario', fecha: '30/06/2024', size: '185 KB' },
          { titulo: 'Nómina julio 2024', tipo: 'RRHH', fecha: '31/07/2024', size: '92 KB' },
          { titulo: 'Análisis de rendimiento H1', tipo: 'Ejecutivo', fecha: '30/06/2024', size: '512 KB' },
        ].map((r, i) => (
          <div key={i} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4 hover:border-[#2a3d60] transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-white">{r.titulo}</div>
                <div className="text-xs text-slate-500 mt-1">{r.fecha} · {r.size}</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3b7eff]/15 text-[#3b7eff] shrink-0">{r.tipo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (panel === 'almacenamiento') return (
    <div className="space-y-4 animate-fade-up">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Capacidad total" value="2.5 TB" sub="Almacenamiento" />
        <StatCard label="Usado" value="1.2 TB" sub="48% utilizado" color="#f59e0b" />
        <StatCard label="Archivos" value="3,847" sub="Documentos y reportes" />
      </div>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <h3 className="font-heading font-semibold text-white text-sm mb-4">Distribución por módulo</h3>
        {[
          { nombre: 'Ventas', gb: 480, color: '#3b7eff' },
          { nombre: 'Inventario', gb: 320, color: '#10b981' },
          { nombre: 'RRHH', gb: 180, color: '#a78bfa' },
          { nombre: 'Reportes', gb: 220, color: '#f59e0b' },
        ].map(item => (
          <div key={item.nombre} className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-300">{item.nombre}</span>
              <span className="text-slate-500">{item.gb} GB</span>
            </div>
            <div className="h-2 bg-[#1e2d4a] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(item.gb / 1200) * 100}%`, backgroundColor: item.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (panel === 'configuracion') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Configuración del sistema</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          { title: 'Base de datos', desc: 'Conexión a PostgreSQL/MySQL', status: 'No configurado', color: '#f59e0b' },
          { title: 'Reconocimiento facial', desc: 'API de visión por computadora', status: 'Modo simulación', color: '#3b7eff' },
          { title: 'API de Inteligencia Artificial', desc: 'Claude / GPT / Gemini', status: 'No configurado', color: '#f59e0b' },
          { title: 'Notificaciones', desc: 'Email y push notifications', status: 'No configurado', color: '#f59e0b' },
          { title: 'Backup automático', desc: 'Respaldo diario de datos', status: 'No configurado', color: '#f59e0b' },
          { title: 'Seguridad 2FA', desc: 'Autenticación de dos factores', status: 'No configurado', color: '#f59e0b' },
        ].map((cfg, i) => (
          <div key={i} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-white">{cfg.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{cfg.desc}</div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full shrink-0" style={{ color: cfg.color, backgroundColor: `${cfg.color}20` }}>
              {cfg.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (panel === 'ia') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Inteligencia Artificial</h2>
      <div className="grid grid-cols-2 gap-3 mb-2">
        <StatCard label="Recomendaciones activas" value="4" sub="2 de alta prioridad" />
        <StatCard label="Alertas resueltas" value="12" sub="Este mes" trend="up" color="#10b981" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {aiRecommendations.map((rec, i) => (
          <div key={i} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4 hover:border-[#2a3d60] transition-colors">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-sm font-semibold text-white">{rec.titulo}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{ color: rec.prioridad === 'alta' ? '#ef4444' : rec.prioridad === 'media' ? '#f59e0b' : '#10b981', backgroundColor: rec.prioridad === 'alta' ? '#ef444420' : rec.prioridad === 'media' ? '#f59e0b20' : '#10b98120' }}>
                {rec.prioridad}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{rec.mensaje}</p>
            <button className="mt-3 text-xs text-[#3b7eff] hover:text-[#5a94ff] transition-colors font-medium">{rec.accion} →</button>
          </div>
        ))}
      </div>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4 border-dashed">
        <div className="text-center py-4">
          <div className="text-2xl mb-2">🔌</div>
          <div className="text-sm font-medium text-white mb-1">Conectar API de IA</div>
          <div className="text-xs text-slate-500">Integra Claude, GPT-4 u otro modelo para análisis en tiempo real</div>
          <button className="mt-3 px-4 py-1.5 rounded-lg bg-[#3b7eff]/10 border border-[#3b7eff]/30 text-[#3b7eff] text-xs hover:bg-[#3b7eff]/20 transition-colors">
            Ver guía de configuración
          </button>
        </div>
      </div>
    </div>
  );

  return <div className="text-slate-400 text-sm">Panel en construcción</div>;
}
