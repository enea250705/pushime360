import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Check, X as XIcon } from 'lucide-react';
import { useHolidays, formatDateAlbanian, getCategoryColor, getCategoryLabel } from '@/data/holidays';
import { useKosovoHolidays, getKosovoOnlyHolidays } from '@/data/kosovo-holidays';
import type { HolidayCategory } from '@/data/holidays';

type CompareView = 'shared' | 'albania-only' | 'kosovo-only';

const KosovoComparison = () => {
  const [view, setView] = useState<CompareView>('shared');
  const { data: holidays = [] } = useHolidays();
  const { data: kosovoHolidays = [] } = useKosovoHolidays();

  const kosovoDates = new Set(kosovoHolidays.map(h => h.date));
  const albaniaDates = new Set(holidays.map(h => h.date));

  const shared = holidays.filter(h => kosovoDates.has(h.date));
  const albaniaOnly = holidays.filter(h => !kosovoDates.has(h.date));
  const kosovoOnly = getKosovoOnlyHolidays(kosovoHolidays);

  const tabs: { key: CompareView; label: string; count: number }[] = [
    { key: 'shared', label: 'Të përbashkëta', count: shared.length },
    { key: 'albania-only', label: 'Vetëm Shqipëri', count: albaniaOnly.length },
    { key: 'kosovo-only', label: 'Vetëm Kosovë', count: kosovoOnly.length },
  ];

  const currentList = view === 'shared' ? shared : view === 'albania-only' ? albaniaOnly : kosovoOnly;

  return (
    <section id="kosovo" className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Globe className="h-4 w-4" />
            Shqipëri 🇦🇱 vs Kosovë 🇽🇰
          </div>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Krahasimi i Festave
          </h2>
          <p className="text-muted-foreground">
            Shiko cilat festa janë të përbashkëta dhe cilat janë unike për secilin vend
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all
                ${view === tab.key
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* List */}
        <div className="mx-auto grid max-w-3xl gap-3">
          {currentList.map((holiday, index) => (
            <motion.div
              key={holiday.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-muted">
                <span className="font-display text-base font-bold text-foreground leading-none">
                  {new Date(holiday.date).getDate()}
                </span>
                <span className="text-[9px] font-medium uppercase text-muted-foreground">
                  {new Date(holiday.date).toLocaleDateString('sq-AL', { month: 'short' })}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-card-foreground">{holiday.name}</h3>
                <p className="text-xs text-muted-foreground">{holiday.nameEn}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-0.5" title="Shqipëri">
                  <span className="text-xs">🇦🇱</span>
                  {albaniaDates.has(holiday.date) ? (
                    <Check className="h-3.5 w-3.5 text-long-weekend" />
                  ) : (
                    <XIcon className="h-3.5 w-3.5 text-muted-foreground/30" />
                  )}
                </div>
                <div className="flex flex-col items-center gap-0.5" title="Kosovë">
                  <span className="text-xs">🇽🇰</span>
                  {kosovoDates.has(holiday.date) ? (
                    <Check className="h-3.5 w-3.5 text-long-weekend" />
                  ) : (
                    <XIcon className="h-3.5 w-3.5 text-muted-foreground/30" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KosovoComparison;
