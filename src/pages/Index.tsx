import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, List, Palmtree, Lightbulb, Briefcase, Globe, Code2, ArrowRight } from 'lucide-react';

const quickLinks = [
  { path: '/kalendari', icon: Calendar, label: 'Kalendari', desc: 'Pamje mujore & javore', color: 'bg-primary/10 text-primary' },
  { path: '/festat', icon: List, label: 'Festat Zyrtare', desc: '22 festa për 2026', color: 'bg-holiday-religious/10 text-holiday-religious' },
  { path: '/fundjava', icon: Palmtree, label: 'Fundjava të Gjata', desc: 'Planifiko pushimet', color: 'bg-long-weekend/10 text-long-weekend' },
  { path: '/sugjerime', icon: Lightbulb, label: 'Sugjerime të Zgjuara', desc: 'Algoritëm optimal', color: 'bg-accent/10 text-accent' },
  { path: '/plani', icon: Briefcase, label: 'Plani Personal', desc: 'Menaxho lejet', color: 'bg-primary/10 text-primary' },
  { path: '/kosova', icon: Globe, label: 'Kosova', desc: 'Krahaso festat', color: 'bg-holiday-cultural/10 text-holiday-cultural' },
  { path: '/api', icon: Code2, label: 'API & Widget', desc: 'Për zhvilluesit', color: 'bg-secondary text-secondary-foreground' },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Header />
      <main>
        <HeroSection />
        <StatsBar />

        {/* Quick navigation cards */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-3 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
              Eksploro Platformën
            </h2>
            <p className="mb-10 text-center text-muted-foreground">
              Gjithçka që të nevojitet për planifikimin e festave dhe pushimeve
            </p>

            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.button
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(link.path)}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${link.color} transition-transform group-hover:scale-110`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-bold text-card-foreground">{link.label}</h3>
                      <p className="text-xs text-muted-foreground">{link.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default Index;
