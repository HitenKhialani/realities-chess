import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ImmersivePlanet = 'grid' | 'sol' | 'flux' | 'terra' | 'glacis';
export type EffectsLevel = 'low' | 'high';

interface ImmersiveContextType {
  isImmersive: boolean;
  selectedPlanet: ImmersivePlanet | null;
  effectsLevel: EffectsLevel;
  audioEnabled: boolean;
  audioVolume: number;
  setImmersive: (enabled: boolean) => void;
  setPlanet: (planet: ImmersivePlanet | null) => void;
  setEffectsLevel: (level: EffectsLevel) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setAudioVolume: (volume: number) => void;
  beginTravel: (planet: ImmersivePlanet) => Promise<void>;
  exitImmersive: () => void;
}

const ImmersiveContext = createContext<ImmersiveContextType | undefined>(undefined);

export function ImmersiveProvider({ children }: { children: ReactNode }) {
  const [isImmersive, setIsImmersive] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<ImmersivePlanet | null>(null);
  const [effectsLevel, setEffectsLevel] = useState<EffectsLevel>('high');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.3);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('endgame-immersive');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setEffectsLevel(data.effectsLevel || 'high');
        setAudioEnabled(data.audioEnabled || false);
        setAudioVolume(data.audioVolume || 0.3);
      } catch (e) {
        console.warn('Failed to parse immersive settings');
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('endgame-immersive', JSON.stringify({
      effectsLevel,
      audioEnabled,
      audioVolume
    }));
  }, [effectsLevel, audioEnabled, audioVolume]);

  // Apply immersive mode to HTML
  useEffect(() => {
    if (isImmersive) {
      document.documentElement.setAttribute('data-immersive', 'on');
      if (selectedPlanet) {
        document.documentElement.setAttribute('data-planet', selectedPlanet);
      }
    } else {
      document.documentElement.removeAttribute('data-immersive');
      document.documentElement.removeAttribute('data-planet');
    }
  }, [isImmersive, selectedPlanet]);

  const setImmersive = (enabled: boolean) => {
    setIsImmersive(enabled);
    if (!enabled) {
      setSelectedPlanet(null);
    }
  };

  const setPlanet = (planet: ImmersivePlanet | null) => {
    setSelectedPlanet(planet);
  };

  const beginTravel = async (planet: ImmersivePlanet): Promise<void> => {
    return new Promise((resolve) => {
      // Add departure class
      document.documentElement.classList.add('depart');
      
      setTimeout(() => {
        // Add traverse class
        document.documentElement.classList.add('traverse');
        
        // Play warp sound if audio enabled
        if (audioEnabled) {
          const warpAudio = new Audio('/immersive/fx-warp.mp3');
          warpAudio.volume = audioVolume;
          warpAudio.play().catch(() => {});
        }
        
        setTimeout(() => {
          // Set planet and remove transition classes
          setSelectedPlanet(planet);
          document.documentElement.classList.remove('depart', 'traverse');
          document.documentElement.classList.add('arrive');
          
          setTimeout(() => {
            document.documentElement.classList.remove('arrive');
            resolve();
          }, 1000);
        }, 1200);
      }, 300);
    });
  };

  const exitImmersive = () => {
    setIsImmersive(false);
    setSelectedPlanet(null);
  };

  return (
    <ImmersiveContext.Provider value={{
      isImmersive,
      selectedPlanet,
      effectsLevel,
      audioEnabled,
      audioVolume,
      setImmersive,
      setPlanet,
      setEffectsLevel,
      setAudioEnabled,
      setAudioVolume,
      beginTravel,
      exitImmersive
    }}>
      {children}
    </ImmersiveContext.Provider>
  );
}

export function useImmersive() {
  const context = useContext(ImmersiveContext);
  if (context === undefined) {
    throw new Error('useImmersive must be used within an ImmersiveProvider');
  }
  return context;
}