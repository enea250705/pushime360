import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/kalendari', label: 'Kalendari' },
  { href: '/festat', label: 'Festat' },
  { href: '/fundjava', label: 'Fundjava' },
  { href: '/sugjerime', label: 'Sugjerime' },
  { href: '/plani', label: 'Plani Im' },
  { href: '/kosova', label: 'Kosova' },
  { href: '/api', label: 'API' },
];

const Header = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
            <span className="text-lg">🇦🇱</span>
          </div>
          <span className="hidden font-display text-lg font-bold text-foreground sm:inline">
            Kalendari<span className="text-primary">Festave</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all
                ${location.pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={toggleDark}
            className="ml-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleDark}
            className="rounded-lg p-2 text-muted-foreground"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
