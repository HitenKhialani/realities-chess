import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				cinzel: ['Cinzel', 'serif'],
				orbitron: ['Orbitron', 'monospace'],
				noto: ['Noto Serif', 'serif'],
				inter: ['Inter', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Four World Colors
				aurora: {
					primary: 'hsl(var(--aurora-primary))',
					secondary: 'hsl(var(--aurora-secondary))', 
					accent: 'hsl(var(--aurora-accent))',
					glow: 'hsl(var(--aurora-glow))'
				},
				cosmos: {
					primary: 'hsl(var(--cosmos-primary))',
					secondary: 'hsl(var(--cosmos-secondary))',
					accent: 'hsl(var(--cosmos-accent))',
					glow: 'hsl(var(--cosmos-glow))'
				},
				circuit: {
					primary: 'hsl(var(--circuit-primary))',
					secondary: 'hsl(var(--circuit-secondary))',
					accent: 'hsl(var(--circuit-accent))',
					glow: 'hsl(var(--circuit-glow))'
				},
				eden: {
					primary: 'hsl(var(--eden-primary))',
					secondary: 'hsl(var(--eden-secondary))',
					accent: 'hsl(var(--eden-accent))',
					nature: 'hsl(var(--eden-nature))'
				}
			},
			backgroundImage: {
				'gradient-aurora': 'var(--gradient-aurora)',
				'gradient-sunrise': 'var(--gradient-sunrise)',
				'gradient-morning': 'var(--gradient-morning)',
				'gradient-cosmos': 'var(--gradient-cosmos)',
				'gradient-space': 'var(--gradient-space)',
				'gradient-nebula': 'var(--gradient-nebula)',
				'gradient-circuit': 'var(--gradient-circuit)',
				'gradient-neon': 'var(--gradient-neon)',
				'gradient-tech': 'var(--gradient-tech)',
				'gradient-eden': 'var(--gradient-eden)',
				'gradient-forest': 'var(--gradient-forest)',
				'gradient-nature': 'var(--gradient-nature)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(-5px) rotate(-1deg)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' }
				},
				'drift': {
					'0%': { transform: 'translateY(100vh) translateX(0px)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(-100px) translateX(100px)', opacity: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					from: { opacity: '0', transform: 'translateY(40px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'drift': 'drift 20s linear infinite',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'slide-up': 'slide-up 0.8s ease-out forwards'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				'elegant': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
