import { useState } from 'react';
import { aiRecommendations } from '../../data/mockData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const priorityColors = { alta: '#ef4444', media: '#f59e0b', baja: '#10b981' };
const typeIcons: Record<string, string> = { alerta: '⚠️', oportunidad: '📈', rendimiento: '⭐' };

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hola, soy tu asistente de IA. He analizado los datos del sistema y tengo alertas y recomendaciones para ti. ¿En qué puedo ayudarte?',
    time: '10:30',
  },
];

const autoResponses: Record<string, string> = {
  ventas: 'Las ventas de julio están un 11% sobre la meta. El producto estrella es Laptop Dell XPS 15. Valeria Torres lidera el ranking con $3.64M este mes.',
  inventario: 'Detecté 4 productos con stock crítico: Mouse Logitech MX3 (3 und), Webcam Logitech 4K (2 und), Monitor Samsung 27" (8 und) y Escritorio Standing (6 und).',
  rendimiento: 'El rendimiento general del equipo es positivo. La asistencia promedio está en 88%. Marco Luna muestra ausentismo que requiere atención.',
  reporte: 'El reporte mensual muestra ingresos de $61M con un margen del 34%. Los departamentos de Ventas y Tecnología lideran los resultados.',
  recomendacion: 'Recomiendo: (1) Reordenar stock crítico inmediatamente, (2) Reconocer a Valeria Torres por sus resultados, (3) Revisar el caso de ausentismo de Marco Luna.',
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'chat' | 'insights'>('insights');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  function handleSend() {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) };
    const lower = input.toLowerCase();
    const responseKey = Object.keys(autoResponses).find(k => lower.includes(k));
    const responseText = responseKey ? autoResponses[responseKey] : 'Esa consulta está siendo procesada. En una integración completa, este asistente consultaría la base de datos y un modelo de IA en tiempo real para responderte.';

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(p => [...p, userMsg, aiMsg]);
    setInput('');
  }

  const urgentCount = aiRecommendations.filter(r => r.prioridad === 'alta').length;

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-13 h-13 rounded-2xl bg-[#3b7eff] hover:bg-[#5a94ff] shadow-lg shadow-[#3b7eff]/30 flex items-center justify-center transition-all hover:scale-105 z-40"
        style={{ width: 52, height: 52 }}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        {urgentCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ef4444] text-white text-[10px] flex items-center justify-center font-bold">
            {urgentCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed inset-y-0 right-0 w-80 bg-[#0f1629] border-l border-[#1e2d4a] z-50 flex flex-col animate-slide-in shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-[#1e2d4a] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#3b7eff]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#3b7eff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-heading font-semibold text-white">IA Asistente</div>
                <div className="text-[10px] text-[#10b981] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
                  Activo
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#1e2d4a]">
            {(['insights', 'chat'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-xs font-medium transition-colors ${tab === t ? 'text-[#3b7eff] border-b-2 border-[#3b7eff]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {t === 'insights' ? '📊 Alertas y sugerencias' : '💬 Consultar IA'}
              </button>
            ))}
          </div>

          {tab === 'insights' && (
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className="bg-[#080d19] border border-[#1e2d4a] rounded-xl p-3 hover:border-[#2a3d60] transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{typeIcons[rec.tipo]}</span>
                      <span className="text-xs font-semibold text-white">{rec.titulo}</span>
                    </div>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0"
                      style={{ color: priorityColors[rec.prioridad as keyof typeof priorityColors], backgroundColor: `${priorityColors[rec.prioridad as keyof typeof priorityColors]}20` }}
                    >
                      {rec.prioridad}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{rec.mensaje}</p>
                  <button className="mt-2 text-[10px] text-[#3b7eff] hover:text-[#5a94ff] transition-colors font-medium">
                    {rec.accion} →
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#3b7eff] text-white rounded-tr-sm'
                          : 'bg-[#080d19] border border-[#1e2d4a] text-slate-300 rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                      <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-slate-600'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-[#1e2d4a]">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Consulta ventas, inventario..."
                    className="flex-1 px-3 py-2 bg-[#080d19] border border-[#1e2d4a] rounded-lg text-white placeholder-slate-600 text-xs focus:outline-none focus:border-[#3b7eff] transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    className="w-8 h-8 rounded-lg bg-[#3b7eff] hover:bg-[#5a94ff] flex items-center justify-center text-white transition-colors shrink-0"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-[10px] text-slate-600 mt-1.5">Prueba: "ventas", "inventario", "rendimiento"</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
