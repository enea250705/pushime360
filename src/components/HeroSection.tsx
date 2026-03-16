import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNextHoliday, getDaysUntil, formatDateAlbanian, holidays2026 } from '@/data/holidays';

const HeroSection = () => {
  const nextHoliday = getNextHoliday();
  const daysUntil = nextHoliday ? getDaysUntil(nextHoliday.date) : 0;
  const totalHolidays = holidays2026.filter(h => !h.isShifted).length;

  return (
    <section className="relative overflow-hidden bg-secondary py-24 md:py-36">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute right-1/3 top-1/3 h-64 w-64 rounded-full bg-holiday-religious/5 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/5"
          >
            <Sparkles className="h-4 w-4" />
            <span>Festat Zyrtare 2026</span>
          </motion.div>

          <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-secondary-foreground md:text-7xl">
            Kalendari i{' '}
            <span className="text-gradient-primary">Festave</span>
            <br />
            <span className="text-gradient-primary">Shqiptare</span>
          </h1>

          <p className="mb-12 text-lg text-secondary-foreground/60 md:text-xl">
            {totalHolidays} festa zyrtare · Fundjavat e gjata · Planifikimi i pushimeve
          </p>

          {nextHoliday && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mx-auto mb-10 max-w-sm"
            >
              <div className="rounded-2xl border border-primary/15 bg-card/80 p-6 shadow-2xl shadow-primary/5 backdrop-blur-sm">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Festa e ardhshme</p>
                <h3 className="mb-2 font-display text-xl font-bold text-card-foreground">{nextHoliday.name}</h3>
                <p className="text-sm text-muted-foreground">{formatDateAlbanian(nextHoliday.date)}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/25">
                  {daysUntil === 0 ? '🎉 Sot!' : `⏳ ${daysUntil} ditë`}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/kalendari"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              Shiko Kalendarin
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/festat"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-card-foreground transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
            >
              Lista e Festave
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
