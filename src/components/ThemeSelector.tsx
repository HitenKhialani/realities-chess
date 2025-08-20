import { useTheme, Theme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Waves, Sun, Zap, TreePine, Snowflake } from 'lucide-react';

const themes = [
  {
    id: 'grid' as Theme,
    name: 'Grid',
    icon: Waves,
    description: 'Cosmic Neptune planet',
    gradient: 'from-cyan-900 via-blue-900 to-teal-800'
  },
  {
    id: 'sol' as Theme,
    name: 'Sol',
    icon: Sun,
    description: 'Sunrise nature world',
    gradient: 'from-orange-300 via-yellow-300 to-amber-200'
  },
  {
    id: 'flux' as Theme,
    name: 'Flux',
    icon: Zap,
    description: 'Cyber gaming arena',
    gradient: 'from-fuchsia-600 via-purple-600 to-green-500'
  },
  {
    id: 'terra' as Theme,
    name: 'Terra',
    icon: TreePine,
    description: 'Forest jungle planet',
    gradient: 'from-green-700 via-emerald-600 to-amber-600'
  },
  {
    id: 'glacis' as Theme,
    name: 'Glacis',
    icon: Snowflake,
    description: 'Icy Antarctica world',
    gradient: 'from-slate-300 via-blue-200 to-cyan-100'
  }
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="floating-panel p-6 rounded-2xl">
      <h3 className="text-lg font-cinzel font-semibold mb-4 text-foreground">
        Choose Your World
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {themes.map(({ id, name, icon: Icon, description, gradient }) => (
          <Button
            key={id}
            variant={theme === id ? "default" : "outline"}
            onClick={() => setTheme(id)}
            className={`
              relative h-20 flex-col gap-1 overflow-hidden group
              ${theme === id ? 'ring-2 ring-primary' : ''}
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 transition-opacity group-hover:opacity-30`} />
            
            <Icon className="h-5 w-5 relative z-10" />
            <div className="text-xs font-medium relative z-10">{name}</div>
            <div className="text-[10px] opacity-70 relative z-10">{description}</div>
            
            {theme === id && (
              <div className="absolute inset-0 bg-primary/10 animate-glow-pulse" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}