import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PersonalLeavePlanner from '@/components/PersonalLeavePlanner';
import PageHero from '@/components/PageHero';
import { Briefcase } from 'lucide-react';

const PersonalPlannerPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <PageHero
        icon={<Briefcase className="h-5 w-5" />}
        badge="Planifikuesi Personal"
        title="Plani im i Pushimeve"
        subtitle="Vendos ditët e tua të lejes dhe menaxho kuotën vjetore"
      />
      <PersonalLeavePlanner />
    </main>
    <Footer />
  </div>
);

export default PersonalPlannerPage;
