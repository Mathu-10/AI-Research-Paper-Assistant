export default function Hero() {
  return (
    <section className="text-center py-20 px-6">
      <div className="inline-flex items-center gap-2 bg-[#2563EB]/8 text-[#2563EB] text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-[#2563EB]/20">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Powered by Gemini AI
      </div>
      <h1 className="text-5xl sm:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight mb-5">
        AI Research Paper
        <br />
        <span className="text-[#2563EB]">Assistant</span>
      </h1>
      <p className="text-[#64748B] text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
        Upload academic papers, generate summaries, and interact with research using AI.
      </p>
    </section>
  );
}
