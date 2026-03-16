import { useQuery } from '@tanstack/react-query';
import { holidays2026 } from '../../api/_data/holidays-data';
export type { Holiday, HolidayCategory, LongWeekend } from '../../api/_data/holidays-data';
export { holidays2026 };

export const ALBANIAN_MONTHS = [
  'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
  'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
];

export const ALBANIAN_DAYS = ['Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht', 'Die'];

// Fetch hook for live API
export function useHolidays() {
  return useQuery({
    queryKey: ['holidays'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/holidays');
        if (!res.ok) throw new Error('API failed to respond');
        return res.json();
      } catch (err) {
        console.error('Failed to fetch holidays from API, using fallback data', err);
        return holidays2026;
      }
    },
    initialData: holidays2026,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

// Helper functions (same as before)
export function getHolidaysByMonth(month: number, data = holidays2026) {
  return data.filter(h => {
    const d = new Date(h.date);
    return d.getMonth() === month;
  });
}

export function getNextHoliday(data = holidays2026) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return data.find(h => new Date(h.date) >= today);
}

export function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getCategoryLabel(cat: string): string {
  switch (cat) {
    case 'national': return 'Kombëtare';
    case 'religious': return 'Fetare';
    case 'shifted': return 'E zhvendosur';
    case 'cultural': return 'Kulturore';
    default: return cat;
  }
}

export function getCategoryColor(cat: string): string {
  switch (cat) {
    case 'national': return 'bg-holiday-national';
    case 'religious': return 'bg-holiday-religious';
    case 'shifted': return 'bg-holiday-shifted';
    case 'cultural': return 'bg-holiday-cultural';
    default: return 'bg-primary';
  }
}

export function getCategoryTextColor(cat: string): string {
  switch (cat) {
    case 'national': return 'text-holiday-national';
    case 'religious': return 'text-holiday-religious';
    case 'shifted': return 'text-holiday-shifted';
    case 'cultural': return 'text-holiday-cultural';
    default: return 'text-primary';
  }
}

export function calculateLongWeekends(data = holidays2026) {
  const longWeekends = [];
  const sortedHolidays = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let i = 0;
  while (i < sortedHolidays.length) {
    const group = [sortedHolidays[i]];
    let j = i + 1;
    while (j < sortedHolidays.length) {
      const prevDate = new Date(sortedHolidays[j - 1].date);
      const currDate = new Date(sortedHolidays[j].date);
      const diff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diff <= 3) {
        group.push(sortedHolidays[j]);
        j++;
      } else break;
    }

    if (group.length >= 2) {
      const startDate = new Date(group[0].date);
      const endDate = new Date(group[group.length - 1].date);
      while (startDate.getDay() !== 1) startDate.setDate(startDate.getDate() - 1);
      startDate.setDate(startDate.getDate() - 2);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);

      const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      let leaveDays = 0;
      const checkDate = new Date(startDate);
      while (checkDate <= endDate) {
        const dayOfWeek = checkDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const dateStr = checkDate.toISOString().split('T')[0];
        const isHoliday = group.some(h => h.date === dateStr);
        if (!isWeekend && !isHoliday) leaveDays++;
        checkDate.setDate(checkDate.getDate() + 1);
      }

      if (totalDays >= 3 && leaveDays <= 3) {
        longWeekends.push({
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          totalDays,
          holidays: group,
          leaveDaysNeeded: leaveDays,
          description: group.map(h => h.name).join(' + '),
        });
      }
    }
    i = j;
  }
  return longWeekends;
}

export function formatDateAlbanian(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()} ${ALBANIAN_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function isToday(dateStr: string): boolean {
  const today = new Date();
  const d = new Date(dateStr);
  return today.toDateString() === d.toDateString();
}
