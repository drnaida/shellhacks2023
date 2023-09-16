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
        darkGray: '#393647'
      },
      boxShadow: {
        'custom': '15px 22px 35px 6px rgba(0,0,0,0.07)',
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
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  safelist: [{
    pattern: /(bg|text|border)-(primary|secondary|tertiary|black)/
  }]
}
