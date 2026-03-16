import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LongWeekends from '@/components/LongWeekends';
import PageHero from '@/components/PageHero';
import { Palmtree } from 'lucide-react';

const LongWeekendsPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <PageHero
        icon={<Palmtree className="h-5 w-5" />}
        badge="Pushime të Gjata"
        title="Fundjavat e Gjata 🏖️"
        subtitle="Shfrytëzo festat zyrtare dhe fundjavat për pushime më të gjata"
      />
      <LongWeekends />
    </main>
    <Footer />
  </div>
);

export default LongWeekendsPage;
