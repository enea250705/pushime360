import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ListChecks, Palmtree, Lightbulb, Briefcase, Globe, Code2, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import Footer from '@/components/Footer';

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Kalendari Interaktiv',
    desc: 'Pamje mujore dhe javore me ngjyra për çdo kategori feste.',
    to: '/kalendari',
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    icon: <ListChecks className="h-6 w-6" />,
    title: 'Lista e Festave',
    desc: 'Të gjitha 22 festat zyrtare me filtrim sipas kategorisë.',
    to: '/festat',
    gradient: 'from-holiday-religious/20 to-holiday-religious/5',
    iconColor: 'text-holiday-religious',
  },
  {
    icon: <Palmtree className="h-6 w-6" />,
    title: 'Fundjavat e Gjata',
    desc: 'Planifiko pushimet duke shfrytëzuar fundjavat e zgjatura.',
    to: '/fundjava',
    gradient: 'from-long-weekend/20 to-long-weekend/5',
    iconColor: 'text-long-weekend',
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Sugjerime të Zgjuara',
    desc: 'Algoritëm që gjen kombinimin optimal të ditëve të lejes.',
    to: '/sugjerime',
    gradient: 'from-accent/20 to-accent/5',
    iconColor: 'text-accent',
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Plani Personal',
    desc: 'Menaxho kuotën tënde vjetore të lejes dhe planifiko.',
    to: '/plani',
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Shqipëri vs Kosovë',
    desc: 'Krahaso festat zyrtare mes dy vendeve.',
    to: '/kosova',
    gradient: 'from-holiday-shifted/20 to-holiday-shifted/5',
    iconColor: 'text-holiday-shifted',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsBar />

        {/* Features Grid */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
              >
                <Sparkles className="h-4 w-4" />
                Çfarë ofron platforma
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl"
              >
                Gjithçka për festat{' '}
                <span className="text-gradient-primary">në një vend</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto max-w-lg text-muted-foreground"
              >
                Eksploro kalendarin, planifiko pushimet dhe ndaj me miqtë
              </motion.p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.to}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={f.to}
                    className={`group relative flex flex-col gap-4 rounded-2xl border border-border bg-gradient-to-br ${f.gradient} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-card shadow-sm ${f.iconColor}`}>
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="mb-1.5 font-display text-lg font-bold text-foreground">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Shiko <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* API CTA */}
        <section className="border-t border-border bg-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Code2 className="mx-auto mb-4 h-8 w-8 text-secondary-foreground/60" />
              <h3 className="mb-3 font-display text-2xl font-bold text-secondary-foreground">
                Për Zhvilluesit
              </h3>
              <p className="mb-6 text-secondary-foreground/60">
                Integro festat shqiptare në projektet e tua me Widget, API dhe iCal
              </p>
              <Link
                to="/api"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                <Code2 className="h-4 w-4" />
                Shiko Dokumentacionin
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
