import { motion } from 'framer-motion';
import { Upload, Compass } from 'lucide-react';

interface HeroProps {
  onUploadClick?: () => void;
}

export default function Hero({ onUploadClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('features-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="relative text-center pt-28 pb-20 px-6 overflow-hidden">
      {/* Subtle radial gradients in background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] left-[20%] w-[60%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,var(--primary)/0.04,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,var(--primary)/0.08,transparent_60%)]" />
        <div className="absolute top-[20%] -right-[20%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,#7C3AED/0.03,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,#7C3AED/0.06,transparent_60%)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Eyebrow badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-1.5 bg-primary/[0.06] text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 border border-primary/10 tracking-wide select-none"
        >
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          ✨ AI Powered Research Assistant
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight leading-[1.1] mb-6 max-w-3xl"
        >
          Understand Research Papers in Minutes, Not Hours.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Generate structured summaries, extract key insights and chat with any research paper using AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 flex-wrap mb-10"
        >
          <button
            onClick={onUploadClick}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <Upload className="w-4 h-4" />
            Upload Research Paper
          </button>
          <a
            href="#features-section"
            onClick={handleExploreClick}
            className="inline-flex items-center gap-2 bg-card hover:bg-bg text-text text-sm font-semibold px-6 py-3 rounded-xl border border-border hover:border-text-secondary/30 shadow-sm transition-all duration-200"
          >
            <Compass className="w-4 h-4 text-text-secondary" />
            Explore Features
          </a>
        </motion.div>

        {/* Trust indicator */}
        <motion.div
          variants={itemVariants}
          className="text-xs font-medium text-text-secondary/70 tracking-wide border-t border-border/60 pt-6 w-full max-w-md"
        >
          Trusted by Students • Researchers • Developers
        </motion.div>
      </motion.div>
    </section>
  );
}
