/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1000px',
      'xl': '1200px',
      '2xl': '1200px',
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
        '5': 'repeat(8, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        'layout': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
