export type HolidayCategory = 'national' | 'religious' | 'shifted' | 'cultural';

export interface Holiday {
  id: string;
  date: string; // ISO date string
  name: string;
  nameEn: string;
  category: HolidayCategory;
  description: string;
  isShifted: boolean;
  originalDate?: string; // if shifted, the real date
  note?: string;
}

export interface LongWeekend {
  startDate: string;
  endDate: string;
  totalDays: number;
  holidays: Holiday[];
  leaveDaysNeeded: number;
  description: string;
}

export const ALBANIAN_MONTHS = [
  'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
  'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
];

export const ALBANIAN_DAYS = ['Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht', 'Die'];

export const holidays2026: Holiday[] = [
  {
    id: 'viti-ri',
    date: '2026-01-01',
    name: 'Viti i Ri',
    nameEn: 'New Year\'s Day',
    category: 'national',
    description: 'Festimi i Vitit të Ri, një nga festat më të mëdha në Shqipëri.',
    isShifted: false,
  },
  {
    id: 'pas-vitit-ri',
    date: '2026-01-02',
    name: 'Dita pas Vitit të Ri',
    nameEn: 'Day after New Year',
    category: 'national',
    description: 'Dita e dytë e pushimit për Vitin e Ri.',
    isShifted: false,
  },
  {
    id: 'dita-veres',
    date: '2026-03-14',
    name: 'Dita e Verës',
    nameEn: 'Summer Day',
    category: 'cultural',
    description: 'Festa pagane e ardhjes së pranverës, me origjinë ilire. Festohet me ballokume dhe verëra.',
    isShifted: false,
  },
  {
    id: 'dita-veres-pushim',
    date: '2026-03-16',
    name: 'Dita e Verës (pushim i zhvendosur)',
    nameEn: 'Summer Day (shifted holiday)',
    category: 'shifted',
    description: 'Pushimi zyrtar i zhvendosur pasi Dita e Verës bie ditën e shtunë.',
    isShifted: true,
    originalDate: '2026-03-14',
  },
  {
    id: 'bajrami-vogel',
    date: '2026-03-20',
    name: 'Bajrami i Vogël (Fitër Bajram)',
    nameEn: 'Eid al-Fitr',
    category: 'religious',
    description: 'Fundi i Ramazanit, festa e madhe myslimane. Data bazohet në kalendarin hënor dhe mund të ndryshojë.',
    isShifted: false,
    note: 'Data sipas kalendarit hënor, mund të ndryshojë ±1 ditë.',
  },
  {
    id: 'nevruzi',
    date: '2026-03-22',
    name: 'Dita e Nevruzit',
    nameEn: 'Nowruz',
    category: 'cultural',
    description: 'Viti i Ri persian/bektashi, festë e rëndësishme kulturore në Shqipëri.',
    isShifted: false,
  },
  {
    id: 'nevruzi-pushim',
    date: '2026-03-23',
    name: 'Nevruz (pushim i shtyrë)',
    nameEn: 'Nowruz (shifted)',
    category: 'shifted',
    description: 'Pushimi i shtyrë për Nevruzin që bie ditën e diel.',
    isShifted: true,
    originalDate: '2026-03-22',
  },
  {
    id: 'pashka-katolike',
    date: '2026-04-05',
    name: 'Pashkët Katolike',
    nameEn: 'Catholic Easter',
    category: 'religious',
    description: 'Pashka sipas kalendarit katolik. Festë e madhe për komunitetin katolik shqiptar.',
    isShifted: false,
  },
  {
    id: 'pashka-katolike-pushim',
    date: '2026-04-06',
    name: 'Pashkët Katolike (pushim)',
    nameEn: 'Catholic Easter Monday',
    category: 'shifted',
    description: 'E hëna pas Pashkës Katolike, ditë pushimi zyrtare.',
    isShifted: false,
  },
  {
    id: 'pashka-ortodokse',
    date: '2026-04-12',
    name: 'Pashkët Ortodokse',
    nameEn: 'Orthodox Easter',
    category: 'religious',
    description: 'Pashka sipas kalendarit ortodoks. Festohet nga komuniteti ortodoks shqiptar.',
    isShifted: false,
  },
  {
    id: 'pashka-ortodokse-pushim',
    date: '2026-04-13',
    name: 'Pashkët Ortodokse (pushim)',
    nameEn: 'Orthodox Easter Monday',
    category: 'shifted',
    description: 'E hëna pas Pashkës Ortodokse, ditë pushimi zyrtare.',
    isShifted: false,
  },
  {
    id: 'dita-punetoreve',
    date: '2026-05-01',
    name: 'Dita e Punëtorëve',
    nameEn: 'Labour Day',
    category: 'national',
    description: 'Dita Ndërkombëtare e Punëtorëve, festë zyrtare në Shqipëri.',
    isShifted: false,
  },
  {
    id: 'kurban-bajram',
    date: '2026-05-27',
    name: 'Kurban Bajram',
    nameEn: 'Eid al-Adha',
    category: 'religious',
    description: 'Festa e Kurban Bajramit, një nga dy festat kryesore myslimane. Data bazohet në kalendarin hënor.',
    isShifted: false,
    note: 'Data sipas kalendarit hënor, mund të ndryshojë ±1 ditë.',
  },
  {
    id: 'nene-tereza',
    date: '2026-09-05',
    name: 'Dita e Shenjtërimit të Nënë Terezës',
    nameEn: 'Mother Teresa Canonization Day',
    category: 'national',
    description: 'Përkujtimi i Shenjtërimit të Nënë Terezës, figurë e shquar shqiptare.',
    isShifted: false,
  },
  {
    id: 'nene-tereza-pushim',
    date: '2026-09-07',
    name: 'Dita e Nënë Terezës (pushim i shtyrë)',
    nameEn: 'Mother Teresa Day (shifted)',
    category: 'shifted',
    description: 'Pushimi zyrtar i shtyrë për Ditën e Nënë Terezës.',
    isShifted: true,
    originalDate: '2026-09-05',
  },
  {
    id: 'dita-alfabetit',
    date: '2026-11-22',
    name: 'Dita e Alfabetit',
    nameEn: 'Alphabet Day',
    category: 'cultural',
    description: 'Përkujtimi i Kongresit të Manastirit (1908), ku u vendos alfabeti i gjuhës shqipe.',
    isShifted: false,
  },
  {
    id: 'alfabeti-pushim',
    date: '2026-11-23',
    name: 'Alfabeti (pushim i shtyrë)',
    nameEn: 'Alphabet Day (shifted)',
    category: 'shifted',
    description: 'Pushimi zyrtar i shtyrë pasi Dita e Alfabetit bie ditën e diel.',
    isShifted: true,
    originalDate: '2026-11-22',
  },
  {
    id: 'dita-flamurit',
    date: '2026-11-28',
    name: 'Dita e Flamurit dhe e Pavarësisë',
    nameEn: 'Flag and Independence Day',
    category: 'national',
    description: 'Përkujtimi i Shpalljes së Pavarësisë së Shqipërisë (28 nëntor 1912) në Vlorë.',
    isShifted: false,
  },
  {
    id: 'dita-clirimit',
    date: '2026-11-29',
    name: 'Dita e Çlirimit',
    nameEn: 'Liberation Day',
    category: 'national',
    description: 'Përkujtimi i Çlirimit të Shqipërisë nga okupimi nazist (29 nëntor 1944).',
    isShifted: false,
  },
  {
    id: 'flamuri-clirimi-pushim',
    date: '2026-11-30',
    name: 'Flamuri/Çlirimi (pushim i shtyrë)',
    nameEn: 'Flag/Liberation (shifted)',
    category: 'shifted',
    description: 'Pushimi zyrtar i shtyrë për fundjavën e Flamurit dhe Çlirimit.',
    isShifted: true,
    originalDate: '2026-11-28',
  },
  {
    id: 'dita-rinise',
    date: '2026-12-08',
    name: 'Dita Kombëtare e Rinisë',
    nameEn: 'National Youth Day',
    category: 'national',
    description: 'Përkujtimi i lëvizjes studentore të dhjetorit 1990.',
    isShifted: false,
  },
  {
    id: 'krishtlindjet',
    date: '2026-12-25',
    name: 'Krishtlindjet',
    nameEn: 'Christmas',
    category: 'religious',
    description: 'Festa e lindjes së Krishtit, festohet nga të gjithë shqiptarët pavarësisht fesë.',
    isShifted: false,
  },
];

