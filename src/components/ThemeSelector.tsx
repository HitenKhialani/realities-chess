import { useTheme, Theme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Crown, Zap, Sun, Leaf } from 'lucide-react';

const themes = [
  {
    id: 'light' as Theme,
    name: 'Aurora',
    icon: Sun,
    description: 'Morning sunrise planet',
    gradient: 'from-yellow-200 via-orange-200 to-blue-200'
  },
  {
    id: 'dark' as Theme,
    name: 'Cosmos',
    icon: Crown,
    description: 'Deep space journey',
    gradient: 'from-blue-900 via-purple-900 to-cyan-800'
  },
  {
    id: 'neon' as Theme,
    name: 'Circuit',
    icon: Zap,
    description: 'High-tech arena',
    gradient: 'from-purple-600 via-pink-600 to-green-500'
  },
  {
    id: 'zen' as Theme,
    name: 'Eden',
    icon: Leaf,
    description: 'Avatar forest planet',
    gradient: 'from-green-300 via-emerald-400 to-amber-300'
  }
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="floating-panel p-6 rounded-2xl">
      <h3 className="text-lg font-cinzel font-semibold mb-4 text-foreground">
        Choose Your World
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
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