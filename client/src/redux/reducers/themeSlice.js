import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  accentColor: localStorage.getItem("accentColor") || "#eb5e28",
};

const applyAccentColor = (color) => {
  document.documentElement.style.setProperty("--color-accent", color);
  document.documentElement.style.setProperty(
    "--color-accent-dark",
    shadeColor(color, -20)
  );
  document.documentElement.style.setProperty(
    "--color-accent-light",
    shadeColor(color, 20)
  );
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      document.documentElement.classList.remove("light", "dark");
      if (action.payload === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        document.documentElement.classList.add(prefersDark ? "dark" : "light");
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (e) => {
            document.documentElement.classList.toggle("dark", e.matches);
            document.documentElement.classList.toggle("light", !e.matches);
          });
      } else {
        document.documentElement.classList.add(action.payload);
      }
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
      localStorage.setItem("accentColor", action.payload);
      applyAccentColor(action.payload);
    },
  },
});

export const { setTheme, setAccentColor } = themeSlice.actions;

export default themeSlice.reducer;

const shadeColor = (color, percent) => {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  return (
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
};

// Apply initial theme and accent color on load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.classList.add(savedTheme);

  const savedAccentColor = localStorage.getItem("accentColor") || "#eb5e28";
  applyAccentColor(savedAccentColor);
});