export function getHolidaysByMonth(month: number): Holiday[] {
  return holidays2026.filter(h => {
    const d = new Date(h.date);
    return d.getMonth() === month;
  });
}

export function getNextHoliday(): Holiday | undefined {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return holidays2026.find(h => new Date(h.date) >= today);
}

export function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getCategoryLabel(cat: HolidayCategory): string {
  switch (cat) {
    case 'national': return 'Kombëtare';
    case 'religious': return 'Fetare';
    case 'shifted': return 'E zhvendosur';
    case 'cultural': return 'Kulturore';
  }
}

export function getCategoryColor(cat: HolidayCategory): string {
  switch (cat) {
    case 'national': return 'bg-holiday-national';
    case 'religious': return 'bg-holiday-religious';
    case 'shifted': return 'bg-holiday-shifted';
    case 'cultural': return 'bg-holiday-cultural';
  }
}

export function getCategoryTextColor(cat: HolidayCategory): string {
  switch (cat) {
    case 'national': return 'text-holiday-national';
    case 'religious': return 'text-holiday-religious';
    case 'shifted': return 'text-holiday-shifted';
    case 'cultural': return 'text-holiday-cultural';
  }
}

export function calculateLongWeekends(): LongWeekend[] {
  const longWeekends: LongWeekend[] = [];
  
  // Group holidays that are close together (within 5 days)
  const sortedHolidays = [...holidays2026].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let i = 0;
  while (i < sortedHolidays.length) {
    const group: Holiday[] = [sortedHolidays[i]];
    let j = i + 1;
    
    while (j < sortedHolidays.length) {
      const prevDate = new Date(sortedHolidays[j - 1].date);
      const currDate = new Date(sortedHolidays[j].date);
      const diff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (diff <= 3) {
        group.push(sortedHolidays[j]);
        j++;
      } else {
        break;
      }
    }

    if (group.length >= 2) {
      const startDate = new Date(group[0].date);
      const endDate = new Date(group[group.length - 1].date);
      
      // Extend to include weekends
      while (startDate.getDay() !== 1) { // Go back to Monday or include Sat/Sun
        startDate.setDate(startDate.getDate() - 1);
      }
      startDate.setDate(startDate.getDate() - 2); // Include previous weekend
      
      while (endDate.getDay() !== 0) { // Extend to Sunday
        endDate.setDate(endDate.getDate() + 1);
      }

      const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      // Count leave days needed (weekdays that aren't holidays)
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
