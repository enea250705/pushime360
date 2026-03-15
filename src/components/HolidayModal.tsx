import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Calendar, MapPin } from 'lucide-react';
import { formatDateAlbanian, getCategoryLabel, getCategoryColor, getCategoryTextColor } from '@/data/holidays';
import type { Holiday } from '@/data/holidays';

interface HolidayModalProps {
  holiday: Holiday | null;
  onClose: () => void;
}

const HolidayModal = ({ holiday, onClose }: HolidayModalProps) => {
  const shareHoliday = () => {
    if (!holiday) return;
    const text = `🇦🇱 ${holiday.name} — ${formatDateAlbanian(holiday.date)}\n${holiday.description}\n\nkalendarifestave.com`;

    if (navigator.share) {
      navigator.share({ title: holiday.name, text, url: 'https://kalendarifestave.com' });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {holiday && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(holiday.category)} text-primary-foreground`}>
                {getCategoryLabel(holiday.category)}
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <h3 className="mb-2 font-display text-2xl font-bold text-card-foreground">
              {holiday.name}
            </h3>

            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDateAlbanian(holiday.date)}</span>
            </div>

            {holiday.isShifted && holiday.originalDate && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Data origjinale: <strong className="text-card-foreground">{formatDateAlbanian(holiday.originalDate)}</strong>
                </span>
              </div>
            )}

            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {holiday.description}
            </p>

            {holiday.note && (
              <div className="mb-4 rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs text-accent-foreground">
                ⚠️ {holiday.note}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={shareHoliday}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Share2 className="h-4 w-4" />
                Ndaj me miqtë
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HolidayModal;
