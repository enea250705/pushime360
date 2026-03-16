const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm">🇦🇱</span>
            </div>
            <span className="font-display text-base font-bold text-secondary-foreground">
              KalendariFestave
            </span>
          </div>

          <p className="max-w-md text-sm text-secondary-foreground/60">
            Platforma më e plotë për festat zyrtare shqiptare. Planifiko pushimet, 
            shiko fundjavat e gjata dhe ndaj me miqtë.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-secondary-foreground/40">
            <span>© 2026 kalendarifestave.com</span>
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
