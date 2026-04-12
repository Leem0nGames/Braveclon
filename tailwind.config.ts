import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fbbf24',
        secondary: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      screens: {
        mobile: '390px',
        'mobile-landscape': { raw: '(max-height: 500px)' },
      },
      spacing: {
        'safe': 'var(--safe-area-inset-top)',
        'safe-b': 'var(--safe-area-inset-bottom)',
        'safe-l': 'var(--safe-area-inset-left)',
        'safe-r': 'var(--safe-area-inset-right)',
      },
      padding: {
        'safe-t': 'var(--safe-area-inset-top)',
        'safe-b': 'var(--safe-area-inset-bottom)',
        'safe-l': 'var(--safe-area-inset-left)',
        'safe-r': 'var(--safe-area-inset-right)',
      },
      animation: {
        'fadeIn': 'fadeIn var(--transition-base) ease-out',
        'slideUp': 'slideUp var(--transition-base) ease-out',
        'slideDown': 'slideDown var(--transition-base) ease-out',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(16px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        slideDown: {
          '0%': {
            transform: 'translateY(-16px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(251, 191, 36, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 0 10px rgba(251, 191, 36, 0)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'base': 'var(--transition-base)',
        'slow': 'var(--transition-slow)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontSize: {
        'micro': '0.6875rem',
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'base': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    
    // Custom tap highlight plugin
    function ({ addComponents, theme }: any) {
      addComponents({
        '.tap-highlight-none': {
          WebkitTapHighlightColor: 'transparent',
        },
        '.safe-area': {
          paddingTop: 'var(--safe-area-inset-top)',
          paddingBottom: 'var(--safe-area-inset-bottom)',
          paddingLeft: 'var(--safe-area-inset-left)',
          paddingRight: 'var(--safe-area-inset-right)',
        },
        '.safe-area-top': {
          paddingTop: 'var(--safe-area-inset-top)',
        },
        '.safe-area-bottom': {
          paddingBottom: 'var(--safe-area-inset-bottom)',
        },
        '.safe-area-left': {
          paddingLeft: 'var(--safe-area-inset-left)',
        },
        '.safe-area-right': {
          paddingRight: 'var(--safe-area-inset-right)',
        },
        '.touch-none': {
          touchAction: 'none',
        },
        '.touch-auto': {
          touchAction: 'auto',
        },
        '.user-select-none': {
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
        },
        '.user-select-text': {
          userSelect: 'text',
          WebkitUserSelect: 'text',
        },
        '.native-tap': {
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          transition: 'opacity 150ms ease-out',
          '&:active': {
            opacity: '0.8',
          },
        },
        '.vibrant-text': {
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      });
    },
  ],
};

export default config;
