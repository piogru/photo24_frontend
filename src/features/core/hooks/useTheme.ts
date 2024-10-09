import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContextProvider";

export default function useTheme(): [string, () => void] {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("Context must be used within a context provider");
  }

  const { theme, setTheme } = context;

  const handleThemeChange = () => {
    if (theme == "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return [theme, handleThemeChange];
}
