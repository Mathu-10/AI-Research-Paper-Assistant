export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-[#0F172A] text-sm tracking-tight">
            AI Research Assistant
          </span>
        </div>

        {/* Right: Status + Theme toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Backend Connected
          </div>
          <button
            disabled
            title="Theme toggle (coming soon)"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] opacity-50 cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
