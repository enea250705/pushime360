import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmartLeavePlanner from '@/components/SmartLeavePlanner';
import PageHero from '@/components/PageHero';
import { Lightbulb } from 'lucide-react';

const SmartPlannerPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <PageHero
        icon={<Lightbulb className="h-5 w-5" />}
        badge="Algoritëm i Zgjuar"
        title="Sugjerime për Pushime"
        subtitle="Merr sa më shumë ditë të lira me sa më pak ditë leje"
      />
      <SmartLeavePlanner />
    </main>
    <Footer />
  </div>
);

export default SmartPlannerPage;
