import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';

interface UploadCardProps {
  onUpload?: (file: File) => void;
}

export default function UploadCard({ onUpload }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf') return;
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
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={`cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 p-10 flex flex-col items-center gap-3
            ${isDragging
              ? 'border-[#2563EB] bg-[#2563EB]/5'
              : 'border-[#E2E8F0] hover:border-[#2563EB]/50 hover:bg-slate-50'
            }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${isDragging ? 'bg-[#2563EB]/10' : 'bg-slate-100'}`}>
            <svg className={`w-6 h-6 transition-colors duration-200 ${isDragging ? 'text-[#2563EB]' : 'text-[#64748B]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[#0F172A]">
              {selectedFile ? selectedFile.name : 'Drop your research paper here'}
            </p>
            <p className="text-xs text-[#64748B] mt-1">
              {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'or click to browse'}
            </p>
          </div>
          <span className="text-[10px] font-medium text-[#64748B] bg-slate-100 px-2.5 py-1 rounded-full tracking-wide uppercase">
            PDF only
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={onFileChange}
        />

        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className="mt-4 w-full bg-[#2563EB] hover:bg-[#1d4ed8] disabled:bg-[#E2E8F0] disabled:text-[#94a3b8] disabled:cursor-not-allowed text-white font-medium text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.98]"
        >
          Upload Paper
        </button>
      </div>
    </div>
  );
}
