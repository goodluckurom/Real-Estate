/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode using the `class` strategy
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "accent-dark": "var(--color-accent-dark)",
        "accent-light": "var(--color-accent-light)",
        background: "var(--color-background)",
        text: "var(--color-text)",

        //for dark mode
        darkBackground: "#1a1917", // Dark mode background
        darkText: "#fffcf2", // Dark mode text
        //for light mode
        lightBackground: "#fff",
        ligthText: "#000",
      },
    },
  },
  plugins: [],
};
