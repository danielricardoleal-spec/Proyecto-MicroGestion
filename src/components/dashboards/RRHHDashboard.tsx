import { workers, attendance, schedules } from '../../data/mockData';

interface Props { panel: string }

export default function RRHHDashboard({ panel }: Props) {
  if (panel === 'trabajadores') return (
    <div className="space-y-4 animate-fade-up">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total personal', value: String(workers.length), sub: 'En nómina' },
          { label: 'Activos', value: String(workers.filter(w => w.estado === 'activo').length), sub: 'Hoy' },
          { label: 'En licencia', value: '1', sub: 'Esta semana' },
        ].map(s => (
          <div key={s.label} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">{s.label}</div>
            <div className="font-heading text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-white text-sm">Directorio de personal</h3>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-[#3b7eff] text-white hover:bg-[#5a94ff] transition-colors">+ Agregar</button>
        </div>
        <div className="space-y-2">
          {workers.map(w => {
            const initials = w.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            return (
              <div key={w.id} className="flex items-center justify-between p-3 bg-[#080d19] rounded-lg hover:bg-[#162035] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3b7eff]/20 border border-[#3b7eff]/30 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#3b7eff]">{initials}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{w.nombre}</div>
                    <div className="text-xs text-slate-500">{w.cargo} · {w.departamento}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-400">{w.email}</div>
                    <div className="text-xs text-slate-500">Ingreso: {w.ingreso}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full ${w.estado === 'activo' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#f59e0b]/20 text-[#f59e0b]'}`}>{w.estado}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (panel === 'horarios') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Horarios de trabajo</h2>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500 border-b border-[#1e2d4a]">
                {['Trabajador','Turno','Entrada','Salida','Días'].map(h => <th key={h} className="text-left pb-2 font-medium pr-4">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2d4a]">
              {schedules.map((s, i) => (
                <tr key={i} className="hover:bg-[#162035] transition-colors">
                  <td className="py-2.5 pr-4 text-slate-200 font-medium">{s.trabajador}</td>
                  <td className="py-2.5 pr-4">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${s.turno === 'Mañana' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : 'bg-[#a78bfa]/20 text-[#a78bfa]'}`}>{s.turno}</span>
                  </td>
                  <td className="py-2.5 pr-4 font-mono text-[#10b981]">{s.entrada}</td>
                  <td className="py-2.5 pr-4 font-mono text-[#ef4444]">{s.salida}</td>
                  <td className="py-2.5 text-slate-400">{s.dias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (panel === 'asistencia') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Control de asistencia — Esta semana</h2>
      <div className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500 border-b border-[#1e2d4a]">
                <th className="text-left pb-2 font-medium pr-4">Trabajador</th>
                {['Lun','Mar','Mié','Jue','Vie'].map(d => <th key={d} className="text-center pb-2 font-medium px-2">{d}</th>)}
                <th className="text-center pb-2 font-medium pl-2">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2d4a]">
              {attendance.map((a, i) => {
                const dias = [a.lunes, a.martes, a.miercoles, a.jueves, a.viernes];
                const total = dias.filter(Boolean).length;
                return (
                  <tr key={i} className="hover:bg-[#162035] transition-colors">
                    <td className="py-2.5 pr-4 text-slate-200 font-medium">{a.trabajador}</td>
                    {dias.map((present, j) => (
                      <td key={j} className="py-2.5 text-center px-2">
                        {present
                          ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#10b981]/20 text-[#10b981] text-[10px]">✓</span>
                          : <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ef4444]/20 text-[#ef4444] text-[10px]">✗</span>}
                      </td>
                    ))}
                    <td className="py-2.5 text-center pl-2">
                      <span className={`font-mono font-bold text-sm ${total === 5 ? 'text-[#10b981]' : total === 0 ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`}>{total}/5</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (panel === 'reportes') return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="font-heading text-lg font-bold text-white">Reportes de RRHH</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { titulo: 'Nómina julio 2024', fecha: '31/07/2024', tipo: 'Nómina' },
          { titulo: 'Asistencia semanal', fecha: '15/07/2024', tipo: 'Asistencia' },
          { titulo: 'Evaluación de desempeño H1', fecha: '30/06/2024', tipo: 'Desempeño' },
          { titulo: 'Reporte de licencias Q2', fecha: '01/07/2024', tipo: 'Licencias' },
        ].map((r, i) => (
          <div key={i} className="bg-[#0f1629] border border-[#1e2d4a] rounded-xl p-4 hover:border-[#2a3d60] cursor-pointer transition-colors">
            <div className="text-sm font-medium text-white mb-1">{r.titulo}</div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500">{r.fecha}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#a78bfa]/15 text-[#a78bfa]">{r.tipo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <div className="text-slate-400 text-sm">Panel en construcción</div>;
}
