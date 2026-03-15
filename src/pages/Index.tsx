import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import CalendarView from '@/components/CalendarView';
import HolidayList from '@/components/HolidayList';
import LongWeekends from '@/components/LongWeekends';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <CalendarView />
        <HolidayList />
        <LongWeekends />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
