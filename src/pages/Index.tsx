import { WorldBackground } from '@/components/WorldBackground';
import { PlanetOverlay } from '@/components/PlanetOverlay';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { FeatureSection } from '@/components/FeatureSection';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* World Background */}
      <WorldBackground />
      
      {/* Planet Overlay for Immersive Mode */}
      <PlanetOverlay />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <FeatureSection />
      </main>
    </div>
  );
};

export default Index;
