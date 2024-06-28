/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fffcf2", // Cream (Light)
        secondary: "#ccc5b9", // Pale Silver (Light)
        accent: "#eb5e28", // Dark Charcoal
        light: "#252422", // Dark Ebony (Dark)
        dark: "#403d39", // Burnt Orange (Dark)
        darkBackground: "#1A1917", // Dark Background Color (for dark mode)
      },
    },
  },
  plugins: [
    // ...
  ],
};
