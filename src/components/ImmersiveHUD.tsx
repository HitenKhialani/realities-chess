import { useState } from 'react';
import { useImmersive } from '@/contexts/ImmersiveContext';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  VolumeX, 
  Volume2, 
  Settings, 
  LogOut,
  Zap,
  ZapOff
} from 'lucide-react';

const planets = [
  { id: 'grid' as const, name: 'Grid', color: '#00e5ff' },
  { id: 'sol' as const, name: 'Sol', color: '#ffb88c' }, 
  { id: 'flux' as const, name: 'Flux', color: '#ff2aad' },
  { id: 'terra' as const, name: 'Terra', color: '#22c55e' },
  { id: 'glacis' as const, name: 'Glacis', color: '#7dd3fc' }
];

export function ImmersiveHUD() {
  const { 
    isImmersive,
    selectedPlanet,
    effectsLevel,
    audioEnabled,
    audioVolume,
    setEffectsLevel,
    setAudioEnabled,
    setAudioVolume,
    beginTravel,
    exitImmersive
  } = useImmersive();
  
  const [showPlanetSelector, setShowPlanetSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  if (!isImmersive) return null;

  const handlePlanetSwitch = async (planetId: typeof planets[number]['id']) => {
    setShowPlanetSelector(false);
    if (planetId !== selectedPlanet) {
      await beginTravel(planetId);
    }
  };

  return (
    <>
      {/* Main HUD */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {/* Planet Switch */}
        <Button
          variant="floating"
          size="sm"
          onClick={() => setShowPlanetSelector(!showPlanetSelector)}
          className="relative group"
          aria-label="Switch Planet"
        >
          <Rocket className="h-4 w-4" />
          {selectedPlanet && (
            <div 
              className="absolute -inset-1 rounded-lg opacity-30 animate-glow-pulse"
              style={{ backgroundColor: planets.find(p => p.id === selectedPlanet)?.color }}
            />
          )}
        </Button>

        {/* Settings */}
        <Button
          variant="floating"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>

        {/* Exit Immersive */}
        <Button
          variant="floating"
          size="sm"
          onClick={exitImmersive}
          className="text-destructive hover:text-destructive"
          aria-label="Exit Immersive Mode"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Planet Selector Overlay */}
      {showPlanetSelector && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="floating-panel p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-center">Choose Your Destination</h3>
            <div className="grid grid-cols-2 gap-3">
              {planets.map(planet => (
                <Button
                  key={planet.id}
                  variant={selectedPlanet === planet.id ? "default" : "outline"}
                  onClick={() => handlePlanetSwitch(planet.id)}
                  className="relative h-16 flex-col gap-1 group overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: planet.color }}
                  />
                  <div className="relative z-10">
                    <div className="font-medium">{planet.name}</div>
                    <div 
                      className="w-8 h-1 rounded-full"
                      style={{ backgroundColor: planet.color }}
                    />
                  </div>
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowPlanetSelector(false)}
              className="w-full mt-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="floating-panel p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Immersive Settings</h3>
            
            <div className="space-y-4">
              {/* Effects Level */}
              <div>
                <label className="block text-sm font-medium mb-2">Visual Effects</label>
                <div className="flex gap-2">
                  <Button
                    variant={effectsLevel === 'low' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setEffectsLevel('low')}
                  >
                    <ZapOff className="h-4 w-4 mr-1" />
                    Low
                  </Button>
                  <Button
                    variant={effectsLevel === 'high' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setEffectsLevel('high')}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    High
                  </Button>
                </div>
              </div>

              {/* Audio */}
              <div>
                <label className="block text-sm font-medium mb-2">Audio</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.1"
                    value={audioVolume}
                    onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                    disabled={!audioEnabled}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => setShowSettings(false)}
              className="w-full mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}