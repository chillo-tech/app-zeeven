/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1000px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1200px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '0.25rem',
          sm: '2rem',
          lg: '0rem',
          xl: '0rem',
          '2xl': '0rem',
        },
      },
      colors: {
        'app-blue': '#1D3A8A',
        'app-yellow': '#FDDE6D',
        'app-light-blue': '#EEF5FA',
        'app-light-gray': '#F8FAFB'

      },
      gridTemplateRows: {
        // Simple 8 row grid
        '5': 'repeat(8, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
