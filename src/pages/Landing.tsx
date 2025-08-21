import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImmersive, ImmersivePlanet } from '@/contexts/ImmersiveContext';
import { Button } from '@/components/ui/button';
import { Play, GraduationCap, Puzzle, Sparkles } from 'lucide-react';

const planets = [
  {
    id: 'grid' as ImmersivePlanet,
    name: 'Grid',
    title: 'Cosmic Neptune',
    description: 'Navigate the deep space mysteries',
    image: '/immersive/planet-grid.png'
  },
  {
    id: 'sol' as ImmersivePlanet,
    name: 'Sol',
    title: 'Sunrise World',
    description: 'Rise with the morning light',
    image: '/immersive/planet-sol.png'
  },
  {
    id: 'flux' as ImmersivePlanet,
    name: 'Flux',
    title: 'Cyber Arena',
    description: 'Enter the neon battleground',
    image: '/immersive/planet-flux.png'
  },
  {
    id: 'terra' as ImmersivePlanet,
    name: 'Terra',
    title: 'Forest Realm',
    description: 'Discover nature\'s wisdom',
    image: '/immersive/planet-terra.png'
  },
  {
    id: 'glacis' as ImmersivePlanet,
    name: 'Glacis',
    title: 'Ice Kingdom',
    description: 'Master the frozen depths',
    image: '/immersive/planet-glacis.png'
  }
];

export default function Landing() {
  const navigate = useNavigate();
  const { beginTravel, setImmersive, audioEnabled, setAudioEnabled } = useImmersive();
  const [selectedPlanet, setSelectedPlanet] = useState<ImmersivePlanet | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullText = "Welcome, traveler. Choose your world.";

  // Typing animation
  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else if (typedText.length >= fullText.length) {
      setIsTyping(false);
    }
  }, [typedText, isTyping]);

  // Parallax mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePlanetSelect = (planet: ImmersivePlanet) => {
    setSelectedPlanet(planet);
  };

  const handleEnterWorld = async () => {
    if (!selectedPlanet) return;
    
    await beginTravel(selectedPlanet);
    navigate('/');
  };

  const handleExitImmersive = () => {
    setImmersive(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section - Spaceship Cockpit */}
      <section 
        id="hero" 
        className="relative h-screen flex items-center justify-center"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(0,20,40,0.8) 0%, rgba(0,10,20,0.9) 50%, rgba(0,5,10,1) 100%),
            url('/immersive/starfield.png')
          `,
          backgroundSize: 'auto, 200px 200px',
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale(1.05)`
        }}
      >
        {/* Starfield Layer */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'url(/immersive/starfield.png)',
            backgroundSize: '300px 300px',
            transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`
          }}
        />

        {/* Cockpit Overlay */}
        <div 
          className="absolute inset-0 opacity-70 z-10"
          style={{
            backgroundImage: 'url(/immersive/cockpit-overlay.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Content */}
        <div className="relative z-20 text-center space-y-8 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-orbitron">
            <span className="text-cyan-400">{typedText}</span>
            {isTyping && <span className="animate-pulse">|</span>}
          </h1>
          
          <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
            Embark on an interstellar chess journey across five unique worlds. 
            Each planet offers its own mysteries and challenges.
          </p>

          {/* Audio Toggle */}
          <Button
            variant="floating"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="mx-auto"
          >
            {audioEnabled ? '🔊' : '🔇'} {audioEnabled ? 'Audio On' : 'Audio Off'}
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-1 h-16 bg-gradient-to-b from-transparent via-cyan-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* Planet Selection */}
      <section id="planets" className="relative py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white font-orbitron">
            Choose Your <span className="text-cyan-400">Destination</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {planets.map((planet) => (
              <div
                key={planet.id}
                className={`
                  relative group cursor-pointer transform transition-all duration-500 hover:scale-105
                  ${selectedPlanet === planet.id ? 'scale-105 ring-4 ring-cyan-400' : ''}
                `}
                onClick={() => handlePlanetSelect(planet.id)}
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: `${planets.indexOf(planet) * 0.5}s`
                }}
              >
                {/* Planet Image */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-full">
                  <img
                    src={planet.image}
                    alt={planet.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Glow Effect */}
                  <div className={`
                    absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    ${selectedPlanet === planet.id ? 'opacity-100' : ''}
                  `}>
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-glow-pulse" />
                  </div>
                </div>

                {/* Planet Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white">{planet.name}</h3>
                  <p className="text-cyan-300 font-medium">{planet.title}</p>
                  <p className="text-slate-400 text-sm">{planet.description}</p>
                </div>

                {/* Selection Indicator */}
                {selectedPlanet === planet.id && (
                  <div className="absolute -top-2 -right-2 bg-cyan-400 text-slate-900 rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}

                {/* Hover Tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Click to select {planet.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="relative py-20 px-4 bg-slate-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white font-orbitron">
            Your <span className="text-cyan-400">Journey</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: 'Travel',
                description: 'Select your destination and engage warp drive'
              },
              {
                icon: <Play className="h-8 w-8" />,
                title: 'Land',
                description: 'Experience unique environments and atmospheres'
              },
              {
                icon: <GraduationCap className="h-8 w-8" />,
                title: 'Master',
                description: 'Train with AI in planet-specific challenges'
              }
            ].map((step, index) => (
              <div
                key={step.title}
                className="text-center space-y-4 group"
                style={{
                  animation: 'fade-in 0.6s ease-out forwards',
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0
                }}
              >
                <div className="mx-auto w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="relative py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-2xl text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-orbitron">
            Ready to <span className="text-cyan-400">Explore?</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              onClick={handleEnterWorld}
              disabled={!selectedPlanet}
              className={`
                group relative overflow-hidden
                ${selectedPlanet 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900' 
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              <div className="flex items-center gap-3 relative z-10">
                <Sparkles className="h-6 w-6 transition-transform group-hover:scale-110" />
                <span className="text-lg font-semibold">
                  {selectedPlanet ? `Enter ${planets.find(p => p.id === selectedPlanet)?.name}` : 'Select a Planet'}
                </span>
              </div>
              {selectedPlanet && <div className="glow-effect" />}
            </Button>

            <Button
              variant="outline"
              size="xl"
              onClick={handleExitImmersive}
              className="border-slate-600 text-slate-400 hover:text-white hover:border-slate-400"
            >
              Back to Normal Site
            </Button>
          </div>

          {!selectedPlanet && (
            <p className="text-slate-500 text-sm">
              Please select a planet above to continue your journey
            </p>
          )}
        </div>
      </section>
    </div>
  );
}