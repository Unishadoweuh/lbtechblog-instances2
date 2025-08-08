"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme";

export function Topbar() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header className="w-full border-b p-4 flex justify-end">
      <button
        onClick={toggleTheme}
        className="px-3 py-1 rounded border"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </header>
  );
}
