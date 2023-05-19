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

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1280px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '0rem',
          xl: '0rem',
          '2xl': '0rem',
        },
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      colors: {      
        'gray-white': '#F6F6F6',
        'white': '#ffffff',
        primary: "#2C7CBB",
        secondary: "#418106",
        'app-blue': '#2C7CBB',
        'app-light-blue': '#EEF5FA',
        'app-light-green': '#EAEDEE',
        'app-green': '#008100',
        'app-gray': '#333333',
        'app-light-gray': '#545F76',
        'app-stone': '#29303F',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
