import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/kalendari', label: 'Kalendari' },
  { to: '/festat', label: 'Festat' },
  { to: '/fundjava', label: 'Fundjavat e Gjata' },
  { to: '/sugjerime', label: 'Sugjerime' },
  { to: '/plani', label: 'Plani Im' },
  { to: '/kosova', label: 'Kosova' },
  { to: '/api', label: 'API' },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-sm">
              <span className="text-sm">🇦🇱</span>
            </div>
            <span className="font-display text-base font-bold text-secondary-foreground">
              KalendariFestave
            </span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-4">
            {footerLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs text-secondary-foreground/50 transition-colors hover:text-secondary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="max-w-md text-sm text-secondary-foreground/40">
            Platforma më e plotë për festat zyrtare shqiptare. Planifiko pushimet, 
            shiko fundjavat e gjata dhe ndaj me miqtë.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-secondary-foreground/30">
            <span>© 2026 kalendarifestave.com</span>
            <span>·</span>
            <span>Për komunitetin shqiptar 🇦🇱</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
