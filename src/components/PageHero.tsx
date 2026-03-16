import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeroProps {
  icon: ReactNode;
  badge: string;
  title: string;
  subtitle: string;
}

const PageHero = ({ icon, badge, title, subtitle }: PageHeroProps) => (
  <section className="relative overflow-hidden border-b border-border bg-secondary py-14 md:py-20">
    {/* Decorative blurs */}
    <div className="absolute inset-0 opacity-[0.03]">
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary blur-[120px]" />
      <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-accent blur-[100px]" />
    </div>
    <div className="container relative mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
          {icon}
          <span>{badge}</span>
        </div>
        <h1 className="mb-3 font-display text-3xl font-bold text-secondary-foreground md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto max-w-lg text-secondary-foreground/60">
          {subtitle}
        </p>
      </motion.div>
    </div>
  </section>
);

export default PageHero;
