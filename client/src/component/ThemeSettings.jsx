import { useSelector, useDispatch } from "react-redux";
import { setTheme, setAccentColor } from "../redux/reducers/themeSlice";

const colors = [
  "#eb5e28",
  "#f4a261",
  "#e9c46a",
  "#2a9d8f",
  "#264653",
  "#ff7f50",
  "#6495ed",
  "#ff6347",
  "#4682b4",
  "#6a5acd",
  "#73706d",
  "#7e7b78",
  "#8b8784",
  "#999491",
  "#a8a39f",
  "#b9b3af",
  "#cbc5c0",
  "#dfd9d3",
  "#f5efe8",
  "#3321c8",
  "#BFEF0B",
  "#EF0B23",
  "#e0afa0",
];

// eslint-disable-next-line react/prop-types
const ThemeSettings = ({ onClose }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  const handleColorChange = (color) => {
    dispatch(setAccentColor(color));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-darkBackground p-4 rounded shadow-lg w-[25%]"
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
