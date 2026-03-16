import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Trash2, Calendar, TrendingUp } from 'lucide-react';
import { useHolidays, ALBANIAN_MONTHS, ALBANIAN_DAYS, getCategoryColor, formatDateAlbanian } from '@/data/holidays';

const STORAGE_KEY = 'pushime360-leave-days';
const QUOTA_KEY = 'pushime360-leave-quota';

const PersonalLeavePlanner = () => {
  const [leaveDays, setLeaveDays] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch { return []; }
  });
  const [annualQuota, setAnnualQuota] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem(QUOTA_KEY) || '20', 10);
    } catch { return 20; }
  });
  const [selectedMonth, setSelectedMonth] = useState(0);

  const { data: holidays = [] } = useHolidays();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaveDays));
  }, [leaveDays]);

  useEffect(() => {
    localStorage.setItem(QUOTA_KEY, String(annualQuota));
  }, [annualQuota]);

  const year = 2026;
  const holidayDates = new Set(holidays.map(h => h.date));

  const toggleLeaveDay = (dateStr: string) => {
    setLeaveDays(prev =>
      prev.includes(dateStr)
        ? prev.filter(d => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  const totalUsed = leaveDays.length;
  const remaining = annualQuota - totalUsed;

  const firstDay = new Date(year, selectedMonth, 1);
  const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;

  // Calculate total free days (holidays + weekends + leave)
  const totalFreeDays = useMemo(() => {
    let count = 0;
    for (let m = 0; m < 12; m++) {
      const dim = new Date(year, m + 1, 0).getDate();
      for (let d = 1; d <= dim; d++) {
        const date = new Date(year, m, d);
        const dateStr = `${year}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const isWe = date.getDay() === 0 || date.getDay() === 6;
        const isHol = holidayDates.has(dateStr);
        const isLeave = leaveDays.includes(dateStr);
        if (isWe || isHol || isLeave) count++;
      }
    }
    return count;
  }, [leaveDays]);

  return (
    <section id="planner" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Briefcase className="h-4 w-4" />
            Planifikuesi Personal
          </div>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Plani im i Pushimeve
          </h2>
          <p className="text-muted-foreground">
            Vendos ditët e tua të lejes dhe shiko planin vjetor
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mb-8 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-xs text-muted-foreground">Kuota vjetore</p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <button onClick={() => setAnnualQuota(q => Math.max(0, q - 1))} className="h-6 w-6 rounded bg-muted text-xs font-bold text-foreground">−</button>
              <span className="font-display text-2xl font-bold text-foreground">{annualQuota}</span>
              <button onClick={() => setAnnualQuota(q => q + 1)} className="h-6 w-6 rounded bg-muted text-xs font-bold text-foreground">+</button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-xs text-muted-foreground">Të përdorura</p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">{totalUsed}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-xs text-muted-foreground">Të mbetura</p>
            <p className={`mt-1 font-display text-2xl font-bold ${remaining < 0 ? 'text-destructive' : 'text-long-weekend'}`}>{remaining}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-xs text-muted-foreground">Ditë të lira gjithsej</p>
            <p className="mt-1 font-display text-2xl font-bold text-foreground">{totalFreeDays}</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-4 md:p-6">
          {/* Month selector */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {ALBANIAN_MONTHS.map((m, i) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(i)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all
                  ${selectedMonth === i ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}
                `}
              >
                {m.slice(0, 3)}
              </button>
            ))}
          </div>

          <p className="mb-3 text-xs text-muted-foreground">
            Kliko në ditët e punës për të shtuar/hequr leje. 🔴 = festë · 🟢 = leja jote · ⬜ = fundjavë
          </p>

          {/* Day headers */}
          <div className="mb-1 grid grid-cols-7 gap-1">
            {ALBANIAN_DAYS.map(day => (
              <div key={day} className="py-1 text-center text-[10px] font-semibold text-muted-foreground">{day}</div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`e-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const d = new Date(year, selectedMonth, day);
              const isWe = d.getDay() === 0 || d.getDay() === 6;
              const isHol = holidayDates.has(dateStr);
              const isLeave = leaveDays.includes(dateStr);
              const canToggle = !isWe && !isHol;

              return (
                <button
                  key={day}
                  onClick={() => canToggle && toggleLeaveDay(dateStr)}
                  className={`flex aspect-square items-center justify-center rounded-md text-xs font-medium transition-all
                    ${isHol ? 'bg-primary/20 text-primary font-bold' : ''}
                    ${isLeave ? 'bg-long-weekend text-primary-foreground font-bold ring-2 ring-long-weekend/50' : ''}
                    ${isWe && !isHol ? 'bg-muted/50 text-muted-foreground' : ''}
                    ${!isWe && !isHol && !isLeave ? 'text-card-foreground hover:bg-muted cursor-pointer' : ''}
                    ${isWe || isHol ? 'cursor-default' : ''}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Leave days list for this month */}
          {leaveDays.filter(d => {
            const dt = new Date(d);
            return dt.getMonth() === selectedMonth;
          }).length > 0 && (
            <div className="mt-4 border-t border-border pt-3">
              <p className="mb-2 text-xs font-semibold text-muted-foreground">Lejet e tua në {ALBANIAN_MONTHS[selectedMonth]}:</p>
              <div className="flex flex-wrap gap-2">
                {leaveDays
                  .filter(d => new Date(d).getMonth() === selectedMonth)
                  .sort()
                  .map(d => (
                    <button
                      key={d}
                      onClick={() => toggleLeaveDay(d)}
                      className="inline-flex items-center gap-1 rounded-full bg-long-weekend/10 px-3 py-1 text-xs font-medium text-long-weekend hover:bg-long-weekend/20"
                    >
                      {new Date(d).getDate()} {ALBANIAN_MONTHS[selectedMonth]}
                      <Trash2 className="h-3 w-3" />
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalLeavePlanner;
