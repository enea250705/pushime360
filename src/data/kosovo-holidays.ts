import type { Holiday, HolidayCategory } from './holidays';

export interface KosovoHoliday {
  id: string;
  date: string;
  name: string;
  nameEn: string;
  category: HolidayCategory;
  description: string;
  sharedWithAlbania: boolean;
}

export const kosovoHolidays2026: KosovoHoliday[] = [
  {
    id: 'ks-viti-ri',
    date: '2026-01-01',
    name: 'Viti i Ri',
    nameEn: "New Year's Day",
    category: 'national',
    description: 'Festimi i Vitit të Ri.',
    sharedWithAlbania: true,
  },
  {
    id: 'ks-viti-ri-2',
    date: '2026-01-02',
    name: 'Dita e dytë e Vitit të Ri',
    nameEn: 'Day after New Year',
    category: 'national',
    description: 'Dita e dytë e pushimit për Vitin e Ri.',
    sharedWithAlbania: true,
  },
  {
    id: 'ks-dita-lirise',
    date: '2026-01-09',
    name: 'Dita e Lirisë së Fjalës',
    nameEn: 'Day of Freedom of Press',
    category: 'national',
    description: 'Përkujtimi i lirisë së medias në Kosovë.',
    sharedWithAlbania: false,
  },
  {
    id: 'ks-pavaresise',
    date: '2026-02-17',
    name: 'Dita e Pavarësisë së Kosovës',
    nameEn: 'Kosovo Independence Day',
    category: 'national',
    description: 'Shpallja e Pavarësisë së Republikës së Kosovës (17 shkurt 2008).',
    sharedWithAlbania: false,
  },
  {
    id: 'ks-kushtetutes',
    date: '2026-04-09',
    name: 'Dita e Kushtetutës',
    nameEn: 'Constitution Day',
    category: 'national',
    description: 'Dita kur hyri në fuqi Kushtetuta e Republikës së Kosovës.',
    sharedWithAlbania: false,
  },
  {
    id: 'ks-dita-veres',
    date: '2026-03-14',
    name: 'Dita e Verës',
    nameEn: 'Summer Day',
    category: 'cultural',
    description: 'Festa e ardhjes së pranverës.',
    sharedWithAlbania: true,
  },
  {
    id: 'ks-bajrami-vogel',
    date: '2026-03-20',
    name: 'Bajrami i Vogël (Fitër Bajram)',
    nameEn: 'Eid al-Fitr',
    category: 'religious',
    description: 'Fundi i muajit të Ramazanit.',
    sharedWithAlbania: true,
  },
  {
    id: 'ks-pashka-katolike',
    date: '2026-04-05',
    name: 'Pashkët Katolike',
    nameEn: 'Catholic Easter',
    category: 'religious',
    description: 'Pashka sipas kalendarit katolik.',
    sharedWithAlbania: true,
  },
  {
    id: 'ks-pashka-ortodokse',
    date: '2026-04-12',
    name: 'Pashkët Ortodokse',
    nameEn: 'Orthodox Easter',
    category: 'religious',
    description: 'Pashka sipas kalendarit ortodoks.',
    sharedWithAlbania: true,
  },
  {
    id: 'ks-dita-punetoreve',
    date: '2026-05-01',
    name: 'Dita e Punëtorëve',
    nameEn: 'Labour Day',
    category: 'national',
    description: 'Dita Ndërkombëtare e Punëtorëve.',
    sharedWithAlbania: true,
  },
  {
    id: 'ks-dita-europes',
    date: '2026-05-09',
    name: 'Dita e Evropës',
    nameEn: 'Europe Day',
    category: 'national',
    description: 'Festa e Bashkimit Evropian, festohet në Kosovë si ditë zyrtare.',
    sharedWithAlbania: false,
  },
  {
    id: 'ks-kurban-bajram',
    date: '2026-05-27',
    name: 'Kurban Bajram',
    nameEn: 'Eid al-Adha',
    category: 'religious',
    description: 'Festa e Kurban Bajramit.',
    sharedWithAlbania: true,
  },
  {
    id: 'ks-krishtlindjet',
    date: '2026-12-25',
    name: 'Krishtlindjet',
    nameEn: 'Christmas',
    category: 'religious',
    description: 'Festa e Krishtlindjeve.',
    sharedWithAlbania: true,
  },
  {
    id: 'ks-dita-flamurit',
    date: '2026-11-28',
    name: 'Dita e Flamurit',
    nameEn: 'Flag Day',
    category: 'national',
    description: 'Përkujtimi i Ditës së Flamurit Shqiptar.',
    sharedWithAlbania: true,
  },
];

export function getSharedHolidays(): { albania: string; kosovo: string; date: string }[] {
  return kosovoHolidays2026
    .filter(kh => kh.sharedWithAlbania)
    .map(kh => ({
      albania: kh.name,
      kosovo: kh.name,
      date: kh.date,
    }));
}

export function getKosovoOnlyHolidays(): KosovoHoliday[] {
  return kosovoHolidays2026.filter(kh => !kh.sharedWithAlbania);
}
