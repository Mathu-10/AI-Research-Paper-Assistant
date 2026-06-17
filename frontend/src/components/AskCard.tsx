import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Copy, 
  RotateCcw, 
  Send, 
  Check, 
  Bot, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { askQuestion } from '../services/api';

const SUGGESTED = [
  'What problem does this paper solve?',
  'Explain the methodology.',
  'What are the key findings?',
  'What are the limitations?',
];

interface QAPair {
  question: string;
  answer: string;
}

interface AskCardProps {
  documentId: string;
}

export default function AskCard({ documentId }: AskCardProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<QAPair[]>([]);
  const [lastQuestion, setLastQuestion] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [history, loading]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage('✓ Copied');
    });
  };

  const submit = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;

    setInput('');
    setError(null);
    setLastQuestion(q);
    setLoading(true);

    try {
      const { answer } = await askQuestion(documentId, q);
      setHistory((prev) => [...prev, { question: q, answer }]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit(input);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mt-6 relative">
      
      {/* Local Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 5, x: '-50%' }}
            className="absolute top-4 left-1/2 z-50 bg-[#0F172A] dark:bg-[#F8FAFC] text-white dark:text-[#0F172A] px-3.5 py-1.5 rounded-full text-[11px] font-semibold shadow-md border border-white/10 flex items-center gap-1 select-none"
          >
            <Check className="w-3 h-3 text-success" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border bg-bg/25">
        <div className="w-8 h-8 rounded-xl bg-primary/[0.06] border border-primary/10 flex items-center justify-center text-primary">
          <Bot className="w-4.5 h-4.5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-text">Ask AI Assistant</h3>
          <p className="text-[11px] text-text-secondary">Have conversational questions about this paper?</p>
        </div>
      </div>

      {/* Chat body */}
      <div className="px-6 py-6 flex flex-col gap-6">
        {/* Empty state */}
        {history.length === 0 && !loading && (
          <div className="text-center py-8 bg-bg/10 rounded-2xl border border-border/50">
            <p className="text-sm text-text-secondary max-w-sm mx-auto">
              Ask questions to explore methodologies, compare outcomes, or translate complex jargon instantly.
            </p>
          </div>
        )}

        {/* Conversation history list */}
        {history.length > 0 && (
          <div className="flex flex-col gap-6 overflow-y-auto max-h-[450px] pr-1">
            {history.map((pair, i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* User bubble */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end items-start gap-3 pl-10"
                >
                  <div className="bg-primary text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed shadow-sm">
                    {pair.question}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                </motion.div>

                {/* AI bubble */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex justify-start items-start gap-3 group pr-10"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/[0.06] dark:bg-primary/[0.12] border border-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-bg/40 border border-border text-text text-sm px-4.5 py-3 rounded-2xl rounded-tl-sm leading-relaxed shadow-sm whitespace-pre-line">
                      {pair.answer}
                    </div>
                    {/* Hover copy & retry actions */}
                    <div className="mt-2 flex items-center gap-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <button
                        onClick={() => handleCopy(pair.answer)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-text transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy Answer
                      </button>
                      <button
                        onClick={() => submit(pair.question)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-text transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Ask Again
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}

            {/* Bouncing typing indicator */}
            {loading && (
              <div className="flex justify-start items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/[0.06] border border-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                  <Bot className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="bg-bg/40 border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-text-secondary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-text-secondary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-text-secondary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading (first question, no history yet) */}
        {loading && history.length === 0 && (
          <div className="flex items-center gap-2.5 py-4 text-text-secondary">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-sm font-medium">AI is analyzing paper context…</span>
          </div>
        )}

        {/* Error State Banner */}
        {error && !loading && (
          <div className="flex items-start gap-3 bg-error/5 border border-error/20 rounded-xl p-4">
            <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-error">⚠ AI service temporarily unavailable.</p>
              <p className="text-xs text-error/80 mt-0.5 break-words">{error}</p>
              <button
                onClick={() => submit(lastQuestion)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-error hover:bg-error/90 px-3.5 py-1.5 rounded-lg transition-all duration-150 active:scale-[0.98] shadow-sm"
              >
                <RotateCcw className="w-3 h-3" />
                Retry
              </button>
            </div>
          </div>
        )}

        <div ref={bottomRef} />

        {/* Suggested chips row */}
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              disabled={loading}
              className="text-xs text-primary bg-primary/[0.06] border border-primary/10 px-3 py-1.5 rounded-xl hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 font-medium select-none"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Chat input box */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={loading}
            placeholder="Ask anything about this research paper…"
            className="flex-1 text-sm text-text placeholder-text-secondary/50 bg-bg/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-50 transition-all duration-150"
          />
          <button
            onClick={() => submit(input)}
            disabled={!input.trim() || loading}
            aria-label="Send question"
            className="px-4.5 bg-primary hover:bg-primary/95 disabled:bg-border disabled:text-text-secondary/30 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-150 active:scale-[0.97] flex-shrink-0 flex items-center justify-center gap-1.5 select-none"
          >
            <Send className="w-4 h-4" />
            <span>Ask</span>
          </button>
        </div>
      </div>
    </div>
  );
}
