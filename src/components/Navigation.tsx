import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from '@/components/ThemeSelector';
import { 
  Play, 
  GraduationCap, 
  Puzzle, 
  BarChart3, 
  Menu, 
  X,
  Crown
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
  { id: 'play', label: 'Play', icon: Play, description: 'Challenge AI or friends' },
  { id: 'learn', label: 'Learn', icon: GraduationCap, description: 'Structured lessons' },
  { id: 'puzzles', label: 'Puzzles', icon: Puzzle, description: 'Daily challenges' },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Your progress' }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 p-6">
        <div className="floating-panel w-full flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className={`flex items-center gap-3 ${getFontClass()}`}>
            <div className="relative">
              <Crown className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 animate-glow-pulse">
                <Crown className="h-8 w-8 text-primary/50" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Endgame</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Chess Training</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            {navItems.map(({ id, label, icon: Icon, description }) => (
              <Button
                key={id}
                variant="ghost"
                className="relative h-auto flex-col gap-1 p-4 group hover:bg-primary/10"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{label}</span>
                
                {/* Tooltip */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full
                              opacity-0 group-hover:opacity-100 transition-opacity
                              bg-popover text-popover-foreground px-2 py-1 rounded text-xs
                              whitespace-nowrap pointer-events-none">
                  {description}
                </div>
              </Button>
            ))}
          </div>

          {/* Theme Selector */}
          <div className="relative">
            <ThemeSelector />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4">
        <div className="floating-panel flex items-center justify-between px-4 py-3">
          <div className={`flex items-center gap-2 ${getFontClass()}`}>
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Endgame</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="floating-panel mt-2 p-4 space-y-3">
            {navItems.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Button>
            ))}
            
            <div className="pt-3 border-t border-border">
              <ThemeSelector />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}