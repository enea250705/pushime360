import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { holidays2026, ALBANIAN_MONTHS, formatDateAlbanian } from '@/data/holidays';

interface LeaveOptimization {
  leaveDays: string[];
  totalOff: number;
  ratio: number; // days off per leave day
  period: string;
  holidays: string[];
}

function generateOptimizations(maxLeaveDays: number): LeaveOptimization[] {
  const year = 2026;
  const holidayDates = new Set(holidays2026.map(h => h.date));
  const results: LeaveOptimization[] = [];

  // For each holiday cluster, find optimal surrounding leave days
  const sortedHolidays = [...holidays2026].sort((a, b) =>
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
      if ((thisDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24) <= 5) {
        current.push(h);
      } else {
        groups.push([...current]);
        current = [h];
      }
    }
  }
  if (current.length > 0) groups.push(current);

  for (const group of groups) {
    const firstHoliday = new Date(group[0].date);
    const lastHoliday = new Date(group[group.length - 1].date);

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
          const ds = check.toISOString().split('T')[0];
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

        if (leaveDays.length > 0 && leaveDays.length <= maxLeaveDays && totalOff >= 4) {
          const ratio = totalOff / leaveDays.length;
          if (ratio >= 2) {
            results.push({
              leaveDays,
              totalOff,
              ratio,
              period: `${formatDateAlbanian(start.toISOString().split('T')[0])} — ${formatDateAlbanian(end.toISOString().split('T')[0])}`,
              holidays: group.map(h => h.name),
            });
          }
        }
      }
    }
  }

  // Deduplicate and sort by ratio
  const seen = new Set<string>();
  return results
    .filter(r => {
      const key = r.leaveDays.join(',');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 8);
}

const SmartLeavePlanner = () => {
  const [maxDays, setMaxDays] = useState(3);
  const optimizations = useMemo(() => generateOptimizations(maxDays), [maxDays]);

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

        {/* Max days slider */}
        <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-4">
          <label className="text-sm font-medium text-foreground">Ditë leje max:</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setMaxDays(n)}
                className={`h-9 w-9 rounded-lg text-sm font-bold transition-all
                  ${maxDays === n ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card text-muted-foreground hover:bg-muted'}
                `}
              >
                {n}
              </button>
            ))}
          </div>
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
              <p className="text-muted-foreground">Nuk u gjetën sugjerime me {maxDays} ditë leje.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SmartLeavePlanner;
