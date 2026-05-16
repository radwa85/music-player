import React, { createContext, useContext, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  background: string;
  surface: string;
  primaryText: string;
  secondaryText: string;
  primary: string;
  primaryOrange: string;
  accent: string;
  inputBg: string;
  placeholder: string;
  inactiveBar: string;
  sidebarBg: string;
  cardBg: string;
  sidebarBackdrop: string;
  borderColor: string;
  destructive?: string;
}

const lightColors: ThemeColors = {
  background: "#F7FAFF",
  surface: "#FFFFFF",
  primaryText: "#091127",
  secondaryText: "#8996B8",
  primary: "#091127",
  primaryOrange: "#C4401F",
  accent: "#C4401D",
  inputBg: "#ECD2CF",
  placeholder: "#A67B6B",
  inactiveBar: "#CACACA",
  sidebarBg: "#F5F7FC",
  cardBg: "#FFFFFF",
  sidebarBackdrop: "rgba(9, 17, 39, 0.42)",
  borderColor: "#E8EBF4",
  destructive: "#D14343",
};

const darkColors: ThemeColors = {
  background: "#0D1117",
  surface: "#161B22",
  primaryText: "#E6EDF3",
  secondaryText: "#8B949E",
  primary: "#E6EDF3",
  primaryOrange: "#FF6B35",
  accent: "#FF6B35",
  inputBg: "#21262D",
  placeholder: "#6B7B8D",
  inactiveBar: "#484F58",
  sidebarBg: "#161B22",
  cardBg: "#21262D",
  sidebarBackdrop: "rgba(0,0,0,0.6)",
  borderColor: "#30363D",
  destructive: "#FF6B35",
};

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const isDark = mode === "dark";
  const colors = isDark ? darkColors : lightColors;

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const value = useMemo(
    () => ({ mode, colors, isDark, toggleTheme }),
    [mode, colors, isDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
