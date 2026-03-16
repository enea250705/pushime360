import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LayoutGrid, List, Download, Code } from 'lucide-react';
import { ALBANIAN_MONTHS, ALBANIAN_DAYS, useHolidays, getCategoryColor } from '@/data/holidays';
import HolidayModal from './HolidayModal';
import type { Holiday } from '@/data/holidays';

type ViewMode = 'month' | 'week';

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date(2026, 0, 5)); // first Monday of 2026
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  const { data: holidays = [] } = useHolidays();

  const year = 2026;

  // Month view logic
  const firstDay = new Date(year, currentMonth, 1);
  const lastDay = new Date(year, currentMonth + 1, 0);
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const monthHolidays = holidays.filter(h => {
    const d = new Date(h.date);
    return d.getMonth() === currentMonth && d.getFullYear() === year;
  });

  const getHolidaysForDate = (dateStr: string): Holiday[] => {
    return holidays.filter(h => h.date === dateStr);
  };

  const isWeekend = (date: Date): boolean => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === year;

  const prevMonth = () => setCurrentMonth(m => Math.max(0, m - 1));
  const nextMonth = () => setCurrentMonth(m => Math.min(11, m + 1));

  // Week view logic
  const getWeekDates = (): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(currentWeekStart);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const prevWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - 7);
    if (d.getFullYear() >= 2026) setCurrentWeekStart(d);
  };

  const nextWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 7);
    if (d.getFullYear() <= 2026) setCurrentWeekStart(d);
  };

  const formatDateStr = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const weekDates = getWeekDates();

  return (
    <section id="calendar" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Kalendari Mujor
          </h2>
          <p className="text-muted-foreground">
            Shiko festat zyrtare sipas muajit ose javës
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-4 shadow-sm md:p-8">
          {/* View toggle + navigation */}
          <div className="mb-6 flex items-center justify-between">
            {viewMode === 'month' ? (
              <>
                <button onClick={prevMonth} disabled={currentMonth === 0} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="font-display text-xl font-bold text-card-foreground">
                  {ALBANIAN_MONTHS[currentMonth]} {year}
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={nextMonth} disabled={currentMonth === 11} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={prevWeek} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="font-display text-base font-bold text-card-foreground md:text-xl">
                  {weekDates[0].getDate()} {ALBANIAN_MONTHS[weekDates[0].getMonth()]} — {weekDates[6].getDate()} {ALBANIAN_MONTHS[weekDates[6].getMonth()]}
                </h3>
                <button onClick={nextWeek} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* View mode toggle */}
          <div className="mb-4 flex justify-center gap-1 rounded-lg bg-muted p-1">
            <button
              onClick={() => setViewMode('month')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all
                ${viewMode === 'month' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Muaj
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all
                ${viewMode === 'week' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              <List className="h-3.5 w-3.5" /> Javë
            </button>
          </div>

          {/* Day headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {ALBANIAN_DAYS.map(day => (
              <div key={day} className="py-2 text-center text-xs font-semibold text-muted-foreground">{day}</div>
            ))}
          </div>

          {viewMode === 'month' ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMonth}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-7 gap-1"
              >
                {Array.from({ length: startDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${year}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayHolidays = getHolidaysForDate(dateStr);
                  const weekend = isWeekend(new Date(year, currentMonth, day));
                  const isTodayDate = isCurrentMonth && today.getDate() === day;

                  return (
                    <button
                      key={day}
                      onClick={() => dayHolidays.length > 0 && setSelectedHoliday(dayHolidays[0])}
                      className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-all
                        ${dayHolidays.length > 0 ? 'cursor-pointer hover:scale-105 hover:shadow-md' : 'cursor-default'}
                        ${weekend && dayHolidays.length === 0 ? 'text-muted-foreground' : 'text-card-foreground'}
                        ${isTodayDate ? 'ring-2 ring-primary' : ''}
                        ${dayHolidays.length > 0 ? 'bg-primary/10 font-bold' : 'hover:bg-muted/50'}
                      `}
                    >
                      <span>{day}</span>
                      {dayHolidays.length > 0 && (
                        <div className="mt-0.5 flex gap-0.5">
                          {dayHolidays.map(h => (
                            <div key={h.id} className={`h-1.5 w-1.5 rounded-full ${getCategoryColor(h.category)}`} />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWeekStart.toISOString()}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-7 gap-1"
              >
                {weekDates.map(date => {
                  const dateStr = formatDateStr(date);
                  const dayHolidays = getHolidaysForDate(dateStr);
                  const weekend = isWeekend(date);
                  const isTodayDate = today.toDateString() === date.toDateString();

                  return (
                    <button
                      key={dateStr}
                      onClick={() => dayHolidays.length > 0 && setSelectedHoliday(dayHolidays[0])}
                      className={`flex min-h-[80px] flex-col items-center justify-start rounded-lg p-2 text-sm transition-all
                        ${dayHolidays.length > 0 ? 'cursor-pointer hover:scale-105 hover:shadow-md bg-primary/10' : 'cursor-default'}
                        ${weekend && dayHolidays.length === 0 ? 'text-muted-foreground bg-muted/30' : 'text-card-foreground'}
                        ${isTodayDate ? 'ring-2 ring-primary' : ''}
                      `}
                    >
                      <span className="font-bold">{date.getDate()}</span>
                      <span className="text-[9px] text-muted-foreground">{ALBANIAN_MONTHS[date.getMonth()].slice(0, 3)}</span>
                      {dayHolidays.map(h => (
                        <div key={h.id} className={`mt-1 h-1.5 w-full rounded-full ${getCategoryColor(h.category)}`} />
                      ))}
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Month holidays list (month view only) */}
          {viewMode === 'month' && monthHolidays.length > 0 && (
            <div className="mt-6 space-y-2 border-t border-border pt-4">
              {monthHolidays.map(h => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHoliday(h)}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                >
                  <div className={`h-3 w-3 rounded-full ${getCategoryColor(h.category)}`} />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{h.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(h.date).getDate()} {ALBANIAN_MONTHS[currentMonth]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Week view holiday details */}
          {/* Week view holiday details */}
          {viewMode === 'week' && (
            <div className="mt-4 space-y-2">
              {weekDates.map(date => {
                const dateStr = formatDateStr(date);
                const dayHolidays = getHolidaysForDate(dateStr);
                if (dayHolidays.length === 0) return null;
                return dayHolidays.map(h => (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHoliday(h)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted"
                  >
                    <div className={`h-3 w-3 rounded-full ${getCategoryColor(h.category)}`} />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-card-foreground">{h.name}</p>
                      <p className="text-xs text-muted-foreground">{h.nameEn}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {date.getDate()} {ALBANIAN_MONTHS[date.getMonth()]}
                    </span>
                  </button>
                ));
              })}
            </div>
          )}
        </div>

        {/* Global Export Options */}
        <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground shadow-sm transition-all sm:w-auto cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            Shto në iCal (Së shpejti)
          </button>
          <a
            href="#api"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground sm:w-auto"
          >
            <Code className="h-4 w-4 text-muted-foreground" />
            Për Zhvilluesit (Widget / API)
          </a>
        </div>
      </div>

      <HolidayModal holiday={selectedHoliday} onClose={() => setSelectedHoliday(null)} />
    </section>
  );
};

export default CalendarView;
