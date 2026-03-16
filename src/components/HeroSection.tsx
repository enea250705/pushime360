import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNextHoliday, getDaysUntil, formatDateAlbanian, holidays2026 } from '@/data/holidays';

const HeroSection = () => {
  const nextHoliday = getNextHoliday();
  const daysUntil = nextHoliday ? getDaysUntil(nextHoliday.date) : 0;
  const totalHolidays = holidays2026.filter(h => !h.isShifted).length;
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-background py-20 md:py-32">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/8 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-20 bottom-1/4 h-56 w-56 rounded-full bg-accent/10 blur-[100px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_0%,hsl(var(--secondary))_70%)]" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm"
          >
            <Calendar className="h-4 w-4" />
            <span>Festat Zyrtare 2026</span>
          </motion.div>

          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-secondary-foreground md:text-6xl lg:text-7xl">
            Kalendari i Festave{' '}
            <span className="text-gradient-primary">Shqiptare</span>
          </h1>

          <p className="mb-10 text-lg text-secondary-foreground/60 md:text-xl">
            {totalHolidays} festa zyrtare · Fundjavat e gjata · Planifikimi i pushimeve
          </p>

          {nextHoliday && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-md rounded-2xl border border-white/10 bg-card/80 p-6 shadow-2xl backdrop-blur-lg"
            >
              <p className="mb-1 text-sm font-medium text-muted-foreground">Festa e ardhshme</p>
              <h3 className="mb-2 font-display text-xl font-bold text-card-foreground">{nextHoliday.name}</h3>
              <p className="text-sm text-muted-foreground">{formatDateAlbanian(nextHoliday.date)}</p>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {daysUntil === 0 ? 'Sot!' : `${daysUntil} ditë të mbetura`}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => navigate('/kalendari')}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Shiko Kalendarin <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate('/festat')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-card/50 px-6 py-3 text-sm font-semibold text-secondary-foreground backdrop-blur-sm transition-all hover:bg-card/80"
            >
              Lista e Festave
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
