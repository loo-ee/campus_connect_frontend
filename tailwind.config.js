/** @type {import('tailwindcss').Config} */

const { violet, blackA, mauve, green } = require('@radix-ui/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-bg': "url('/images/home-bg.jpg')",
        'home-bg1': "url('/images/bg-new.svg')"
      },

      fontFamily: {
        mono: ['Roboto Mono', 'monospace'],
      },

      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
        primary: "#e0edfc",
        secondary: "#ffffff",
        tertiary: "#272d4c",
        subtleBG: "#f5f5f5",
        accent: "#4361ee",
        accent2: "#f77f00",
        // accent3: "#b1d8f5",
        accent3: "#0077be",
        hovers: "#03045e",
        hovers2: "#fb5607"
      },

      screens: {
        'phone': '300px',
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

