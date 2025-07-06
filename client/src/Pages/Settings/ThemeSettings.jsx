import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

const ThemeSettings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>

      <div className="flex items-center gap-4">
        <span className="text-md">Current Theme:</span>
        <span className="text-yellow-400 font-bold capitalize">{theme}</span>
      </div>

      <button
        onClick={toggleTheme}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded"
      >
        Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
};

export default ThemeSettings;
