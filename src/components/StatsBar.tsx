import { useHolidays, getCategoryColor, getCategoryLabel } from '@/data/holidays';
import { useKosovoHolidays } from '@/data/kosovo-holidays';
import { useCountry } from '@/hooks/use-country';
import type { HolidayCategory, Holiday } from '@/data/holidays';

const StatsBar = () => {
  const { country } = useCountry();
  const alHolidays = useHolidays();
  const ksHolidays = useKosovoHolidays();
  const holidays = country === 'albania' ? alHolidays.data || [] : ksHolidays.data || [];

  const categoryCounts: Record<HolidayCategory, number> = {
    national: holidays.filter((h: Holiday) => h.category === 'national').length,
    religious: holidays.filter((h: Holiday) => h.category === 'religious').length,
    cultural: holidays.filter((h: Holiday) => h.category === 'cultural').length,
    shifted: holidays.filter((h: Holiday) => h.category === 'shifted').length,
  };

  return (
    <section className="border-y border-border bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {(Object.entries(categoryCounts) as [HolidayCategory, number][]).map(([cat, count]) => (
            <div key={cat} className="flex items-center gap-2.5">
              <div className={`h-3 w-3 rounded-full ${getCategoryColor(cat)}`} />
              <div>
                <p className="font-display text-xl font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground">{getCategoryLabel(cat)}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2.5">
            <div className="h-3 w-3 rounded-full bg-foreground" />
            <div>
              <p className="font-display text-xl font-bold text-foreground">{holidays.length}</p>
              <p className="text-xs text-muted-foreground">Gjithsej</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
