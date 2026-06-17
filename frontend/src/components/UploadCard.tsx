import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FileText, UploadCloud, AlertCircle, Check } from 'lucide-react';

interface UploadCardProps {
  onUpload?: (file: File) => void;
  isLoading?: boolean;
}

export default function UploadCard({ onUpload, isLoading = false }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf') return;
    if (file.size > 20 * 1024 * 1024) {
      setSizeError(true);
      setSelectedFile(null);
      return;
    }
    setSizeError(false);
    setSelectedFile(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleUpload = () => {
    if (selectedFile && onUpload) onUpload(selectedFile);
  };

  return (
    <div className="max-w-xl mx-auto px-6 pb-16">
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        {/* Drop zone */}
        <div
          onClick={() => !isLoading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); if (!isLoading) setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          aria-label="Upload PDF file"
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          className={`cursor-pointer transition-all duration-300 p-12 flex flex-col items-center gap-6 m-4 rounded-xl border-2 border-dashed
            ${isDragging ? 'bg-primary/[0.02] border-primary' : 'bg-bg/50 border-border hover:border-primary/50 hover:bg-bg/85'}
            ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
        >
          {/* Icon */}
          <motion.div 
            animate={isDragging ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragging ? 'bg-primary/10' : 'bg-card border border-border shadow-sm'}`}
          >
            {selectedFile ? (
              <FileText className="w-8 h-8 text-primary" />
            ) : (
              <UploadCloud className={`w-8 h-8 transition-colors duration-300 ${isDragging ? 'text-primary' : 'text-text-secondary'}`} />
            )}
          </motion.div>

          <div className="text-center">
            {selectedFile ? (
              <>
                <p className="text-sm font-semibold text-text mb-1 max-w-xs truncate flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-success" />
                  {selectedFile.name}
                </p>
                <p className="text-xs text-text-secondary">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB · PDF</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-text mb-1.5">
                  {isDragging ? 'Release to drop paper' : 'Drop your research paper here'}
                </p>
                <p className="text-xs text-text-secondary">or click to browse local files</p>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 text-[10px] font-semibold text-text-secondary/70 uppercase tracking-wider">
            <span>Supports PDF</span>
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            <span>Maximum size 20MB</span>
          </div>
        </div>

        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={onFileChange} />

        {/* Action area */}
        <div className="px-6 py-4 flex items-center justify-between gap-3 border-t border-border bg-bg/10">
          <div className="flex-1">
            {sizeError && (
              <p className="text-xs font-semibold text-error flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Maximum file size allowed is 20MB.
              </p>
            )}
            {selectedFile && !isLoading && !sizeError && (
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                className="text-xs text-text-secondary hover:text-text font-medium transition-colors"
              >
                Clear file
              </button>
            )}
          </div>
          
          <button
            onClick={(e) => { e.stopPropagation(); handleUpload(); }}
            disabled={!selectedFile || isLoading || sizeError}
            className="flex items-center gap-2 bg-primary hover:bg-primary/95 disabled:bg-border disabled:text-text-secondary/40 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Processing…
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                Upload Paper
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
