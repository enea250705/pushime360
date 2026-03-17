import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check, BookOpen, Globe, Play, Loader2, CheckCircle2 } from 'lucide-react';

const WidgetEmbed = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [apiResults, setApiResults] = useState<Record<string, { loading: boolean; data: any; error: string | null }>>({});

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

  const testEndpoint = async (key: string, url: string) => {
    setApiResults(prev => ({ ...prev, [key]: { loading: true, data: null, error: null } }));
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setApiResults(prev => ({ ...prev, [key]: { loading: false, data, error: null } }));
    } catch (err: any) {
      setApiResults(prev => ({ ...prev, [key]: { loading: false, data: null, error: err.message } }));
    }
  };

  const apiEndpoints = [
    {
      key: 'holidays',
      label: 'GET /api/holidays',
      description: 'Festat zyrtare të Shqipërisë 2026',
      url: `${baseUrl}/api/holidays`,
      curlExample: `curl ${baseUrl}/api/holidays`,
    },
    {
      key: 'kosovo',
      label: 'GET /api/kosovo-holidays',
      description: 'Festat zyrtare të Kosovës 2026',
      url: `${baseUrl}/api/kosovo-holidays`,
      curlExample: `curl ${baseUrl}/api/kosovo-holidays`,
    },
  ];

  const staticSections = [
    {
      key: 'embed',
      icon: <Code2 className="h-5 w-5" />,
      title: 'Widget Embed',
      description: 'Integro kalendarin në faqen tënde me iframe.',
      code: embedCode,
      lang: 'html',
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

        <div className="mx-auto max-w-4xl space-y-6">

          {/* Live API Tester */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-border p-4 md:p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-card-foreground">Live API Endpoints</h3>
                <p className="text-xs text-muted-foreground">Testo endpoint-at drejtpërdrejt nga këtu</p>
              </div>
            </div>

            <div className="divide-y divide-border">
              {apiEndpoints.map((ep) => {
                const result = apiResults[ep.key];
                const isLoading = result?.loading;
                const hasData = result?.data;
                const hasError = result?.error;

                return (
                  <div key={ep.key} className="p-4 md:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">GET</span>
                        <div>
                          <p className="font-mono text-sm font-semibold text-card-foreground">{ep.label.replace('GET ', '')}</p>
                          <p className="text-xs text-muted-foreground">{ep.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => copyToClipboard(ep.curlExample, ep.key + '-copy')}
                          className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
                        >
                          {copied === ep.key + '-copy' ? <><Check className="h-3.5 w-3.5" /> Kopjuar!</> : <><Copy className="h-3.5 w-3.5" /> Kopjo URL</>}
                        </button>
                        <button
                          onClick={() => testEndpoint(ep.key, ep.url)}
                          disabled={isLoading}
                          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                        >
                          {isLoading ? (
                            <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Duke testuar...</>
                          ) : (
                            <><Play className="h-3.5 w-3.5" /> Testo</>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Result Preview */}
                    {(hasData || hasError) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3"
                      >
                        {hasError ? (
                          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                            ⚠ Gabim: {hasError}
                          </div>
                        ) : (
                          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
                            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              200 OK — {Array.isArray(hasData) ? `${hasData.length} festa u kthyen` : 'Sukses'}
                            </div>
                            <pre className="overflow-x-auto text-[11px] leading-relaxed text-muted-foreground">
                              <code>{JSON.stringify(Array.isArray(hasData) ? hasData.slice(0, 2) : hasData, null, 2)}{Array.isArray(hasData) && hasData.length > 2 ? `\n  // ... dhe ${hasData.length - 2} të tjera` : ''}</code>
                            </pre>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Static sections: embed + ical */}
          {staticSections.map((section, index) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 1) * 0.1 }}
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
