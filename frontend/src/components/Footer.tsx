export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] py-8 px-6">
      <p className="text-center text-[#64748B] text-sm">
        Built with{' '}
        <span className="text-[#0F172A] font-medium">React</span>
        {' + '}
        <span className="text-[#0F172A] font-medium">FastAPI</span>
        {' + '}
        <span className="text-[#0F172A] font-medium">Gemini</span>
      </p>
    </footer>
  );
}
