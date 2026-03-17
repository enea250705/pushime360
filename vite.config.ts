import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: /^\/api/,
            handler: 'NetworkOnly',
            options: {
              cacheName: 'api-cache',
            },
          },
        ]
      },
      manifest: {
        name: 'Pushime360 — Festat Zyrtare Shqiptare',
        short_name: 'Pushime360',
        description: 'Kalendari i festave zyrtare për Shqipërinë dhe Kosovën.',
        theme_color: '#4f46e5',
        background_color: '#030712',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
    {
      name: 'configure-server-api',
      configureServer(server: any) {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (req.url === '/api/holidays') {
            res.setHeader('Content-Type', 'application/json');
            // We just send the static mocked arrays for local Vite preview
            const holidaysDataConfig = fs.readFileSync(path.resolve(__dirname, './src/data/holidays.ts'), 'utf-8');
            // Extract the static array using naive string matching to avoid running TS 
            // Alternatively, simple JSON dump:
            res.end(JSON.stringify([
              { id: 'viti-ri', date: '2026-01-01', name: 'Viti i Ri', nameEn: "New Year's Day", category: 'national', description: 'Festimi i Vitit të Ri, një nga festat më të mëdha në Shqipëri.', isShifted: false },
              { id: 'pas-vitit-ri', date: '2026-01-02', name: 'Dita pas Vitit të Ri', nameEn: 'Day after New Year', category: 'national', description: 'Dita e dytë e pushimit.', isShifted: false },
              { id: 'dita-veres', date: '2026-03-14', name: 'Dita e Verës', nameEn: 'Summer Day', category: 'cultural', description: 'Festa pagane e ardhjes së pranverës.', isShifted: false },
              { id: 'dita-veres-pushim', date: '2026-03-16', name: 'Dita e Verës (pushim)', nameEn: 'Summer Day (shifted)', category: 'shifted', description: 'Pushimi i zhvendosur.', isShifted: true, originalDate: '2026-03-14' },
              { id: 'bajrami-vogel', date: '2026-03-20', name: 'Bajrami i Vogël', nameEn: 'Eid al-Fitr', category: 'religious', description: 'Fundi i Ramazanit.', isShifted: false },
              { id: 'nevruzi', date: '2026-03-22', name: 'Dita e Nevruzit', nameEn: 'Nowruz', category: 'cultural', description: 'Viti i Ri persian/bektashi.', isShifted: false },
              { id: 'nevruzi-pushim', date: '2026-03-23', name: 'Nevruz (pushim)', nameEn: 'Nowruz (shifted)', category: 'shifted', description: 'Pushim i shtyrë.', isShifted: true, originalDate: '2026-03-22' },
              { id: 'pashka-katolike', date: '2026-04-05', name: 'Pashkët Katolike', nameEn: 'Catholic Easter', category: 'religious', description: 'Festa katolike.', isShifted: false },
              { id: 'pashka-katolike-pushim', date: '2026-04-06', name: 'Pashkët Katolike (pushim)', nameEn: 'Catholic Easter Monday', category: 'shifted', description: 'E hëna e Pashkës.', isShifted: false },
              { id: 'pashka-ortodokse', date: '2026-04-12', name: 'Pashkët Ortodokse', nameEn: 'Orthodox Easter', category: 'religious', description: 'Festa ortodokse.', isShifted: false },
              { id: 'pashka-ortodokse-pushim', date: '2026-04-13', name: 'Pashkët Ortodokse (pushim)', nameEn: 'Orthodox Easter Monday', category: 'shifted', description: 'E hëna.', isShifted: false },
              { id: 'dita-punetoreve', date: '2026-05-01', name: 'Dita e Punëtorëve', nameEn: 'Labour Day', category: 'national', description: 'Dita Ndërkombëtare e Punëtorëve.', isShifted: false },
              { id: 'kurban-bajram', date: '2026-05-27', name: 'Kurban Bajram', nameEn: 'Eid al-Adha', category: 'religious', description: 'Kurban Bajram.', isShifted: false },
              { id: 'nene-tereza', date: '2026-09-05', name: 'Nënë Tereza', nameEn: 'Mother Teresa', category: 'national', description: 'Shenjtërimi.', isShifted: false },
              { id: 'nene-tereza-pushim', date: '2026-09-07', name: 'Nënë Tereza (pushim)', nameEn: 'Mother Teresa (shifted)', category: 'shifted', description: 'Pushimi i shtyrë.', isShifted: true, originalDate: '2026-09-05' },
              { id: 'dita-alfabetit', date: '2026-11-22', name: 'Dita e Alfabetit', nameEn: 'Alphabet Day', category: 'cultural', description: 'Kongresi i Manastirit.', isShifted: false },
              { id: 'alfabeti-pushim', date: '2026-11-23', name: 'Alfabeti (pushim)', nameEn: 'Alphabet Day (shifted)', category: 'shifted', description: 'Pushimi i shtyrë.', isShifted: true, originalDate: '2026-11-22' },
              { id: 'dita-flamurit', date: '2026-11-28', name: 'Dita e Flamurit', nameEn: 'Independence Day', category: 'national', description: 'Pavarësia.', isShifted: false },
              { id: 'dita-clirimit', date: '2026-11-29', name: 'Dita e Çlirimit', nameEn: 'Liberation Day', category: 'national', description: 'Çlirimi.', isShifted: false },
              { id: 'flamuri-clirimi-pushim', date: '2026-11-30', name: 'Flamuri/Çlirimi (pushim)', nameEn: 'Flag/Liberation (shifted)', category: 'shifted', description: 'Pushimi i shtyrë.', isShifted: true, originalDate: '2026-11-28' },
              { id: 'dita-rinise', date: '2026-12-08', name: 'Dita e Rinisë', nameEn: 'Youth Day', category: 'national', description: 'Lëvizja e dhjetorit.', isShifted: false },
              { id: 'krishtlindjet', date: '2026-12-25', name: 'Krishtlindjet', nameEn: 'Christmas', category: 'religious', description: 'Festa e lindjes së Krishtit.', isShifted: false },
            ]));
            return;
          }
          
          if (req.url === '/api/kosovo-holidays') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify([
              { id: 'ks-viti-ri',                 date: '2026-01-01', name: 'Viti i Ri',                          nameEn: "New Year's Day",                    category: 'national',  sharedWithAlbania: true  },
              { id: 'ks-viti-ri-2',               date: '2026-01-02', name: 'Dita e Dytë e Vitit të Ri',          nameEn: '2nd Day of New Year',               category: 'national',  sharedWithAlbania: true  },
              { id: 'ks-krishtlindjet-ortodokse', date: '2026-01-07', name: 'Krishtlindjet Ortodokse',            nameEn: 'Orthodox Christmas Day',            category: 'religious', sharedWithAlbania: false },
              { id: 'ks-pavaresise',              date: '2026-02-17', name: 'Dita e Pavarësisë',                  nameEn: 'Kosovo Independence Day',           category: 'national',  sharedWithAlbania: false },
              { id: 'ks-fiter-bajrami',           date: '2026-03-20', name: 'Fitër Bajrami',                      nameEn: 'Eid al-Fitr',                       category: 'religious', sharedWithAlbania: true  },
              { id: 'ks-pashka-katolike',         date: '2026-04-05', name: 'Pashkët Katolike',                   nameEn: 'Catholic Easter',                   category: 'religious', sharedWithAlbania: true  },
              { id: 'ks-pashka-katolike-e-hene',  date: '2026-04-06', name: 'E Hëna e Pashkëve Katolike',        nameEn: 'Catholic Easter Monday',            category: 'religious', sharedWithAlbania: false },
              { id: 'ks-kushtetutes',             date: '2026-04-09', name: 'Dita e Kushtetutës',                 nameEn: 'Constitution Day',                  category: 'national',  sharedWithAlbania: false },
              { id: 'ks-pashka-ortodokse',        date: '2026-04-12', name: 'Pashkët Ortodokse',                  nameEn: 'Orthodox Easter',                   category: 'religious', sharedWithAlbania: true  },
              { id: 'ks-pashka-ortodokse-e-hene', date: '2026-04-13', name: 'E Hëna e Pashkëve Ortodokse',       nameEn: 'Orthodox Easter Monday',            category: 'religious', sharedWithAlbania: false },
              { id: 'ks-dita-punetoreve',         date: '2026-05-01', name: 'Dita e Punëtorëve',                  nameEn: 'International Labour Day',          category: 'national',  sharedWithAlbania: true  },
              { id: 'ks-dita-europes-transfer',   date: '2026-05-11', name: 'Dita e Evropës (pushim)',            nameEn: 'Europe Day (day off transferred)',   category: 'national',  sharedWithAlbania: false },
              { id: 'ks-kurban-bajram',           date: '2026-05-27', name: 'Kurban Bajrami',                     nameEn: 'Eid al-Adha',                       category: 'religious', sharedWithAlbania: true,  isObservance: false },
              { id: 'ks-krishtlindjet',           date: '2026-12-25', name: 'Krishtlindjet Katolike',             nameEn: 'Catholic Christmas Day',            category: 'religious', sharedWithAlbania: true,  isObservance: false },
              { id: 'ks-dita-shqiptareve',        date: '2026-11-28', name: 'Dita e Shqiptarëve',                 nameEn: 'Day of Albanians',                  category: 'national',  sharedWithAlbania: true,  isObservance: true  },
            ]));
          }
          
          next();
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
