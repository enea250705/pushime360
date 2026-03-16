import type { VercelRequest, VercelResponse } from '@vercel/node';
import { holidays2026 } from './_data/holidays-data.js';

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
