import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -3 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200 group"
    >
      <div className="w-10 h-10 bg-primary/[0.06] dark:bg-primary/[0.12] rounded-xl flex items-center justify-center mb-4 border border-primary/10 group-hover:bg-primary/[0.1] transition-colors duration-200 text-primary">
        {icon}
      </div>
      <h3 className="text-text font-semibold text-sm mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
