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
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-lg font-bold text-primary-foreground">🇦🇱</span>
          </div>
          <span className="hidden font-display text-lg font-bold text-foreground sm:inline">
            Kalendari<span className="text-primary">Festave</span>
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
