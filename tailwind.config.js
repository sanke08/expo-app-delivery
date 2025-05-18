/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{tsx,jsx}'
  ],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#20E1B2' // blue-700
        },
        secondary: {
          DEFAULT: '#171717', // emerald-500
          light: '#34D399', // emerald-400
          dark: '#171717' // emerald-600
        }
      }
    }
  },
  plugins: []
}
