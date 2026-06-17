import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  FileDown, 
  UploadCloud, 
  RotateCcw, 
  Check, 
  FileText, 
  Cpu, 
  TrendingUp, 
  CheckCircle2 
} from 'lucide-react';
import type { SummaryResponse, UploadResponse } from '../types';
import AskCard from './AskCard';

interface SummaryViewProps {
  summary: SummaryResponse;
  upload: UploadResponse;
  onReset: () => void;
}

const SECTIONS: { key: keyof SummaryResponse; label: string; color: string; icon: React.ReactNode }[] = [
  {
    key: 'overview',
    label: 'Overview',
    color: 'text-primary bg-primary/[0.06] border-primary/10',
    icon: <FileText className="w-4 h-4" />,
  },
  {
    key: 'methodology',
    label: 'Methodology',
    color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/30',
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    key: 'key_findings',
    label: 'Key Findings',
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30',
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    key: 'conclusion',
    label: 'Conclusion',
    color: 'text-success bg-success/10 border-success/20',
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
];

export default function SummaryView({ summary, upload, onReset }: SummaryViewProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fullSummaryText = `# ${summary.title}\n\n## Overview\n${summary.overview}\n\n## Methodology\n${summary.methodology}\n\n## Key Findings\n${summary.key_findings}\n\n## Conclusion\n${summary.conclusion}`;

  const handleCopy = (text: string, msg: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(msg);
    });
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const exportMarkdown = () => {
    const blob = new Blob([fullSummaryText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${upload.filename.replace('.pdf', '')}-summary.md`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMessage('Markdown file exported');
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pb-24 relative">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 bg-[#0F172A] dark:bg-[#F8FAFC] text-white dark:text-[#0F172A] px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl border border-white/10 dark:border-black/5 flex items-center gap-1.5 whitespace-nowrap select-none"
          >
            <Check className="w-3.5 h-3.5 text-success" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top dashboard header card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8 mb-6 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-text-secondary bg-bg border border-border px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Research Paper Summary
              </span>
              <span className="text-[10px] font-semibold text-success bg-success/10 border border-success/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-2.5 h-2.5" />
                AI Generated
              </span>
              <span className="text-[10px] font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                ✓ Summary Generated Successfully
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-3 tracking-tight leading-snug">
              {summary.title}
            </h2>
            
            <p className="text-xs text-text-secondary flex items-center gap-2">
              <span className="font-semibold truncate max-w-xs">{upload.filename}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{upload.pages} pages</span>
            </p>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-2 mt-6 border-t border-border/60 pt-6">
          <button
            onClick={() => handleCopy(fullSummaryText, '✓ Copied')}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary/95 px-4 py-2 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98]"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy Summary
          </button>
          <button
            onClick={exportMarkdown}
            className="flex items-center gap-1.5 text-xs font-medium text-text hover:bg-bg border border-border px-4 py-2 rounded-xl transition-all duration-150"
          >
            <FileDown className="w-3.5 h-3.5 text-text-secondary" />
            Export Markdown
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-medium text-text hover:bg-bg border border-border px-4 py-2 rounded-xl transition-all duration-150 sm:ml-auto"
          >
            <UploadCloud className="w-3.5 h-3.5 text-text-secondary" />
            Upload Another
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-error/80 hover:text-error hover:bg-error/5 border border-border hover:border-error/20 px-4 py-2 rounded-xl transition-all duration-150"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Summary Content Cards */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {SECTIONS.map(({ key, label, icon, color }) => (
          <div 
            key={key} 
            className="bg-card rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-all duration-200 group relative"
          >
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${color}`}>
                  {icon}
                </div>
                <h3 className="text-sm font-bold text-text">{label}</h3>
              </div>
              <button
                onClick={() => handleCopy(summary[key], '✓ Copied')}
                title={`Copy ${label}`}
                className="opacity-0 group-hover:opacity-100 flex items-center justify-center p-1.5 rounded-lg border border-border bg-card text-text-secondary hover:text-text hover:bg-bg transition-all duration-150"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{summary[key]}</p>
          </div>
        ))}
      </div>

      {/* AI Chat Card */}
      <AskCard documentId={upload.document_id} />
    </div>
  );
}
