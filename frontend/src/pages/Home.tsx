import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUp, 
  Check, 
  FileUp, 
  Eye, 
  Sparkles, 
  MessageSquare, 
  Lightbulb 
} from 'lucide-react';
import Hero from '../components/Hero';
import UploadCard from '../components/UploadCard';
import FeatureCard from '../components/FeatureCard';
import LoadingStatus from '../components/LoadingStatus';
import SummaryView from '../components/SummaryView';
import ErrorMessage from '../components/ErrorMessage';
import { uploadPaper, fetchSummary } from '../services/api';
import type { AppState } from '../types';

const features = [
  {
    title: 'AI Summary',
    description: 'Generate structured summaries instantly.',
    icon: <Sparkles className="w-5 h-5 text-primary" />,
  },
  {
    title: 'Research Chat',
    description: 'Ask contextual questions naturally.',
    icon: <MessageSquare className="w-5 h-5 text-primary" />,
  },
  {
    title: 'Smart Insights',
    description: 'Understand methodologies and findings effortlessly.',
    icon: <Lightbulb className="w-5 h-5 text-primary" />,
  },
];

const whyCards = [
  {
    title: 'Save hours of reading',
    description: 'Grasp the core of any paper in seconds rather than spending hours scanning lines.',
  },
  {
    title: 'AI-powered structured summaries',
    description: 'Instantly view goals, methods, and insights mapped out in an organized format.',
  },
  {
    title: 'Context-aware research chat',
    description: 'Interact with the paper contextually to clarify complex terms and equations.',
  },
  {
    title: 'Built for students and researchers',
    description: 'Streamlined specifically for scholarly work, academic research, and literature reviews.',
  },
];

const IDLE_STATE: AppState = { status: 'idle' };

export default function Home() {
  const [state, setState] = useState<AppState>(IDLE_STATE);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const uploadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpload = async (file: File) => {
    try {
      setState({ status: 'loading', loadingStep: 'uploading' });
      const upload = await uploadPaper(file);

      setState({ status: 'loading', loadingStep: 'uploaded_success' });
      await new Promise((r) => setTimeout(r, 750));

      setState({ status: 'loading', loadingStep: 'extracting' });
      await new Promise((r) => setTimeout(r, 600));

      setState({ status: 'loading', loadingStep: 'summarizing' });
      const summary = await fetchSummary(upload.document_id);

      setState({ status: 'done', upload, summary });
    } catch (err) {
      setState({
        status: 'error',
        upload: state.upload,
        error: err instanceof Error ? err.message : 'An unexpected error occurred.',
      });
    }
  };

  const reset = () => setState(IDLE_STATE);

  return (
    <main className="min-h-screen bg-bg transition-colors duration-200 relative">
      {state.status === 'idle' && (
        <>
          <Hero onUploadClick={scrollToUpload} />
          
          {/* Drag & Drop Upload Zone */}
          <div ref={uploadRef} id="upload-section">
            <UploadCard onUpload={handleUpload} />
          </div>

          {/* How It Works Section */}
          <section id="how-it-works-section" className="max-w-4xl mx-auto px-6 py-20 border-t border-border/60">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">How it Works</h2>
              <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto">
                Transforming academic papers into conversational insights in four simple steps.
              </p>
            </div>

            {/* Timeline element */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative">
              {[
                { label: 'Upload PDF', desc: 'Drag and drop your paper', icon: <FileUp className="w-5 h-5 text-primary" /> },
                { label: 'AI Reads Paper', desc: 'Context is analyzed', icon: <Eye className="w-5 h-5 text-primary" /> },
                { label: 'Generate Summary', desc: 'Objectives & findings mapped', icon: <Sparkles className="w-5 h-5 text-primary" /> },
                { label: 'Ask Questions', desc: 'Chat naturally with AI', icon: <MessageSquare className="w-5 h-5 text-primary" /> },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center relative group">
                  {/* Connection lines */}
                  {idx < 3 && (
                    <div className="hidden sm:block absolute top-6 left-[60%] right-[-40%] h-[1.5px] bg-border group-hover:bg-primary/30 transition-colors duration-300 border-dashed border-t" />
                  )}
                  <div className="w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center mb-4 shadow-sm group-hover:border-primary/30 transition-colors duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-text font-semibold text-sm mb-1">{step.label}</h3>
                  <p className="text-text-secondary text-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section id="features-section" className="max-w-4xl mx-auto px-6 py-20 border-t border-border/60">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">Features</h2>
              <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto">
                Discover the tools built to simplify literature reviews and accelerate learning.
              </p>
            </div>
            
            <motion.div 
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {features.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
              ))}
            </motion.div>
          </section>

          {/* Why PaperMind AI? Section */}
          <section className="max-w-4xl mx-auto px-6 pb-28">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">Why PaperMind AI?</h2>
              <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto">
                Experience a calm, focused environment engineered to enhance your research reading speed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md flex items-start gap-4 transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-text font-semibold text-sm mb-1.5">{card.title}</h3>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      {state.status === 'loading' && state.loadingStep && (
        <div className="pt-24 min-h-[70vh]">
          <LoadingStatus step={state.loadingStep} />
        </div>
      )}

      {state.status === 'error' && (
        <>
          <Hero onUploadClick={scrollToUpload} />
          <ErrorMessage
            message={state.error!}
            onDismiss={reset}
            onRetry={
              state.upload
                ? () => {
                    (async () => {
                      try {
                        setState({ status: 'loading', loadingStep: 'summarizing' });
                        const summary = await fetchSummary(state.upload!.document_id);
                        setState({ status: 'done', upload: state.upload, summary });
                      } catch (err) {
                        setState({
                          status: 'error',
                          upload: state.upload,
                          error: err instanceof Error ? err.message : 'An unexpected error occurred.',
                        });
                      }
                    })();
                  }
                : undefined
            }
          />
          <div ref={uploadRef}>
            <UploadCard onUpload={handleUpload} />
          </div>
        </>
      )}

      {state.status === 'done' && state.summary && state.upload && (
        <div className="pt-10">
          <SummaryView summary={state.summary} upload={state.upload} onReset={reset} />
        </div>
      )}

      {/* Floating Action Button: Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-card border border-border shadow-md rounded-full flex items-center justify-center text-text-secondary hover:text-text hover:border-text-secondary/30 transition-all duration-200"
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
