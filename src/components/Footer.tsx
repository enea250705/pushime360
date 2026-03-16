const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
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
            <span className="font-display text-base font-bold text-secondary-foreground">
              Pushime<span className="text-primary">360</span>
            </span>
          </div>

          <p className="max-w-md text-sm text-secondary-foreground/60">
            Platforma më e plotë për festat zyrtare shqiptare. Planifiko pushimet, 
            shiko fundjavat e gjata dhe ndaj me miqtë.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-secondary-foreground/40">
            <span>© 2026 pushime360.com</span>
            <span>·</span>
            <span>Të dhënat: Vendimi i Këshillit të Ministrave</span>
            <span>·</span>
            <span>Për komunitetin shqiptar 🇦🇱</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
