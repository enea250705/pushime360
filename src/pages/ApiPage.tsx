import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WidgetEmbed from '@/components/WidgetEmbed';
import PageHero from '@/components/PageHero';
import { Code2 } from 'lucide-react';

const ApiPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <PageHero
        icon={<Code2 className="h-5 w-5" />}
        badge="Për Zhvilluesit"
        title="Widget & API"
        subtitle="Integro festat shqiptare në projektet e tua me Widget, JSON dhe iCal"
      />
      <WidgetEmbed />
    </main>
    <Footer />
  </div>
);

export default ApiPage;
