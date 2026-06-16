interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="w-10 h-10 bg-[#2563EB]/8 rounded-xl flex items-center justify-center mb-4 border border-[#2563EB]/15">
        {icon}
      </div>
      <h3 className="text-[#0F172A] font-semibold text-base mb-2">{title}</h3>
      <p className="text-[#64748B] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
