import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onDismiss, onRetry }: ErrorMessageProps) {
  const isFailedToFetch = message.toLowerCase().includes('failed to fetch') || message.toLowerCase().includes('fetch');
  const cleanMessage = isFailedToFetch ? 'Please try again.' : message;

  return (
    <div className="max-w-xl mx-auto px-6 pb-8">
      <div className="bg-card border border-error/20 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-error/5 px-6 py-5 flex items-start gap-4 border-b border-error/10">
          <div className="w-9 h-9 bg-error/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-error/20 text-error">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-error">⚠ AI service temporarily unavailable.</p>
            <p className="text-xs text-error/80 mt-1 break-words leading-relaxed">{cleanMessage}</p>
          </div>
          <button
            onClick={onDismiss}
            aria-label="Dismiss error"
            className="flex-shrink-0 text-error/40 hover:text-error transition-colors p-0.5 rounded-lg hover:bg-error/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {onRetry && (
          <div className="px-6 py-3.5 bg-bg/10 flex items-center gap-3">
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-error hover:bg-error/95 px-4 py-2 rounded-xl transition-all duration-150 active:scale-[0.97] shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry
            </button>
            <span className="text-xs text-text-secondary">or upload a different paper</span>
          </div>
        )}
      </div>
    </div>
  );
}
