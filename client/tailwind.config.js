/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#B0875B',
        bodyColor: '#B9C7D4'
      }
    },
  },
  plugins: [
    
  ],
}

