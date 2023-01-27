/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gunmetal-300": "#39374C",
        "gunmetal-500": "#2D2B3F",
        "gunmetal-800": "#2C2A3E",
        "silver": "#8C8A99",
        "beer": "#F9991A",
        "carmine": "#EC4748",
        "sand": "#FAF4F9",
        "crayola": "#17BF6F",
      }
    },
  },
  plugins: [],
}
