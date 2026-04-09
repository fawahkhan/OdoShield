import { createContext, useContext, useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  isDark: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
  isDark: true,
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("odo-theme") as Theme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("odo-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    // Also set on body so global bg transitions work
    document.body.style.background = theme === "dark" ? "#050A0F" : "#F4F7F5";
    document.body.style.transition = "background 0.4s ease";
  }, [theme]);

  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

// ─── Theme tokens — use these everywhere instead of raw hex ──────────────────
export function useTokens() {
  const { isDark } = useTheme();

  return {
    // Backgrounds
    bg:        isDark ? "#050A0F"              : "#F4F7F5",
    bgCard:    isDark ? "rgba(11,19,30,0.88)"  : "rgba(255,255,255,0.9)",
    bgCardHov: isDark ? "rgba(0,220,130,0.05)" : "rgba(0,180,100,0.06)",
    bgInset:   isDark ? "rgba(255,255,255,0.03)": "rgba(0,0,0,0.03)",
    bgNav:     isDark ? "rgba(5,10,15,0.92)"   : "rgba(244,247,245,0.94)",

    // Text
    text:      isDark ? "#E8EDF2"              : "#0D1A12",
    textSub:   isDark ? "rgba(232,237,242,0.5)": "rgba(13,26,18,0.52)",
    textMuted: isDark ? "rgba(232,237,242,0.28)": "rgba(13,26,18,0.3)",

    // Borders
    border:    isDark ? "rgba(255,255,255,0.07)": "rgba(0,0,0,0.09)",
    borderMid: isDark ? "rgba(255,255,255,0.12)": "rgba(0,0,0,0.14)",

    // Brand green (stays the same in both themes)
    green:     "#00DC82",
    greenDark: "#00A86B",

    // Grid tint
    gridLine:  isDark ? "rgba(0,220,130,0.04)"  : "rgba(0,160,90,0.06)",

    // Orb colors
    orb1: isDark
      ? "radial-gradient(circle,rgba(0,200,100,0.12) 0%,transparent 70%)"
      : "radial-gradient(circle,rgba(0,180,100,0.10) 0%,transparent 70%)",
    orb2: isDark
      ? "radial-gradient(circle,rgba(30,120,255,0.09) 0%,transparent 70%)"
      : "radial-gradient(circle,rgba(30,120,255,0.06) 0%,transparent 70%)",

    // Nav link text
    navLink:   isDark ? "rgba(232,237,242,0.6)" : "rgba(13,26,18,0.6)",
    navBg:     isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
    navBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
  } as const;
}