import Hero from '../components/Hero';
import UploadCard from '../components/UploadCard';
import FeatureCard from '../components/FeatureCard';

const features = [
  {
    title: 'AI Summary',
    description: 'Generate structured summaries including objectives, methodology, and conclusions.',
    icon: (
      <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M5 8h14M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    title: 'Ask Questions',
    description: 'Chat naturally with uploaded research papers using conversational AI.',
    icon: (
      <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Research Insights',
    description: 'Extract key findings and understand complex concepts quickly.',
    icon: (
      <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function Home() {
  const handleUpload = (file: File) => {
    console.log('Upload triggered:', file.name);
    // TODO: wire to backend
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Hero />
      <UploadCard onUpload={handleUpload} />

      {/* Feature Cards */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </section>
    </main>
  );
}
