import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HolidayList from '@/components/HolidayList';
import PageHero from '@/components/PageHero';
import { ListChecks } from 'lucide-react';

const HolidaysPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <PageHero
        icon={<ListChecks className="h-5 w-5" />}
        badge="22 Festa Zyrtare"
        title="Festat Zyrtare 2026"
        subtitle="Lista e plotë e festave zyrtare të Shqipërisë me detaje dhe filtrim"
      />
      <HolidayList />
    </main>
    <Footer />
  </div>
);

export default HolidaysPage;
