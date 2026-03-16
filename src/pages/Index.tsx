import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import CalendarView from '@/components/CalendarView';
import HolidayList from '@/components/HolidayList';
import LongWeekends from '@/components/LongWeekends';
import SmartLeavePlanner from '@/components/SmartLeavePlanner';
import PersonalLeavePlanner from '@/components/PersonalLeavePlanner';
import KosovoComparison from '@/components/KosovoComparison';
import WidgetEmbed from '@/components/WidgetEmbed';
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
        <SmartLeavePlanner />
        <PersonalLeavePlanner />
        <KosovoComparison />
        <WidgetEmbed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
