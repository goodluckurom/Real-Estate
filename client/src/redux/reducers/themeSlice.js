import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  accentColor: localStorage.getItem("accentColor") || "#eb5e28",
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
      document.documentElement.style.setProperty(
        "--color-accent",
        action.payload
      );
      document.documentElement.style.setProperty(
        "--color-accent-dark",
        shadeColor(action.payload, -20)
      );
      document.documentElement.style.setProperty(
        "--color-accent-light",
        shadeColor(action.payload, 20)
      );
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
