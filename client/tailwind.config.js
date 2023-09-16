const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,tsx}",
    "./node_modules/hrc/**/*.{ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        fade: 'fade 100ms ease-in-out',
        pulseFive: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 5'
      },
      colors: {
        primary: '#654FD3',
        secondary: '#FFC5A0',
        tertiary: '#DFDDE5',
        black: '#393647'
      },
      fontFamily: {
        'sans-serif': ['Open Sans', 'arial'],
        'barlow': ['Barlow Condensed', 'arial'],
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      backgroundImage: {
        landingBanner: "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(39, 39, 42,0.9)), url('./assets/banner.png')",
        landingBannerDark: "linear-gradient(to bottom, rgba(1,1,1,0.3), rgba(51, 65, 85,0.9)), url('./assets/banner.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  safelist: [{
    pattern: /(bg|text|border)-(primary|secondary|tertiary|black)/
  }]
}
