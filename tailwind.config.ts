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
				// Five World Colors
				grid: {
					primary: 'hsl(var(--grid-primary))',
					secondary: 'hsl(var(--grid-secondary))', 
					accent: 'hsl(var(--grid-accent))',
					glow: 'hsl(var(--grid-glow))'
				},
				sol: {
					primary: 'hsl(var(--sol-primary))',
					secondary: 'hsl(var(--sol-secondary))',
					accent: 'hsl(var(--sol-accent))',
					glow: 'hsl(var(--sol-glow))'
				},
				flux: {
					primary: 'hsl(var(--flux-primary))',
					secondary: 'hsl(var(--flux-secondary))',
					accent: 'hsl(var(--flux-accent))',
					glow: 'hsl(var(--flux-glow))'
				},
				terra: {
					primary: 'hsl(var(--terra-primary))',
					secondary: 'hsl(var(--terra-secondary))',
					accent: 'hsl(var(--terra-accent))',
					nature: 'hsl(var(--terra-nature))'
				},
				glacis: {
					primary: 'hsl(var(--glacis-primary))',
					secondary: 'hsl(var(--glacis-secondary))',
					accent: 'hsl(var(--glacis-accent))',
					ice: 'hsl(var(--glacis-ice))'
				}
			},
			backgroundImage: {
				'gradient-grid': 'var(--gradient-grid)',
				'gradient-cosmic': 'var(--gradient-cosmic)',
				'gradient-neptune': 'var(--gradient-neptune)',
				'gradient-sol': 'var(--gradient-sol)',
				'gradient-sunrise': 'var(--gradient-sunrise)',
				'gradient-dawn': 'var(--gradient-dawn)',
				'gradient-flux': 'var(--gradient-flux)',
				'gradient-cyber': 'var(--gradient-cyber)',
				'gradient-neon': 'var(--gradient-neon)',
				'gradient-terra': 'var(--gradient-terra)',
				'gradient-forest': 'var(--gradient-forest)',
				'gradient-jungle': 'var(--gradient-jungle)',
				'gradient-glacis': 'var(--gradient-glacis)',
				'gradient-ice': 'var(--gradient-ice)',
				'gradient-frost': 'var(--gradient-frost)'
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
