import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalendarView from '@/components/CalendarView';
import PageHero from '@/components/PageHero';
import { Calendar } from 'lucide-react';

const CalendarPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <PageHero
        icon={<Calendar className="h-5 w-5" />}
        badge="Kalendari 2026"
        title="Kalendari Interaktiv"
        subtitle="Shiko festat zyrtare sipas muajit ose javës me pamje vizuale"
      />
      <CalendarView />
    </main>
    <Footer />
  </div>
);

export default CalendarPage;
