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
        "gunmetal-600": "#2A2838",
        "gunmetal-700": "#272632",
        "gunmetal-750": "#31303E",
        "gunmetal-800": "#292735",
        "gunmetal-900": "#212126",
        "silver": "#8C8A99",
        "silver-300": "#55545C",
        "beer": "#F9991A",
        "carmine": "#EC4748",
        "sand": "#FAF4F9",
        "crayola": "#17BF6F",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
