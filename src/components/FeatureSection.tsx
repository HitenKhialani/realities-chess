import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Brain, 
  Target, 
  BarChart3, 
  Users, 
  Trophy, 
  Zap,
  ArrowRight 
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Training',
    description: 'Advanced Stockfish analysis with personalized recommendations and move classification',
    stats: '99.9% Accuracy'
  },
  {
    icon: Target,
    title: 'Adaptive Puzzles',
    description: 'Dynamic difficulty adjustment based on your skill level and learning patterns',
    stats: '10,000+ Puzzles'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Detailed insights into your gameplay with exportable reports and progress tracking',
    stats: 'Real-time Data'
  },
  {
    icon: Users,
    title: 'Multiplayer Battles',
    description: 'Challenge friends or find opponents in our immersive chess arenas',
    stats: 'Global Network'
  },
  {
    icon: Trophy,
    title: 'Achievement System',
    description: 'Earn rewards, unlock new themes, and climb the leaderboards',
    stats: '100+ Rewards'
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Real-time move suggestions and mistake analysis to accelerate learning',
    stats: 'Live Coaching'
  }
];

export function FeatureSection() {
  const { theme } = useTheme();

  const getFontClass = () => {
    switch (theme) {
      case 'grid': return 'font-orbitron';
      case 'flux': return 'font-orbitron';
      case 'terra': return 'font-noto';
      case 'glacis': return 'font-cinzel';
      default: return 'font-inter';
    }
  };

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className={`text-4xl md:text-5xl font-bold ${getFontClass()} mb-6`}>
            <span className="text-foreground">Master Your </span>
            <span className="text-primary">Chess Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in a revolutionary chess training experience where cutting-edge AI 
            meets beautiful, interactive environments.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="floating-panel p-6 rounded-2xl group hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                {/* Icon & Stats */}
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {feature.stats}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Learn More Link */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group-hover:text-primary transition-colors p-0 h-auto font-medium"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="floating-panel p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className={`text-2xl font-bold ${getFontClass()} mb-4`}>
              Ready to Begin Your Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of players who have transformed their chess skills in our immersive training environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Start Free Trial</span>
                <div className="glow-effect" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}