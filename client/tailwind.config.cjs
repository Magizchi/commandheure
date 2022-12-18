const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      light: "#e0fbfc",
      primary: "#25364d",
      secondary: "#98c1d9",
      main: "#ee6c4d",
      dark: "#293241",
      stars: {
        50: "#f5f7f9",
        100: "#eceff2",
        200: "#cfd6df",
        300: "#b1bdcc",
        400: "#778ca6",
        500: "#3d5a80",
        600: "#375173",
        700: "#2e4460",
        800: "#25364d",
        900: "#1e2c3f",
      },
      ...colors,
    },
  },
  plugins: [],
};
