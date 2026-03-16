import type { VercelRequest, VercelResponse } from '@vercel/node';

export const holidays2026 = [
  { id: 'viti-ri', date: '2026-01-01', name: 'Viti i Ri', description: 'Festimi i Vitit të Ri, një nga festat më të mëdha në Shqipëri.' },
  { id: 'pas-vitit-ri', date: '2026-01-02', name: 'Dita pas Vitit të Ri', description: 'Dita e dytë e pushimit për Vitin e Ri.' },
  { id: 'dita-veres', date: '2026-03-14', name: 'Dita e Verës', description: 'Festa pagane e ardhjes së pranverës.' },
  { id: 'dita-veres-pushim', date: '2026-03-16', name: 'Dita e Verës (pushim i zhvendosur)', description: 'Pushimi zyrtar i zhvendosur.' },
  { id: 'bajrami-vogel', date: '2026-03-20', name: 'Bajrami i Vogël (Fitër Bajram)', description: 'Fundi i Ramazanit.' },
  { id: 'nevruzi', date: '2026-03-22', name: 'Dita e Nevruzit', description: 'Viti i Ri persian/bektashi.' },
  { id: 'nevruzi-pushim', date: '2026-03-23', name: 'Nevruz (pushim i shtyrë)', description: 'Pushimi i shtyrë për Nevruzin.' },
  { id: 'pashka-katolike', date: '2026-04-05', name: 'Pashkët Katolike', description: 'Pashka sipas kalendarit katolik.' },
  { id: 'pashka-katolike-pushim', date: '2026-04-06', name: 'Pashkët Katolike (pushim)', description: 'E hëna pas Pashkës Katolike.' },
  { id: 'pashka-ortodokse', date: '2026-04-12', name: 'Pashkët Ortodokse', description: 'Pashka sipas kalendarit ortodoks.' },
  { id: 'pashka-ortodokse-pushim', date: '2026-04-13', name: 'Pashkët Ortodokse (pushim)', description: 'E hëna pas Pashkës Ortodokse.' },
  { id: 'dita-punetoreve', date: '2026-05-01', name: 'Dita e Punëtorëve', description: 'Dita Ndërkombëtare e Punëtorëve.' },
  { id: 'kurban-bajram', date: '2026-05-27', name: 'Kurban Bajram', description: 'Festa e Kurban Bajramit.' },
  { id: 'nene-tereza', date: '2026-09-05', name: 'Dita e Shenjtërimit të Nënë Terezës', description: 'Përkujtimi i Shenjtërimit të Nënë Terezës.' },
  { id: 'nene-tereza-pushim', date: '2026-09-07', name: 'Dita e Nënë Terezës (pushim i shtyrë)', description: 'Pushimi zyrtar i shtyrë.' },
  { id: 'dita-alfabetit', date: '2026-11-22', name: 'Dita e Alfabetit', description: 'Përkujtimi i Kongresit të Manastirit.' },
  { id: 'alfabeti-pushim', date: '2026-11-23', name: 'Alfabeti (pushim i shtyrë)', description: 'Pushimi zyrtar i shtyrë.' },
  { id: 'dita-flamurit', date: '2026-11-28', name: 'Dita e Flamurit dhe e Pavarësisë', description: 'Shpallja e Pavarësisë së Shqipërisë.' },
  { id: 'dita-clirimit', date: '2026-11-29', name: 'Dita e Çlirimit', description: 'Çlirimi i Shqipërisë.' },
  { id: 'flamuri-clirimi-pushim', date: '2026-11-30', name: 'Flamuri/Çlirimi (pushim i shtyrë)', description: 'Pushimi zyrtar i shtyrë për fundjavën.' },
  { id: 'dita-rinise', date: '2026-12-08', name: 'Dita Kombëtare e Rinisë', description: 'Dita Kombëtare e Rinisë.' },
  { id: 'krishtlindjet', date: '2026-12-25', name: 'Krishtlindjet', description: 'Festa e Krishtlindjeve.' },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { title, start, end, description } = req.query;
  
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const domain = 'pushime360.com';
  
  let content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${domain}//AL`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Festat Shqiptare 2026',
    'X-WR-TIMEZONE:Europe/Tirane'
  ];

  if (title && start && end) {
    const startDate = (start as string).replace(/-/g, '');
    const e = new Date(end as string);
    e.setDate(e.getDate() + 1);
    const endDate = e.toISOString().split('T')[0].replace(/-/g, '');
    
    content.push(
      'BEGIN:VEVENT',
      `UID:custom-${startDate}-${endDate}@${domain}`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${startDate}`,
      `DTEND;VALUE=DATE:${endDate}`,
      `SUMMARY:${title}`,
    );
    if (description) {
      const escapedDesc = (description as string)
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
      content.push(`DESCRIPTION:${escapedDesc}`);
    }
    content.push('TRANSP:TRANSPARENT', 'END:VEVENT');
  } else {
    holidays2026.forEach(h => {
      const startFormat = h.date.replace(/-/g, '');
      const endDate = new Date(h.date);
      endDate.setDate(endDate.getDate() + 1);
      const endFormat = endDate.toISOString().split('T')[0].replace(/-/g, '');
      const uid = `${h.id}-2026@${domain}`;
      
      content.push(
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${now}`,
        `DTSTART;VALUE=DATE:${startFormat}`,
        `DTEND;VALUE=DATE:${endFormat}`,
        `SUMMARY:${h.name}`,
      );

      if (h.description) {
        const escapedDesc = h.description
          .replace(/\\/g, '\\\\')
          .replace(/;/g, '\\;')
          .replace(/,/g, '\\,')
          .replace(/\n/g, '\\n');
        content.push(`DESCRIPTION:${escapedDesc}`);
      }
      
      content.push('TRANSP:TRANSPARENT', 'END:VEVENT');
    });
  }

  content.push('END:VCALENDAR');

  const icsString = content.join('\r\n');

  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${title ? 'pushime-te-gjata' : 'festat-shqiptare-2026'}.ics"`);
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).send(icsString);
}
