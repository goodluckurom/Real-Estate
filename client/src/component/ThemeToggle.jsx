import { useState } from "react";

const themes = {
  light: {
    primary: "#fffcf2",
    secondary: "#ccc5b9",
    accent: "#eb5e28",
    background: "#fff",
    text: "#252422",
  },
  dark: {
    primary: "#403d39",
    secondary: "#252422",
    accent: "#eb5e28",
    background: "#1A1917",
    text: "#fffcf2",
  },
  theme1: {
    primary: "#696663",
    secondary: "#73706d",
    accent: "#8b8784",
    background: "#f5efe8",
    text: "#252422",
  },
  theme2: {
    primary: "#463f3a",
    secondary: "#8a817c",
    accent: "#e0afa0",
    background: "#f4f3ee",
    text: "#252422",
  },
};

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const applyTheme = (theme) => {
    const root = document.documentElement;
    const selectedTheme = themes[theme];

    Object.keys(selectedTheme).forEach((key) => {
      root.style.setProperty(`--color-${key}`, selectedTheme[key]);
    });
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className="theme-toggle">
      {Object.keys(themes).map((theme) => (
        <button
          key={theme}
          onClick={() => handleThemeChange(theme)}
          className={`p-2 m-1 ${
            currentTheme === theme ? "border border-black" : ""
          }`}
        >
          {theme}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
