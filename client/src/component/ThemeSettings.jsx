import { useSelector, useDispatch } from "react-redux";
import { setTheme, setAccentColor } from "../redux/reducers/themeSlice";

const colors = [
  "#eb5e28", // Dark Charcoal
  "#f4a261", // Light Orange
  "#e9c46a", // Light Gold
  "#2a9d8f", // Sea Green
  "#264653", // Dark Blue Green
  "#ff7f50", // Coral
  "#6495ed", // Cornflower Blue
  "#ff6347", // Tomato
  "#4682b4", // Steel Blue
  "#6a5acd", // Slate Blue
  "#73706d", // Grayish Brown
  "#7e7b78", // Light Olive
  "#8b8784", // Taupe
  "#999491", // Sage
  "#a8a39f", // Light Beige
  "#b9b3af", // Warm Gray
  "#cbc5c0", // Soft Gray
  "#dfd9d3", // Light Cream
  "#f5efe8", // Off White
  "#3321c8",
  "#BFEF0B",
  "#EF0B23",
];

// eslint-disable-next-line react/prop-types
const ThemeSettings = ({ onClose }) => {
  const dispatch = useDispatch();
  const { theme, accentColor } = useSelector((state) => state.theme);

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  const handleColorChange = (color) => {
    dispatch(setAccentColor(color));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-darkBackground p-4 rounded shadow-lg w-[20%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg mb-4 dark:text-white">Theme Settings</h2>
        <div className="mb-4">
          <label className="block mb-2 dark:text-gray-200">Theme</label>
          <div className="flex justify-between m-2">
            <button
              className={`p-2 rounded ${
                theme === "light"
                  ? "bg-gray-300"
                  : "bg-gray-600 dark:bg-gray-600"
              }`}
              onClick={() => handleThemeChange("light")}
            >
              Light
            </button>
            <button
              className={`p-2 rounded ${
                theme === "dark"
                  ? "bg-gray-300"
                  : "bg-gray-600 dark:bg-gray-600"
              }`}
              onClick={() => handleThemeChange("dark")}
            >
              Dark
            </button>
            <button
              className={`p-2 rounded ${
                theme === "system"
                  ? "bg-gray-300"
                  : "bg-gray-600 dark:bg-gray-600"
              }`}
              onClick={() => handleThemeChange("system")}
            >
              System
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 dark:text-gray-200">Accent Color</label>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              ></button>
            ))}
          </div>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-accent text-white rounded dark:bg-accent"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ThemeSettings;
