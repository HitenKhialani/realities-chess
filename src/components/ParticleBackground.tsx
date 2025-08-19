import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getThemeConfig = () => {
      switch (theme) {
        case 'dark':
          return {
            particleCount: 50,
            colors: [280, 285, 270], // Purple hues
            speed: 0.3,
            size: { min: 1, max: 3 }
          };
        case 'neon':
          return {
            particleCount: 80,
            colors: [180, 165, 120], // Cyan/green hues
            speed: 0.5,
            size: { min: 1, max: 4 }
          };
        case 'zen':
          return {
            particleCount: 30,
            colors: [120, 110, 350], // Green/pink hues (sakura)
            speed: 0.2,
            size: { min: 2, max: 5 }
          };
        default: // light
          return {
            particleCount: 40,
            colors: [45, 42, 38], // Golden hues
            speed: 0.25,
            size: { min: 1, max: 3 }
          };
      }
    };

    const createParticles = () => {
      const config = getThemeConfig();
      particles = [];
      
      for (let i = 0; i < config.particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          size: Math.random() * (config.size.max - config.size.min) + config.size.min,
          opacity: Math.random() * 0.5 + 0.1,
          hue: config.colors[Math.floor(Math.random() * config.colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const config = getThemeConfig();

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (theme === 'neon') {
          // Glowing effect for neon theme
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsl(${particle.hue}, 100%, 50%)`;
        }
        
        ctx.fillStyle = `hsl(${particle.hue}, ${theme === 'zen' ? '60%' : '70%'}, ${theme === 'light' ? '60%' : '70%'})`;
        ctx.beginPath();
        
        if (theme === 'zen' && Math.random() > 0.7) {
          // Sakura petal shape for zen theme
          ctx.ellipse(particle.x, particle.y, particle.size, particle.size * 0.6, Math.PI / 4, 0, 2 * Math.PI);
        } else {
          // Circle for other themes
          ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
        }
        
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with lines (neon theme only)
        if (theme === 'neon') {
          particles.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.save();
              ctx.globalAlpha = (1 - distance / 100) * 0.2;
              ctx.strokeStyle = `hsl(${particle.hue}, 100%, 50%)`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          });
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}