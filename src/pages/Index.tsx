import { ThemeProvider } from '@/contexts/ThemeContext';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { FeatureSection } from '@/components/FeatureSection';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection />
          <FeatureSection />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
