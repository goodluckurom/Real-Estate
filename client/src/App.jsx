import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import ThemeSettings from "./component/ThemeSettings";
import { useSelector } from "react-redux";

const App = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (theme === "system") {
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
      document.documentElement.classList.add(theme);
    }
  }, [theme]);
  return (
    <Router>
      <div className="min-h-screen bg-lightBackground dark:bg-darkBackground text-text dark:text-darkText">
        <Header onSettingsClick={() => setSettingsOpen(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
      {settingsOpen && <ThemeSettings onClose={() => setSettingsOpen(false)} />}
    </Router>
  );
};

export default App;
