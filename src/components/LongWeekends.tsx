import { motion } from 'framer-motion';
import { Palmtree, Calendar, Briefcase } from 'lucide-react';
import { calculateLongWeekends, formatDateAlbanian } from '@/data/holidays';

const LongWeekends = () => {
  const longWeekends = calculateLongWeekends();

  return (
    <section id="long-weekends" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Fundjavat e Gjata 🏖️
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Planifiko pushimet e tua! Merr disa ditë leje dhe krijo fundjavat e gjata.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4">
          {longWeekends.map((lw, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md md:p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Palmtree className="h-5 w-5 text-long-weekend" />
                    <span className="rounded-full bg-long-weekend/10 px-3 py-0.5 text-sm font-bold text-long-weekend">
                      {lw.totalDays} ditë pushim
                    </span>
                  </div>
                  <h3 className="mb-1 font-display text-lg font-bold text-card-foreground">
                    {lw.description}
                  </h3>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDateAlbanian(lw.startDate)} — {formatDateAlbanian(lw.endDate)}
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-muted p-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Ditë leje të nevojshme</p>
                    <p className="font-display text-lg font-bold text-foreground">{lw.leaveDaysNeeded}</p>
                  </div>
                </div>
              </div>

              {/* Holidays in this period */}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">
                {lw.holidays.map(h => (
                  <span
                    key={h.id}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {h.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {longWeekends.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <p className="text-muted-foreground">Nuk u gjetën fundjava të gjata për 2026.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LongWeekends;
