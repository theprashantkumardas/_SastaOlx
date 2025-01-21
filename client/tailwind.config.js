/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#2A55E5',
        bodyColor: '#B9C7D4',
        secondaryColor: '#FFDF00'
      }
    },
  },
  plugins: [
    
  ],
}

