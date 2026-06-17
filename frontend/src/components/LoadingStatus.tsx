import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import type { LoadingStep } from '../types';

interface LoadingStatusProps {
  step: LoadingStep;
}

export default function LoadingStatus({ step }: LoadingStatusProps) {
  // If we are in the success transition state, show a clean brief screen
  if (step === 'uploaded_success') {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-14 h-14 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6 border border-success/20 shadow-sm"
        >
          <Check className="w-7 h-7" />
        </motion.div>
        <h2 className="text-lg font-bold text-text mb-2">Paper Uploaded Successfully</h2>
        <p className="text-text-secondary text-sm flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          Generating AI Summary...
        </p>
      </div>
    );
  }

  const stepsList = [
    { label: 'Uploading Paper', key: 'uploading' },
    { label: 'Extracting Text', key: 'extracting' },
    { label: 'Understanding Research Context', key: 'context' },
    { label: 'Generating AI Summary', key: 'summarizing' },
  ];

  // Map step value to corresponding index in 4-step list
  let currentStepIndex = 0;
  if (step === 'extracting') {
    currentStepIndex = 1;
  } else if (step === 'summarizing') {
    currentStepIndex = 3; 
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pb-24">
      {/* Loading header and timeline */}
      <div className="max-w-md mx-auto text-center mb-10">
        <h2 className="text-xl font-bold text-text mb-1">Analyzing your paper</h2>
        <p className="text-sm text-text-secondary">This usually takes 15–30 seconds</p>
      </div>

      <div className="max-w-md mx-auto bg-card rounded-2xl border border-border p-6 shadow-sm mb-12">
        <div className="flex flex-col gap-4">
          {stepsList.map((s, idx) => {
            const isDone = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;

            return (
              <div key={s.key} className="flex items-center gap-4 py-1.5">
                <div className="flex-shrink-0">
                  {isDone ? (
                    <div className="w-6 h-6 rounded-full bg-success/10 border border-success/20 flex items-center justify-center text-success">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : isActive ? (
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-bg border border-border flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-text-secondary/20" />
                    </div>
                  )}
                </div>
                <span className={`text-sm font-medium ${isDone ? 'text-success' : isActive ? 'text-text font-semibold' : 'text-text-secondary/50'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skeleton placeholders with shimmer animation (visible during generating AI summary) */}
      {step === 'summarizing' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Header Card Skeleton */}
          <div className="bg-card rounded-2xl border border-border p-5 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-bg rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-bg rounded w-1/3" />
                <div className="h-3 bg-bg rounded w-1/4" />
              </div>
            </div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 gap-4">
            {['Overview', 'Methodology', 'Key Findings', 'Conclusion'].map((title) => (
              <div key={title} className="bg-card rounded-2xl border border-border p-5 relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-20" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-bg rounded-lg border border-border" />
                  <div className="h-4 bg-bg rounded w-24" />
                </div>
                <div className="space-y-2.5">
                  <div className="h-3 bg-bg rounded w-full" />
                  <div className="h-3 bg-bg rounded w-[95%]" />
                  <div className="h-3 bg-bg rounded w-[85%]" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
