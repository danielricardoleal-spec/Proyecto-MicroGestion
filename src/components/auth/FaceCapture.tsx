import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface FaceCaptureProps {
  mode: 'register' | 'login';
  userId?: string | null;
  onSuccess: (userName?: string) => void;
  onCancel: () => void;
}

export default function FaceCapture({ mode, userId, onSuccess, onCancel }: FaceCaptureProps) {
  const { loginWithFace, registerFace } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [step, setStep] = useState<'idle' | 'active' | 'scanning' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(3);
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopStream();
  }, [stopStream]);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStep('active');
      setError('');
    } catch {
      setError('No se pudo acceder a la cámara. Verifica los permisos del navegador.');
    }
  }

  async function captureAndProcess() {
    setStep('scanning');
    setCountdown(3);

    // Simulate countdown
    for (let i = 3; i >= 1; i--) {
      setCountdown(i);
      await new Promise(r => setTimeout(r, 800));
    }

    // Stub: replace with real face recognition API call
    await new Promise(r => setTimeout(r, 1200));

    if (mode === 'register' && userId) {
      registerFace(userId);
      setStep('success');
      stopStream();
      setTimeout(() => onSuccess(), 1500);
    } else if (mode === 'login') {
      const result = loginWithFace();
      if (result.success) {
        setStep('success');
        stopStream();
        setTimeout(() => onSuccess(result.user?.name), 1500);
      } else {
        setStep('error');
        setError(result.error || 'Rostro no reconocido');
        stopStream();
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 rounded-2xl overflow-hidden border border-[#1e2d4a] bg-[#0f1629] animate-fade-up">
        <div className="p-5 border-b border-[#1e2d4a] flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold text-white">
              {mode === 'register' ? 'Registrar rostro' : 'Reconocimiento facial'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {mode === 'register' ? 'Captura tu rostro para acceso rápido' : 'Mira hacia la cámara'}
            </p>
          </div>
          <button onClick={() => { stopStream(); onCancel(); }} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          <div className="relative bg-[#080d19] rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
            {step === 'idle' && (
              <div className="flex flex-col items-center gap-3 text-slate-500">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm">Cámara inactiva</p>
              </div>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${step === 'idle' || step === 'success' || step === 'error' ? 'hidden' : ''}`}
            />

            {(step === 'active' || step === 'scanning') && (
              <>
                {/* Face frame overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-44 relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#3b7eff] rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#3b7eff] rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#3b7eff] rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#3b7eff] rounded-br-lg" />
                  </div>
                </div>
                {step === 'scanning' && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-40 h-0.5 bg-[#3b7eff]/60 scan-line pointer-events-none" style={{ boxShadow: '0 0 8px #3b7eff' }} />
                )}
              </>
            )}

            {step === 'scanning' && countdown > 0 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-white font-heading text-sm">
                Escaneando... {countdown}
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#10b981]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[#10b981] font-medium">
                  {mode === 'register' ? 'Rostro registrado' : 'Identidad verificada'}
                </p>
              </div>
            )}

            {step === 'error' && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#ef4444]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-[#ef4444] font-medium text-sm text-center px-4">{error}</p>
              </div>
            )}
          </div>

          {error && step !== 'error' && (
            <p className="text-[#ef4444] text-xs mt-3 text-center">{error}</p>
          )}

          <div className="mt-4 flex gap-3">
            {step === 'idle' && (
              <button
                onClick={startCamera}
                className="flex-1 py-2.5 rounded-lg bg-[#3b7eff] hover:bg-[#5a94ff] text-white font-medium text-sm transition-colors"
              >
                Activar cámara
              </button>
            )}
            {step === 'active' && (
              <button
                onClick={captureAndProcess}
                className="flex-1 py-2.5 rounded-lg bg-[#3b7eff] hover:bg-[#5a94ff] text-white font-medium text-sm transition-colors"
              >
                {mode === 'register' ? 'Capturar rostro' : 'Verificar identidad'}
              </button>
            )}
            {step === 'error' && (
              <button
                onClick={() => { setStep('idle'); setError(''); }}
                className="flex-1 py-2.5 rounded-lg bg-[#1e2d4a] hover:bg-[#243552] text-white font-medium text-sm transition-colors"
              >
                Reintentar
              </button>
            )}
            <button
              onClick={() => { stopStream(); onCancel(); }}
              className="px-4 py-2.5 rounded-lg border border-[#1e2d4a] text-slate-400 hover:text-white text-sm transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
