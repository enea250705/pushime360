import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check, BookOpen, Globe } from 'lucide-react';
import { useHolidays } from '@/data/holidays';

const WidgetEmbed = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const { data: holidays = [] } = useHolidays();
  
  // Use the production URL in examples when running locally so devs understand how to call it
  const baseUrl = typeof window !== 'undefined' && window.location.hostname.includes('localhost') 
    ? 'https://pushime360.com' 
    : window.location.origin;

  const embedCode = `<iframe
  src="${baseUrl}/?embed=true"
  width="100%"
  height="500"
  frameborder="0"
  style="border-radius: 12px; border: 1px solid #e5e7eb;"
></iframe>`;

  const apiExample = `// Festat zyrtare 2026 — API Live
fetch('${baseUrl}/api/holidays')
  .then(res => res.json())
  .then(data => console.log(data));

// Ose thirrje për Festat e Kosovës:
fetch('${baseUrl}/api/kosovo-holidays')
  .then(res => res.json())
  .then(data => console.log(data));

// Shembull i përgjigjes nga API (REST Payload):
[
  {
    "id": "viti-ri",
    "date": "2026-01-01",
    "name": "Viti i Ri",
    "nameEn": "New Year's Day",
    "category": "national",
    "description": "Festimi i Vitit të Ri..."
  },
  // ... (${holidays.length} festa në total)
]`;

  const icalExample = `// Shto në iCal direkt nga aplikacioni juaj HTML
<a href="${baseUrl}/api/ical">
  Shto në Kalendarin Tim (iCal)
</a>

// Ose gjeneroni iCal vetëm për pushime të caktuara:
<a href="${baseUrl}/api/ical?title=Pushim&start=2026-03-14&end=2026-03-16">
  Shto Pushimin (14-16 Mars)
</a>`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const sections = [
    {
      key: 'embed',
      icon: <Code2 className="h-5 w-5" />,
      title: 'Widget Embed',
      description: 'Integro kalendarin në faqen tënde me iframe.',
      code: embedCode,
      lang: 'html',
    },
    {
      key: 'api',
      icon: <Globe className="h-5 w-5" />,
      title: 'Live API Endpoints',
      description: 'Merr festat direkt nga endpoint-i ynë live për t\'i përdorur në aplikacionet tuaja.',
      code: apiExample,
      lang: 'javascript',
    },
    {
      key: 'ical',
      icon: <BookOpen className="h-5 w-5" />,
      title: (
        <span className="flex items-center gap-2">
          iCal Format
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            Së shpejti
          </span>
        </span>
      ),
      description: 'Importo festat në Google Calendar, Apple Calendar, etj.',
      code: icalExample,
      lang: 'text',
    },
  ];

  return (
    <section id="api" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Code2 className="h-4 w-4" />
            Për Zhvilluesit
          </div>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Widget & API
          </h2>
          <p className="text-muted-foreground">
            Integro festat shqiptare në projektet e tua
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-border p-4 md:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-card-foreground">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(section.code, section.key)}
                  className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {copied === section.key ? (
                    <><Check className="h-3.5 w-3.5" /> Kopjuar!</>
                  ) : (
                    <><Copy className="h-3.5 w-3.5" /> Kopjo</>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto bg-secondary p-4 text-xs leading-relaxed text-secondary-foreground md:p-5">
                <code>{section.code}</code>
              </pre>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WidgetEmbed;
