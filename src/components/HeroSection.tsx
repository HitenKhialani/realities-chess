import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { ChessBoardPreview } from '@/components/ChessBoardPreview';
import { Play, GraduationCap, Puzzle, Sparkles } from 'lucide-react';

export function HeroSection() {
  const { theme } = useTheme();

  const getThemeContent = () => {
    switch (theme) {
      case 'dark':
        return {
          title: 'Enter Cosmos',
          subtitle: 'Where chess masters journey through infinite space',
          description: 'Navigate the cosmic depths where AI minds orbit in eternal battle. Every move ripples through stellar infinity.',
          font: 'font-cinzel',
          bgEffect: 'bg-gradient-nebula'
        };
      case 'neon':
        return {
          title: 'Access Circuit',
          subtitle: 'Neural networks clash in electric harmony',
          description: 'Jack into the high-tech arena where algorithms pulse with neon energy. Strategy flows through quantum circuits.',
          font: 'font-orbitron',
          bgEffect: 'bg-gradient-tech'
        };
      case 'zen':
        return {
          title: 'Welcome to Eden',
          subtitle: 'Where ancient wisdom flows through living forests',
          description: 'Discover the sacred grove where nature\'s intelligence guides every move. Chess becomes one with the living world.',
          font: 'font-noto',
          bgEffect: 'bg-gradient-nature'
        };
      default: // light
        return {
          title: 'Enter Aurora',
          subtitle: 'Where champions rise with the morning sun',
          description: 'Ascend to the sunrise planet where golden light illuminates every victory. Dawn breaks on a new era of chess mastery.',
          font: 'font-inter',
          bgEffect: 'bg-gradient-morning'
        };
    }
  };

  const themeContent = getThemeContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 md:px-6 lg:px-8">
      {/* Background Effect */}
      <div className={`absolute inset-0 ${themeContent.bgEffect} opacity-30`} />
      
      <div className="relative z-10 container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl">
        {/* Content */}
        <div className="space-y-8 animate-fade-in">
          <div className={`${themeContent.font} space-y-4`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-foreground">{themeContent.title.split(' ').slice(0, -2).join(' ')}</span>
              <span className="block text-primary animate-glow-pulse">
                {themeContent.title.split(' ').slice(-2).join(' ')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              {themeContent.subtitle}
            </p>
          </div>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {themeContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
            <Button 
              size="xl" 
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3 relative z-10">
                <Play className="h-6 w-6 transition-transform group-hover:scale-110" />
                <span className="text-lg font-semibold">Start Playing</span>
              </div>
              <div className="glow-effect" />
            </Button>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="floating" 
                size="lg" 
                className="group transition-all duration-300 hover:translate-y-[-2px]"
              >
                <GraduationCap className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                <span>Learn</span>
              </Button>
              
              <Button 
                variant="floating" 
                size="lg" 
                className="group transition-all duration-300 hover:translate-y-[-2px]"
              >
                <Puzzle className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                <span>Puzzles</span>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {[
              'AI-Powered Analysis',
              'Real-time Coaching',
              'Progress Tracking',
              'Global Leaderboards'
            ].map((feature, index) => (
              <div 
                key={feature} 
                className="flex items-center gap-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chess Board Preview */}
        <div className="flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <ChessBoardPreview />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-transparent via-primary to-transparent rounded-full" />
      </div>
    </section>
  );
}