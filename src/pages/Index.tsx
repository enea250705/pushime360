import { useSearchParams } from 'react-router-dom';
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
import { CountryProvider } from '@/hooks/use-country';

const Index = ({ country = 'albania' }: { country?: 'albania' | 'kosovo' }) => {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'true';

  return (
    <CountryProvider initialCountry={country}>
      <div className="min-h-screen bg-background">
      {!isEmbed && <Header />}
      <main>
        {!isEmbed && <HeroSection />}
        {!isEmbed && <StatsBar />}
        <CalendarView />
        {!isEmbed && <HolidayList />}
        {!isEmbed && <LongWeekends />}
        {!isEmbed && <SmartLeavePlanner />}
        {!isEmbed && <PersonalLeavePlanner />}
        {!isEmbed && <KosovoComparison />}
        {!isEmbed && <WidgetEmbed />}
      </main>
      {!isEmbed && <Footer />}
      </div>
    </CountryProvider>
  );
};

export default Index;
