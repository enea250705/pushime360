import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getKosovoOnlyHolidays, getSharedHolidays, kosovoHolidays2026 } from '../src/data/kosovo-holidays';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Allow cross-origin requests
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

  const { type } = req.query;

  if (type === 'shared') {
    res.status(200).json(getSharedHolidays(kosovoHolidays2026));
    return;
  }

  if (type === 'kosovo-only') {
    res.status(200).json(getKosovoOnlyHolidays(kosovoHolidays2026));
    return;
  }

  // Vercel Serverless Function to return Kosovo static data as JSON
  res.status(200).json(kosovoHolidays2026);
}
