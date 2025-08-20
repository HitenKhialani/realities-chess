import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'grid' | 'sol' | 'flux' | 'terra' | 'glacis';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('grid');

  useEffect(() => {
    const stored = localStorage.getItem('endgame-theme') as Theme;
    if (stored && ['grid', 'sol', 'flux', 'terra', 'glacis'].includes(stored)) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('endgame-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}