import { useQuery } from '@tanstack/react-query';
import { kosovoHolidays2026 } from '../../api/_data/kosovo-holidays-data';
export type { KosovoHoliday } from '../../api/_data/kosovo-holidays-data';
export { kosovoHolidays2026 };

export function useKosovoHolidays() {
  return useQuery({
    queryKey: ['kosovo-holidays'],
    queryFn: async (): Promise<any[]> => {
      try {
        const res = await fetch('/api/kosovo-holidays');
        if (!res.ok) throw new Error('Kosovo API failed');
        return res.json();
      } catch (err) {
        console.error('Failed to fetch Kosovo holidays from API', err);
        return kosovoHolidays2026;
      }
    },
    initialData: kosovoHolidays2026,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function getSharedHolidays(data = kosovoHolidays2026) {
  return data
    .filter(kh => kh.sharedWithAlbania && !kh.isObservance)
    .map(kh => ({
      albania: kh.name,
      kosovo: kh.name,
      date: kh.date,
    }));
}

export function getKosovoOnlyHolidays(data = kosovoHolidays2026) {
  return data.filter(kh => !kh.sharedWithAlbania);
}
