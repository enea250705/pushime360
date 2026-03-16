import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check, BookOpen, Globe } from 'lucide-react';
import { holidays2026 } from '@/data/holidays';

const WidgetEmbed = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const embedCode = `<iframe
  src="${window.location.origin}/?embed=true"
  width="100%"
  height="500"
  frameborder="0"
  style="border-radius: 12px; border: 1px solid #e5e7eb;"
></iframe>`;

  const apiExample = `// Festat zyrtare 2026 — JSON
fetch('${window.location.origin}/api/holidays/2026')
  .then(r => r.json())
  .then(data => console.log(data));

// Response:
${JSON.stringify(holidays2026.slice(0, 2).map(h => ({
  date: h.date,
  name: h.name,
  nameEn: h.nameEn,
  category: h.category,
})), null, 2)}
// ... (${holidays2026.length} holidays total)`;

  const icalExample = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KalendariFestave//AL//SQ
X-WR-CALNAME:Festat Zyrtare Shqiptare 2026
${holidays2026.slice(0, 2).map(h => `BEGIN:VEVENT
DTSTART;VALUE=DATE:${h.date.replace(/-/g, '')}
SUMMARY:${h.name}
DESCRIPTION:${h.description}
END:VEVENT`).join('\n')}
...
END:VCALENDAR`;

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
      title: 'API JSON',
      description: 'Merr festat në format JSON për zhvilluesit.',
      code: apiExample,
      lang: 'javascript',
    },
    {
      key: 'ical',
      icon: <BookOpen className="h-5 w-5" />,
      title: 'iCal Format',
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
