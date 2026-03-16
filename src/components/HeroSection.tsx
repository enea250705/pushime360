import { motion } from 'framer-motion';
import { Calendar, ArrowDown } from 'lucide-react';
import { getNextHoliday, getDaysUntil, formatDateAlbanian, holidays2026 } from '@/data/holidays';

const HeroSection = () => {
  const nextHoliday = getNextHoliday();
  const daysUntil = nextHoliday ? getDaysUntil(nextHoliday.date) : 0;
  const totalHolidays = holidays2026.filter(h => !h.isShifted).length;

  return (
    <section className="relative overflow-hidden bg-secondary py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-accent blur-[80px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
            <Calendar className="h-4 w-4" />
            <span>Festat Zyrtare 2026</span>
          </div>

          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-secondary-foreground md:text-6xl">
            Kalendari i Festave{' '}
            <span className="text-gradient-primary">Shqiptare</span>
          </h1>

          <p className="mb-10 text-lg text-secondary-foreground/70 md:text-xl">
            {totalHolidays} festa zyrtare · Fundjavat e gjata · Planifikimi i pushimeve
          </p>

          {nextHoliday && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mx-auto max-w-md rounded-2xl border border-primary/20 bg-card p-6 shadow-lg"
            >
              <p className="mb-1 text-sm font-medium text-muted-foreground">Festa e ardhshme</p>
              <h3 className="mb-2 font-display text-xl font-bold text-card-foreground">{nextHoliday.name}</h3>
              <p className="text-sm text-muted-foreground">{formatDateAlbanian(nextHoliday.date)}</p>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {daysUntil === 0 ? 'Sot!' : `${daysUntil} ditë të mbetura`}
              </div>
            </motion.div>
          )}

          <motion.a
            href="#calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 inline-flex items-center gap-2 text-sm text-secondary-foreground/50 transition-colors hover:text-secondary-foreground"
          >
            Shiko kalendarin <ArrowDown className="h-4 w-4 animate-bounce" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
