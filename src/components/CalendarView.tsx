import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ALBANIAN_MONTHS, ALBANIAN_DAYS, holidays2026, getCategoryColor } from '@/data/holidays';
import HolidayModal from './HolidayModal';
import type { Holiday } from '@/data/holidays';

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(0); // January 2026
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  const year = 2026;
  const firstDay = new Date(year, currentMonth, 1);
  const lastDay = new Date(year, currentMonth + 1, 0);
  const startDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = lastDay.getDate();

  const monthHolidays = holidays2026.filter(h => {
    const d = new Date(h.date);
    return d.getMonth() === currentMonth && d.getFullYear() === year;
  });

  const getHolidaysForDay = (day: number): Holiday[] => {
    const dateStr = `${year}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return monthHolidays.filter(h => h.date === dateStr);
  };

  const isWeekend = (day: number): boolean => {
    const d = new Date(year, currentMonth, day);
    return d.getDay() === 0 || d.getDay() === 6;
  };

  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === year;

  const prevMonth = () => setCurrentMonth(m => Math.max(0, m - 1));
  const nextMonth = () => setCurrentMonth(m => Math.min(11, m + 1));

  return (
    <section id="calendar" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Kalendari Mujor
          </h2>
          <p className="text-muted-foreground">
            Shiko festat zyrtare sipas muajit
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-4 shadow-sm md:p-8">
          {/* Month navigation */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={prevMonth}
              disabled={currentMonth === 0}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="font-display text-xl font-bold text-card-foreground">
              {ALBANIAN_MONTHS[currentMonth]} {year}
            </h3>
            <button
              onClick={nextMonth}
              disabled={currentMonth === 11}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {ALBANIAN_DAYS.map(day => (
              <div key={day} className="py-2 text-center text-xs font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMonth}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-7 gap-1"
            >
              {/* Empty cells for days before the 1st */}
              {Array.from({ length: startDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayHolidays = getHolidaysForDay(day);
                const weekend = isWeekend(day);
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
                          <div
                            key={h.id}
                            className={`h-1.5 w-1.5 rounded-full ${getCategoryColor(h.category)}`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Month holidays list */}
          {monthHolidays.length > 0 && (
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
        </div>
      </div>

      <HolidayModal holiday={selectedHoliday} onClose={() => setSelectedHoliday(null)} />
    </section>
  );
};

export default CalendarView;
