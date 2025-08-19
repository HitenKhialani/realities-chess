import { useTheme, Theme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Crown, Zap, Sun, Leaf } from 'lucide-react';

const themes = [
  {
    id: 'light' as Theme,
    name: 'Marble Hall',
    icon: Sun,
    description: 'Golden marble chess hall',
    gradient: 'from-amber-100 via-yellow-50 to-amber-100'
  },
  {
    id: 'dark' as Theme,
    name: 'Obsidian Arena',
    icon: Crown,
    description: 'Gothic obsidian with mist',
    gradient: 'from-purple-900 via-slate-900 to-purple-900'
  },
  {
    id: 'neon' as Theme,
    name: 'Cyber Grid',
    icon: Zap,
    description: 'Futuristic holographic world',
    gradient: 'from-cyan-500 via-teal-600 to-green-500'
  },
  {
    id: 'zen' as Theme,
    name: 'Bamboo Dojo',
    icon: Leaf,
    description: 'Peaceful bamboo sanctuary',
    gradient: 'from-green-200 via-emerald-100 to-green-200'
  }
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="floating-panel p-6 rounded-2xl">
      <h3 className="text-lg font-cinzel font-semibold mb-4 text-foreground">
        Choose Your Reality
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