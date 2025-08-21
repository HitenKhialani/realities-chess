import { useImmersive } from '@/contexts/ImmersiveContext';

export function PlanetOverlay() {
  const { isImmersive, selectedPlanet, effectsLevel } = useImmersive();

  if (!isImmersive || !selectedPlanet) return null;

  const getOverlayElements = () => {
    switch (selectedPlanet) {
      case 'grid':
        return (
          <>
            <div 
              className="fixed inset-0 opacity-25 pointer-events-none z-0"
              style={{
                backgroundImage: 'url(/immersive/starfield.png)',
                backgroundSize: '400px 400px',
                animation: effectsLevel === 'high' ? 'drift 30s linear infinite' : 'none'
              }}
            />
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none z-0" />
          </>
        );
      case 'sol':
        return (
          <>
            <div className="fixed top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl pointer-events-none z-0" />
            <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-orange-300/10 to-transparent pointer-events-none z-0" />
          </>
        );
      case 'flux':
        return (
          <>
            <div 
              className="fixed inset-0 opacity-15 pointer-events-none z-0"
              style={{
                backgroundImage: 'linear-gradient(45deg, transparent 48%, rgba(255, 42, 173, 0.1) 49%, rgba(255, 42, 173, 0.1) 51%, transparent 52%)',
                backgroundSize: '20px 20px',
                animation: effectsLevel === 'high' ? 'drift 20s linear infinite reverse' : 'none'
              }}
            />
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5 pointer-events-none z-0" />
          </>
        );
      case 'terra':
        return (
          <>
            <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none z-0" />
            <div className="fixed top-0 right-0 w-full h-24 bg-gradient-to-b from-emerald-800/15 to-transparent pointer-events-none z-0" />
          </>
        );
      case 'glacis':
        return (
          <>
            <div className="fixed inset-0 bg-gradient-to-br from-blue-100/10 via-transparent to-cyan-100/10 pointer-events-none z-0" />
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-200/10 to-transparent pointer-events-none z-0" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {getOverlayElements()}
    </div>
  );
}