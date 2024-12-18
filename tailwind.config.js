/* eslint-disable no-undef */
module.exports = {
  darkMode: ['class'],
  blocklist: ['bg-gray-50'],
  content: [
    './src/**/*.{js,jsx}',
    './src/pages/**/*.{js, jsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      heading: 'Red Hat Display',
      body: 'Urbanist',
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
      },
      gray: {
        main: '#f8f9fa',
        50: '#f9fafb',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
      blue: {
        primary: '#3A9AF3',
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
        950: '#083344',
      },
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
        950: '#052e16',
      },
      yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
        950: '#422006',
      },
    },
    extend: {
      marginLeft: {
        s: '0.3vw',
      },
      padding: {
        half: '0.5px',
      },
      height: {
        'sidebar-screen': '93vh',
      },
      fontSize: {
        h1: '48px',
        h2: '36px',
        h3: '28px',
        h4: '22px',
        body: '18px',
        md: '16px',
        sm: '14px',
        header: '3rem',
      },
      colors: {
        yellow: '#FFEF00',
        'light-grey': '#e5e7eb',
        'side-bar-hover': '#BED1FFFF',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        xs: '0.125rem',
        s: '0.1875rem',
        m: '0.25rem',
        l: '0.375rem',
        xl: '0.5rem',
        '100-percent': '100%',
      },
      boxShadow: {
        xs: '0px 0px 1px rgba(23, 26, 31, 0.05), 0px 0px 2px rgba(23, 26, 31, 0.08)',
        s: '0px 1px 2.5px rgba(23, 26, 31, 0.07), 0px 0px 2px rgba(23, 26, 31, 0.08)',
        m: '0px 2px 4px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.08)',
        l: '0px 4px 7px rgba(23, 26, 31, 0.13), 0px 0px 2px rgba(23, 26, 31, 0.08)',
        xl: '0px 8.5px 13.75px rgba(23, 26, 31, 0.22), 0px 0px 2px rgba(23, 26, 31, 0.08)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        message: {
          '0%': {
            'max-height': '100vmax',
          },
          '80%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(1)',
            'max-height': '100vmax',
            overflow: 'visible',
            'padding-top': '1rem',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'chat-message': 'message 0.15s ease-out 0s forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('flowbite/plugin'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#e5e7eb',
            borderRadius: '20px',
            border: '1px solid white',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
