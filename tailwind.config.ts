import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'shooting-star': {
          '0%': { transform: 'translate(0, 0)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translate(-300px, 300px)', opacity: '0' },
        },
      },
      animation: {
        twinkle: 'twinkle 2.5s ease-in-out infinite',
        'shooting-star': 'shooting-star 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
