import { motion } from 'framer-motion';
import { Calendar, ArrowDown, Flag } from 'lucide-react';
import { getNextHoliday, getDaysUntil, formatDateAlbanian, useHolidays } from '@/data/holidays';
import { useKosovoHolidays } from '@/data/kosovo-holidays';
import { useCountry } from '@/hooks/use-country';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { country } = useCountry();
  const navigate = useNavigate();
  
  const alHolidays = useHolidays();
  const ksHolidays = useKosovoHolidays();
  
  const holidays = country === 'albania' ? alHolidays.data || [] : ksHolidays.data || [];
  const nextHoliday = getNextHoliday(holidays);
  const daysUntil = nextHoliday ? getDaysUntil(nextHoliday.date) : 0;
  
  // Calculate remaining holidays from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const remainingHolidays = holidays.filter(h => {
    const holidayDate = new Date(h.date);
    holidayDate.setHours(0, 0, 0, 0);
    return !('isObservance' in h && h.isObservance) && !('isShifted' in h && h.isShifted) && holidayDate >= today;
  }).length;
  
  const totalHolidays = holidays.filter(h => !('isObservance' in h && h.isObservance) && !('isShifted' in h && h.isShifted)).length;

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
            <span className="text-gradient-primary">
              {country === 'albania' ? 'Shqiptare' : 'të Kosovës'}
            </span>
          </h1>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 rounded-xl border border-primary/20 bg-card px-6 py-3 text-sm font-semibold transition-all hover:scale-105 ${country === 'albania' ? 'ring-2 ring-primary bg-primary/10' : ''}`}
            >
              🇦🇱 Shqipëria
            </button>
            <button
              onClick={() => navigate('/kosove')}
              className={`flex items-center gap-2 rounded-xl border border-primary/20 bg-card px-6 py-3 text-sm font-semibold transition-all hover:scale-105 ${country === 'kosovo' ? 'ring-2 ring-primary bg-primary/10' : ''}`}
            >
              🇽🇰 Kosova
            </button>
          </div>

          <p className="mb-10 text-lg text-secondary-foreground/70 md:text-xl">
            Edhe <strong>{remainingHolidays}</strong> festa zyrtare të mbetura këtë vit · {totalHolidays} gjithsej
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
