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
          title: 'Enter the Obsidian Arena',
          subtitle: 'Where chess masters are forged in shadows and mist',
          description: 'Descend into the gothic realm where AI minds clash in eternal battle. Every move echoes through halls of obsidian.',
          font: 'font-cinzel',
          bgEffect: 'bg-gradient-mist'
        };
      case 'neon':
        return {
          title: 'Access the Cyber Grid',
          subtitle: 'Neural networks collide in digital infinity',
          description: 'Jack into the matrix of pure strategy. Where algorithms dance and holographic pieces move through quantum space.',
          font: 'font-orbitron',
          bgEffect: 'bg-gradient-hologram'
        };
      case 'zen':
        return {
          title: 'Welcome to the Bamboo Dojo',
          subtitle: 'Where ancient wisdom meets modern mastery',
          description: 'Find balance in the art of war. Let sakura petals guide your path to enlightenment through the way of chess.',
          font: 'font-noto',
          bgEffect: 'bg-gradient-sakura'
        };
      default: // light
        return {
          title: 'Enter the Marble Hall',
          subtitle: 'Where champions rise to golden glory',
          description: 'Step into halls of marble and light. Where every victory is carved in stone and legends are born.',
          font: 'font-inter',
          bgEffect: 'bg-gradient-radiant'
        };
    }
  };

  const themeContent = getThemeContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
      {/* Background Effect */}
      <div className={`absolute inset-0 ${themeContent.bgEffect} opacity-30`} />
      
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
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
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8"
            >
              <div className="flex items-center gap-3 relative z-10">
                <Play className="h-5 w-5" />
                <span className="text-lg font-semibold">Start Playing</span>
              </div>
              <div className="glow-effect" />
            </Button>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="group h-14 px-6 floating-panel border-primary/20"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Learn
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group h-14 px-6 floating-panel border-primary/20"
              >
                <Puzzle className="h-5 w-5 mr-2" />
                Puzzles
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