import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KosovoComparison from '@/components/KosovoComparison';
import PageHero from '@/components/PageHero';
import { Globe } from 'lucide-react';

const KosovoPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <PageHero
        icon={<Globe className="h-5 w-5" />}
        badge="🇦🇱 vs 🇽🇰"
        title="Krahasimi i Festave"
        subtitle="Shiko cilat festa janë të përbashkëta dhe cilat unike për secilin vend"
      />
      <KosovoComparison />
    </main>
    <Footer />
  </div>
);

export default KosovoPage;
