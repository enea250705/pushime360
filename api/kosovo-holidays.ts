import type { VercelRequest, VercelResponse } from '@vercel/node';

export interface KosovoHoliday {
  id: string;
  date: string;
  name: string;
  nameEn: string;
  category: string;
  description: string;
  sharedWithAlbania: boolean;
  isObservance?: boolean;
}

export const kosovoHolidays2026: KosovoHoliday[] = [
  { id: 'ks-viti-ri', date: '2026-01-01', name: 'Viti i Ri', nameEn: "New Year's Day", category: 'national', description: 'Festimi i Vitit të Ri — ditë zyrtare pushimi sipas Ligjit 03/L-064.', sharedWithAlbania: true },
  { id: 'ks-viti-ri-2', date: '2026-01-02', name: 'Dita e Dytë e Vitit të Ri', nameEn: '2nd Day of New Year', category: 'national', description: 'Dita e dytë e pushimit zyrtar për Vitin e Ri.', sharedWithAlbania: true },
  { id: 'ks-krishtlindjet-ortodokse', date: '2026-01-07', name: 'Krishtlindjet Ortodokse', nameEn: 'Orthodox Christmas Day', category: 'religious', description: 'Krishtlindjet sipas kalendarit julian ortodoks — ditë zyrtare pushimi.', sharedWithAlbania: false },
  { id: 'ks-pavaresise', date: '2026-02-17', name: 'Dita e Pavarësisë', nameEn: 'Kosovo Independence Day', category: 'national', description: 'Shpallja e Pavarësisë së Republikës së Kosovës — 17 shkurt 2008.', sharedWithAlbania: false },
  { id: 'ks-fiter-bajrami', date: '2026-03-20', name: 'Fitër Bajrami', nameEn: 'Eid al-Fitr', category: 'religious', description: 'Dita e parë e Bajramit — fundi i muajit të shenjtë të Ramazanit. Data tentative sipas kalendarit hënor.', sharedWithAlbania: true },
  { id: 'ks-pashka-katolike', date: '2026-04-05', name: 'Pashkët Katolike', nameEn: 'Catholic Easter', category: 'religious', description: 'Pashka sipas kalendarit gregorian katolik.', sharedWithAlbania: true },
  { id: 'ks-pashka-katolike-e-hene', date: '2026-04-06', name: 'E Hëna e Pashkëve Katolike', nameEn: 'Catholic Easter Monday', category: 'religious', description: 'Dita e dytë e festës së Pashkëve Katolike — ditë zyrtare pushimi.', sharedWithAlbania: false },
  { id: 'ks-kushtetutes', date: '2026-04-09', name: 'Dita e Kushtetutës', nameEn: 'Constitution Day', category: 'national', description: 'Dita kur hyri në fuqi Kushtetuta e Republikës së Kosovës — 9 prill 2008.', sharedWithAlbania: false },
  { id: 'ks-pashka-ortodokse', date: '2026-04-12', name: 'Pashkët Ortodokse', nameEn: 'Orthodox Easter', category: 'religious', description: 'Pashka sipas kalendarit julian ortodoks.', sharedWithAlbania: true },
  { id: 'ks-pashka-ortodokse-e-hene', date: '2026-04-13', name: 'E Hëna e Pashkëve Ortodokse', nameEn: 'Orthodox Easter Monday', category: 'religious', description: 'Dita e dytë e festës së Pashkëve Ortodokse — ditë zyrtare pushimi.', sharedWithAlbania: false },
  { id: 'ks-dita-punetoreve', date: '2026-05-01', name: 'Dita e Punëtorëve', nameEn: "International Labour Day", category: 'national', description: 'Dita Ndërkombëtare e Punëtorëve — 1 maj.', sharedWithAlbania: true },
  { id: 'ks-dita-europes-transfer', date: '2026-05-11', name: 'Dita e Evropës (pushim)', nameEn: 'Europe Day (day off transferred)', category: 'national', description: 'Dita e Evropës (9 maj) bie të shtunë në 2026 — pushimi transferohet të hënë 11 maj.', sharedWithAlbania: false },
  { id: 'ks-kurban-bajram', date: '2026-05-27', name: 'Kurban Bajrami', nameEn: 'Eid al-Adha', category: 'religious', description: 'Dita e parë e Kurban Bajramit. Data tentative.', sharedWithAlbania: true },
  { id: 'ks-krishtlindjet', date: '2026-12-25', name: 'Krishtlindjet Katolike', nameEn: 'Catholic Christmas Day', category: 'religious', description: 'Festa e Krishtlindjeve Katolike — 25 dhjetor.', sharedWithAlbania: true },
  { id: 'ks-dita-shqiptareve', date: '2026-11-28', name: 'Dita e Shqiptarëve', nameEn: 'Day of Albanians', category: 'national', description: 'Kujtimi i Ditës së Flamurit Shqiptar', sharedWithAlbania: true, isObservance: true },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers to allow external usage
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json(kosovoHolidays2026);
}
