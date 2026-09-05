import { products, stockMovements } from '../../data/mockData';

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

export default function InventarioDashboard({ panel }: Props) {
  if (panel === 'productos') return (
    <div className="space-y-4 animate-fade-up">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total productos" value={String(products.length)} sub="En catálogo" />
        <StatCard label="Stock crítico" value="4" sub="Requieren atención" trend="down" />
        <StatCard label="Valor inventario" value="$28.4M" sub="Valorización actual" />
      </div>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-white text-sm">Catálogo de productos</h3>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-[#3b7eff] text-white hover:bg-[#5a94ff] transition-colors">+ Agregar</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-slate-500 border-b border-[#1e2d4a]">{['ID','Nombre','Categoría','Stock','Precio unitario','Estado'].map(h => <th key={h} className="text-left pb-2 font-medium pr-4">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1e2d4a]">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-[#162035] transition-colors">
                  <td className="py-2 pr-4 font-mono text-[#3b7eff] text-[10px]">{p.id}</td>
                  <td className="py-2 pr-4 text-slate-200">{p.nombre}</td>
                  <td className="py-2 pr-4 text-slate-400">{p.categoria}</td>
                  <td className={`py-2 pr-4 font-bold ${p.alerta ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>{p.stock}</td>
                  <td className="py-2 pr-4 text-white">${p.precio.toLocaleString('es')}</td>
                  <td className="py-2">{p.alerta
                    ? <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ef4444]/20 text-[#ef4444]">⚠ Crítico</span>
                    : <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981]">Normal</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (panel === 'stock') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Estado de stock</h2>
      <div className="space-y-2">
        {products.map(p => {
          const pct = Math.min((p.stock / 50) * 100, 100);
          return (
            <div key={p.id} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-medium text-white">{p.nombre}</div>
                  <div className="text-xs text-slate-500">{p.categoria}</div>
                </div>
                <div className={`text-lg font-heading font-bold ${p.alerta ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>{p.stock}</div>
              </div>
              <div className="h-1.5 bg-[#1e2d4a] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: p.alerta ? '#ef4444' : '#10b981' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (panel === 'movimientos') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Movimientos de inventario</h2>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="text-slate-500 border-b border-[#1e2d4a]">{['Fecha','Producto','Tipo','Cantidad','Motivo','Responsable'].map(h => <th key={h} className="text-left pb-2 font-medium pr-4">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#1e2d4a]">
              {stockMovements.map((m, i) => (
                <tr key={i} className="hover:bg-[#162035] transition-colors">
                  <td className="py-2 pr-4 text-slate-500">{m.fecha}</td>
                  <td className="py-2 pr-4 text-slate-200">{m.producto}</td>
                  <td className="py-2 pr-4">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${m.tipo === 'entrada' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#ef4444]/20 text-[#ef4444]'}`}>
                      {m.tipo === 'entrada' ? '↑ Entrada' : '↓ Salida'}
                    </span>
                  </td>
                  <td className={`py-2 pr-4 font-bold ${m.tipo === 'entrada' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                    {m.tipo === 'entrada' ? '+' : '-'}{m.cantidad}
                  </td>
                  <td className="py-2 pr-4 text-slate-400">{m.motivo}</td>
                  <td className="py-2 text-slate-400">{m.responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (panel === 'almacenamiento') return (
    <div className="space-y-4 animate-fade-up">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Capacidad bodegas" value="1,200 m²" sub="Total disponible" />
        <StatCard label="Ocupación" value="73%" sub="876 m² usados" trend="down" />
        <StatCard label="Zonas activas" value="4" sub="A, B, C y D" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { zona: 'Zona A', categoria: 'Tecnología', ocupacion: 85, capacidad: '200 m²' },
          { zona: 'Zona B', categoria: 'Periféricos', ocupacion: 60, capacidad: '300 m²' },
          { zona: 'Zona C', categoria: 'Muebles', ocupacion: 90, capacidad: '400 m²' },
          { zona: 'Zona D', categoria: 'Audio y video', ocupacion: 45, capacidad: '300 m²' },
        ].map(z => (
          <div key={z.zona} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold text-white">{z.zona}</div>
                <div className="text-xs text-slate-500">{z.categoria} · {z.capacidad}</div>
              </div>
              <span className={`text-sm font-bold ${z.ocupacion > 80 ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>{z.ocupacion}%</span>
            </div>
            <div className="h-2 bg-[#1e2d4a] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${z.ocupacion}%`, backgroundColor: z.ocupacion > 80 ? '#ef4444' : '#3b7eff' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (panel === 'reportes') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Reportes de inventario</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { titulo: 'Inventario mensual julio', fecha: '31/07/2024', tipo: 'Completo' },
          { titulo: 'Productos bajo stock mínimo', fecha: '15/07/2024', tipo: 'Alerta' },
          { titulo: 'Movimientos Q2 2024', fecha: '30/06/2024', tipo: 'Movimientos' },
          { titulo: 'Valorización de inventario', fecha: '01/07/2024', tipo: 'Financiero' },
        ].map((r, i) => (
          <div key={i} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4 hover:border-[#2a3d60] cursor-pointer transition-colors">
            <div className="text-sm font-medium text-white mb-1">{r.titulo}</div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500">{r.fecha}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#3b7eff]/15 text-[#3b7eff]">{r.tipo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <div className="text-slate-400 text-sm">Panel en construcción</div>;
}
