import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Calendar, ArrowRight, Sparkles, Download } from 'lucide-react';
import { useHolidays, ALBANIAN_MONTHS, formatDateAlbanian, Holiday } from '@/data/holidays';

interface LeaveOptimization {
  leaveDays: string[];
  totalOff: number;
  ratio: number; // days off per leave day
  period: string;
  holidays: string[];
}

function generateOptimizations(holidaysData: Holiday[]): LeaveOptimization[] {
  const year = 2026;
  const holidayDates = new Set(holidaysData.map(h => h.date));
  const results: LeaveOptimization[] = [];

  // For each holiday cluster, find optimal surrounding leave days
  const sortedHolidays = [...holidaysData].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group holidays that are within 7 days of each other
  const groups: typeof sortedHolidays[] = [];
  let current: typeof sortedHolidays = [];

  for (const h of sortedHolidays) {
    if (current.length === 0) {
      current.push(h);
    } else {
      const lastDate = new Date(current[current.length - 1].date);
      const thisDate = new Date(h.date);
      if ((thisDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24) <= 7) {
        current.push(h);
      } else {
        groups.push([...current]);
        current = [h];
      }
    }
  }
  if (current.length > 0) groups.push(current);

  for (const group of groups) {
    const firstHoliday = new Date(group[0].date + 'T00:00:00');
    const lastHoliday = new Date(group[group.length - 1].date + 'T00:00:00');

    // Try extending backward and forward
    for (let backDays = 0; backDays <= 5; backDays++) {
      for (let fwdDays = 0; fwdDays <= 5; fwdDays++) {
        const start = new Date(firstHoliday);
        start.setDate(start.getDate() - backDays);

        // Extend to previous Saturday
        while (start.getDay() !== 6 && start.getDay() !== 1) {
          start.setDate(start.getDate() - 1);
        }
        if (start.getDay() === 1) start.setDate(start.getDate() - 2);

        const end = new Date(lastHoliday);
        end.setDate(end.getDate() + fwdDays);

        // Extend to next Sunday
        while (end.getDay() !== 0) {
          end.setDate(end.getDate() + 1);
        }

        // Count leave days needed
        const leaveDays: string[] = [];
        const check = new Date(start);
        let totalOff = 0;

        while (check <= end) {
          const ds = check.getFullYear() + '-' + String(check.getMonth() + 1).padStart(2, '0') + '-' + String(check.getDate()).padStart(2, '0');
          const isWe = check.getDay() === 0 || check.getDay() === 6;
          const isHol = holidayDates.has(ds);

          if (isWe || isHol) {
            totalOff++;
          } else {
            leaveDays.push(ds);
            totalOff++;
          }
          check.setDate(check.getDate() + 1);
        }

        if (leaveDays.length > 0 && totalOff >= 4) {
          const ratio = totalOff / leaveDays.length;
          if (ratio >= 2) {
            results.push({
              leaveDays,
              totalOff,
              ratio,
              period: `${formatDateAlbanian(start.getFullYear() + '-' + String(start.getMonth() + 1).padStart(2, '0') + '-' + String(start.getDate()).padStart(2, '0'))} — ${formatDateAlbanian(end.getFullYear() + '-' + String(end.getMonth() + 1).padStart(2, '0') + '-' + String(end.getDate()).padStart(2, '0'))}`,
              holidays: group.map(h => h.name),
            });
          }
        }
      }
    }
  }

  // Deduplicate and sort by ratio
  const bestByLeaveDays = new Map<string, LeaveOptimization>();
  for (const r of results) {
    const key = r.leaveDays.join(',');
    const existing = bestByLeaveDays.get(key);
    if (!existing || r.totalOff > existing.totalOff) {
      bestByLeaveDays.set(key, r);
    }
  }
  
  return Array.from(bestByLeaveDays.values())
    .sort((a, b) => b.ratio - a.ratio);
}

const SmartLeavePlanner = () => {
  const { data: holidays = [] } = useHolidays();
  const optimizations = useMemo(() => generateOptimizations(holidays), [holidays]);

  return (
    <section id="smart-planner" className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            Algoritëm i Zgjuar
          </div>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Sugjerimet për Pushime të Gjata
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Merr sa më shumë ditë të lira me sa më pak ditë leje. Algoritmi analizon festat dhe fundjavat për të gjetur kombinimin optimal.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4">
          {optimizations.map((opt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    <span className="rounded-full bg-long-weekend/10 px-3 py-0.5 text-sm font-bold text-long-weekend">
                      {opt.totalOff} ditë pushim
                    </span>
                    <span className="text-xs text-muted-foreground">
                      (me {opt.leaveDays.length} ditë leje = raporti {opt.ratio.toFixed(1)}x)
                    </span>
                  </div>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {opt.period}
                  </p>
                </div>
                
                <div className="mt-4 flex shrink-0 md:mt-0 md:ml-4">
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-muted text-muted-foreground shadow-sm h-9 px-4 py-2 cursor-not-allowed"
                  >
                    <Download className="h-4 w-4" />
                    Shto në iCal (Së shpejti)
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
                {opt.holidays.map((h, i) => (
                  <span key={i} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                    {h}
                  </span>
                ))}
                <ArrowRight className="mx-1 h-4 w-4 self-center text-muted-foreground" />
                {opt.leaveDays.map(d => (
                  <span key={d} className="rounded-full bg-long-weekend/10 px-2.5 py-0.5 text-[11px] font-medium text-long-weekend">
                    {new Date(d).getDate()} {ALBANIAN_MONTHS[new Date(d).getMonth()].slice(0, 3)}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {optimizations.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <p className="text-muted-foreground">Nuk u gjetën sugjerime me këto kritere.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SmartLeavePlanner;
