import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#calendar', label: 'Kalendari' },
  { href: '#holidays', label: 'Festat' },
  { href: '#long-weekends', label: 'Fundjavat e Gjata' },
  { href: '#smart-planner', label: 'Sugjerime' },
  { href: '#planner', label: 'Plani Im' },
  { href: '#kosovo', label: 'Kosova' },
  { href: '#api', label: 'API' },
];

const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2.5">
          {/* Calendar SVG Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="36" height="36" fill="none" className="flex-shrink-0">
            <rect x="2" y="5" width="28" height="25" rx="4" fill="#6366f1"/>
            <rect x="2" y="5" width="28" height="9" rx="4" fill="#4f46e5"/>
            <rect x="2" y="10" width="28" height="4" fill="#4f46e5"/>
            <rect x="10" y="2" width="3" height="7" rx="1.5" fill="#c7d2fe"/>
            <rect x="19" y="2" width="3" height="7" rx="1.5" fill="#c7d2fe"/>
            <rect x="7"  y="19" width="3" height="3" rx="1" fill="white" opacity="0.9"/>
            <rect x="14" y="19" width="3" height="3" rx="1" fill="white" opacity="0.9"/>
            <rect x="21" y="19" width="3" height="3" rx="1" fill="white" opacity="0.9"/>
            <rect x="7"  y="25" width="3" height="3" rx="1" fill="white" opacity="0.6"/>
            <rect x="14" y="25" width="3" height="3" rx="1" fill="#fbbf24"/>
            <rect x="21" y="25" width="3" height="3" rx="1" fill="white" opacity="0.6"/>
          </svg>
          <span className="hidden font-display text-base font-bold text-foreground sm:inline">
            Pushime<span className="text-primary">360</span>
            <span className="ml-1 text-xs font-normal text-muted-foreground">— Kalendari i Festave</span>
          </span>
        </a>

        <nav className="hidden items-center gap-4 lg:flex">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleDark}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-muted-foreground lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-background px-4 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground">
                {link.label}
              </a>
            ))}
            <button onClick={toggleDark} className="flex items-center gap-2 text-sm text-muted-foreground">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? 'Modaliteti i ndritshëm' : 'Modaliteti i errët'}
            </button>
          </div>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;
