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
        slate: colors.zinc,
        usfGreen: '#006747',
        usfGold: '#CFC493',
        usfEvergreen: '#005432',
        usfSand: '#EDEBD1',
        usfLemongrass: '#DBE442',
        usfApple: '#9CCB3B',
        usfTeal: '#009374',
        usfTealSoft: '#327052',
        usfSeaglass: '#80B0A6',
        usfStorm: '#006484',
        usfSilver: '#CAD2D8',
        usfGray: '#7E96A0',
        usfLightGrey: "#eceff1",
        usfSlate: '#466069',
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
    pattern: /(bg|text|border)-usf(Green|Gold|Evergreen|Sand|Lemongrass|Apple|Teal|Seaglass|Storm|Silver|Gray|Slate)/
  }]
}