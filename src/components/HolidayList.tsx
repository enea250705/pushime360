import { useState } from 'react';
import { motion } from 'framer-motion';
import { holidays2026, getCategoryLabel, getCategoryColor, getCategoryTextColor, formatDateAlbanian } from '@/data/holidays';
import HolidayModal from './HolidayModal';
import type { Holiday, HolidayCategory } from '@/data/holidays';

const categories: { key: HolidayCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Të gjitha' },
  { key: 'national', label: 'Kombëtare' },
  { key: 'religious', label: 'Fetare' },
  { key: 'cultural', label: 'Kulturore' },
  { key: 'shifted', label: 'Të zhvendosura' },
];

const HolidayList = () => {
  const [filter, setFilter] = useState<HolidayCategory | 'all'>('all');
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  const filtered = filter === 'all' 
    ? holidays2026 
    : holidays2026.filter(h => h.category === filter);

  return (
    <section id="holidays" className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Festat Zyrtare 2026
          </h2>
          <p className="text-muted-foreground">
            Lista e plotë e festave zyrtare në Shqipëri
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all
                ${filter === cat.key 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Holiday cards */}
        <div className="mx-auto grid max-w-4xl gap-3">
          {filtered.map((holiday, index) => (
            <motion.button
              key={holiday.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setSelectedHoliday(holiday)}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-md md:p-5"
            >
              {/* Date badge */}
              <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-muted">
                <span className="font-display text-lg font-bold text-foreground leading-none">
                  {new Date(holiday.date).getDate()}
                </span>
                <span className="text-[10px] font-medium uppercase text-muted-foreground">
                  {new Date(holiday.date).toLocaleDateString('sq-AL', { month: 'short' })}
                </span>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm font-bold text-card-foreground md:text-base">
                  {holiday.name}
                </h3>
                <p className="text-xs text-muted-foreground md:text-sm">{holiday.nameEn}</p>
              </div>

              {/* Category badge */}
              <div className={`hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex ${getCategoryColor(holiday.category)} text-primary-foreground`}>
                {getCategoryLabel(holiday.category)}
              </div>
              <div className={`sm:hidden h-3 w-3 rounded-full flex-shrink-0 ${getCategoryColor(holiday.category)}`} />
            </motion.button>
          ))}
        </div>
      </div>

      <HolidayModal holiday={selectedHoliday} onClose={() => setSelectedHoliday(null)} />
    </section>
  );
};

export default HolidayList;
