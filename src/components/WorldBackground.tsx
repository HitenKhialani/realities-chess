import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function WorldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const elements: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      type: string;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getWorldConfig = () => {
      switch (theme) {
        case 'light': // Aurora World
          return {
            elementCount: 8,
            types: ['cloud', 'bird', 'sun-ray'],
            colors: ['35 90% 60%', '25 95% 70%', '200 60% 75%'],
            speed: 0.2,
            size: { min: 20, max: 60 }
          };
        case 'dark': // Cosmos World
          return {
            elementCount: 12,
            types: ['planet', 'star', 'comet'],
            colors: ['200 100% 60%', '240 80% 70%', '190 90% 65%'],
            speed: 0.15,
            size: { min: 15, max: 45 }
          };
        case 'neon': // Circuit World
          return {
            elementCount: 15,
            types: ['circuit', 'hexagon', 'grid'],
            colors: ['300 100% 65%', '320 100% 70%', '140 100% 60%'],
            speed: 0.3,
            size: { min: 25, max: 50 }
          };
        case 'zen': // Eden World
          return {
            elementCount: 10,
            types: ['leaf', 'petal', 'branch'],
            colors: ['120 60% 40%', '115 70% 45%', '25 70% 55%'],
            speed: 0.1,
            size: { min: 18, max: 40 }
          };
        default:
          return {
            elementCount: 8,
            types: ['cloud'],
            colors: ['35 90% 60%'],
            speed: 0.2,
            size: { min: 20, max: 60 }
          };
      }
    };

    const createElements = () => {
      const config = getWorldConfig();
      elements.length = 0;
      
      for (let i = 0; i < config.elementCount; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          size: Math.random() * (config.size.max - config.size.min) + config.size.min,
          opacity: Math.random() * 0.3 + 0.1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: config.types[Math.floor(Math.random() * config.types.length)]
        });
      }
    };

    const drawElement = (element: typeof elements[0], config: ReturnType<typeof getWorldConfig>) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate(element.rotation);
      ctx.globalAlpha = element.opacity;

      const colorIndex = Math.floor(Math.random() * config.colors.length);
      const color = config.colors[colorIndex];

      switch (element.type) {
        case 'cloud':
          // Soft cloud shape
          ctx.fillStyle = `hsl(${color} / 0.4)`;
          for (let i = 0; i < 5; i++) {
            const x = (i - 2) * element.size * 0.3;
            const y = Math.sin(i) * element.size * 0.2;
            ctx.beginPath();
            ctx.arc(x, y, element.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
          }
          break;

        case 'bird':
          // Simple bird silhouette
          ctx.strokeStyle = `hsl(${color})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-element.size * 0.3, 0);
          ctx.quadraticCurveTo(0, -element.size * 0.2, element.size * 0.3, 0);
          ctx.moveTo(-element.size * 0.3, 0);
          ctx.quadraticCurveTo(0, element.size * 0.2, element.size * 0.3, 0);
          ctx.stroke();
          break;

        case 'sun-ray':
          // Radial sun ray
          ctx.strokeStyle = `hsl(${color} / 0.6)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(element.size, 0);
          ctx.stroke();
          break;

        case 'planet':
          // Glowing planet
          ctx.fillStyle = `hsl(${color})`;
          ctx.shadowBlur = 20;
          ctx.shadowColor = `hsl(${color})`;
          ctx.beginPath();
          ctx.arc(0, 0, element.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'star':
          // Twinkling star
          ctx.fillStyle = `hsl(${color})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsl(${color})`;
          for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 2);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(element.size * 0.2, 0);
            ctx.lineTo(element.size * 0.1, element.size * 0.05);
            ctx.lineTo(0, 0);
            ctx.fill();
            ctx.restore();
          }
          break;

        case 'comet':
          // Comet trail
          const gradient = ctx.createLinearGradient(0, 0, -element.size, 0);
          gradient.addColorStop(0, `hsl(${color})`);
          gradient.addColorStop(1, `hsl(${color} / 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(0, 0, element.size * 0.1, element.size * 0.05, 0, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'circuit':
          // Circuit pattern
          ctx.strokeStyle = `hsl(${color})`;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 5;
          ctx.shadowColor = `hsl(${color})`;
          ctx.beginPath();
          ctx.rect(-element.size * 0.2, -element.size * 0.2, element.size * 0.4, element.size * 0.4);
          ctx.moveTo(0, -element.size * 0.2);
          ctx.lineTo(0, element.size * 0.2);
          ctx.moveTo(-element.size * 0.2, 0);
          ctx.lineTo(element.size * 0.2, 0);
          ctx.stroke();
          break;

        case 'hexagon':
          // Hexagonal shape
          ctx.strokeStyle = `hsl(${color} / 0.8)`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsl(${color})`;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * element.size * 0.3;
            const y = Math.sin(angle) * element.size * 0.3;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          break;

        case 'grid':
          // Grid lines
          ctx.strokeStyle = `hsl(${color} / 0.5)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = -1; i <= 1; i++) {
            ctx.moveTo(i * element.size * 0.2, -element.size * 0.2);
            ctx.lineTo(i * element.size * 0.2, element.size * 0.2);
            ctx.moveTo(-element.size * 0.2, i * element.size * 0.2);
            ctx.lineTo(element.size * 0.2, i * element.size * 0.2);
          }
          ctx.stroke();
          break;

        case 'leaf':
          // Leaf shape
          ctx.fillStyle = `hsl(${color} / 0.7)`;
          ctx.beginPath();
          ctx.moveTo(0, -element.size * 0.3);
          ctx.quadraticCurveTo(element.size * 0.2, -element.size * 0.1, 0, element.size * 0.3);
          ctx.quadraticCurveTo(-element.size * 0.2, -element.size * 0.1, 0, -element.size * 0.3);
          ctx.fill();
          break;

        case 'petal':
          // Flower petal
          ctx.fillStyle = `hsl(${color} / 0.6)`;
          ctx.beginPath();
          ctx.ellipse(0, -element.size * 0.2, element.size * 0.15, element.size * 0.25, 0, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'branch':
          // Branch pattern
          ctx.strokeStyle = `hsl(${color})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(element.size * 0.3, -element.size * 0.2);
          ctx.moveTo(0, 0);
          ctx.lineTo(element.size * 0.2, element.size * 0.3);
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const config = getWorldConfig();

      elements.forEach((element) => {
        // Update position
        element.x += element.vx;
        element.y += element.vy;
        element.rotation += element.rotationSpeed;

        // Wrap around edges
        if (element.x < -100) element.x = canvas.width + 100;
        if (element.x > canvas.width + 100) element.x = -100;
        if (element.y < -100) element.y = canvas.height + 100;
        if (element.y > canvas.height + 100) element.y = -100;

        drawElement(element, config);
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createElements();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createElements();
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
      style={{ opacity: 0.4 }}
    />
  );
}